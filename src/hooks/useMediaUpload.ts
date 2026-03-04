"use client";

import { useState, useCallback } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/lib/firebase";

interface UploadState {
  progress: number;
  uploading: boolean;
  error: string | null;
  url: string | null;
}

/**
 * Firebase Storage upload hook with progress tracking
 */
export function useMediaUpload() {
  const [state, setState] = useState<UploadState>({
    progress: 0,
    uploading: false,
    error: null,
    url: null,
  });

  /**
   * Upload a file to Firebase Storage
   * @param file - The file to upload
   * @param storagePath - The path in Firebase Storage (e.g., "blog/cover-images/")
   * @param fileName - Optional custom filename
   */
  const upload = useCallback(
    async (
      file: File,
      storagePath: string,
      fileName?: string
    ): Promise<string> => {
      return new Promise((resolve, reject) => {
        setState({
          progress: 0,
          uploading: true,
          error: null,
          url: null,
        });

        const name = fileName || `${Date.now()}-${file.name}`;
        const fullPath = `${storagePath}/${name}`.replace(/\/\//g, "/");
        const storageRef = ref(storage, fullPath);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setState((prev) => ({ ...prev, progress }));
          },
          (error) => {
            setState({
              progress: 0,
              uploading: false,
              error: error.message,
              url: null,
            });
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setState({
              progress: 100,
              uploading: false,
              error: null,
              url: downloadURL,
            });
            resolve(downloadURL);
          }
        );
      });
    },
    []
  );

  /**
   * Delete a file from Firebase Storage
   * @param storagePath - The full path of the file in storage
   */
  const deleteFile = useCallback(async (storagePath: string) => {
    try {
      const storageRef = ref(storage, storagePath);
      await deleteObject(storageRef);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete file";
      setState((prev) => ({ ...prev, error: message }));
      throw new Error(message);
    }
  }, []);

  const reset = useCallback(() => {
    setState({ progress: 0, uploading: false, error: null, url: null });
  }, []);

  return {
    ...state,
    upload,
    deleteFile,
    reset,
  };
}

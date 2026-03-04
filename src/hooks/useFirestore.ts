"use client";

import { useState, useEffect, useCallback } from "react";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  type QueryConstraint,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface UseFirestoreOptions {
  realtime?: boolean;
}

/**
 * Generic Firestore CRUD hook
 */
export function useFirestore<T extends DocumentData>(
  collectionName: string,
  options: UseFirestoreOptions = {}
) {
  const [data, setData] = useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const collectionRef = collection(db, collectionName);

  // Fetch all documents with optional constraints
  const fetchAll = useCallback(
    async (constraints: QueryConstraint[] = []) => {
      try {
        setLoading(true);
        setError(null);
        const q = query(collectionRef, ...constraints);
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as (T & { id: string })[];
        setData(docs);
        return docs;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to fetch data";
        setError(message);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [collectionName]
  );

  // Fetch a single document by ID
  const fetchOne = useCallback(
    async (docId: string) => {
      try {
        setLoading(true);
        setError(null);
        const docRef = doc(db, collectionName, docId);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          return { id: snapshot.id, ...snapshot.data() } as T & { id: string };
        }
        return null;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to fetch document";
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [collectionName]
  );

  // Create a new document
  const create = useCallback(
    async (data: Omit<T, "id">) => {
      try {
        setError(null);
        const docRef = await addDoc(collectionRef, {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        return docRef.id;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to create document";
        setError(message);
        throw new Error(message);
      }
    },
    [collectionName]
  );

  // Update an existing document
  const update = useCallback(
    async (docId: string, data: Partial<T>) => {
      try {
        setError(null);
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, {
          ...data,
          updatedAt: serverTimestamp(),
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to update document";
        setError(message);
        throw new Error(message);
      }
    },
    [collectionName]
  );

  // Delete a document
  const remove = useCallback(
    async (docId: string) => {
      try {
        setError(null);
        const docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to delete document";
        setError(message);
        throw new Error(message);
      }
    },
    [collectionName]
  );

  // Set up real-time listener
  useEffect(() => {
    if (!options.realtime) return;

    const q = query(collectionRef);
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as (T & { id: string })[];
        setData(docs);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, options.realtime]);

  return {
    data,
    loading,
    error,
    fetchAll,
    fetchOne,
    create,
    update,
    remove,
    // Re-export Firestore helpers for complex queries
    query: query,
    where,
    orderBy,
    limit,
  };
}

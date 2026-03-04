"use client";

import { useCallback } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaUpload } from "@/hooks/useMediaUpload";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  className?: string;
  aspectRatio?: string;
}

export function ImageUploader({
  value,
  onChange,
  folder = "uploads",
  className,
  aspectRatio = "aspect-video",
}: ImageUploaderProps) {
  const { upload, progress, uploading, deleteFile, reset } = useMediaUpload();

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const url = await upload(file, folder);
      if (url) onChange(url);
    },
    [upload, folder, onChange]
  );

  const handleRemove = useCallback(async () => {
    if (value) {
      await deleteFile(value);
      onChange("");
      reset();
    }
  }, [value, deleteFile, onChange, reset]);

  return (
    <div className={cn("space-y-2", className)}>
      {value ? (
        <div className={cn("relative rounded-lg overflow-hidden border border-border-primary", aspectRatio)}>
          <Image src={value} alt="Uploaded" fill className="object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border-primary hover:border-primary-400 transition-colors p-8",
            aspectRatio
          )}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
              <p className="text-sm text-text-secondary">{progress}%</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-text-muted" />
              <p className="text-sm text-text-secondary">
                Click to upload image
              </p>
              <p className="text-xs text-text-muted">
                PNG, JPG, WebP up to 5MB
              </p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}

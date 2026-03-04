"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ref, listAll, getDownloadURL, getMetadata, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { toast } from "sonner";
import { Upload, Trash2, Copy, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatFileSize } from "@/lib/utils";
import { useMediaUpload } from "@/hooks/useMediaUpload";

interface MediaItem {
  name: string;
  url: string;
  fullPath: string;
  size: number;
  contentType: string;
}

export default function MediaLibraryPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<MediaItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { upload, uploading, progress } = useMediaUpload();

  const fetchMedia = useCallback(async () => {
    try {
      const listRef = ref(storage, "uploads");
      const result = await listAll(listRef);

      const mediaItems = await Promise.all(
        result.items.map(async (itemRef) => {
          const [url, metadata] = await Promise.all([
            getDownloadURL(itemRef),
            getMetadata(itemRef),
          ]);
          return {
            name: itemRef.name,
            url,
            fullPath: itemRef.fullPath,
            size: metadata.size,
            contentType: metadata.contentType || "unknown",
          };
        })
      );

      setItems(mediaItems);
    } catch (error) {
      console.error("Failed to load media:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMedia(); }, [fetchMedia]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await upload(file, "uploads");
    if (url) {
      toast.success("File uploaded");
      fetchMedia();
    }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try {
      await deleteObject(ref(storage, deleteItem.fullPath));
      toast.success("File deleted");
      setDeleteDialogOpen(false);
      setDeleteItem(null);
      fetchMedia();
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard");
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Media Library</h1>
          <p className="text-text-secondary">Upload and manage media files</p>
        </div>
        <Button disabled={uploading} onClick={() => document.getElementById('media-upload')?.click()}>
          <Upload className="mr-2 h-4 w-4" />
          {uploading ? `${progress}%` : "Upload"}
        </Button>
        <input id="media-upload" type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      </div>

      {items.length === 0 ? (
        <EmptyState title="No media files" description="Upload your first image to get started." icon={<ImageIcon className="h-12 w-12" />} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <Card key={item.fullPath} className="overflow-hidden group">
              <div className="relative aspect-square">
                <Image src={item.url} alt={item.name} fill className="object-cover" sizes="200px" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => copyUrl(item.url)} className="h-8 w-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white cursor-pointer" title="Copy URL">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button onClick={() => { setDeleteItem(item); setDeleteDialogOpen(true); }} className="h-8 w-8 rounded-full bg-red-500/90 text-white flex items-center justify-center hover:bg-red-500 cursor-pointer" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-2">
                <p className="text-xs font-medium text-text-primary truncate">{item.name}</p>
                <p className="text-xs text-text-muted">{formatFileSize(item.size)}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => { setDeleteDialogOpen(false); setDeleteItem(null); }}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete File"
        description={`Are you sure you want to delete "${deleteItem?.name}"?`}
      />
    </div>
  );
}

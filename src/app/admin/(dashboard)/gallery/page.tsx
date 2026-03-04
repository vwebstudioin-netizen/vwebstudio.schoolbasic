"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc, serverTimestamp, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { FormField } from "@/components/admin/FormField";
import type { GalleryAlbum } from "@/types";

export default function GalleryAdminPage() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryAlbum | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("campus");

  const fetchData = async () => {
    try {
      const snap = await getDocs(query(collection(db, "gallery"), orderBy("createdAt", "desc")));
      setAlbums(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as GalleryAlbum));
    } catch { toast.error("Failed to load"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => {
    setEditing(null); setTitle(""); setDescription(""); setCoverImage(""); setCategory("campus");
    setDialogOpen(true);
  };

  const openEdit = (a: GalleryAlbum) => {
    setEditing(a); setTitle(a.title); setDescription(a.description); setCoverImage(a.coverImage); setCategory(a.category);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!title) { toast.error("Title is required"); return; }
    setSaving(true);
    try {
      const data = { title, description, coverImage, category, updatedAt: serverTimestamp() };
      if (editing) {
        await updateDoc(doc(db, "gallery", editing.id), data);
        toast.success("Album updated");
      } else {
        await addDoc(collection(db, "gallery"), { ...data, images: [], createdAt: serverTimestamp() });
        toast.success("Album created");
      }
      setDialogOpen(false);
      fetchData();
    } catch { toast.error("Failed to save"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setSaving(true);
    try {
      await deleteDoc(doc(db, "gallery", deleteId));
      toast.success("Album deleted");
      setDeleteDialogOpen(false);
      fetchData();
    } catch { toast.error("Failed to delete"); }
    finally { setSaving(false); }
  };

  const columns: Column<GalleryAlbum>[] = [
    { key: "title", header: "Album", render: (a) => <span className="font-medium">{a.title}</span> },
    { key: "category", header: "Category", render: (a) => <span className="capitalize">{a.category}</span> },
    { key: "images", header: "Photos", render: (a) => a.images?.length || 0 },
    {
      key: "actions", header: "Actions", className: "w-24",
      render: (a) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => openEdit(a)}><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" onClick={() => { setDeleteId(a.id); setDeleteDialogOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Gallery</h1>
          <p className="text-text-secondary">Manage photo albums and images</p>
        </div>
        <Button onClick={openCreate}><Plus className="mr-2 h-4 w-4" />New Album</Button>
      </div>

      <DataTable columns={columns} data={albums} keyExtractor={(a) => a.id} emptyMessage="No albums yet" />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogHeader><DialogTitle>{editing ? "Edit" : "New"} Album</DialogTitle></DialogHeader>
        <div className="space-y-4 p-1">
          <FormField label="Title" name="title" required>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormField>
          <FormField label="Description" name="description">
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </FormField>
          <FormField label="Cover Image" name="coverImage">
            <ImageUploader value={coverImage} onChange={setCoverImage} folder="gallery" />
          </FormField>
          <FormField label="Category" name="category">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border border-border-primary bg-surface-primary px-3 py-2 text-sm">
              {["campus", "events", "sports", "cultural", "classroom", "other"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </FormField>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
        </DialogFooter>
      </Dialog>

      <DeleteConfirmDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}

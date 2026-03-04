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
import { StatusBadge } from "@/components/admin/StatusBadge";
import { FormField } from "@/components/admin/FormField";
import type { Announcement } from "@/types";

const categories = ["general", "academic", "admissions", "sports", "cultural", "urgent"] as const;

export default function AnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState<string>("general");
  const [isPinned, setIsPinned] = useState(false);

  const fetchData = async () => {
    try {
      const snap = await getDocs(query(collection(db, "announcements"), orderBy("publishDate", "desc")));
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Announcement));
    } catch { toast.error("Failed to load"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => {
    setEditing(null); setTitle(""); setContent(""); setExcerpt(""); setCategory("general"); setIsPinned(false);
    setDialogOpen(true);
  };

  const openEdit = (item: Announcement) => {
    setEditing(item); setTitle(item.title); setContent(item.content); setExcerpt(item.excerpt);
    setCategory(item.category); setIsPinned(item.isPinned);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!title) { toast.error("Title is required"); return; }
    setSaving(true);
    try {
      const data = { title, content, excerpt, category, isPinned, isActive: true, updatedAt: serverTimestamp() };
      if (editing) {
        await updateDoc(doc(db, "announcements", editing.id), data);
        toast.success("Updated");
      } else {
        await addDoc(collection(db, "announcements"), { ...data, publishDate: serverTimestamp(), createdAt: serverTimestamp(), createdBy: "admin" });
        toast.success("Created");
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
      await deleteDoc(doc(db, "announcements", deleteId));
      toast.success("Deleted");
      setDeleteDialogOpen(false);
      fetchData();
    } catch { toast.error("Failed to delete"); }
    finally { setSaving(false); }
  };

  const columns: Column<Announcement>[] = [
    { key: "title", header: "Title", render: (a) => <span className="font-medium">{a.title}</span> },
    { key: "category", header: "Category", render: (a) => <StatusBadge status={a.category} /> },
    { key: "isPinned", header: "Pinned", render: (a) => a.isPinned ? "📌" : "—" },
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
          <h1 className="text-2xl font-bold text-text-primary">Announcements</h1>
          <p className="text-text-secondary">Manage school announcements and notices</p>
        </div>
        <Button onClick={openCreate}><Plus className="mr-2 h-4 w-4" />Add</Button>
      </div>

      <DataTable columns={columns} data={items} keyExtractor={(a) => a.id} emptyMessage="No announcements" />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogHeader><DialogTitle>{editing ? "Edit" : "New"} Announcement</DialogTitle></DialogHeader>
        <div className="space-y-4 p-1">
          <FormField label="Title" name="title" required>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormField>
          <FormField label="Excerpt" name="excerpt">
            <Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Brief summary" />
          </FormField>
          <FormField label="Content" name="content">
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={4} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Category" name="category">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border border-border-primary bg-surface-primary px-3 py-2 text-sm">
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Pinned" name="isPinned">
              <label className="flex items-center gap-2 mt-1">
                <input type="checkbox" checked={isPinned} onChange={(e) => setIsPinned(e.target.checked)} className="rounded" />
                <span className="text-sm">Pin to top</span>
              </label>
            </FormField>
          </div>
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

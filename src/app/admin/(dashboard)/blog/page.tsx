"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc, serverTimestamp, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { TiptapEditor } from "@/components/admin/TiptapEditor";
import { FormField } from "@/components/admin/FormField";
import { slugify } from "@/lib/utils";
import type { Post } from "@/types";

const postCategories = ["News", "Academic", "Sports", "Cultural", "Achievement", "General"];

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("News");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  const fetchData = async () => {
    try {
      const snap = await getDocs(query(collection(db, "posts"), orderBy("createdAt", "desc")));
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Post));
    } catch { toast.error("Failed to load posts"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => {
    setEditing(null); setTitle(""); setContent(""); setExcerpt(""); setCoverImage(""); setCategory("News"); setStatus("draft");
    setDialogOpen(true);
  };

  const openEdit = (post: Post) => {
    setEditing(post); setTitle(post.title); setContent(post.content); setExcerpt(post.excerpt);
    setCoverImage(post.coverImage); setCategory(post.category); setStatus(post.status as "draft" | "published");
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!title) { toast.error("Title is required"); return; }
    setSaving(true);
    try {
      const slug = slugify(title);
      const data = {
        title, slug, content, excerpt, coverImage, category, status,
        tags: [], author: { name: "Admin", avatarUrl: "" },
        updatedAt: serverTimestamp(),
        ...(status === "published" ? { publishedAt: serverTimestamp() } : {}),
      };
      if (editing) {
        await updateDoc(doc(db, "posts", editing.id), data);
        toast.success("Post updated");
      } else {
        await addDoc(collection(db, "posts"), {
          ...data, createdAt: serverTimestamp(), viewCount: 0, isFeatured: false,
        });
        toast.success("Post created");
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
      await deleteDoc(doc(db, "posts", deleteId));
      toast.success("Post deleted");
      setDeleteDialogOpen(false);
      fetchData();
    } catch { toast.error("Failed to delete"); }
    finally { setSaving(false); }
  };

  const columns: Column<Post>[] = [
    { key: "title", header: "Title", render: (p) => <span className="font-medium">{p.title}</span> },
    { key: "category", header: "Category", render: (p) => p.category },
    { key: "status", header: "Status", render: (p) => <StatusBadge status={p.status} /> },
    {
      key: "actions", header: "Actions", className: "w-24",
      render: (p) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" onClick={() => { setDeleteId(p.id); setDeleteDialogOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Blog Posts</h1>
          <p className="text-text-secondary">Create and manage blog articles</p>
        </div>
        <Button onClick={openCreate}><Plus className="mr-2 h-4 w-4" />New Post</Button>
      </div>

      <DataTable columns={columns} data={posts} keyExtractor={(p) => p.id} emptyMessage="No posts yet" />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="max-w-3xl">
        <DialogHeader><DialogTitle>{editing ? "Edit" : "New"} Post</DialogTitle></DialogHeader>
        <div className="space-y-4 p-1 max-h-[70vh] overflow-y-auto">
          <FormField label="Title" name="title" required>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" />
          </FormField>
          <FormField label="Excerpt" name="excerpt">
            <Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Brief summary" />
          </FormField>
          <FormField label="Cover Image" name="coverImage">
            <ImageUploader value={coverImage} onChange={setCoverImage} folder="blog" />
          </FormField>
          <FormField label="Content" name="content">
            <TiptapEditor content={content} onChange={setContent} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Category" name="category">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border border-border-primary bg-surface-primary px-3 py-2 text-sm">
                {postCategories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Status" name="status">
              <select value={status} onChange={(e) => setStatus(e.target.value as "draft" | "published")} className="w-full rounded-lg border border-border-primary bg-surface-primary px-3 py-2 text-sm">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
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

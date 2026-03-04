"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc, serverTimestamp, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { FormField } from "@/components/admin/FormField";
import type { HeroSlide } from "@/types";

export default function HeroSlidesPage() {
  const { user } = useAuth();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaLink, setCtaLink] = useState("");
  const [order, setOrder] = useState(0);

  const fetchSlides = async () => {
    try {
      const snap = await getDocs(query(collection(db, "heroSlides"), orderBy("order", "asc")));
      setSlides(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as HeroSlide));
    } catch (err) {
      toast.error("Failed to load slides");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSlides(); }, []);

  const openCreate = () => {
    setEditingSlide(null);
    setTitle(""); setSubtitle(""); setImageUrl(""); setCtaText(""); setCtaLink(""); setOrder(slides.length);
    setDialogOpen(true);
  };

  const openEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setTitle(slide.title); setSubtitle(slide.subtitle || ""); setImageUrl(slide.imageUrl);
    setCtaText(slide.ctaText || ""); setCtaLink(slide.ctaLink || ""); setOrder(slide.order);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!title || !imageUrl) { toast.error("Title and image are required"); return; }
    setSaving(true);
    try {
      const data = {
        title, subtitle, imageUrl, ctaText, ctaLink, order, isActive: true, updatedAt: serverTimestamp(),
      };
      if (editingSlide) {
        await updateDoc(doc(db, "heroSlides", editingSlide.id), data);
        toast.success("Slide updated");
      } else {
        await addDoc(collection(db, "heroSlides"), { ...data, createdAt: serverTimestamp() });
        toast.success("Slide created");
      }
      setDialogOpen(false);
      fetchSlides();
    } catch { toast.error("Failed to save"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setSaving(true);
    try {
      await deleteDoc(doc(db, "heroSlides", deleteId));
      toast.success("Slide deleted");
      setDeleteDialogOpen(false);
      fetchSlides();
    } catch { toast.error("Failed to delete"); }
    finally { setSaving(false); }
  };

  const columns: Column<HeroSlide>[] = [
    { key: "order", header: "#", render: (s) => s.order + 1, className: "w-12" },
    { key: "title", header: "Title", render: (s) => <span className="font-medium">{s.title}</span> },
    { key: "subtitle", header: "Subtitle", render: (s) => <span className="text-text-secondary text-sm">{s.subtitle || "—"}</span> },
    {
      key: "actions", header: "Actions", className: "w-24",
      render: (s) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => openEdit(s)}><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" onClick={() => { setDeleteId(s.id); setDeleteDialogOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Hero Slides</h1>
          <p className="text-text-secondary">Manage homepage hero slider images</p>
        </div>
        <Button onClick={openCreate}><Plus className="mr-2 h-4 w-4" />Add Slide</Button>
      </div>

      <DataTable columns={columns} data={slides} keyExtractor={(s) => s.id} emptyMessage="No hero slides yet" />

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogHeader>
          <DialogTitle>{editingSlide ? "Edit Slide" : "New Slide"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-1">
          <FormField label="Title" name="title" required>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Slide title" />
          </FormField>
          <FormField label="Subtitle" name="subtitle">
            <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Optional subtitle" />
          </FormField>
          <FormField label="Image" name="image" required>
            <ImageUploader value={imageUrl} onChange={setImageUrl} folder="hero-slides" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="CTA Text" name="ctaText">
              <Input value={ctaText} onChange={(e) => setCtaText(e.target.value)} placeholder="Learn More" />
            </FormField>
            <FormField label="CTA Link" name="ctaLink">
              <Input value={ctaLink} onChange={(e) => setCtaLink(e.target.value)} placeholder="/about" />
            </FormField>
          </div>
          <FormField label="Order" name="order">
            <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
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

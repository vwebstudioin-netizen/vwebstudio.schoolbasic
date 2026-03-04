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
import { slugify, formatDate } from "@/lib/utils";
import type { SchoolEvent } from "@/types";

const eventCategories = ["academic", "sports", "cultural", "pta", "holiday", "exam", "other"] as const;

export default function EventsAdminPage() {
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editing, setEditing] = useState<SchoolEvent | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState<string>("academic");
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = async () => {
    try {
      const snap = await getDocs(query(collection(db, "events"), orderBy("startDate", "desc")));
      setEvents(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as SchoolEvent));
    } catch { toast.error("Failed to load events"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => {
    setEditing(null); setTitle(""); setDescription(""); setExcerpt(""); setCoverImage("");
    setCategory("academic"); setVenue(""); setStartDate(""); setEndDate("");
    setDialogOpen(true);
  };

  const openEdit = (e: SchoolEvent) => {
    setEditing(e); setTitle(e.title); setDescription(e.description); setExcerpt(e.excerpt);
    setCoverImage(e.coverImage); setCategory(e.category); setVenue(e.venue);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!title) { toast.error("Title is required"); return; }
    setSaving(true);
    try {
      const slug = slugify(title);
      const data = {
        title, slug, description, excerpt, coverImage, category, venue,
        isActive: true, isAllDay: false, startTime: "", endTime: "",
        gallery: [], updatedAt: serverTimestamp(),
      };
      if (editing) {
        await updateDoc(doc(db, "events", editing.id), data);
        toast.success("Event updated");
      } else {
        await addDoc(collection(db, "events"), {
          ...data,
          startDate: startDate ? new Date(startDate) : serverTimestamp(),
          endDate: endDate ? new Date(endDate) : serverTimestamp(),
          createdAt: serverTimestamp(), createdBy: "admin",
        });
        toast.success("Event created");
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
      await deleteDoc(doc(db, "events", deleteId));
      toast.success("Event deleted");
      setDeleteDialogOpen(false);
      fetchData();
    } catch { toast.error("Failed to delete"); }
    finally { setSaving(false); }
  };

  const columns: Column<SchoolEvent>[] = [
    { key: "title", header: "Title", render: (e) => <span className="font-medium">{e.title}</span> },
    { key: "category", header: "Category", render: (e) => <span className="capitalize">{e.category}</span> },
    { key: "venue", header: "Venue", render: (e) => e.venue || "—" },
    {
      key: "actions", header: "Actions", className: "w-24",
      render: (e) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => openEdit(e)}><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" onClick={() => { setDeleteId(e.id); setDeleteDialogOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Events</h1>
          <p className="text-text-secondary">Manage school events and activities</p>
        </div>
        <Button onClick={openCreate}><Plus className="mr-2 h-4 w-4" />New Event</Button>
      </div>

      <DataTable columns={columns} data={events} keyExtractor={(e) => e.id} emptyMessage="No events yet" />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogHeader><DialogTitle>{editing ? "Edit" : "New"} Event</DialogTitle></DialogHeader>
        <div className="space-y-4 p-1 max-h-[70vh] overflow-y-auto">
          <FormField label="Title" name="title" required>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormField>
          <FormField label="Excerpt" name="excerpt">
            <Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
          </FormField>
          <FormField label="Description" name="description">
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
          </FormField>
          <FormField label="Cover Image" name="coverImage">
            <ImageUploader value={coverImage} onChange={setCoverImage} folder="events" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Category" name="category">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border border-border-primary bg-surface-primary px-3 py-2 text-sm">
                {eventCategories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Venue" name="venue">
              <Input value={venue} onChange={(e) => setVenue(e.target.value)} />
            </FormField>
          </div>
          {!editing && (
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Start Date" name="startDate">
                <Input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </FormField>
              <FormField label="End Date" name="endDate">
                <Input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </FormField>
            </div>
          )}
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

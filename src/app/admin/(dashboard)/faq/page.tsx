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
import { FormField } from "@/components/admin/FormField";
import type { FAQ } from "@/types";

const faqCategories = ["general", "admissions", "academics", "fees", "transport", "other"];

export default function FAQAdminPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("general");
  const [order, setOrder] = useState(0);

  const fetchData = async () => {
    try {
      const snap = await getDocs(query(collection(db, "faqs"), orderBy("order", "asc")));
      setFaqs(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as FAQ));
    } catch { toast.error("Failed to load FAQs"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreate = () => {
    setEditing(null); setQuestion(""); setAnswer(""); setCategory("general"); setOrder(faqs.length);
    setDialogOpen(true);
  };

  const openEdit = (f: FAQ) => {
    setEditing(f); setQuestion(f.question); setAnswer(f.answer); setCategory(f.category); setOrder(f.order);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!question || !answer) { toast.error("Question and answer are required"); return; }
    setSaving(true);
    try {
      const data = { question, answer, category, order, isActive: true, updatedAt: serverTimestamp() };
      if (editing) {
        await updateDoc(doc(db, "faqs", editing.id), data);
        toast.success("FAQ updated");
      } else {
        await addDoc(collection(db, "faqs"), { ...data, createdAt: serverTimestamp() });
        toast.success("FAQ created");
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
      await deleteDoc(doc(db, "faqs", deleteId));
      toast.success("FAQ deleted");
      setDeleteDialogOpen(false);
      fetchData();
    } catch { toast.error("Failed to delete"); }
    finally { setSaving(false); }
  };

  const columns: Column<FAQ>[] = [
    { key: "order", header: "#", render: (f) => f.order + 1, className: "w-12" },
    { key: "question", header: "Question", render: (f) => <span className="font-medium">{f.question}</span> },
    { key: "category", header: "Category", render: (f) => <span className="capitalize">{f.category}</span> },
    {
      key: "actions", header: "Actions", className: "w-24",
      render: (f) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => openEdit(f)}><Edit className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" onClick={() => { setDeleteId(f.id); setDeleteDialogOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">FAQ</h1>
          <p className="text-text-secondary">Manage frequently asked questions</p>
        </div>
        <Button onClick={openCreate}><Plus className="mr-2 h-4 w-4" />Add FAQ</Button>
      </div>

      <DataTable columns={columns} data={faqs} keyExtractor={(f) => f.id} emptyMessage="No FAQs yet" />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogHeader><DialogTitle>{editing ? "Edit" : "New"} FAQ</DialogTitle></DialogHeader>
        <div className="space-y-4 p-1">
          <FormField label="Question" name="question" required>
            <Input value={question} onChange={(e) => setQuestion(e.target.value)} />
          </FormField>
          <FormField label="Answer" name="answer" required>
            <Textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={4} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Category" name="category">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border border-border-primary bg-surface-primary px-3 py-2 text-sm">
                {faqCategories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Order" name="order">
              <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
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

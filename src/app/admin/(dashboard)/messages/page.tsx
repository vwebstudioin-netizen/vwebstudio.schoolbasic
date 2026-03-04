"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc, serverTimestamp, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { Eye, Trash2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDate } from "@/lib/utils";
import type { ContactSubmission } from "@/types";

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewing, setViewing] = useState<ContactSubmission | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const snap = await getDocs(query(collection(db, "contactSubmissions"), orderBy("createdAt", "desc")));
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as ContactSubmission));
    } catch { toast.error("Failed to load messages"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleView = async (msg: ContactSubmission) => {
    setViewing(msg);
    setViewDialogOpen(true);
    // Mark as read
    if (msg.status === "new") {
      try {
        await updateDoc(doc(db, "contactSubmissions", msg.id), { status: "read", updatedAt: serverTimestamp() });
        fetchData();
      } catch { /* silent */ }
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setSaving(true);
    try {
      await deleteDoc(doc(db, "contactSubmissions", deleteId));
      toast.success("Message deleted");
      setDeleteDialogOpen(false);
      fetchData();
    } catch { toast.error("Failed to delete"); }
    finally { setSaving(false); }
  };

  const columns: Column<ContactSubmission>[] = [
    { key: "name", header: "Name", render: (m) => <span className="font-medium">{m.name}</span> },
    { key: "email", header: "Email", render: (m) => m.email },
    { key: "subject", header: "Subject", render: (m) => m.subject },
    { key: "status", header: "Status", render: (m) => <StatusBadge status={m.status} /> },
    {
      key: "createdAt", header: "Date",
      render: (m) => {
        const date = m.createdAt?.toDate?.() ?? new Date();
        return <span className="text-sm text-text-muted">{formatDate(date)}</span>;
      },
    },
    {
      key: "actions", header: "Actions", className: "w-24",
      render: (m) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => handleView(m)}><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" onClick={() => { setDeleteId(m.id); setDeleteDialogOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Messages</h1>
        <p className="text-text-secondary">Contact form submissions from visitors</p>
      </div>

      <DataTable columns={columns} data={messages} keyExtractor={(m) => m.id} emptyMessage="No messages yet" />

      {/* View dialog */}
      {viewing && (
        <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)}>
          <DialogHeader><DialogTitle>Message from {viewing.name}</DialogTitle></DialogHeader>
          <div className="space-y-3 p-1">
            <div><span className="text-sm font-medium text-text-secondary">Email:</span> <span className="text-sm">{viewing.email}</span></div>
            {viewing.phone && <div><span className="text-sm font-medium text-text-secondary">Phone:</span> <span className="text-sm">{viewing.phone}</span></div>}
            <div><span className="text-sm font-medium text-text-secondary">Subject:</span> <span className="text-sm">{viewing.subject}</span></div>
            <div>
              <span className="text-sm font-medium text-text-secondary">Message:</span>
              <p className="mt-1 text-sm text-text-primary whitespace-pre-wrap bg-surface-secondary rounded-lg p-3">{viewing.message}</p>
            </div>
          </div>
          <DialogFooter>
            <a href={`mailto:${viewing.email}?subject=Re: ${viewing.subject}`}>
              <Button><Mail className="mr-2 h-4 w-4" />Reply</Button>
            </a>
          </DialogFooter>
        </Dialog>
      )}

      <DeleteConfirmDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={handleDelete} loading={saving} />
    </div>
  );
}

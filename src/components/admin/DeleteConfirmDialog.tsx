"use client";

import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  loading?: boolean;
}

export function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Delete Item",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  loading,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/30">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </div>
        </div>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onConfirm} disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

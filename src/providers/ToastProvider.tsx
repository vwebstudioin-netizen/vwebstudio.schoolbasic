"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "var(--color-surface)",
          color: "var(--color-text-primary)",
          border: "1px solid var(--color-border)",
        },
      }}
      richColors
      closeButton
    />
  );
}

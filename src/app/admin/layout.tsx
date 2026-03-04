"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminProtected } from "@/components/admin/AdminProtected";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AdminProtected>
      <div className="flex h-screen overflow-hidden bg-surface-secondary">
        {/* Sidebar — hidden on mobile, visible on lg+ */}
        <div className="hidden lg:block">
          <AdminSidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
          />
        </div>

        {/* Main content */}
        <div
          className={cn(
            "flex flex-1 flex-col overflow-hidden transition-all duration-300",
            collapsed ? "lg:ml-16" : "lg:ml-60"
          )}
        >
          <AdminTopbar onMenuToggle={() => setCollapsed(!collapsed)} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </AdminProtected>
  );
}

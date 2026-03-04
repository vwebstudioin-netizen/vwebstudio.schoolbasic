"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export function AdminProtected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}

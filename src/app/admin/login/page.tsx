"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (!loading && user) {
      router.replace("/admin");
    }
  }, [user, loading, router]);

  const onSubmit = async (data: LoginData) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, data.email, data.password);
      const idToken = await cred.user.getIdToken();

      // Verify with server and set session cookie
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) throw new Error("Verification failed");

      toast.success("Welcome back!");
      router.push("/admin");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Login failed";
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-secondary px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <p className="text-sm text-text-secondary">
            Sign in to access the admin dashboard
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-text-primary"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@school.com"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-text-primary"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password")}
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

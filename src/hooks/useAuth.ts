"use client";

import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  type User,
} from "firebase/auth";
import { auth, hasValidConfig } from "@/lib/firebase";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!hasValidConfig) {
      setState({ user: null, loading: false, error: null });
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState({ user, loading: false, error: null });
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Get ID token and verify with server to set session cookie
      const idToken = await result.user.getIdToken();
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Authentication failed. You may not have admin access.");
      }

      setState({ user: result.user, loading: false, error: null });
      return result.user;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Login failed";
      setState((prev) => ({ ...prev, loading: false, error: message }));
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      // Clear session cookie
      await fetch("/api/admin/verify", { method: "DELETE" });
      setState({ user: null, loading: false, error: null });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Sign out failed";
      setState((prev) => ({ ...prev, error: message }));
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Password reset failed";
      throw new Error(message);
    }
  };

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    signIn,
    signOut,
    resetPassword,
  };
}

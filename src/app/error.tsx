"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-text-primary">
        Something went wrong
      </h1>
      <p className="mt-2 text-text-secondary max-w-md">
        An unexpected error has occurred. Please try again.
      </p>
      <Button onClick={reset} className="mt-6">
        Try Again
      </Button>
    </div>
  );
}

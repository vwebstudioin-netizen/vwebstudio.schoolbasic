import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-bold text-primary-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-text-primary">
        Page Not Found
      </h2>
      <p className="mt-2 text-text-secondary max-w-md">
        The page you are looking for might have been moved, deleted, or doesn&apos;t exist.
      </p>
      <Link href="/" className="mt-6">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}

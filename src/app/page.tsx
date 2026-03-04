// Root page.tsx takes priority over (public)/page.tsx for the "/" route.
// We render the public layout (Navbar + Footer) + homepage directly here.
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { BackToTop } from "@/components/public/BackToTop";
import HomePage from "./(public)/page";

export const dynamic = "force-dynamic";

export default function RootPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HomePage />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BlogCard } from "@/components/public/BlogCard";
import { SectionHeading } from "@/components/public/SectionHeading";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/shared/EmptyState";
import { generateMetadata as genMeta } from "@/components/shared/SEOHead";
import type { Post } from "@/types";

export const dynamic = "force-dynamic";

export const metadata = genMeta({
  title: "Blog",
  description: "Read the latest news, updates, and stories from our school.",
  canonical: "/blog",
});

async function getPosts() {
  try {
    const snap = await getDocs(
      query(
        collection(db, "posts"),
        where("status", "==", "published"),
        orderBy("publishedAt", "desc")
      )
    );
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Post[];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <Breadcrumb
            items={[{ label: "Blog" }]}
            className="justify-center mb-6 [&_a]:text-white/70 [&_span]:text-white [&_svg]:text-white/50"
          />
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            School Blog
          </h1>
          <p className="mt-3 text-white/80 text-lg max-w-2xl mx-auto">
            News, updates, and stories from our vibrant school community.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <EmptyState
              title="No posts yet"
              description="Check back soon for exciting updates and stories."
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, idx) => (
                <ScrollReveal key={post.id} delay={idx * 0.05}>
                  <BlogCard post={post} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

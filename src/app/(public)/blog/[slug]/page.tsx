import { collection, getDocs, query, where } from "firebase/firestore";
import { notFound } from "next/navigation";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { generateMetadata as genMeta } from "@/components/shared/SEOHead";
import type { Post } from "@/types";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  try {
    const snap = await getDocs(
      query(collection(db, "posts"), where("slug", "==", slug), where("status", "==", "published"))
    );
    if (snap.empty) return null;
    return { id: snap.docs[0].id, ...snap.docs[0].data() } as Post;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return genMeta({ title: "Post Not Found" });
  return genMeta({
    title: post.title,
    description: post.excerpt,
    ogImage: post.coverImage,
    canonical: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const publishDate = post.publishedAt?.toDate?.() ?? new Date();

  return (
    <article>
      {/* Hero */}
      {post.coverImage && (
        <div className="relative h-64 sm:h-80 lg:h-96">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
          className="mb-6"
        />

        <header className="mb-8">
          {post.category && (
            <Badge variant="default" className="mb-3">
              {post.category}
            </Badge>
          )}
          <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-text-muted">
            <span>{formatDate(publishDate)}</span>
            <span>·</span>
            <span>{calculateReadingTime(post.content)} min read</span>
            {post.author?.name && (
              <>
                <span>·</span>
                <span>By {post.author.name}</span>
              </>
            )}
          </div>
        </header>

        {/* Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}

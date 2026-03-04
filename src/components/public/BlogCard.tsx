import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { cn, formatDate, calculateReadingTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Post } from "@/types";

interface BlogCardProps {
  post: Post;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  const publishDate = post.publishedAt?.toDate?.() ?? new Date(post.publishedAt as unknown as string);

  return (
    <Card hover className={cn("overflow-hidden group", className)}>
      <Link href={`/blog/${post.slug}`}>
        {post.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <CardContent className="p-4">
          <div className="flex items-center gap-3 text-xs text-text-muted mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(publishDate)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {calculateReadingTime(post.content)} min read
            </span>
          </div>

          {post.category && (
            <Badge variant="default" className="mb-2">
              {post.category}
            </Badge>
          )}

          <h3 className="font-semibold text-text-primary line-clamp-2 group-hover:text-primary-600 transition-colors">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-1.5 text-sm text-text-secondary line-clamp-2">
              {post.excerpt}
            </p>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}

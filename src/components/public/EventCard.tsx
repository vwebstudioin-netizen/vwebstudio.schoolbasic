import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { SchoolEvent } from "@/types";

interface EventCardProps {
  event: SchoolEvent;
  className?: string;
}

export function EventCard({ event, className }: EventCardProps) {
  const eventDate = event.startDate?.toDate?.() ?? new Date(event.startDate as unknown as string);
  const endDate = event.endDate?.toDate?.() ?? new Date(event.endDate as unknown as string);
  const now = new Date();
  const status = now < eventDate ? "upcoming" : now <= endDate ? "ongoing" : "past";

  return (
    <Card hover className={cn("overflow-hidden", className)}>
      <Link href={`/events/${event.id}`}>
        {event.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Badge
              variant={
                status === "upcoming"
                  ? "info"
                  : status === "ongoing"
                  ? "success"
                  : "default"
              }
              className="absolute top-3 right-3"
            >
              {status}
            </Badge>
          </div>
        )}

        <CardContent className="p-4">
          <div className="flex items-center gap-3 text-xs text-text-muted mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(eventDate)}
            </span>
            {event.venue && (
              <span className="flex items-center gap-1">📍 {event.venue}</span>
            )}
          </div>

          <h3 className="font-semibold text-text-primary line-clamp-2 group-hover:text-primary-600 transition-colors">
            {event.title}
          </h3>

          {event.excerpt && (
            <p className="mt-1.5 text-sm text-text-secondary line-clamp-2">
              {event.excerpt}
            </p>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}

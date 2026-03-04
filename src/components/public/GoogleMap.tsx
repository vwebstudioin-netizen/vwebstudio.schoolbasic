import { cn } from "@/lib/utils";

interface GoogleMapProps {
  className?: string;
}

export function GoogleMap({ className }: GoogleMapProps) {
  const embedUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL;

  if (!embedUrl) {
    return (
      <div
        className={cn(
          "flex h-64 items-center justify-center rounded-lg bg-surface-secondary text-text-muted text-sm",
          className
        )}
      >
        Map not configured
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-lg", className)}>
      <iframe
        src={embedUrl}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="School Location"
      />
    </div>
  );
}

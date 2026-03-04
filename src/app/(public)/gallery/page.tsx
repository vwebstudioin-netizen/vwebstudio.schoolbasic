import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { GalleryGrid } from "@/components/public/GalleryGrid";
import { SectionHeading } from "@/components/public/SectionHeading";
import { ScrollReveal } from "@/components/public/ScrollReveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/shared/EmptyState";
import { generateMetadata as genMeta } from "@/components/shared/SEOHead";
import type { GalleryAlbum } from "@/types";

export const dynamic = "force-dynamic";

export const metadata = genMeta({
  title: "Gallery",
  description: "Explore photos from school events, campus life, and activities.",
  canonical: "/gallery",
});

async function getAlbums() {
  try {
    const snap = await getDocs(
      query(collection(db, "gallery"), orderBy("createdAt", "desc"))
    );
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as GalleryAlbum[];
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return [];
  }
}

export default async function GalleryPage() {
  const albums = await getAlbums();
  const allImages = albums.flatMap((album) =>
    album.images.map((img) => ({ ...img, albumTitle: album.title }))
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <Breadcrumb
            items={[{ label: "Gallery" }]}
            className="justify-center mb-6 [&_a]:text-white/70 [&_span]:text-white [&_svg]:text-white/50"
          />
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Photo Gallery
          </h1>
          <p className="mt-3 text-white/80 text-lg max-w-2xl mx-auto">
            Capturing memories and moments from our vibrant school life.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {allImages.length === 0 ? (
            <EmptyState
              title="No photos yet"
              description="Our gallery is being updated. Check back soon!"
            />
          ) : (
            <>
              {albums.map((album) => (
                <div key={album.id} className="mb-12 last:mb-0">
                  <ScrollReveal>
                    <SectionHeading
                      title={album.title}
                      subtitle={album.description}
                    />
                  </ScrollReveal>
                  <GalleryGrid images={album.images} />
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
}

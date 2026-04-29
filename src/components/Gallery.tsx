import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight, ZoomIn, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LOCAL_IMAGES, Category, GalleryImage } from "@/data/galleryData";

const CATEGORIES: Category[] = ["All", "Ambience", "Food", "Drinks"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      // Fetch remote images and hidden assets in parallel
      const [remoteRes, hiddenRes] = await Promise.all([
        supabase.from("gallery").select("*").order("created_at", { ascending: false }),
        supabase.from("hidden_assets").select("asset_id")
      ]);

      if (remoteRes.error) throw remoteRes.error;
      
      const hiddenIds = new Set((hiddenRes.data || []).map(h => h.asset_id));
      
      const remoteData = (remoteRes.data || []).map((img: any) => ({
        id: img.id,
        image_url: img.image_url,
        caption: img.caption || "",
        category: (img.category as Category) || "All"
      }));
      
      // Combine local images with remote ones, filtering out hidden local ones
      const visibleLocal = LOCAL_IMAGES.filter(img => !hiddenIds.has(img.id));
      setImages([...remoteData, ...visibleLocal]);
    } catch (err) {
      console.error("Error fetching gallery images:", err);
      // Fallback to local images if remote fails
      setImages(LOCAL_IMAGES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filtered.length : 0
    );
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filtered.length) % filtered.length : 0
    );
  }, [filtered.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, goNext, goPrev]);

  return (
    <section id="gallery" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14 animate-fade-in space-y-4">
          <Badge
            variant="outline"
            className="text-primary border-primary/30 bg-primary/5 uppercase tracking-widest text-[10px] font-bold px-3"
          >
            Our Gallery
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            A Glimpse Into Our World
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From vibrant murals to steaming chai — explore the flavors and soul
            of Corbett Culture Brew.
          </p>
        </div>

        <div
          className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-in"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                  : "bg-background text-foreground border-border hover:border-primary/50 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading && images.length === 0 ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20 text-lg">
            No images in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 animate-fade-in bg-muted"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-square w-full relative overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.caption}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3">
                  <p className="text-white font-semibold text-xs sm:text-sm leading-snug drop-shadow">
                    {image.caption}
                  </p>
                  <span className="flex items-center gap-1 mt-1 text-white/70 text-[10px] font-medium">
                    <ZoomIn className="w-3 h-3" />
                    Tap to enlarge
                  </span>
                </div>

                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block bg-primary/90 text-primary-foreground text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                    {image.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={lightboxIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border border-white/10 shadow-2xl overflow-hidden rounded-2xl">
          {lightboxIndex !== null && filtered[lightboxIndex] && (
            <div className="flex flex-col items-center">
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative w-full">
                <img
                  src={filtered[lightboxIndex].image_url}
                  alt={filtered[lightboxIndex].caption}
                  className="w-full max-h-[72vh] object-contain block"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4">
                  <p className="text-white font-semibold text-sm sm:text-base text-center">
                    {filtered[lightboxIndex].caption}
                  </p>
                  <p className="text-white/50 text-xs text-center mt-1">
                    {lightboxIndex + 1} / {filtered.length}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 py-4">
                <button
                  onClick={goPrev}
                  className="bg-white/10 hover:bg-primary text-white hover:text-primary-foreground rounded-full p-3 transition-all duration-200 hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goNext}
                  className="bg-white/10 hover:bg-primary text-white hover:text-primary-foreground rounded-full p-3 transition-all duration-200 hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;

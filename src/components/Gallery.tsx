import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// All local assets
import cafeInteriorImg    from "@/assets/cafe-interior.jpg";
import owlMuralImg        from "@/assets/gallery-owl.png";
import deerMuralImg       from "@/assets/gallery-deer.png";
import exteriorImg        from "@/assets/gallery-exterior.png";
import foodDish1Img       from "@/assets/gallery-food-1.png";
import foodDish2Img       from "@/assets/gallery-food-2.png";
import samosaImg          from "@/assets/samosa.jpg";
import gulabJamunImg      from "@/assets/gulab-jamun.jpg";
import biryaniImg         from "@/assets/biryani.jpg";
import cappuccinoImg      from "@/assets/cappuccino.jpg";
import masalaChaiImg      from "@/assets/masala-chai.jpg";
import masalaDosaImg      from "@/assets/masala-dosa.jpg";
import paneerImg          from "@/assets/paneer-butter-masala.jpg";
import smoothieImg        from "@/assets/smoothie.jpg";

type Category = "All" | "Ambience" | "Food" | "Drinks";

const galleryImages: { url: string; caption: string; category: Category }[] = [
  { url: exteriorImg,     caption: "Corbett Culture — Signature Exterior Mural", category: "Ambience" },
  { url: owlMuralImg,     caption: "Majestic Owl Mural — Nature's Guardian",     category: "Ambience" },
  { url: deerMuralImg,    caption: "Forest Deer Mural — Gentle & Wild",          category: "Ambience" },
  { url: cafeInteriorImg, caption: "Cozy Café Interior",                         category: "Ambience" },
  { url: foodDish1Img,    caption: "Signature Creamy Delicacy",                  category: "Food"     },
  { url: foodDish2Img,    caption: "Authentic Spicy Sensation",                  category: "Food"     },
  { url: biryaniImg,      caption: "Fragrant Dum Biryani",                       category: "Food"     },
  { url: gulabJamunImg,   caption: "Melt-in-Mouth Gulab Jamun",                 category: "Food"     },
  { url: samosaImg,       caption: "Crispy Golden Samosa",                       category: "Food"     },
  { url: masalaDosaImg,   caption: "Classic Masala Dosa",                        category: "Food"     },
  { url: paneerImg,       caption: "Rich Paneer Butter Masala",                  category: "Food"     },
  { url: cappuccinoImg,   caption: "Artisan Cappuccino",                         category: "Drinks"   },
  { url: masalaChaiImg,   caption: "Spiced Masala Chai",                         category: "Drinks"   },
  { url: smoothieImg,     caption: "Fresh Tropical Smoothie",                    category: "Drinks"   },
];

const CATEGORIES: Category[] = ["All", "Ambience", "Food", "Drinks"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

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
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
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

        {/* Category Filter */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
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

        {/* Image Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20 text-lg">
            No images in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((image, index) => (
              <div
                key={`${activeCategory}-${index}`}
                className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 animate-fade-in bg-muted"
                style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-square w-full relative overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Hover overlay with caption */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3">
                  <p className="text-white font-semibold text-xs sm:text-sm leading-snug drop-shadow">
                    {image.caption}
                  </p>
                  <span className="flex items-center gap-1 mt-1 text-white/70 text-[10px] font-medium">
                    <ZoomIn className="w-3 h-3" />
                    Tap to enlarge
                  </span>
                </div>

                {/* Category chip */}
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

      {/* Lightbox */}
      <Dialog open={lightboxIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border border-white/10 shadow-2xl overflow-hidden rounded-2xl">
          {lightboxIndex !== null && (
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
                  src={filtered[lightboxIndex].url}
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

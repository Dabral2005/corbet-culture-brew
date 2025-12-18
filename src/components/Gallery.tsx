import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import cafeInteriorImg from "@/assets/cafe-interior.jpg";
import cappuccinoImg from "@/assets/cappuccino.jpg";
import chaiImg from "@/assets/masala-chai.jpg";
import paneerImg from "@/assets/paneer-butter-masala.jpg";
import dosaImg from "@/assets/masala-dosa.jpg";
import samosaImg from "@/assets/samosa.jpg";
import gulabJamunImg from "@/assets/gulab-jamun.jpg";
import biryaniImg from "@/assets/biryani.jpg";

interface GalleryImage {
  id: string;
  image_url: string;
  caption: string | null;
}

const defaultImages = [
  { url: cafeInteriorImg, caption: "Our cozy café interior" },
  { url: cappuccinoImg, caption: "Fresh coffee being brewed" },
  { url: chaiImg, caption: "Traditional masala chai" },
  { url: paneerImg, caption: "Delicious homemade curries" },
  { url: dosaImg, caption: "Authentic South Indian" },
  { url: samosaImg, caption: "Golden crispy samosas" },
  { url: gulabJamunImg, caption: "Sweet delights" },
  { url: biryaniImg, caption: "Fragrant biryani" },
];

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    const { data } = await supabase.from("gallery").select("*");
    if (data) {
      setImages(data);
    }
  };

  const displayImages = images.length > 0 
    ? images.map(img => ({ url: img.image_url, caption: img.caption }))
    : defaultImages;

  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A glimpse into our world of flavors and atmosphere
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayImages.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer group animate-fade-in hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={image.caption || "Gallery image"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Gallery image"
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;

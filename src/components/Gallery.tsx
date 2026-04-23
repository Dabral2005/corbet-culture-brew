import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import cafeInteriorImg from "@/assets/cafe-interior.jpg";
import owlMuralImg from "@/assets/gallery-owl.png";
import deerMuralImg from "@/assets/gallery-deer.png";
import exteriorImg from "@/assets/gallery-exterior.png";
import foodDish1Img from "@/assets/gallery-food-1.png";
import foodDish2Img from "@/assets/gallery-food-2.png";
import samosaImg from "@/assets/samosa.jpg";
import gulabJamunImg from "@/assets/gulab-jamun.jpg";
import biryaniImg from "@/assets/biryani.jpg";

interface GalleryImage {
  id: string;
  image_url: string;
  caption: string | null;
}

const defaultImages = [
  { url: exteriorImg, caption: "Corbett Cultures Signature Mural" },
  { url: owlMuralImg, caption: "Our majestic Owl Mural" },
  { url: deerMuralImg, caption: "Beautiful Forest Deer Mural" },
  { url: foodDish1Img, caption: "Signature Creamy Delicacy" },
  { url: foodDish2Img, caption: "Authentic Spicy Sensation" },
  { url: cafeInteriorImg, caption: "Our cozy café interior" },
  { url: biryaniImg, caption: "Fragrant Biryani" },
  { url: gulabJamunImg, caption: "Sweet Delights" },
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

import cafeInteriorImg from "@/assets/cafe-interior.jpg";
import owlMuralImg from "@/assets/gallery-owl.png";
import deerMuralImg from "@/assets/gallery-deer.png";
import exteriorImg from "@/assets/gallery-exterior.png";
import foodDish1Img from "@/assets/gallery-food-1.png";
import foodDish2Img from "@/assets/gallery-food-2.png";
import samosaImg from "@/assets/samosa.jpg";
import gulabJamunImg from "@/assets/gulab-jamun.jpg";
import biryaniImg from "@/assets/biryani.jpg";
import cappuccinoImg from "@/assets/Cappuccino.jpg";
import masalaChaiImg from "@/assets/masala-chai.jpg";
import masalaDosaImg from "@/assets/masala-dosa.jpg";
import paneerImg from "@/assets/paneer-butter-masala.jpg";
import smoothieImg from "@/assets/smoothie.jpg";

export type Category = "All" | "Ambience" | "Food" | "Drinks";

export interface GalleryImage {
  id: string;
  image_url: string;
  caption: string;
  category: Category;
  display_order?: number;
  is_hidden?: boolean;
  isLocal?: boolean;
}

export const LOCAL_IMAGES: GalleryImage[] = [
  { id: "l1", image_url: exteriorImg, caption: "Signature Exterior Mural", category: "Ambience", isLocal: true },
  { id: "l2", image_url: owlMuralImg, caption: "Majestic Owl Mural", category: "Ambience", isLocal: true },
  { id: "l3", image_url: deerMuralImg, caption: "Forest Deer Mural", category: "Ambience", isLocal: true },
  { id: "l4", image_url: cafeInteriorImg, caption: "Cozy Café Interior", category: "Ambience", isLocal: true },
  { id: "l5", image_url: foodDish1Img, caption: "Signature Creamy Delicacy", category: "Food", isLocal: true },
  { id: "l6", image_url: foodDish2Img, caption: "Authentic Spicy Sensation", category: "Food", isLocal: true },
  { id: "l7", image_url: biryaniImg, caption: "Fragrant Dum Biryani", category: "Food", isLocal: true },
  { id: "l8", image_url: gulabJamunImg, caption: "Melt-in-Mouth Gulab Jamun", category: "Food", isLocal: true },
  { id: "l9", image_url: samosaImg, caption: "Crispy Golden Samosa", category: "Food", isLocal: true },
  { id: "l10", image_url: masalaDosaImg, caption: "Classic Masala Dosa", category: "Food", isLocal: true },
  { id: "l11", image_url: paneerImg, caption: "Rich Paneer Butter Masala", category: "Food", isLocal: true },
  { id: "l12", image_url: cappuccinoImg, caption: "Artisan Cappuccino", category: "Drinks", isLocal: true },
  { id: "l13", image_url: masalaChaiImg, caption: "Spiced Masala Chai", category: "Drinks", isLocal: true },
  { id: "l14", image_url: smoothieImg, caption: "Fresh Tropical Smoothie", category: "Drinks", isLocal: true },
];

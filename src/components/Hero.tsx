import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import BookingForm from "./BookingForm";
import heroImage from "@/assets/hero-coffee.jpg";
import { Utensils } from "lucide-react";

const Hero = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const scrollToMenu = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image — blurred & dimmed for text readability */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundAttachment: "fixed",
          filter: "blur(2px) brightness(0.55)",
        }}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/30" />

      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in pt-20">
        <Badge variant="outline" className="mb-6 px-4 py-1 text-white border-white/20 bg-white/10 uppercase tracking-[0.3em] text-[10px] font-black backdrop-blur-md">
          Est. 2024
        </Badge>
        <h1 className="text-6xl md:text-8xl font-black mb-8 text-white tracking-tighter drop-shadow-2xl">
          Brewed with <span className="text-primary italic">Soul</span>
        </h1>
        <p className="text-xl md:text-3xl mb-12 text-white/90 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-lg">
          Experience the finest Indian coffee and authentic gourmet delicacies in the heart of Kotdwara.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            onClick={scrollToMenu}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-8 text-xl rounded-2xl shadow-2xl shadow-primary/40 transition-all hover:scale-105 active:scale-95 group font-bold"
          >
            Explore Menu
            <Utensils className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setIsBookingOpen(true)}
            className="border-2 border-white/30 bg-white/5 backdrop-blur-md text-white px-10 py-8 text-xl rounded-2xl hover:bg-white hover:text-black transition-all hover:scale-105 active:scale-95 font-bold"
          >
            Book a Table
          </Button>
        </div>
      </div>

      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-md border-none shadow-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Reserve Your Table</DialogTitle>
          </DialogHeader>
          <BookingForm onSuccess={() => setIsBookingOpen(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;

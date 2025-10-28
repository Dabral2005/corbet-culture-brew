import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import BookingForm from "./BookingForm";
import heroImage from "@/assets/hero-coffee.jpg";

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
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/80" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
          Brewed with Love
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
          Serving premium Indian coffee and homemade delicacies in the heart of Kotdwara
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={scrollToMenu}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
          >
            View Menu
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setIsBookingOpen(true)}
            className="border-2 px-8 py-6 text-lg"
          >
            Book a Table
          </Button>
        </div>
      </div>

      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reserve Your Table</DialogTitle>
          </DialogHeader>
          <BookingForm onSuccess={() => setIsBookingOpen(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;

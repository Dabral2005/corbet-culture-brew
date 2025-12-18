import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  review: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    review: "Best café in Kotdwara! The masala chai and samosas are absolutely divine. The ambiance is so cozy and perfect for catching up with friends.",
    avatar: "PS"
  },
  {
    id: 2,
    name: "Rahul Kumar",
    rating: 5,
    review: "Love the coffee here! The cappuccino is perfectly brewed and the staff is very friendly. Highly recommend the paneer butter masala.",
    avatar: "RK"
  },
  {
    id: 3,
    name: "Anjali Verma",
    rating: 5,
    review: "A hidden gem in Uttarakhand! The food is authentic, prices are reasonable, and the atmosphere is warm and welcoming. My go-to place for breakfast.",
    avatar: "AV"
  },
  {
    id: 4,
    name: "Vikram Singh",
    rating: 5,
    review: "Excellent service and delicious food! The biryani and dosa are my favorites. Great place to relax and enjoy quality time.",
    avatar: "VS"
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover why people love Corbet Culture
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="overflow-hidden animate-fade-in">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-4">
                  {testimonials[currentIndex].avatar}
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-muted-foreground mb-6 italic max-w-2xl">
                  "{testimonials[currentIndex].review}"
                </p>
                <p className="font-semibold text-lg text-foreground">
                  {testimonials[currentIndex].name}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

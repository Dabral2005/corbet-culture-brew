import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { StarRating } from "./StarRating";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  avatar?: string;
  created_at: string;
}

const AddTestimonialForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("testimonials").insert({
        name,
        review,
        rating: Number(rating),
        avatar: name.substring(0, 2).toUpperCase() || "U",
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your testimonial has been submitted.",
      });
      onSuccess();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to submit testimonial",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input 
          id="name"
          required 
          placeholder="Your name"
          value={name} 
          onChange={e => setName(e.target.value)} 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="rating">Rating (1-5)</Label>
        <div className="flex items-center gap-4">
          <Input 
            id="rating"
            required 
            type="number" 
            min="1" 
            max="5" 
            step="0.1"
            value={rating} 
            onChange={e => setRating(parseFloat(e.target.value))} 
            className="w-24"
          />
          <StarRating rating={rating} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="review">Review</Label>
        <Textarea 
          id="review"
          required 
          placeholder="Share your experience..."
          value={review} 
          onChange={e => setReview(e.target.value)} 
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        Submit Testimonial
      </Button>
    </form>
  );
};

const Testimonials = () => {
  const [testimonialList, setTestimonialList] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonialList(data || []);
    } catch (err: any) {
      console.error("Error fetching testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || testimonialList.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialList.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonialList.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonialList.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonialList.length);
  };

  const handleSuccess = () => {
    setIsAddOpen(false);
    fetchTestimonials();
  };

  if (loading) {
    return (
      <section id="testimonials" className="py-20 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover why people love Corbett Cultures
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {testimonialList.length > 0 ? (
            <>
              <Card className="overflow-hidden animate-fade-in border-primary/10 shadow-xl">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary mb-6 shadow-inner">
                      {testimonialList[currentIndex]?.avatar || "U"}
                    </div>
                    <StarRating rating={testimonialList[currentIndex]?.rating || 5} size={24} className="mb-6" />
                    <p className="text-xl md:text-2xl text-foreground mb-8 italic leading-relaxed font-serif">
                      "{testimonialList[currentIndex]?.review}"
                    </p>
                    <p className="font-bold text-xl text-primary">
                      — {testimonialList[currentIndex]?.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(testimonialList[currentIndex]?.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center items-center gap-6 mt-10">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <div className="flex gap-2">
                  {testimonialList.slice(0, 10).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentIndex(index);
                      }}
                      className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                          ? "bg-primary w-10"
                          : "bg-primary/20 w-2.5"
                        }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground italic">Be the first to leave a testimonial!</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2 rounded-full px-8 shadow-lg hover:shadow-primary/20 transition-all">
                  <Plus className="w-5 h-5" /> Share Your Experience
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center">Leave a Testimonial</DialogTitle>
                </DialogHeader>
                <AddTestimonialForm onSuccess={handleSuccess} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

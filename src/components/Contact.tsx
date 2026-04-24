import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validatedData = contactSchema.parse(formData);

      const { error } = await supabase.from("contact_messages").insert([{
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
      }]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "We'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/918445640120", "_blank");
  };

  return (
    <section id="contact" className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-primary border-primary/20 bg-primary/5 uppercase tracking-widest text-xs font-bold">
            Stay Connected
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
            Get in <span className="text-primary italic">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you have a question about reservations or just want to say hi, we'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
             {[
                 { icon: MapPin, title: "Address", content: "Buddha Park, Giwai Srot, Kotdwar, pauri Garhwal, Uttarakhand 246149" },
                 { icon: Phone, title: "Phone", content: "+91 84456 40120" },
                 { icon: Mail, title: "Email", content: "mohitdabral780@gmail.com" },
                 { icon: Clock, title: "Hours", content: "Mon - Sun: 8:00 AM - 10:00 PM" }
               ].map((item, idx) => (
                <Card key={idx} className="animate-fade-in border-none shadow-sm hover:shadow-md transition-shadow cursor-default group" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-1">{item.title}</h3>
                      <p className="text-foreground font-medium">{item.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              onClick={openWhatsApp}
              className="w-full bg-success hover:bg-success/90 gap-2 h-14 rounded-xl text-lg shadow-lg shadow-success/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <MessageCircle className="w-6 h-6" />
              Chat on WhatsApp
            </Button>
          </div>

          <Card className="lg:col-span-2 animate-fade-in border-none shadow-xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>
            <CardContent className="p-8 md:p-12 relative">
              <h3 className="text-3xl font-bold mb-8">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name" className="text-xs uppercase font-bold tracking-widest text-muted-foreground ml-1">Your Name</Label>
                    <Input
                      id="contact-name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 bg-background border-border/50 focus:border-primary transition-all rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="text-xs uppercase font-bold tracking-widest text-muted-foreground ml-1">Email Address</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 bg-background border-border/50 focus:border-primary transition-all rounded-xl"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="text-xs uppercase font-bold tracking-widest text-muted-foreground ml-1">Message</Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell us what's on your mind..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-background border-border/50 focus:border-primary transition-all rounded-xl resize-none"
                    required
                    rows={6}
                  />
                </div>
                <Button type="submit" className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </span>
                  ) : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="mt-20 animate-fade-in relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border/50">
           <iframe
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3466.74!2d78.52380!3d29.74600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390923d1a1f6b0e5%3A0x6bcf4e2e2e2e2e2e!2sBuddha%20Park%2C%20Giwai%20Srot%2C%20Kotdwar%2C%20Pauri%20Garhwal%2C%20Uttarakhand%20246149!5e0!3m2!1sen!2sin!4v1714000000000!5m2!1sen!2sin"
             width="100%"
             height="500"
             style={{ border: 0 }}
             allowFullScreen
             loading="lazy"
             referrerPolicy="no-referrer-when-downgrade"
             title="Corbet Culture Café Location — Buddha Park, Giwai Srot, Kotdwar"
             className="grayscale hover:grayscale-0 transition-all duration-1000"
           />
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  avatar?: string;
  created_at: string | null;
}

interface TestimonialsTabProps {
  testimonials: Testimonial[];
  onDelete: (table: string, id: string) => void;
}

const getInitials = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return fullName.substring(0, 2).toUpperCase();
};

const TestimonialsTab = ({ testimonials, onDelete }: TestimonialsTabProps) => {
  return (
    <Card className="bg-zinc-900/40 border-white/5 shadow-2xl backdrop-blur-sm hover:border-primary/20 transition-all duration-500">
      <CardHeader>
        <CardTitle className="text-white">Customer Testimonials</CardTitle>
        <CardDescription className="text-zinc-400">Manage and moderate user feedback</CardDescription>
      </CardHeader>
      <CardContent>
        {testimonials.length === 0 ? (
          <p className="text-center py-8 text-zinc-500">No testimonials yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <Card key={t.id} className="bg-white/5 border-white/5 shadow-lg hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] group">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary border border-primary/20 overflow-hidden">
                        {t.avatar?.startsWith('http') ? (
                          <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                        ) : (
                          getInitials(t.avatar || t.name || "User")
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-white group-hover:text-primary transition-colors">{t.name}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-primary/10 text-primary border-primary/20 font-bold px-2 py-0 text-[10px]">★ {t.rating}</Badge>
                          <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">
                            {t.created_at ? new Date(t.created_at).toLocaleDateString() : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-colors" onClick={() => onDelete("testimonials", t.id)}>
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                  <p className="text-zinc-300 leading-relaxed italic font-medium border-l-2 border-primary/30 pl-4 py-1">"{t.review}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestimonialsTab;

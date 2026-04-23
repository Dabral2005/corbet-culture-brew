import { Badge } from "@/components/ui/badge";
import cafeInteriorImg from "@/assets/cafe-interior.jpg";

const About = () => {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 uppercase tracking-widest text-[10px] font-bold px-3">
                Our Story
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                About Corbet Culture
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6 py-2">
              At Corbet Culture, every sip is a celebration of comfort and
              craftsmanship. We brew with locally sourced beans and bake with
              love, bringing authentic flavors of India to your table.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Located in the heart of Kotdwara, Uttarakhand, our café is more
              than just a place to grab a coffee. It's a community hub where
              friends meet, families gather, and memories are made over cups of
              chai and plates of delicious homemade food.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative p-6 bg-background rounded-xl border border-border shadow-sm group-hover:border-primary/20 transition-all duration-300">
                  <div className="text-4xl font-black text-primary mb-1">100+</div>
                  <div className="text-xs uppercase font-bold text-muted-foreground tracking-widest">
                    Gourmet Items
                  </div>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative p-6 bg-background rounded-xl border border-border shadow-sm group-hover:border-primary/20 transition-all duration-300">
                  <div className="text-4xl font-black text-primary mb-1">5+</div>
                  <div className="text-xs uppercase font-bold text-muted-foreground tracking-widest">
                    Years of Love
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-border/50">
              <img
                src={cafeInteriorImg}
                alt="Café Interior"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <p className="text-white font-medium italic text-lg line-clamp-2">
                  "The perfect spot to unwind and enjoy the simple pleasures of life."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

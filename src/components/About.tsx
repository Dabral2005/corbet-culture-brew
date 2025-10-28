import cafeInteriorImg from "@/assets/cafe-interior.jpg";

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <img
              src={cafeInteriorImg}
              alt="Corbet Culture Café Interior"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div className="animate-fade-in space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              About Corbet Culture
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
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
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Menu Items
                </div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-3xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Years Serving
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Leaf, Flame } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import cappuccinoImg from "@/assets/cappuccino.jpg";
import chaiImg from "@/assets/masala-chai.jpg";
import paneerImg from "@/assets/paneer-butter-masala.jpg";
import dosaImg from "@/assets/masala-dosa.jpg";
import samosaImg from "@/assets/samosa.jpg";
import gulabJamunImg from "@/assets/gulab-jamun.jpg";
import biryaniImg from "@/assets/biryani.jpg";
import smoothieImg from "@/assets/smoothie.jpg";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_veg: boolean;
  is_spicy: boolean;
}

const imageMap: Record<string, string> = {
  "Classic Cappuccino": cappuccinoImg,
  "Masala Chai": chaiImg,
  "Paneer Butter Masala": paneerImg,
  "Masala Dosa": dosaImg,
  "Samosa (2 pcs)": samosaImg,
  "Gulab Jamun": gulabJamunImg,
  "Veg Biryani": biryaniImg,
  "Green Smoothie": smoothieImg,
  "Berry Blast Smoothie": smoothieImg,
};

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [displayedItems, setDisplayedItems] = useState<MenuItem[]>([]);
  const [itemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCount, setFilteredCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVeg, setFilterVeg] = useState(false);
  const [filterSpicy, setFilterSpicy] = useState(false);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterVeg, filterSpicy]);

  useEffect(() => {
    filterAndDisplayItems();
  }, [menuItems, currentPage, searchQuery, filterVeg, filterSpicy]);

  const fetchMenuItems = async () => {
    const { data, error } = await supabase.from("menu").select("*");
    if (data && !error) {
      setMenuItems(data);
    }
  };

  const filterAndDisplayItems = () => {
    let filtered = menuItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesVeg = !filterVeg || item.is_veg;
      const matchesSpicy = !filterSpicy || item.is_spicy;
      return matchesSearch && matchesVeg && matchesSpicy;
    });

    const itemsToShow = currentPage * itemsPerPage;
    setDisplayedItems(filtered.slice(0, itemsToShow));
    setFilteredCount(filtered.length);
  };

  return (
    <section id="menu" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Our Menu
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover authentic Indian flavors and premium coffee
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              variant={filterVeg ? "default" : "outline"}
              onClick={() => setFilterVeg(!filterVeg)}
              className="gap-2"
            >
              <Leaf className="h-4 w-4" />
              Veg Only
            </Button>
            <Button
              variant={filterSpicy ? "default" : "outline"}
              onClick={() => setFilterSpicy(!filterSpicy)}
              className="gap-2"
            >
              <Flame className="h-4 w-4" />
              Spicy
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {displayedItems.map((item, index) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={imageMap[item.name] || item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <div className="flex gap-1">
                    {item.is_veg && (
                      <Badge variant="outline" className="bg-success/10">
                        <Leaf className="h-3 w-3" />
                      </Badge>
                    )}
                    {item.is_spicy && (
                      <Badge variant="outline" className="bg-destructive/10">
                        <Flame className="h-3 w-3" />
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary">
                    ₹{item.price}
                  </span>
                  <Button size="sm">Order Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {displayedItems.length < filteredCount && (
          <div className="text-center">
            <Button 
              size="lg" 
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="min-w-[200px]"
            >
              Load More Items ({filteredCount - displayedItems.length} remaining)
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;

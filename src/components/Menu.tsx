import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Leaf, Flame, Utensils } from "lucide-react";
import { menuData, MenuItem } from "@/data/menuData";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVeg, setFilterVeg] = useState(false);
  const [filterSpicy, setFilterSpicy] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory, searchQuery, filterVeg, filterSpicy]);

  const categories = ["All", ...Array.from(new Set(menuData.map(item => item.category)))];

  const getFilteredItems = () => {
    return menuData.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = !filterVeg || item.is_veg;
      const matchesSpicy = !filterSpicy || item.is_spicy;
      return matchesCategory && matchesSearch && matchesVeg && matchesSpicy;
    });
  };

  const filteredItems = getFilteredItems();

  return (
    <section id="menu" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-primary border-primary/20 bg-primary/5 uppercase tracking-widest text-xs font-bold">
            Gourmet Experience
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
            Our <span className="text-primary italic">Signature</span> Menu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From traditional Indian delicacies to international favorites, discover a world of flavors crafted with the finest ingredients.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-12 space-y-8">
          {/* Search and Filters */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-background rounded-lg shadow-sm border border-border overflow-hidden">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search by dish or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-lg border-none focus-visible:ring-1 focus-visible:ring-primary/30"
                />
              </div>
            </div>

            <div className="flex gap-4 items-center justify-end">
              <Button
                variant={filterVeg ? "default" : "outline"}
                onClick={() => setFilterVeg(!filterVeg)}
                className={`gap-2 rounded-full px-6 transition-all duration-300 ${filterVeg ? 'bg-success hover:bg-success/90 text-success-foreground border-success shadow-md shadow-success/20' : 'hover:border-success/50 hover:text-success'}`}
              >
                <Leaf className={`h-4 w-4 ${filterVeg ? 'fill-white' : ''}`} />
                Vegetarian
              </Button>
              <Button
                variant={filterSpicy ? "default" : "outline"}
                onClick={() => setFilterSpicy(!filterSpicy)}
                className={`gap-2 rounded-full px-6 transition-all duration-300 ${filterSpicy ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground border-destructive shadow-md shadow-destructive/20' : 'hover:border-destructive/50 hover:text-destructive'}`}
              >
                <Flame className={`h-4 w-4 ${filterSpicy ? 'fill-white' : ''}`} />
                Spicy
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs defaultValue="All" onValueChange={setActiveCategory} className="w-full">
            <div className="relative">
              <TabsList className="w-full h-auto flex flex-wrap justify-center p-2 bg-background/50 backdrop-blur-sm border border-border border-b-2 gap-2 mb-8 sticky top-20 z-10 shadow-sm">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg hover:bg-muted hover:scale-105 active:scale-95"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]">
              {filteredItems.slice(0, visibleCount).map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group/card ring-1 ring-border/50 animate-fade-in"
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary/20">
                          <Utensils className="h-12 w-12" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        {item.is_veg && (
                          <Badge className="bg-success hover:bg-success/90 text-success-foreground border-none shadow-sm px-2">Veg</Badge>
                        )}
                        {item.is_spicy && (
                          <Badge className="bg-destructive hover:bg-destructive/90 text-destructive-foreground border-none shadow-sm px-2">Spicy</Badge>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-2">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-primary/60">{item.category}</span>
                        <h4 className="font-bold text-xl group-hover/card:text-primary transition-colors leading-tight">
                          {item.name}
                        </h4>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-6 min-h-[2.5rem]">
                        {item.description || "A chef's special preparation using the finest seasonal ingredients."}
                      </p>

                      <div className="flex justify-between items-center mt-auto border-t border-border/50 pt-4">
                        <span className="text-2xl font-bold text-primary">₹{item.price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredItems.length === 0 && (
                <div className="col-span-full py-20 text-center flex flex-col items-center gap-4">
                  <div className="p-4 bg-muted rounded-full">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold">No items found</h5>
                    <p className="text-muted-foreground">Try adjusting your search or filters</p>
                  </div>
                </div>
              )}
            </div>
            
            {visibleCount < filteredItems.length && (
              <div className="mt-12 flex justify-center animate-fade-in">
                <Button 
                  onClick={() => setVisibleCount(prev => prev + 12)}
                  variant="outline"
                  className="rounded-full px-8 py-6 text-lg shadow-sm hover:shadow-md transition-all"
                >
                  Load More
                </Button>
              </div>
            )}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Menu;

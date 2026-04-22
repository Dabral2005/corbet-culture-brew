import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Leaf, Flame, Utensils } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { menuData, MenuItem } from "@/data/menuData";

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(menuData);
  const [displayedItems, setDisplayedItems] = useState<MenuItem[]>([]);
  const [itemsPerPage] = useState(12);
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
    if (data && !error && data.length > 0) {
      // Merge unique items from Supabase or replace if desired. 
      // For now, we prioritize the local menuData but allow DB additions.
      const dbIds = new Set(data.map(i => i.id));
      const combined = [...menuData, ...data.filter(i => !dbIds.has(i.id))];
      setMenuItems(combined);
    }
  };

  const filterAndDisplayItems = () => {
    let filtered = menuItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) || 
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = !filterVeg || item.is_veg;
      const matchesSpicy = !filterSpicy || item.is_spicy;
      return matchesSearch && matchesVeg && matchesSpicy;
    });

    const itemsToShow = currentPage * itemsPerPage;
    setDisplayedItems(filtered.slice(0, itemsToShow));
    setFilteredCount(filtered.length);
  };

  // Group items by category in the order they appear in menuData
  const categories = Array.from(new Set(menuData.map(item => item.category)));
  
  const groupedItems = categories.reduce((acc, category) => {
    const itemsInCategory = displayedItems.filter(item => item.category === category);
    if (itemsInCategory.length > 0) {
      acc[category] = itemsInCategory;
    }
    return acc;
  }, {} as Record<string, MenuItem[]>);

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

        <div className="mb-12 space-y-6 max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-background rounded-lg shadow-sm border border-border">
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

          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              variant={filterVeg ? "default" : "outline"}
              onClick={() => setFilterVeg(!filterVeg)}
              className={`gap-2 rounded-full px-6 transition-all duration-300 ${filterVeg ? 'bg-success hover:bg-success/90 border-success shadow-md shadow-success/20' : 'hover:border-success/50 hover:text-success'}`}
            >
              <Leaf className={`h-4 w-4 ${filterVeg ? 'fill-white' : ''}`} />
              Vegetarian
            </Button>
            <Button
              variant={filterSpicy ? "default" : "outline"}
              onClick={() => setFilterSpicy(!filterSpicy)}
              className={`gap-2 rounded-full px-6 transition-all duration-300 ${filterSpicy ? 'bg-destructive hover:bg-destructive/90 border-destructive shadow-md shadow-destructive/20' : 'hover:border-destructive/50 hover:text-destructive'}`}
            >
              <Flame className={`h-4 w-4 ${filterSpicy ? 'fill-white' : ''}`} />
              Spicy Selection
            </Button>
          </div>
        </div>

        <div className="space-y-16 mb-12">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="animate-fade-in group">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-10 w-1 bg-primary rounded-full group-hover:h-12 transition-all duration-300"></div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
                  {category}
                  <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                    {items.length} Items
                  </span>
                </h3>
                <div className="flex-1 h-[1px] bg-border group-hover:bg-primary/20 transition-colors"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group/card ring-1 ring-border/50"
                  >
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-xl group-hover/card:text-primary transition-colors leading-tight">
                            {item.name}
                          </h4>
                          <div className="flex gap-1.5 ml-2">
                            {item.is_veg && (
                              <Badge variant="outline" className="bg-success/5 text-success border-success/20 p-1 rounded-full" title="Vegetarian">
                                <Leaf className="h-3.5 w-3.5 fill-success/20" />
                              </Badge>
                            )}
                            {item.is_spicy && (
                              <Badge variant="outline" className="bg-destructive/5 text-destructive border-destructive/20 p-1 rounded-full" title="Spicy">
                                <Flame className="h-3.5 w-3.5 fill-destructive/20" />
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-6 min-h-[2.5rem]">
                          {item.description || "A chef's special preparation using the finest seasonal ingredients."}
                        </p>
                        
                        <div className="flex justify-between items-center mt-auto border-t border-border/50 pt-4">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground uppercase font-semibold">Price</span>
                            <span className="text-2xl font-bold text-primary">
                              ₹{item.price}
                            </span>
                          </div>
                          <Button size="sm" className="rounded-full px-5 group/btn">
                            Order 
                            <Utensils className="ml-2 h-4 w-4 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {displayedItems.length < filteredCount && (
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="min-w-[240px] rounded-full shadow-lg hover:shadow-primary/20 transition-all gap-2"
            >
              Load More Delicacies ({filteredCount - displayedItems.length} remaining)
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;

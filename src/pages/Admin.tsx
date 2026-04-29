import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, LogOut, Plus, Trash2, Image as ImageIcon, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LOCAL_IMAGES, GalleryImage } from "@/data/galleryData";

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [bookings, setBookings] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [hiddenAssetIds, setHiddenAssetIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  // Gallery Upload State
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newImage, setNewImage] = useState({
    file: null as File | null,
    caption: "",
    category: "Ambience" as "Ambience" | "Food" | "Drinks"
  });

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/auth");
    }
  }, [isAdmin, authLoading, navigate]);

  const fetchData = useCallback(async () => {
    if (!isAdmin) return;
    
    setLoading(true);
    try {
      const [bookingsRes, messagesRes, subscribersRes, testimonialsRes, galleryRes, hiddenRes] = await Promise.all([
        supabase.from("bookings").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
        supabase.from("subscribers").select("*").order("created_at", { ascending: false }),
        supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
        supabase.from("gallery").select("*").order("created_at", { ascending: false }),
        supabase.from("hidden_assets").select("asset_id"),
      ]);

      if (bookingsRes.error) throw bookingsRes.error;
      if (messagesRes.error) throw messagesRes.error;
      if (subscribersRes.error) throw subscribersRes.error;
      if (testimonialsRes.error) throw testimonialsRes.error;
      if (galleryRes.error) throw galleryRes.error;

      setBookings(bookingsRes.data || []);
      setMessages(messagesRes.data || []);
      setSubscribers(subscribersRes.data || []);
      setTestimonials(testimonialsRes.data || []);
      setGallery(galleryRes.data || []);
      setHiddenAssetIds(new Set((hiddenRes.data || []).map(h => h.asset_id)));
    } catch (err: any) {
      console.error("Fetch error:", err);
      toast({
        title: "Database Error",
        description: err.message || "Could not load data. Make sure you ran the SQL migrations.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [isAdmin, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin, fetchData]);

  const handleApprove = async (id: string, email: string, name: string, date: string, time: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "approved" })
        .eq("id", id);

      if (error) throw error;
      
      toast({
        title: "Booking Approved",
        description: `Notification would be sent to ${email}`,
      });
      fetchData();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const handleDecline = async (id: string, email: string, name: string, date: string, time: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "declined" })
        .eq("id", id);

      if (error) throw error;
      
      toast({
        title: "Booking Declined",
        description: `Notification would be sent to ${email}`,
        variant: "destructive",
      });
      fetchData();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (table: string, id: string) => {
    try {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Deleted", description: "Item removed successfully" });
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const toggleAssetVisibility = async (id: string, isHidden: boolean) => {
    try {
      if (isHidden) {
        // Unhide
        await supabase.from("hidden_assets").delete().eq("asset_id", id);
        toast({ title: "Image Restored", description: "Local image is now visible to visitors." });
      } else {
        // Hide
        await supabase.from("hidden_assets").insert({ asset_id: id });
        toast({ title: "Image Hidden", description: "Local image is now hidden from visitors." });
      }
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleGalleryUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.file) return;

    setUploading(true);
    try {
      const file = newImage.file;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase.from('gallery').insert({
        image_url: publicUrl,
        caption: newImage.caption,
        category: newImage.category
      });

      if (insertError) throw insertError;

      toast({ title: "Success", description: "Image uploaded to gallery!" });
      setUploadOpen(false);
      setNewImage({ file: null, caption: "", category: "Ambience" });
      fetchData();
    } catch (err: any) {
      toast({ title: "Upload Failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  // Combine remote and local images for management
  const allGalleryItems = [...gallery, ...LOCAL_IMAGES];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-white tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground font-medium mt-1">Welcome back, <span className="text-primary">{user?.email}</span></p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => fetchData()} variant="outline" className="border-white/10 text-white hover:bg-white/5">
              Refresh Data
            </Button>
            <Button onClick={handleSignOut} variant="outline" className="border-white/10 text-white hover:bg-white/5">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <Tabs defaultValue="bookings" className="space-y-8">
          <TabsList className="bg-zinc-900/50 backdrop-blur-md p-1.5 rounded-xl border border-white/5 shadow-2xl overflow-x-auto max-w-full justify-start md:justify-center">
            <TabsTrigger value="bookings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">Bookings ({bookings.length})</TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">Messages ({messages.length})</TabsTrigger>
            <TabsTrigger value="subscribers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">Subscribers ({subscribers.length})</TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">Gallery ({allGalleryItems.length})</TabsTrigger>
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">Testimonials ({testimonials.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card className="bg-zinc-900/40 border-white/5 shadow-2xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Recent Bookings</CardTitle>
                <CardDescription className="text-zinc-400">Manage your table reservations</CardDescription>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-center py-8 text-zinc-500">No bookings yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent border-white/5">
                          <TableHead className="text-zinc-400 font-bold uppercase text-[11px] tracking-wider">Name</TableHead>
                          <TableHead className="text-zinc-400 font-bold uppercase text-[11px] tracking-wider">Email</TableHead>
                          <TableHead className="text-zinc-400 font-bold uppercase text-[11px] tracking-wider">Phone</TableHead>
                          <TableHead className="text-zinc-400 font-bold uppercase text-[11px] tracking-wider">Date</TableHead>
                          <TableHead className="text-zinc-400 font-bold uppercase text-[11px] tracking-wider">Time</TableHead>
                          <TableHead className="text-zinc-400 font-bold uppercase text-[11px] tracking-wider">Guests</TableHead>
                          <TableHead className="text-zinc-400 font-bold uppercase text-[11px] tracking-wider text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking.id} className="border-white/5 hover:bg-white/5 transition-colors">
                            <TableCell className="font-medium text-white">{booking.name}</TableCell>
                            <TableCell className="text-zinc-300">{booking.email}</TableCell>
                            <TableCell className="text-zinc-300">{booking.phone}</TableCell>
                            <TableCell className="text-zinc-300">{new Date(booking.date).toLocaleDateString()}</TableCell>
                            <TableCell className="text-zinc-300">{booking.time}</TableCell>
                            <TableCell className="text-primary font-bold">{booking.guests}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                {booking.status === "approved" ? (
                                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-bold">Approved</Badge>
                                ) : booking.status === "declined" ? (
                                  <Badge variant="destructive" className="font-bold">Declined</Badge>
                                ) : (
                                  <>
                                    <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold" onClick={() => handleApprove(booking.id, booking.email, booking.name, booking.date, booking.time)}>
                                      Approve
                                    </Button>
                                    <Button variant="outline" size="sm" className="border-white/10 text-zinc-400 hover:bg-white/5" onClick={() => handleDecline(booking.id, booking.email, booking.name, booking.date, booking.time)}>
                                      Decline
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card className="bg-zinc-900/40 border-white/5 shadow-2xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Contact Messages</CardTitle>
                <CardDescription className="text-zinc-400">Direct inquiries from customers</CardDescription>
              </CardHeader>
              <CardContent>
                {messages.length === 0 ? (
                  <p className="text-center py-8 text-zinc-500">No messages yet</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {messages.map((message) => (
                      <Card key={message.id} className="bg-white/5 border-white/5 shadow-lg hover:border-primary/30 transition-all">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl font-bold text-white">{message.name}</CardTitle>
                              <CardDescription className="text-primary font-medium">{message.email}</CardDescription>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10"
                              onClick={() => handleDelete("contact_messages", message.id)}
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-zinc-300 leading-relaxed italic font-medium">"{message.message}"</p>
                          <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider mt-4">
                            {new Date(message.created_at).toLocaleString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscribers">
            <Card className="bg-zinc-900/40 border-white/5 shadow-2xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Newsletter Subscribers</CardTitle>
                <CardDescription className="text-zinc-400">Email list for marketing campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                {subscribers.length === 0 ? (
                  <p className="text-center py-8 text-zinc-500">No subscribers yet</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-white/5">
                        <TableHead className="text-zinc-400 font-bold uppercase text-[11px] tracking-wider">Email</TableHead>
                        <TableHead className="text-zinc-400 font-bold uppercase text-[11px] tracking-wider">Subscribed At</TableHead>
                        <TableHead className="text-zinc-400 font-bold uppercase text-[11px] tracking-wider text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscribers.map((subscriber) => (
                        <TableRow key={subscriber.id} className="border-white/5 hover:bg-white/5 transition-colors">
                          <TableCell className="font-semibold text-white">{subscriber.email}</TableCell>
                          <TableCell className="text-zinc-400">
                            {new Date(subscriber.created_at).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10"
                              onClick={() => handleDelete("subscribers", subscriber.id)}
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <Card className="bg-zinc-900/40 border-white/5 shadow-2xl backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">Gallery Management</CardTitle>
                    <CardDescription className="text-zinc-400">Upload and organize images in your gallery</CardDescription>
                  </div>
                  <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2 bg-primary text-primary-foreground font-bold">
                        <Plus className="w-4 h-4" /> Add Image
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-900 border-white/10 text-white">
                      <DialogHeader>
                        <DialogTitle>Upload New Image</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleGalleryUpload} className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label className="text-zinc-300">Image File</Label>
                          <Input 
                            type="file" 
                            accept="image/*" 
                            required 
                            className="bg-black/50 border-white/10"
                            onChange={(e) => setNewImage(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-zinc-300">Caption</Label>
                          <Input 
                            placeholder="Image caption..." 
                            required 
                            className="bg-black/50 border-white/10"
                            value={newImage.caption} 
                            onChange={(e) => setNewImage(prev => ({ ...prev, caption: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-zinc-300">Category</Label>
                          <select 
                            className="w-full bg-black/50 border border-white/10 rounded-md p-2 text-white"
                            value={newImage.category}
                            onChange={(e) => setNewImage(prev => ({ ...prev, category: e.target.value as any }))}
                          >
                            <option value="Ambience">Ambience</option>
                            <option value="Food">Food</option>
                            <option value="Drinks">Drinks</option>
                          </select>
                        </div>
                        <Button type="submit" className="w-full bg-primary text-primary-foreground font-bold" disabled={uploading}>
                          {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                          {uploading ? "Uploading..." : "Upload to Gallery"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {allGalleryItems.length === 0 ? (
                  <p className="text-center py-8 text-zinc-500">No images uploaded yet.</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {allGalleryItems.map((image) => (
                      <div key={image.id} className={`group relative aspect-square rounded-xl overflow-hidden border border-white/5 shadow-lg ${image.isLocal && hiddenAssetIds.has(image.id) ? 'opacity-40 grayscale' : ''}`}>
                        <img 
                          src={image.image_url} 
                          alt={image.caption} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                          <div className="flex justify-between items-start">
                            <Badge className="w-fit bg-primary text-primary-foreground font-bold text-[10px]">{image.category}</Badge>
                            {image.isLocal && (
                              <Badge variant="outline" className="bg-white/10 text-white border-white/20 text-[9px]">LOCAL ASSET</Badge>
                            )}
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-white text-xs font-medium truncate pr-2">{image.caption}</p>
                            <div className="flex gap-1">
                              {image.isLocal ? (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-7 w-7 text-white hover:bg-primary/20"
                                  title={hiddenAssetIds.has(image.id) ? "Restore Asset" : "Hide Asset"}
                                  onClick={() => toggleAssetVisibility(image.id, hiddenAssetIds.has(image.id))}
                                >
                                  {hiddenAssetIds.has(image.id) ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </Button>
                              ) : (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-7 w-7 text-white hover:bg-red-500 hover:text-white"
                                  onClick={() => handleDelete("gallery", image.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials">
            <Card className="bg-zinc-900/40 border-white/5 shadow-2xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Testimonials Management</CardTitle>
                <CardDescription className="text-zinc-400">Review and manage user-submitted testimonials</CardDescription>
              </CardHeader>
              <CardContent>
                {testimonials.length === 0 ? (
                  <p className="text-center py-8 text-zinc-500">No testimonials available.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((t) => (
                      <Card key={t.id} className="bg-white/5 border-white/5 shadow-lg hover:border-primary/30 transition-all">
                        <CardContent className="p-5 flex justify-between items-start gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <p className="font-bold text-xl text-white">{t.name}</p>
                              <Badge className="bg-primary/10 text-primary border-primary/20 font-bold px-2 py-0">
                                ★ {t.rating}
                              </Badge>
                            </div>
                            <p className="text-zinc-300 font-medium italic leading-relaxed">"{t.review}"</p>
                            <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider">
                              {new Date(t.created_at).toLocaleString()}
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10 shrink-0"
                            onClick={() => handleDelete("testimonials", t.id)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

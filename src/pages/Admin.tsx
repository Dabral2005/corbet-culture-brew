import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, LogOut, Plus, Trash2, Image as ImageIcon, Eye, EyeOff, Edit2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LOCAL_IMAGES, GalleryImage, Category } from "@/data/galleryData";

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [bookings, setBookings] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [assetOverrides, setAssetOverrides] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  // Gallery Management State
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newImage, setNewImage] = useState({
    file: null as File | null,
    caption: "",
    category: "Ambience" as Category
  });

  // Edit State
  const [editOpen, setEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryImage | null>(null);
  const [editForm, setEditForm] = useState({
    caption: "",
    category: "Ambience" as Category,
    display_order: 0
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
      const [bookingsRes, messagesRes, subscribersRes, testimonialsRes, galleryRes, overridesRes] = await Promise.all([
        supabase.from("bookings").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
        supabase.from("subscribers").select("*").order("created_at", { ascending: false }),
        supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
        supabase.from("gallery").select("*").order("display_order", { ascending: true }),
        supabase.from("asset_overrides").select("*"),
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
      
      const remoteGallery = (galleryRes.data || []).map(img => ({
        ...img,
        isLocal: false
      }));
      setGallery(remoteGallery);

      const overridesMap = (overridesRes.data || []).reduce((acc: any, curr: any) => {
        acc[curr.asset_id] = curr;
        return acc;
      }, {});
      setAssetOverrides(overridesMap);
    } catch (err: any) {
      console.error("Fetch error:", err);
      toast({
        title: "Database Error",
        description: err.message,
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
      const { error } = await supabase.from("bookings").update({ status: "approved" }).eq("id", id);
      if (error) throw error;
      toast({ title: "Booking Approved", description: `Notification would be sent to ${email}` });
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDecline = async (id: string, email: string, name: string, date: string, time: string) => {
    try {
      const { error } = await supabase.from("bookings").update({ status: "declined" }).eq("id", id);
      if (error) throw error;
      toast({ title: "Booking Declined", description: `Notification would be sent to ${email}`, variant: "destructive" });
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
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

  const toggleAssetVisibility = async (id: string, currentlyHidden: boolean) => {
    try {
      const { error } = await supabase.from("asset_overrides").upsert({ 
        asset_id: id, 
        is_hidden: !currentlyHidden 
      }, { onConflict: 'asset_id' });
      
      if (error) throw error;
      toast({ 
        title: currentlyHidden ? "Image Restored" : "Image Hidden", 
        description: currentlyHidden ? "Visible to visitors." : "Hidden from visitors." 
      });
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const openEditDialog = (item: GalleryImage) => {
    setEditingItem(item);
    setEditForm({
      caption: item.caption,
      category: item.category,
      display_order: item.display_order || 0
    });
    setEditOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;

    try {
      if (editingItem.isLocal) {
        const { error } = await supabase.from("asset_overrides").upsert({
          asset_id: editingItem.id,
          caption: editForm.caption,
          category: editForm.category,
          display_order: editForm.display_order
        }, { onConflict: 'asset_id' });
        if (error) throw error;
      } else {
        const { error } = await supabase.from("gallery").update({
          caption: editForm.caption,
          category: editForm.category,
          display_order: editForm.display_order
        }).eq("id", editingItem.id);
        if (error) throw error;
      }

      toast({ title: "Changes Saved", description: "Gallery updated successfully." });
      setEditOpen(false);
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

      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath);

      const { error: insertError } = await supabase.from('gallery').insert({
        image_url: publicUrl,
        caption: newImage.caption,
        category: newImage.category,
        display_order: allItems.length // Put at end
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

  if (!isAdmin) return null;

  const allItems: GalleryImage[] = [
    ...gallery,
    ...LOCAL_IMAGES.map(local => {
      const override = assetOverrides[local.id];
      return {
        ...local,
        caption: override?.caption ?? local.caption,
        category: override?.category ?? local.category,
        display_order: override?.display_order ?? local.display_order ?? 0,
        is_hidden: override?.is_hidden ?? false,
        isLocal: true
      };
    })
  ].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-white tracking-tight">Admin Dashboard</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-muted-foreground font-medium">Welcome,</span>
              <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">{user?.email}</Badge>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => fetchData()} variant="outline" className="border-white/10 text-white hover:bg-white/10 hover:text-white">
              Refresh Data
            </Button>
            <Button onClick={handleSignOut} variant="outline" className="border-white/10 text-white hover:bg-white/10 hover:text-white">
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
            <TabsTrigger value="gallery" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">Gallery ({allItems.length})</TabsTrigger>
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">Testimonials ({testimonials.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card className="bg-zinc-900/40 border-white/5 shadow-2xl backdrop-blur-sm hover:border-primary/20 transition-all duration-500 hover:shadow-primary/5">
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
                          <TableHead className="text-zinc-400 font-bold uppercase text-[11px] tracking-wider text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                            <TableCell className="font-medium text-white group-hover:text-primary transition-colors">{booking.name}</TableCell>
                            <TableCell className="text-zinc-300">{booking.email}</TableCell>
                            <TableCell className="text-zinc-300">{booking.phone}</TableCell>
                            <TableCell className="text-zinc-300">{new Date(booking.date).toLocaleDateString()}</TableCell>
                            <TableCell className="text-zinc-300">{booking.time}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-2 justify-end">
                                {booking.status === "approved" ? (
                                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-bold">Approved</Badge>
                                ) : booking.status === "declined" ? (
                                  <Badge variant="destructive" className="font-bold">Declined</Badge>
                                ) : (
                                  <>
                                    <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg hover:shadow-primary/20" onClick={() => handleApprove(booking.id, booking.email, booking.name, booking.date, booking.time)}>
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
            <Card className="bg-zinc-900/40 border-white/5 shadow-2xl backdrop-blur-sm hover:border-primary/20 transition-all duration-500">
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
                      <Card key={message.id} className="bg-white/5 border-white/5 shadow-lg hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/5">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl font-bold text-white group-hover:text-primary transition-colors">{message.name}</CardTitle>
                              <CardDescription className="text-primary font-medium">{message.email}</CardDescription>
                            </div>
                            <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10" onClick={() => handleDelete("contact_messages", message.id)}><Trash2 className="w-5 h-5" /></Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-zinc-300 leading-relaxed italic font-medium">"{message.message}"</p>
                          <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider mt-4">{new Date(message.created_at).toLocaleString()}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscribers">
            <Card className="bg-zinc-900/40 border-white/5 shadow-2xl backdrop-blur-sm hover:border-primary/20 transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-white">Newsletter Subscribers</CardTitle>
                <CardDescription className="text-zinc-400">Email list for marketing campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                {subscribers.length === 0 ? (
                  <p className="text-center py-8 text-zinc-500">No subscribers yet</p>
                ) : (
                  <div className="overflow-x-auto">
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
                          <TableRow key={subscriber.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                            <TableCell className="font-semibold text-white group-hover:text-primary transition-colors">{subscriber.email}</TableCell>
                            <TableCell className="text-zinc-400">{new Date(subscriber.created_at).toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10" onClick={() => handleDelete("subscribers", subscriber.id)}><Trash2 className="w-5 h-5" /></Button>
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

          <TabsContent value="gallery">
            <Card className="bg-zinc-900/40 border-white/5 shadow-2xl backdrop-blur-sm hover:border-primary/20 transition-all duration-500">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">Gallery Management</CardTitle>
                    <CardDescription className="text-zinc-400">Sort, edit, and organize all images</CardDescription>
                  </div>
                  <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2 bg-primary text-primary-foreground font-bold shadow-lg hover:shadow-primary/20 transition-all"><Plus className="w-4 h-4" /> Upload Image</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-900 border-white/10 text-white">
                      <DialogHeader><DialogTitle>New Image</DialogTitle></DialogHeader>
                      <form onSubmit={handleGalleryUpload} className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label>File</Label>
                          <Input type="file" accept="image/*" required className="bg-black/50 border-white/10" onChange={(e) => setNewImage(prev => ({ ...prev, file: e.target.files?.[0] || null }))} />
                        </div>
                        <div className="space-y-2">
                          <Label>Caption</Label>
                          <Input placeholder="Caption..." required className="bg-black/50 border-white/10" value={newImage.caption} onChange={(e) => setNewImage(prev => ({ ...prev, caption: e.target.value }))} />
                        </div>
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <select className="w-full bg-black/50 border border-white/10 rounded-md p-2" value={newImage.category} onChange={(e) => setNewImage(prev => ({ ...prev, category: e.target.value as any }))}>
                            <option value="Ambience">Ambience</option><option value="Food">Food</option><option value="Drinks">Drinks</option>
                          </select>
                        </div>
                        <Button type="submit" className="w-full bg-primary" disabled={uploading}>{uploading ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}Upload</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {allItems.map((image) => (
                    <div key={image.id} className={`group relative aspect-square rounded-xl overflow-hidden border border-white/5 shadow-lg ${image.is_hidden ? 'opacity-40 grayscale' : ''} transition-all duration-300 hover:scale-[1.03] hover:shadow-primary/10`}>
                      <img src={image.image_url} alt={image.caption} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-primary text-primary-foreground text-[10px]">{image.category}</Badge>
                          {image.isLocal && <Badge variant="outline" className="text-white text-[9px]">LOCAL</Badge>}
                        </div>
                        <div className="space-y-1">
                          <p className="text-white text-[10px] font-bold">ORDER: {image.display_order}</p>
                          <p className="text-white text-xs font-medium truncate pr-2">{image.caption}</p>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-white bg-white/10 hover:bg-primary" onClick={() => openEditDialog(image)}><Edit2 className="w-3 h-3" /></Button>
                            {image.isLocal ? (
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-white bg-white/10" onClick={() => toggleAssetVisibility(image.id, !!image.is_hidden)}>{image.is_hidden ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}</Button>
                            ) : (
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-white bg-red-500/20 hover:bg-red-500" onClick={() => handleDelete("gallery", image.id)}><Trash2 className="w-3 h-3" /></Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials">
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
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary border border-primary/20">
                                {t.avatar || (t.name ? t.name.substring(0, 2).toUpperCase() : "U")}
                              </div>
                              <div>
                                <h4 className="font-bold text-white group-hover:text-primary transition-colors">{t.name}</h4>
                                <div className="flex items-center gap-2">
                                  <Badge className="bg-primary/10 text-primary border-primary/20 font-bold px-2 py-0 text-[10px]">★ {t.rating}</Badge>
                                  <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">{new Date(t.created_at).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-colors" onClick={() => handleDelete("testimonials", t.id)}>
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
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white">
          <DialogHeader><DialogTitle>Edit Image Details</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Caption</Label>
              <Input className="bg-black/50 border-white/10" value={editForm.caption} onChange={(e) => setEditForm(p => ({ ...p, caption: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <select className="w-full bg-black/50 border border-white/10 rounded-md p-2" value={editForm.category} onChange={(e) => setEditForm(p => ({ ...p, category: e.target.value as any }))}>
                <option value="Ambience">Ambience</option><option value="Food">Food</option><option value="Drinks">Drinks</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Display Order (Low = First)</Label>
              <Input type="number" className="bg-black/50 border-white/10" value={editForm.display_order} onChange={(e) => setEditForm(p => ({ ...p, display_order: parseInt(e.target.value) || 0 }))} />
            </div>
            <Button className="w-full bg-primary" onClick={handleSaveEdit}><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, LogOut, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { LOCAL_IMAGES, GalleryImage, Category } from "@/data/galleryData";
import { Link } from "react-router-dom";

import BookingsTab from "./admin/BookingsTab";
import MessagesTab from "./admin/MessagesTab";
import SubscribersTab from "./admin/SubscribersTab";
import GalleryTab from "./admin/GalleryTab";
import TestimonialsTab from "./admin/TestimonialsTab";

const formatTime12h = (timeStr: string) => {
  if (!timeStr) return "";
  try {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  } catch {
    return timeStr;
  }
};

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [bookings, setBookings] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [assetOverrides, setAssetOverrides] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

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
        supabase.from("gallery").select("*"),
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

      const remoteGallery = (galleryRes.data || []).map(img => ({ ...img, isLocal: false }));
      setGallery(remoteGallery);

      const overridesMap = (overridesRes.data || []).reduce((acc: any, curr: any) => {
        acc[curr.asset_id] = curr;
        return acc;
      }, {});
      setAssetOverrides(overridesMap);
    } catch (err: any) {
      console.error("Fetch error:", err);
      toast({ title: "Database Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [isAdmin, toast]);

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin, fetchData]);

  const sendEmail = async (to: string, subject: string, message: string) => {
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${to}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: subject, message }),
      });
      if (!res.ok) console.warn("Email notification failed for:", to);
    } catch (err) {
      console.warn("Email send error:", err);
    }
  };

  const handleApprove = async (id: string, email: string, name: string, date: string, time: string) => {
    try {
      const { error } = await supabase.from("bookings").update({ status: "approved" }).eq("id", id);
      if (error) throw error;

      await sendEmail(
        email,
        "Reservation Confirmed - Corbett Culture Brew",
        `Namaste ${name},\n\nWe are absolutely delighted to confirm your reservation at Corbett Culture Brew for ${new Date(date).toLocaleDateString()} at ${formatTime12h(time)}.\n\nIt would be our absolute honor to host you and your guests. We look forward to providing you with a warm experience and our finest flavors.\n\nSee you soon!\n\nWarm regards,\nCorbett Culture Brew Team`
      );

      toast({ title: "Booking Approved", description: `Confirmation sent to ${email}` });
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDecline = async (id: string, email: string, name: string, date: string, time: string) => {
    try {
      const { error } = await supabase.from("bookings").update({ status: "declined" }).eq("id", id);
      if (error) throw error;

      await sendEmail(
        email,
        "Update regarding your reservation - Corbett Culture Brew",
        `Namaste ${name},\n\nThank you so much for choosing Corbett Culture Brew. We deeply regret to inform you that we are unable to accommodate your reservation for ${new Date(date).toLocaleDateString()} at ${formatTime12h(time)} due to an unexpected surge in bookings.\n\nWe sincerely apologize for any disappointment this may cause. We hope for the opportunity to welcome you another time very soon.\n\nWith humble regards,\nCorbett Culture Brew Team`
      );

      toast({ title: "Booking Declined", description: `Apology sent to ${email}`, variant: "destructive" });
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
      const { error } = await supabase.from("asset_overrides").upsert({ asset_id: id, is_hidden: !currentlyHidden }, { onConflict: 'asset_id' });
      if (error) throw error;
      toast({ title: currentlyHidden ? "Image Restored" : "Image Hidden", description: currentlyHidden ? "Visible to visitors." : "Hidden from visitors." });
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleSaveEdit = async (item: GalleryImage, form: { caption: string; category: Category; display_order: number }) => {
    try {
      if (item.isLocal) {
        const { error } = await supabase.from("asset_overrides").upsert({ asset_id: item.id, caption: form.caption, category: form.category, display_order: form.display_order }, { onConflict: 'asset_id' });
        if (error) throw error;
      } else {
        const { error } = await supabase.from("gallery").update({ caption: form.caption, category: form.category, display_order: form.display_order }).eq("id", item.id);
        if (error) throw error;
      }
      toast({ title: "Changes Saved", description: "Gallery updated successfully." });
      fetchData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleGalleryUpload = async (file: File, caption: string, category: Category) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath);

    const { error: insertError } = await supabase.from('gallery').insert({ image_url: publicUrl, caption, category, display_order: allItems.length });
    if (insertError) throw insertError;

    toast({ title: "Success", description: "Image uploaded to gallery!" });
    fetchData();
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
            <Button asChild variant="outline" className="border-white/10 text-white hover:bg-white/10 hover:text-white">
              <Link to="/"><Home className="h-4 w-4 mr-2" />Home</Link>
            </Button>
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
            <BookingsTab bookings={bookings} onApprove={handleApprove} onDecline={handleDecline} />
          </TabsContent>

          <TabsContent value="messages">
            <MessagesTab messages={messages} onDelete={handleDelete} />
          </TabsContent>

          <TabsContent value="subscribers">
            <SubscribersTab subscribers={subscribers} onDelete={handleDelete} />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryTab allItems={allItems} onDelete={handleDelete} onToggleVisibility={toggleAssetVisibility} onSaveEdit={handleSaveEdit} onUpload={handleGalleryUpload} />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsTab testimonials={testimonials} onDelete={handleDelete} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

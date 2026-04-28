import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  message: string | null;
  status?: string;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvedBookings, setApprovedBookings] = useState<Set<string>>(new Set());

  // Mock testimonials since they aren't in Supabase yet
  const [adminTestimonials, setAdminTestimonials] = useState([
    { id: 1, name: "Priya Sharma", review: "Best café in Kotdwara! The masala chai and samosas are absolutely divine.", rating: 5 },
    { id: 2, name: "Rahul Kumar", review: "Love the coffee here! The cappuccino is perfectly brewed.", rating: 5 },
    { id: 3, name: "Anjali Verma", review: "A hidden gem in Uttarakhand! The food is authentic.", rating: 5 },
    { id: 4, name: "Vikram Singh", review: "Excellent service and delicious food!", rating: 5 },
  ]);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/auth");
    }
  }, [isAdmin, authLoading, navigate]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [bookingsRes, messagesRes, subscribersRes] = await Promise.all([
        supabase.from("bookings").select("*").order("created_at", { ascending: false }),
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
        supabase.from("subscribers").select("*").order("created_at", { ascending: false }),
      ]);

      if (bookingsRes.error) throw bookingsRes.error;
      if (messagesRes.error) throw messagesRes.error;
      if (subscribersRes.error) throw subscribersRes.error;

      setBookings(bookingsRes.data || []);
      setMessages(messagesRes.data || []);
      setSubscribers(subscribersRes.data || []);
    } catch (err: unknown) {
      const error = err as Error;
      toast({
        title: "Error",
        description: error.message || "Failed to fetch data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin, fetchData]);

  const handleDelete = async (table: "bookings" | "contact_messages" | "subscribers", id: string) => {
    try {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;

      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
      fetchData();
    } catch (err: unknown) {
      const error = err as Error;
      toast({
        title: "Error",
        description: error.message || "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  const handleApprove = async (id: string, email: string, name: string, date: string, time: string) => {
    try {
      const { error } = await supabase.from("bookings").update({ status: "approved" }).eq("id", id);
      if (error) throw error;
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "approved" } : b));
      
      toast({
        title: "Booking Approved",
        description: "Opening your email client to send the confirmation...",
      });

      const subject = encodeURIComponent("Your Table Booking is Confirmed! - Corbett Cultures");
      const body = encodeURIComponent(`Hi ${name},\n\nGreat news! Your table booking at Corbett Cultures for ${new Date(date).toLocaleDateString()} at ${time} has been approved and confirmed.\n\nWe look forward to serving you!\n\nBest regards,\nCorbett Cultures Team`);
      window.open(`mailto:${email}?subject=${subject}&body=${body}`);
      
    } catch (err: unknown) {
      toast({ title: "Error", description: "Could not approve booking.", variant: "destructive" });
    }
  };

  const handleDecline = async (id: string, email: string, name: string, date: string, time: string) => {
    try {
      const { error } = await supabase.from("bookings").update({ status: "declined" }).eq("id", id);
      if (error) throw error;
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "declined" } : b));
      
      toast({
        title: "Booking Declined",
        description: "Opening your email client to send the message...",
      });

      const subject = encodeURIComponent("Update on your Table Booking - Corbett Cultures");
      const body = encodeURIComponent(`Hi ${name},\n\nWe're very sorry, but we are unable to accommodate your table booking for ${new Date(date).toLocaleDateString()} at ${time} due to being fully booked.\n\nPlease let us know if you'd like to reschedule for another time.\n\nBest regards,\nCorbett Cultures Team`);
      window.open(`mailto:${email}?subject=${subject}&body=${body}`);
      
    } catch (err: unknown) {
      toast({ title: "Error", description: "Could not decline booking.", variant: "destructive" });
    }
  };

  const handleDeleteTestimonial = (id: number) => {
    setAdminTestimonials(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Testimonial Deleted",
      description: "The testimonial has been removed.",
    });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-coffee-600" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-50 to-cream-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-coffee-900">Admin Dashboard</h1>
            <p className="text-coffee-600 mt-2">Welcome back, {user?.email}</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">Bookings ({bookings.length})</TabsTrigger>
            <TabsTrigger value="messages">Messages ({messages.length})</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers ({subscribers.length})</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Table Bookings</CardTitle>
                <CardDescription>Manage customer reservations</CardDescription>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">No bookings yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Guests</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell>{booking.name}</TableCell>
                            <TableCell>{booking.email}</TableCell>
                            <TableCell>{booking.phone}</TableCell>
                            <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                            <TableCell>{booking.time}</TableCell>
                            <TableCell>{booking.guests}</TableCell>
                            <TableCell>{booking.message || "-"}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {booking.status === "approved" ? (
                                  <span className="text-green-600 font-bold text-sm">Approved</span>
                                ) : booking.status === "declined" ? (
                                  <span className="text-red-600 font-bold text-sm">Declined</span>
                                ) : (
                                  <>
                                    <Button variant="default" size="sm" onClick={() => handleApprove(booking.id, booking.email, booking.name, booking.date, booking.time)}>
                                      Approve
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDecline(booking.id, booking.email, booking.name, booking.date, booking.time)}>
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
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>Customer inquiries and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                {messages.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">No messages yet</p>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <Card key={message.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{message.name}</CardTitle>
                              <CardDescription>{message.email}</CardDescription>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete("contact_messages", message.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{message.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">
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
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Subscribers</CardTitle>
                <CardDescription>Email list for marketing campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                {subscribers.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">No subscribers yet</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Subscribed At</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscribers.map((subscriber) => (
                        <TableRow key={subscriber.id}>
                          <TableCell>{subscriber.email}</TableCell>
                          <TableCell>
                            {new Date(subscriber.created_at).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete("subscribers", subscriber.id)}
                            >
                              Delete
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
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gallery Images</CardTitle>
                    <CardDescription>Manage images in the 'A Glimpse Into Our World' section</CardDescription>
                  </div>
                  <Button onClick={() => toast({ title: "Coming soon", description: "Image upload will be connected to Supabase storage." })}>
                    Add Image
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Gallery management is connected to your Supabase instance.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <CardTitle>Testimonials</CardTitle>
                <CardDescription>Manage user reviews and delete inappropriate ones</CardDescription>
              </CardHeader>
              <CardContent>
                {adminTestimonials.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">No testimonials available.</p>
                ) : (
                  <div className="space-y-4">
                    {adminTestimonials.map((t) => (
                      <Card key={t.id}>
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <p className="font-bold">{t.name}</p>
                            <p className="text-sm text-muted-foreground">{t.review}</p>
                            <p className="text-xs text-yellow-500">Rating: {t.rating}/5</p>
                          </div>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteTestimonial(t.id)}>
                            Delete
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

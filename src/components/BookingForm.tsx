import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  email: z.string().email("Invalid email address").max(255),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  guests: z.coerce.number().min(1, "At least 1 guest required").max(20, "Maximum 20 guests"),
  message: z.string().max(500).optional().default(""),
});

interface BookingFormProps {
  onSuccess?: () => void;
}

const BookingForm = ({ onSuccess }: BookingFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { user } = useAdmin();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      guests: 2,
      message: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof bookingSchema>) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to book a table.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    setLoading(true);

    try {
      const [bookingHour, bookingMinute] = values.time.split(":").map(Number);
      const bookingTimeValue = bookingHour * 60 + bookingMinute;
      const openingTimeValue = 10 * 60; // 10:00 AM
      const closingTimeValue = 23 * 60 + 30; // 11:30 PM

      const selectedDate = new Date(values.date);
      const today = new Date();
      if (
        selectedDate.getFullYear() === today.getFullYear() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getDate() === today.getDate()
      ) {
        const currentHour = today.getHours();
        const currentMinute = today.getMinutes();
        const currentTimeValue = currentHour * 60 + currentMinute;
        if (bookingTimeValue <= currentTimeValue) {
          toast({
            title: "Invalid Time",
            description: "You cannot book a table in the past.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
      }

      if (bookingTimeValue < openingTimeValue || bookingTimeValue > closingTimeValue) {
        toast({
          title: "Outside Opening Hours",
          description: "Please book between 10:00 AM and 11:30 PM.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("bookings").insert([{
        name: values.name,
        phone: values.phone,
        email: values.email,
        date: values.date,
        time: values.time,
        guests: values.guests,
        message: values.message || null,
        status: "pending"
      }]);

      if (error) throw error;

      toast({
        title: "Booking Received!",
        description: "We'll confirm your reservation via email shortly.",
      });

      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Booking submission error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+91 84456 40120" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" min={new Date().toISOString().split("T")[0]} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Guests</FormLabel>
              <FormControl>
                <Input type="number" min="1" max="20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requests (Optional)</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Booking..." : "Confirm Booking"}
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;

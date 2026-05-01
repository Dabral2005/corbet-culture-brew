import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  message: string | null;
  status: string;
  created_at: string | null;
}

interface BookingsTabProps {
  bookings: Booking[];
  onApprove: (id: string, email: string, name: string, date: string, time: string) => void;
  onDecline: (id: string, email: string, name: string, date: string, time: string) => void;
}

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

const BookingsTab = ({ bookings, onApprove, onDecline }: BookingsTabProps) => {
  return (
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
                    <TableCell className="text-zinc-300">{formatTime12h(booking.time)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        {booking.status === "approved" ? (
                          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-bold">Approved</Badge>
                        ) : booking.status === "declined" ? (
                          <Badge variant="destructive" className="font-bold">Declined</Badge>
                        ) : (
                          <>
                            <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg hover:shadow-primary/20" onClick={() => onApprove(booking.id, booking.email, booking.name, booking.date, booking.time)}>
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="border-white/10 text-zinc-400 hover:bg-white/5" onClick={() => onDecline(booking.id, booking.email, booking.name, booking.date, booking.time)}>
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
  );
};

export default BookingsTab;

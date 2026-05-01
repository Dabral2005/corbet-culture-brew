import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  created_at: string | null;
}

interface SubscribersTabProps {
  subscribers: Subscriber[];
  onDelete: (table: string, id: string) => void;
}

const SubscribersTab = ({ subscribers, onDelete }: SubscribersTabProps) => {
  return (
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
                    <TableCell className="text-zinc-400">
                      {subscriber.created_at ? new Date(subscriber.created_at).toLocaleString() : ""}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10" onClick={() => onDelete("subscribers", subscriber.id)}>
                        <Trash2 className="w-5 h-5" />
                      </Button>
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

export default SubscribersTab;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string | null;
}

interface MessagesTabProps {
  messages: Message[];
  onDelete: (table: string, id: string) => void;
}

const MessagesTab = ({ messages, onDelete }: MessagesTabProps) => {
  return (
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
                      <CardTitle className="text-xl font-bold text-white">{message.name}</CardTitle>
                      <CardDescription className="text-primary font-medium">{message.email}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10" onClick={() => onDelete("contact_messages", message.id)}>
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-300 leading-relaxed italic font-medium">"{message.message}"</p>
                  <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider mt-4">
                    {message.created_at ? new Date(message.created_at).toLocaleString() : ""}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MessagesTab;

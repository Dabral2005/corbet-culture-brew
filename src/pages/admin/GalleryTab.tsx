import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Eye, EyeOff, Edit2, Save, Loader2 } from "lucide-react";
import { GalleryImage, Category } from "@/data/galleryData";

interface GalleryTabProps {
  allItems: GalleryImage[];
  onDelete: (table: string, id: string) => void;
  onToggleVisibility: (id: string, currentlyHidden: boolean) => void;
  onSaveEdit: (item: GalleryImage, form: { caption: string; category: Category; display_order: number }) => void;
  onUpload: (file: File, caption: string, category: Category) => Promise<void>;
}

const GalleryTab = ({ allItems, onDelete, onToggleVisibility, onSaveEdit, onUpload }: GalleryTabProps) => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newImage, setNewImage] = useState({ file: null as File | null, caption: "", category: "Ambience" as Category });

  const [editOpen, setEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryImage | null>(null);
  const [editForm, setEditForm] = useState({ caption: "", category: "Ambience" as Category, display_order: 0 });

  const openEditDialog = (item: GalleryImage) => {
    setEditingItem(item);
    setEditForm({ caption: item.caption, category: item.category, display_order: item.display_order || 0 });
    setEditOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    onSaveEdit(editingItem, editForm);
    setEditOpen(false);
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.file) return;
    setUploading(true);
    try {
      await onUpload(newImage.file, newImage.caption, newImage.category);
      setUploadOpen(false);
      setNewImage({ file: null, caption: "", category: "Ambience" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
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
                <form onSubmit={handleUploadSubmit} className="space-y-4 pt-4">
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
                    <select className="w-full bg-black/50 border border-white/10 rounded-md p-2" value={newImage.category} onChange={(e) => setNewImage(prev => ({ ...prev, category: e.target.value as Category }))}>
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
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-white bg-white/10" onClick={() => onToggleVisibility(image.id, !!image.is_hidden)}>{image.is_hidden ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}</Button>
                      ) : (
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-white bg-red-500/20 hover:bg-red-500" onClick={() => onDelete("gallery", image.id)}><Trash2 className="w-3 h-3" /></Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
              <select className="w-full bg-black/50 border border-white/10 rounded-md p-2" value={editForm.category} onChange={(e) => setEditForm(p => ({ ...p, category: e.target.value as Category }))}>
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
    </>
  );
};

export default GalleryTab;

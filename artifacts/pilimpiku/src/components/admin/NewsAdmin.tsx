import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useListNews,
  useCreateNews,
  useUpdateNews,
  useDeleteNews,
  getListNewsQueryKey,
  type NewsArticle,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";

const newsSchema = z.object({
  titre: z.string().min(1),
  categorie: z.string().min(1),
  dateLabel: z.string().min(1),
  excerpt: z.string().min(1),
  image: z.string().min(1),
  sortOrder: z.coerce.number().int().default(0),
});
type FormValues = z.infer<typeof newsSchema>;

const EMPTY: FormValues = {
  titre: "",
  categorie: "Festival",
  dateLabel: "",
  excerpt: "",
  image: "",
  sortOrder: 0,
};

export function NewsAdmin() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const { data: news } = useListNews();
  const [editing, setEditing] = useState<NewsArticle | null>(null);
  const [open, setOpen] = useState(false);

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: getListNewsQueryKey() });

  const create = useCreateNews({
    mutation: {
      onSuccess: () => {
        invalidate();
        toast({ title: "Actualité créée" });
        setOpen(false);
      },
      onError: (e: Error) => toast({ title: "Erreur", description: e.message }),
    },
  });
  const update = useUpdateNews({
    mutation: {
      onSuccess: () => {
        invalidate();
        toast({ title: "Actualité mise à jour" });
        setOpen(false);
      },
      onError: (e: Error) => toast({ title: "Erreur", description: e.message }),
    },
  });
  const remove = useDeleteNews({
    mutation: {
      onSuccess: () => {
        invalidate();
        toast({ title: "Supprimée" });
      },
      onError: (e: Error) => toast({ title: "Erreur", description: e.message }),
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: EMPTY,
  });

  function openCreate() {
    setEditing(null);
    form.reset(EMPTY);
    setOpen(true);
  }
  function openEdit(n: NewsArticle) {
    setEditing(n);
    form.reset({
      titre: n.titre,
      categorie: n.categorie,
      dateLabel: n.dateLabel,
      excerpt: n.excerpt,
      image: n.image,
      sortOrder: n.sortOrder,
    });
    setOpen(true);
  }
  function onSubmit(values: FormValues) {
    if (editing) update.mutate({ id: editing.id, data: values });
    else create.mutate({ data: values });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-2xl text-foreground">Actualités</h2>
        <Button onClick={openCreate} data-testid="button-create-news">
          <Plus size={16} className="mr-2" /> Nouvelle actualité
        </Button>
      </div>

      <div className="space-y-3">
        {(news ?? []).map((n) => (
          <div
            key={n.id}
            className="flex items-center gap-4 bg-card border border-border/50 p-4 rounded-sm"
            data-testid={`row-news-${n.id}`}
          >
            <img src={n.image} alt={n.titre} className="w-16 h-16 object-cover rounded-sm" />
            <div className="flex-1 min-w-0">
              <div className="font-serif text-lg text-foreground truncate">{n.titre}</div>
              <div className="text-xs text-muted-foreground">
                {n.categorie} · {n.dateLabel}
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => openEdit(n)} data-testid={`button-edit-news-${n.id}`}>
              <Pencil size={14} />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => confirm(`Supprimer "${n.titre}" ?`) && remove.mutate({ id: n.id })}
              data-testid={`button-delete-news-${n.id}`}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-card">
          <DialogHeader>
            <DialogTitle>{editing ? "Modifier" : "Nouvelle actualité"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Titre</Label>
              <Input {...form.register("titre")} data-testid="input-news-titre" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Catégorie</Label>
                <Input {...form.register("categorie")} data-testid="input-news-categorie" />
              </div>
              <div>
                <Label>Date (libellé)</Label>
                <Input {...form.register("dateLabel")} data-testid="input-news-date" />
              </div>
            </div>
            <div>
              <Label>Image (URL)</Label>
              <Input {...form.register("image")} data-testid="input-news-image" />
            </div>
            <div>
              <Label>Extrait</Label>
              <Textarea {...form.register("excerpt")} rows={4} data-testid="input-news-excerpt" />
            </div>
            <div>
              <Label>Ordre d'affichage</Label>
              <Input type="number" {...form.register("sortOrder")} data-testid="input-news-sortorder" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" data-testid="button-save-news">
                {editing ? "Enregistrer" : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

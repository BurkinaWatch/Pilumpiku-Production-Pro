import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useListPartners,
  useCreatePartner,
  useUpdatePartner,
  useDeletePartner,
  getListPartnersQueryKey,
  type Partner,
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

const schema = z.object({
  nom: z.string().min(1),
  description: z.string().min(1),
  sortOrder: z.coerce.number().int().default(0),
});
type FormValues = z.infer<typeof schema>;

const EMPTY: FormValues = { nom: "", description: "", sortOrder: 0 };

export function PartnersAdmin() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const { data: partners } = useListPartners();
  const [editing, setEditing] = useState<Partner | null>(null);
  const [open, setOpen] = useState(false);

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: getListPartnersQueryKey() });

  const create = useCreatePartner({
    mutation: {
      onSuccess: () => { invalidate(); toast({ title: "Partenaire créé" }); setOpen(false); },
      onError: (e: Error) => toast({ title: "Erreur", description: e.message }),
    },
  });
  const update = useUpdatePartner({
    mutation: {
      onSuccess: () => { invalidate(); toast({ title: "Mis à jour" }); setOpen(false); },
      onError: (e: Error) => toast({ title: "Erreur", description: e.message }),
    },
  });
  const remove = useDeletePartner({
    mutation: {
      onSuccess: () => { invalidate(); toast({ title: "Supprimé" }); },
      onError: (e: Error) => toast({ title: "Erreur", description: e.message }),
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY,
  });

  function openCreate() { setEditing(null); form.reset(EMPTY); setOpen(true); }
  function openEdit(p: Partner) {
    setEditing(p);
    form.reset({ nom: p.nom, description: p.description, sortOrder: p.sortOrder });
    setOpen(true);
  }
  function onSubmit(values: FormValues) {
    if (editing) update.mutate({ id: editing.id, data: values });
    else create.mutate({ data: values });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-2xl text-foreground">Partenaires</h2>
        <Button onClick={openCreate} data-testid="button-create-partner">
          <Plus size={16} className="mr-2" /> Nouveau partenaire
        </Button>
      </div>

      <div className="space-y-3">
        {(partners ?? []).map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 bg-card border border-border/50 p-4 rounded-sm"
            data-testid={`row-partner-${p.id}`}
          >
            <div className="flex-1 min-w-0">
              <div className="font-serif text-lg text-foreground">{p.nom}</div>
              <div className="text-xs text-muted-foreground line-clamp-1">{p.description}</div>
            </div>
            <Button variant="outline" size="sm" onClick={() => openEdit(p)} data-testid={`button-edit-partner-${p.id}`}>
              <Pencil size={14} />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => confirm(`Supprimer "${p.nom}" ?`) && remove.mutate({ id: p.id })}
              data-testid={`button-delete-partner-${p.id}`}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md bg-card">
          <DialogHeader>
            <DialogTitle>{editing ? "Modifier" : "Nouveau partenaire"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Nom</Label>
              <Input {...form.register("nom")} data-testid="input-partner-nom" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea {...form.register("description")} rows={3} data-testid="input-partner-description" />
            </div>
            <div>
              <Label>Ordre d'affichage</Label>
              <Input type="number" {...form.register("sortOrder")} data-testid="input-partner-sortorder" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" data-testid="button-save-partner">
                {editing ? "Enregistrer" : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

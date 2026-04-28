import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useListServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
  getListServicesQueryKey,
  type Service,
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
  titre: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  sortOrder: z.coerce.number().int().default(0),
});
type FormValues = z.infer<typeof schema>;

const EMPTY: FormValues = { titre: "", description: "", icon: "Film", sortOrder: 0 };

export function ServicesAdmin() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const { data: services } = useListServices();
  const [editing, setEditing] = useState<Service | null>(null);
  const [open, setOpen] = useState(false);

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: getListServicesQueryKey() });

  const create = useCreateService({
    mutation: {
      onSuccess: () => {
        invalidate();
        toast({ title: "Service créé" });
        setOpen(false);
      },
      onError: (e: Error) => toast({ title: "Erreur", description: e.message }),
    },
  });
  const update = useUpdateService({
    mutation: {
      onSuccess: () => {
        invalidate();
        toast({ title: "Mis à jour" });
        setOpen(false);
      },
      onError: (e: Error) => toast({ title: "Erreur", description: e.message }),
    },
  });
  const remove = useDeleteService({
    mutation: {
      onSuccess: () => {
        invalidate();
        toast({ title: "Supprimé" });
      },
      onError: (e: Error) => toast({ title: "Erreur", description: e.message }),
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY,
  });

  function openCreate() {
    setEditing(null);
    form.reset(EMPTY);
    setOpen(true);
  }
  function openEdit(s: Service) {
    setEditing(s);
    form.reset({
      titre: s.titre,
      description: s.description,
      icon: s.icon,
      sortOrder: s.sortOrder,
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
        <h2 className="font-serif text-2xl text-foreground">Services</h2>
        <Button onClick={openCreate} data-testid="button-create-service">
          <Plus size={16} className="mr-2" /> Nouveau service
        </Button>
      </div>

      <div className="space-y-3">
        {(services ?? []).map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-4 bg-card border border-border/50 p-4 rounded-sm"
            data-testid={`row-service-${s.id}`}
          >
            <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center text-primary text-xs">
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-serif text-lg text-foreground">{s.titre}</div>
              <div className="text-xs text-muted-foreground line-clamp-1">{s.description}</div>
            </div>
            <Button variant="outline" size="sm" onClick={() => openEdit(s)} data-testid={`button-edit-service-${s.id}`}>
              <Pencil size={14} />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => confirm(`Supprimer "${s.titre}" ?`) && remove.mutate({ id: s.id })}
              data-testid={`button-delete-service-${s.id}`}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl bg-card">
          <DialogHeader>
            <DialogTitle>{editing ? "Modifier" : "Nouveau service"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Titre</Label>
              <Input {...form.register("titre")} data-testid="input-service-titre" />
            </div>
            <div>
              <Label>Icône (nom Lucide, ex: Film, Camera, Globe)</Label>
              <Input {...form.register("icon")} data-testid="input-service-icon" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea {...form.register("description")} rows={5} data-testid="input-service-description" />
            </div>
            <div>
              <Label>Ordre d'affichage</Label>
              <Input type="number" {...form.register("sortOrder")} data-testid="input-service-sortorder" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" data-testid="button-save-service">
                {editing ? "Enregistrer" : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

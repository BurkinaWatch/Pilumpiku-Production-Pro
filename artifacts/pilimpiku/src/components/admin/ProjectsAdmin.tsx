import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useListProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
  getListProjectsQueryKey,
  type Project,
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

const projectSchema = z.object({
  slug: z.string().min(1, "Slug requis"),
  titre: z.string().min(1, "Titre requis"),
  categorie: z.string().min(1, "Catégorie requise"),
  statut: z.string().min(1, "Statut requis"),
  annee: z.coerce.number().int(),
  duree: z.string().min(1, "Durée requise"),
  langue: z.string().min(1, "Langue requise"),
  synopsis: z.string().min(1, "Synopsis requis"),
  intention: z.string().min(1, "Intention requise"),
  image: z.string().min(1, "Image requise"),
  sortOrder: z.coerce.number().int().default(0),
  featured: z.boolean().default(false),
});

type FormValues = z.infer<typeof projectSchema>;

const EMPTY: FormValues = {
  slug: "",
  titre: "",
  categorie: "Fiction",
  statut: "En développement",
  annee: new Date().getFullYear(),
  duree: "",
  langue: "Français",
  synopsis: "",
  intention: "",
  image: "",
  sortOrder: 0,
  featured: false,
};

export function ProjectsAdmin() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const { data: projects, isLoading } = useListProjects();
  const [editing, setEditing] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  const create = useCreateProject({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getListProjectsQueryKey() });
        toast({ title: "Projet créé" });
        setOpen(false);
      },
      onError: (e: Error) => toast({ title: "Erreur", description: e.message }),
    },
  });
  const update = useUpdateProject({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getListProjectsQueryKey() });
        toast({ title: "Projet mis à jour" });
        setOpen(false);
      },
      onError: (e: Error) => toast({ title: "Erreur", description: e.message }),
    },
  });
  const remove = useDeleteProject({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getListProjectsQueryKey() });
        toast({ title: "Projet supprimé" });
      },
      onError: (e: Error) => toast({ title: "Erreur", description: e.message }),
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: EMPTY,
  });

  function openCreate() {
    setEditing(null);
    form.reset(EMPTY);
    setOpen(true);
  }

  function openEdit(p: Project) {
    setEditing(p);
    form.reset({
      slug: p.slug,
      titre: p.titre,
      categorie: p.categorie,
      statut: p.statut,
      annee: p.annee,
      duree: p.duree,
      langue: p.langue,
      synopsis: p.synopsis,
      intention: p.intention,
      image: p.image,
      sortOrder: p.sortOrder,
      featured: p.featured ?? false,
    });
    setOpen(true);
  }

  function onSubmit(values: FormValues) {
    if (editing) {
      update.mutate({ id: editing.id, data: values });
    } else {
      create.mutate({ data: values });
    }
  }

  function onDelete(p: Project) {
    if (confirm(`Supprimer "${p.titre}" ?`)) {
      remove.mutate({ id: p.id });
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-serif text-2xl text-foreground">Projets</h2>
        <Button onClick={openCreate} data-testid="button-create-project">
          <Plus size={16} className="mr-2" /> Nouveau projet
        </Button>
      </div>

      {isLoading && <p className="text-muted-foreground">Chargement...</p>}

      <div className="space-y-3">
        {(projects ?? []).map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-4 bg-card border border-border/50 p-4 rounded-sm"
            data-testid={`row-project-${p.id}`}
          >
            <img src={p.image} alt={p.titre} className="w-16 h-16 object-cover rounded-sm" />
            <div className="flex-1 min-w-0">
              <div className="font-serif text-lg text-foreground truncate">{p.titre}</div>
              <div className="text-xs text-muted-foreground">
                {p.categorie} · {p.statut} · {p.annee} · /{p.slug}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openEdit(p)}
              data-testid={`button-edit-project-${p.id}`}
            >
              <Pencil size={14} />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(p)}
              data-testid={`button-delete-project-${p.id}`}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
          <DialogHeader>
            <DialogTitle>
              {editing ? `Modifier "${editing.titre}"` : "Nouveau projet"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Slug (URL)</Label>
                <Input {...form.register("slug")} data-testid="input-project-slug" />
                {form.formState.errors.slug && (
                  <p className="text-xs text-destructive mt-1">
                    {form.formState.errors.slug.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Titre</Label>
                <Input {...form.register("titre")} data-testid="input-project-titre" />
              </div>
              <div>
                <Label>Catégorie</Label>
                <Input {...form.register("categorie")} data-testid="input-project-categorie" />
              </div>
              <div>
                <Label>Statut</Label>
                <Input {...form.register("statut")} data-testid="input-project-statut" />
              </div>
              <div>
                <Label>Année</Label>
                <Input type="number" {...form.register("annee")} data-testid="input-project-annee" />
              </div>
              <div>
                <Label>Durée</Label>
                <Input {...form.register("duree")} data-testid="input-project-duree" />
              </div>
              <div className="col-span-2">
                <Label>Langue</Label>
                <Input {...form.register("langue")} data-testid="input-project-langue" />
              </div>
              <div className="col-span-2">
                <Label>Image (URL)</Label>
                <Input {...form.register("image")} data-testid="input-project-image" />
              </div>
              <div className="col-span-2">
                <Label>Intention de l'auteur</Label>
                <Textarea
                  {...form.register("intention")}
                  rows={2}
                  data-testid="input-project-intention"
                />
              </div>
              <div className="col-span-2">
                <Label>Synopsis</Label>
                <Textarea
                  {...form.register("synopsis")}
                  rows={5}
                  data-testid="input-project-synopsis"
                />
              </div>
              <div>
                <Label>Ordre d'affichage</Label>
                <Input
                  type="number"
                  {...form.register("sortOrder")}
                  data-testid="input-project-sortorder"
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  {...form.register("featured")}
                  id="featured"
                  data-testid="checkbox-project-featured"
                />
                <Label htmlFor="featured">Mis en avant (page d'accueil)</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={create.isPending || update.isPending}
                data-testid="button-save-project"
              >
                {editing ? "Enregistrer" : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

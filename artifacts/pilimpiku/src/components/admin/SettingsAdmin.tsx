import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useGetSiteSettings,
  useUpdateSiteSettings,
  getGetSiteSettingsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const schema = z.object({
  heroBadge: z.string(),
  heroTitleLine1: z.string(),
  heroTitleLine2: z.string(),
  heroSubtitle: z.string(),
  quoteText: z.string(),
  quoteAuthor: z.string(),
  statsProjets: z.string(),
  statsPays: z.string(),
  statsFestivals: z.string(),
  aboutHistoire: z.string(),
  aboutVision: z.string(),
  founderName: z.string(),
  founderTitle: z.string(),
  founderBio: z.string(),
  founderImage: z.string(),
  contactEmail: z.string(),
  contactPhone: z.string(),
  contactAddress: z.string(),
});
type FormValues = z.infer<typeof schema>;

export function SettingsAdmin() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const { data: settings, isLoading } = useGetSiteSettings();
  const update = useUpdateSiteSettings({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getGetSiteSettingsQueryKey() });
        toast({ title: "Paramètres enregistrés" });
      },
      onError: (e: Error) => toast({ title: "Erreur", description: e.message }),
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      heroBadge: "", heroTitleLine1: "", heroTitleLine2: "", heroSubtitle: "",
      quoteText: "", quoteAuthor: "", statsProjets: "", statsPays: "", statsFestivals: "",
      aboutHistoire: "", aboutVision: "",
      founderName: "", founderTitle: "", founderBio: "", founderImage: "",
      contactEmail: "", contactPhone: "", contactAddress: "",
    },
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        heroBadge: settings.heroBadge,
        heroTitleLine1: settings.heroTitleLine1,
        heroTitleLine2: settings.heroTitleLine2,
        heroSubtitle: settings.heroSubtitle,
        quoteText: settings.quoteText,
        quoteAuthor: settings.quoteAuthor,
        statsProjets: settings.statsProjets,
        statsPays: settings.statsPays,
        statsFestivals: settings.statsFestivals,
        aboutHistoire: settings.aboutHistoire,
        aboutVision: settings.aboutVision,
        founderName: settings.founderName,
        founderTitle: settings.founderTitle,
        founderBio: settings.founderBio,
        founderImage: settings.founderImage,
        contactEmail: settings.contactEmail,
        contactPhone: settings.contactPhone,
        contactAddress: settings.contactAddress,
      });
    }
  }, [settings, form]);

  function onSubmit(values: FormValues) {
    update.mutate({ data: values });
  }

  if (isLoading) return <p className="text-muted-foreground">Chargement...</p>;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-foreground mb-4">Page d'accueil — Hero</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label>Badge (au-dessus du titre)</Label>
            <Input {...form.register("heroBadge")} data-testid="input-settings-herobadge" />
          </div>
          <div>
            <Label>Titre — ligne 1</Label>
            <Input {...form.register("heroTitleLine1")} data-testid="input-settings-herotitle1" />
          </div>
          <div>
            <Label>Titre — ligne 2 (en italique orange)</Label>
            <Input {...form.register("heroTitleLine2")} data-testid="input-settings-herotitle2" />
          </div>
          <div className="md:col-span-2">
            <Label>Sous-titre</Label>
            <Textarea {...form.register("heroSubtitle")} rows={2} data-testid="input-settings-herosubtitle" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-serif text-2xl text-foreground mb-4">Citation</h2>
        <div className="space-y-3">
          <div>
            <Label>Texte de la citation</Label>
            <Textarea {...form.register("quoteText")} rows={3} data-testid="input-settings-quotetext" />
          </div>
          <div>
            <Label>Auteur</Label>
            <Input {...form.register("quoteAuthor")} data-testid="input-settings-quoteauthor" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-serif text-2xl text-foreground mb-4">Compteurs</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Projets</Label>
            <Input {...form.register("statsProjets")} data-testid="input-settings-statsprojets" />
          </div>
          <div>
            <Label>Pays</Label>
            <Input {...form.register("statsPays")} data-testid="input-settings-statspays" />
          </div>
          <div>
            <Label>Festivals</Label>
            <Input {...form.register("statsFestivals")} data-testid="input-settings-statsfestivals" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-serif text-2xl text-foreground mb-4">À propos</h2>
        <div className="space-y-3">
          <div>
            <Label>Notre histoire</Label>
            <Textarea {...form.register("aboutHistoire")} rows={5} data-testid="input-settings-abouthistoire" />
          </div>
          <div>
            <Label>Notre vision</Label>
            <Textarea {...form.register("aboutVision")} rows={5} data-testid="input-settings-aboutvision" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-serif text-2xl text-foreground mb-4">Fondatrice / Fondateur</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Nom</Label>
            <Input {...form.register("founderName")} data-testid="input-settings-foundername" />
          </div>
          <div>
            <Label>Titre / Rôle</Label>
            <Input {...form.register("founderTitle")} data-testid="input-settings-foundertitle" />
          </div>
          <div className="md:col-span-2">
            <Label>Image (URL)</Label>
            <Input {...form.register("founderImage")} data-testid="input-settings-founderimage" />
          </div>
          <div className="md:col-span-2">
            <Label>Biographie</Label>
            <Textarea {...form.register("founderBio")} rows={5} data-testid="input-settings-founderbio" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-serif text-2xl text-foreground mb-4">Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Email</Label>
            <Input {...form.register("contactEmail")} data-testid="input-settings-contactemail" />
          </div>
          <div>
            <Label>Téléphone</Label>
            <Input {...form.register("contactPhone")} data-testid="input-settings-contactphone" />
          </div>
          <div>
            <Label>Adresse</Label>
            <Input {...form.register("contactAddress")} data-testid="input-settings-contactaddress" />
          </div>
        </div>
      </div>

      <div className="sticky bottom-4 flex justify-end">
        <Button
          type="submit"
          size="lg"
          disabled={update.isPending}
          data-testid="button-save-settings"
        >
          <Save size={16} className="mr-2" />
          {update.isPending ? "Enregistrement..." : "Enregistrer les modifications"}
        </Button>
      </div>
    </form>
  );
}

import { useSeo } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";
import { useGetSiteSettings } from "@workspace/api-client-react";

const formSchema = z.object({
  nom: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  organisation: z.string().optional(),
  sujet: z.string().min(1, "Veuillez sélectionner un sujet"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export default function Contact() {
  useSeo({
    title: "Contact",
    description: "Contactez Pilumpiku Production pour collaborer.",
  });

  const { toast } = useToast();
  const { data: settings } = useGetSiteSettings();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      email: "",
      organisation: "",
      sujet: "",
      message: "",
    },
  });

  function onSubmit(_values: z.infer<typeof formSchema>) {
    toast({
      title: "Message envoyé",
      description:
        "Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.",
      className: "bg-primary text-primary-foreground border-none",
    });
    form.reset();
  }

  const email = settings?.contactEmail ?? "contact@pilumpiku.bf";
  const phone = settings?.contactPhone ?? "+226 00 00 00 00";
  const address = settings?.contactAddress ?? "Ouagadougou, Burkina Faso";

  return (
    <div className="flex flex-col w-full bg-background pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-6 text-foreground">
            Collaborer
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5"
          >
            <p className="text-xl text-muted-foreground font-light mb-12">
              Que vous soyez un auteur avec un projet, un partenaire financier
              potentiel, ou un média, nous sommes à l'écoute.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-primary/20 rounded-full flex items-center justify-center text-primary shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="uppercase tracking-widest text-xs text-muted-foreground mb-1">
                    Siège
                  </h4>
                  <p
                    className="text-foreground font-serif text-xl"
                    data-testid="text-contact-address"
                  >
                    {address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-primary/20 rounded-full flex items-center justify-center text-primary shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="uppercase tracking-widest text-xs text-muted-foreground mb-1">
                    Email
                  </h4>
                  <a
                    href={`mailto:${email}`}
                    className="text-foreground font-serif text-xl hover:text-primary transition-colors cursor-none"
                    data-testid="link-contact-email"
                  >
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-primary/20 rounded-full flex items-center justify-center text-primary shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="uppercase tracking-widest text-xs text-muted-foreground mb-1">
                    Téléphone
                  </h4>
                  <p
                    className="text-foreground font-serif text-xl"
                    data-testid="text-contact-phone"
                  >
                    {phone}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 bg-card border border-border/50 p-8 md:p-12"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                          Nom / Prénom
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Votre nom"
                            className="bg-background/50 border-border/50 focus-visible:ring-primary rounded-sm cursor-none"
                            data-testid="input-contact-nom"
                            {...field}
                          />
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
                        <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="votre@email.com"
                            className="bg-background/50 border-border/50 focus-visible:ring-primary rounded-sm cursor-none"
                            data-testid="input-contact-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="organisation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                          Organisation (Optionnel)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Société, Institution..."
                            className="bg-background/50 border-border/50 focus-visible:ring-primary rounded-sm cursor-none"
                            data-testid="input-contact-organisation"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sujet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                          Sujet
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className="bg-background/50 border-border/50 focus:ring-primary rounded-sm cursor-none"
                              data-testid="select-contact-sujet"
                            >
                              <SelectValue placeholder="Sélectionner..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-border/50 rounded-sm">
                            <SelectItem value="coproduction" className="cursor-none">
                              Coproduction
                            </SelectItem>
                            <SelectItem value="financement" className="cursor-none">
                              Financement
                            </SelectItem>
                            <SelectItem value="presse" className="cursor-none">
                              Presse
                            </SelectItem>
                            <SelectItem value="formation" className="cursor-none">
                              Formation
                            </SelectItem>
                            <SelectItem value="autre" className="cursor-none">
                              Autre
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Votre message..."
                          className="min-h-[150px] bg-background/50 border-border/50 focus-visible:ring-primary rounded-sm resize-none cursor-none"
                          data-testid="input-contact-message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-4 uppercase tracking-widest text-xs hover:bg-secondary transition-colors cursor-none rounded-sm"
                  data-testid="button-contact-submit"
                >
                  Envoyer le message
                </button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

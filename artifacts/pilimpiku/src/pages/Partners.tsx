import { useSeo } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import { useListPartners } from "@workspace/api-client-react";

export default function Partners() {
  useSeo({
    title: "Partenaires",
    description:
      "Les institutions et diffuseurs qui font confiance à Pilumpiku Production.",
  });

  const { data: partners, isLoading } = useListPartners();

  return (
    <div className="flex flex-col w-full bg-background pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-8 text-foreground">
            Réseau & Partenaires
          </h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed">
            Le cinéma est un art collectif. Au-delà du plateau, il requiert
            l'engagement d'institutions, de fonds et de diffuseurs visionnaires.
            Nous sommes fiers de collaborer avec des partenaires prestigieux qui
            partagent notre ambition pour les récits africains.
          </p>
        </motion.div>

        {isLoading && (
          <div className="text-center py-20 text-muted-foreground">
            Chargement...
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(partners ?? []).map((partner, i) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border/50 p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-card/50 transition-colors group min-h-[200px]"
              data-testid={`card-partner-${partner.id}`}
            >
              <h3 className="font-serif text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                {partner.nom}
              </h3>
              <p className="text-xs text-muted-foreground font-light">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

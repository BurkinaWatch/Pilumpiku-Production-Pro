import { useSeo } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import { useListPartners } from "@workspace/api-client-react";
import { useState } from "react";

const PARTNER_LOGOS: Record<string, string> = {
  "FESPACO": "/logos/fespaco.png",
  "Africalia": "/logos/africalia.png",
  "CNC France": "/logos/cnc.png",
  "TV5 Monde": "/logos/tv5monde.png",
  "Téléfilm Canada": "/logos/telefilm.png",
  "Hot Docs Blue Ice Fund": "/logos/hotdocs.png",
  "Tënk": "/logos/tenk.png",
  "Fonds Image de la Francophonie": "/logos/oif.png",
  "Fonds Jeune Création Francophone": "/logos/oif.png",
  "Université Gaston Berger": "/logos/ugb.webp",
  "Durban FilmMart": "/logos/durban.jpg",
  "Les Films de la pluie": "/logos/filmsdelapluie.png",
};

function PartnerCard({ partner, index }: { partner: { id: number; nom: string; description: string }; index: number }) {
  const [logoError, setLogoError] = useState(false);
  const logoSrc = PARTNER_LOGOS[partner.nom];
  const hasLogo = !!logoSrc && !logoError;

  return (
    <motion.div
      key={partner.id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="bg-card border border-border/40 flex flex-col items-center justify-start text-center hover:border-primary/50 hover:bg-card/70 transition-all duration-300 group overflow-hidden"
      data-testid={`card-partner-${partner.id}`}
    >
      {hasLogo ? (
        <>
          <div className="w-full bg-white flex items-center justify-center px-6 py-5 min-h-[100px]">
            <img
              src={logoSrc}
              alt={partner.nom}
              className="max-h-14 max-w-[140px] w-auto object-contain"
              onError={() => setLogoError(true)}
            />
          </div>
          <div className="px-5 py-4 flex flex-col items-center flex-1">
            <h3 className="font-serif text-base text-foreground mb-1.5 group-hover:text-primary transition-colors leading-snug">
              {partner.nom}
            </h3>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              {partner.description}
            </p>
          </div>
        </>
      ) : (
        <div className="px-6 py-8 flex flex-col items-center justify-center flex-1 min-h-[160px]">
          <div className="w-10 h-px bg-primary/60 mb-5" />
          <h3 className="font-serif text-lg text-foreground mb-2.5 group-hover:text-primary transition-colors leading-snug">
            {partner.nom}
          </h3>
          <p className="text-xs text-muted-foreground font-light leading-relaxed">
            {partner.description}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function Partners() {
  useSeo({
    title: "Partenaires",
    description:
      "Les institutions et diffuseurs qui font confiance à Pilimpiku Production.",
  });

  const { data: partners, isLoading } = useListPartners();

  const withLogos = (partners ?? []).filter((p) => PARTNER_LOGOS[p.nom]);
  const withoutLogos = (partners ?? []).filter((p) => !PARTNER_LOGOS[p.nom]);

  return (
    <div className="flex flex-col w-full bg-background pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-20"
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

        {!isLoading && (partners ?? []).length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {withLogos.map((partner, i) => (
                <PartnerCard key={partner.id} partner={partner} index={i} />
              ))}
            </div>

            {withoutLogos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {withoutLogos.map((partner, i) => (
                  <PartnerCard
                    key={partner.id}
                    partner={partner}
                    index={withLogos.length + i}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

import { useSeo } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import { useGetSiteSettings, useListPartners } from "@workspace/api-client-react";
import { useState } from "react";
import {
  OFFICIAL_INSTITUTION_DETAILS,
  OFFICIAL_PARTNER_ORDER,
  PARTNER_LOGOS,
} from "@/lib/partner-directory";

const HISTOIRE_FALLBACK = `Pilumpiku Production est une société de production cinématographique basée au Burkina Faso, spécialisée dans la production et la promotion de films documentaires et de fiction, ainsi que dans les activités de formation, promotion. Notre objectif est de mettre en lumière des sujets singuliers mais universels, qui préservent la dignité humaine, capables d’interroger le monde tout en célébrant l’identité africaine.

Pilumpiku Production dispose d’un vaste catalogue de documentaires, de films de fiction et de séries primés, réalisés dans le cadre de coproductions internationales. Consciente des défis auxquels sont confrontés les créateurs, Pilumpiku Production a créé en 2019 Sulunsuku, une plateforme numérique dédiée à la promotion du cinéma et au marketing, puis LABO PIIULGU en 2024, afin d’accompagner les professionnels dans le développement de leurs activités créatives.`;

const FOUNDER_BIO_FALLBACK = `Spécialisée en réalisation documentaire de création et en Communication Pour le Développement (CPD), Mamounata Nikièma mène de front sa carrière de réalisatrice (depuis 2007) et celle de productrice (Pilumpiku Produdction depuis 2011). Elle est très impliquée dans les réseaux de cinéastes burkinabè (Africadoc Burkina, Guilde des scénaristes, Association des producteurs du Burkina Faso, Fédération Nationale du Cinéma et de l'Audiovisuel...), et a participé activement depuis plusieurs années au Fespaco, au sein de l'Espace Junior jusqu'en 2017. Depuis 2014 elle est également formatrice lors des résidences d’écriture documentaire de Bobo-Dioulasso et consultante, mentor dans les laboratoires de développement et de coproduction. En 2018 elle lance l'évènementiel Ciné-équipement et la plateforme digitale sur le cinéma Sulunsuku (www.sulunsuku.com ) en janvier 2019. Lors du Fespaco 2021 elle a été décorée du titre de Chevalier de l’Ordre de Mérite, des Arts, des Lettres et de la Communication avec Agrafe ‘’Cinématograpghie’’.`;


const DISTINCTIONS = [
  { annee: "2026", texte: "Participation au programme (2 mois) Open Doors Producers-Festival Locarno2026/Film Industry/Prix EAVE Marketing Workshop" },
  { annee: "2024", texte: "Certificat du programme (6 mois) Goldman Sachs, 10 000 Women/Entrepreneuriat" },
  { annee: "2024", texte: "Certificat du programme (14 semaines) ‘’Bootcamp d’emtrepreneuriat des femmes africaines- Banque Africaine de Développement" },
  { annee: "2024", texte: "Participation au programme (8 semaines) de développement des compétences- SDP-ICC de Africalia & Culture Funding Watch/Entrepneuriat" },
  { annee: "2023", texte: "Certificat du Programme ASPIRE-Programme (6 mois) de croissance des entreprises en collaboration avec Standford Seed" },
  { annee: "2023", texte: "Participation au Programme des producteurs internationaux EURODOC/CNC-FRANCE" },
  { annee: "2022", texte: "Programme La Fabrique Cinéma de l’Institut Français de CANNES-Festival de Cannes/CNC France" },
  { annee: "2021", texte: "Programme DEENTAL AT CANNES-Festival de Cannes/CNC France" },
  { annee: "2020", texte: "Rencontres de coproduction/Déclic-Ciclic-France" },
  { annee: "2020", texte: "Rough cut Lab/Visions du Réel- Nyon-Suisse" },
  { annee: "2020", texte: "Rencontres de coproduction/Miradas Doc-Tennerife-Espagne" },
  { annee: "2019", texte: "Rencontres de coproduction/SENTOO-Marrakech-Ateliers de l'Atlas" },
  { annee: "2018", texte: "Formation en entrepreneuriat culturel (B-Faso Creative – Africalia- Prix Incitant)" },
  { annee: "2018", texte: "Atelier Produire au Sud Agadir (Maroc) et JCC (Tunis)– Prix Bourse Dév. CNCM" },
  { annee: "2017", texte: "Stage sur un tournage (Ouaga Film Lab II – Prix Nomadis Image Tunisie)" },
  { annee: "2016", texte: "Programme Hélio (Haute école des Arts de Zurich/ Institut Imagine)" },
  { annee: "2015", texte: "Atelier American Film showcase / Institut Imagine" },
  { annee: "2013", texte: "Université d'été de la Fémis" },
  { annee: "2012", texte: "Formation audiovisuel et droits de l'homme (Amnesty international)" },
  { annee: "2010", texte: "Formation aux fondamentaux de la production (Africadoc/ Focus Niger)" },
  { annee: "2007", texte: "Prix scénario court métrage avec le projet ‘’Les Bénéficiaires’’" },
];

type DisplayPartner = {
  id: number | string;
  nom: string;
  description: string;
};

function PartnerCard({ partner, index }: { partner: DisplayPartner; index: number }) {
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
          <div className="w-full aspect-[4/3] bg-[#e9dfd2] border-b border-border/30 flex items-center justify-center p-2.5 sm:p-3">
            <img
              src={logoSrc}
              alt={partner.nom}
              className={`w-full h-full max-w-full max-h-full object-contain ${
                partner.nom === "FESPACO" || partner.nom === "ABCA"
                  ? ""
                  : "mix-blend-multiply"
              }`}
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

export default function About() {
  useSeo({
    title: "À Propos",
    description:
      "Découvrez l'histoire, la vision et l'équipe de Pilumpiku Production, société de production cinématographique fondée en 2011 à Ouagadougou par Mamounata Nikiéma.",
  });

  const { data: settings } = useGetSiteSettings();
  const { data: partners, isLoading: partnersLoading } = useListPartners();

  const histoire = settings?.aboutHistoire || HISTOIRE_FALLBACK;
  const founderName = settings?.founderName || "Mamounata Nikiéma";
  const founderTitle = settings?.founderTitle || "Fondatrice · Réalisatrice & Productrice · Présidente FNCA";
  const founderBio = settings?.founderBio || FOUNDER_BIO_FALLBACK;
  const founderImage = settings?.founderImage || "/img/mamounata-spla.jpg";

  const partnersByName = new Map<string, DisplayPartner>();
  (partners ?? []).forEach((partner) => partnersByName.set(partner.nom, partner));
  const officialPartners: DisplayPartner[] = OFFICIAL_PARTNER_ORDER.flatMap<DisplayPartner>((name, index) => {
    const partner = partnersByName.get(name);
    if (partner) return [partner];

    const fallback = OFFICIAL_INSTITUTION_DETAILS[name];
    return fallback ? [{ id: `official-${index}`, ...fallback }] : [];
  });
  const officialNames = new Set(officialPartners.map((partner) => partner.nom));
  const otherPartners = (partners ?? []).filter((partner) => !officialNames.has(partner.nom));
  const otherWithLogos = otherPartners.filter((partner) => PARTNER_LOGOS[partner.nom]);
  const otherWithoutLogos = otherPartners.filter((partner) => !PARTNER_LOGOS[partner.nom]);

  return (
    <div className="flex flex-col w-full bg-background pt-20 sm:pt-24">

      {/* Hero */}
      <section className="relative min-h-[44vh] sm:h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/img/about-butterfly-cinema.jpg"
            alt="Papillon cuivré et bleu posé sur une bobine de film, devant une caméra de cinéma"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/55 to-background" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-12 text-center py-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="uppercase tracking-widest text-xs text-primary mb-4 sm:mb-6"
          >
            Pilumpiku Production · Ouagadougou, Burkina Faso
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl mb-4 sm:mb-6 text-foreground"
          >
            Notre Histoire
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-muted-foreground font-light text-base sm:text-lg max-w-xl mx-auto"
          >
            Une maison de production engagée pour un cinéma africain qui se raconte lui-même.
          </motion.p>
        </div>
      </section>

      {/* Histoire & Vision */}
      <section className="py-16 sm:py-24 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl mb-6 text-primary">PRESENTATION DE PILUMPIKU PRODUCTION</h2>
              <p className="text-muted-foreground font-light leading-relaxed whitespace-pre-line" data-testid="text-about-histoire">
                {histoire}
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Citation */}
      <section className="py-14 sm:py-20 bg-[#0F0600] border-y border-border/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif italic text-xl sm:text-2xl md:text-4xl text-foreground leading-tight max-w-4xl mx-auto mb-6"
          >
            "Comme le papillon qui sort de sa chrysalide, le cinéma est pour nous un acte de transformation : celle des regards, celle des sociétés, celle d'un continent qui se raconte enfin lui-même."
          </motion.blockquote>
          <cite className="uppercase tracking-[0.3em] text-xs text-primary not-italic">— Mamounata Nikiéma</cite>
        </div>
      </section>

      {/* Fondatrice */}
      <section className="py-16 sm:py-24 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 sm:mb-16"
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-2">La Fondatrice</h2>
            <div className="w-16 h-0.5 bg-primary mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[3/4] relative overflow-hidden max-w-sm mx-auto md:max-w-none">
                <img
                  src={founderImage}
                  alt={founderName}
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 border border-primary/20 m-4 pointer-events-none" />
              </div>
              <div className="mt-4 sm:mt-6 bg-card border border-border/40 p-4 sm:p-6 max-w-sm mx-auto md:max-w-none">
                <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-1">{founderName}</h3>
                <p className="uppercase tracking-widest text-xs text-primary">{founderTitle}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-muted-foreground font-light leading-relaxed whitespace-pre-line mb-10 sm:mb-12">
                {founderBio}
              </p>

              {/* Timeline distinctions */}
              <div>
                <h4 className="uppercase tracking-widest text-xs text-primary mb-6">Distinctions & Jalons</h4>
                <div className="space-y-4">
                  {DISTINCTIONS.map((d, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex gap-4 items-start group"
                    >
                      <span className="font-serif text-primary text-sm min-w-[3rem] pt-0.5">{d.annee}</span>
                      <div className="flex-1 border-t border-border/30 pt-1 group-hover:border-primary/40 transition-colors">
                        <p className="text-muted-foreground font-light text-sm leading-relaxed">{d.texte}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Réseau & Partenaires */}
      <section id="reseau-partenaires" className="py-16 sm:py-24 pb-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16 sm:mb-20"
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-6 text-foreground">
              Réseau & Partenaires
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Le cinéma est un art collectif. Au-delà du plateau, il requiert
              l'engagement d'institutions, de fonds et de diffuseurs visionnaires.
              Nous sommes fiers de collaborer avec des partenaires prestigieux qui
              partagent notre ambition pour les récits africains.
            </p>
          </motion.div>

          <div className="space-y-16 sm:space-y-24">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mb-8 sm:mb-10"
              >
                <p className="uppercase tracking-[0.25em] text-xs text-primary mb-3">Institutions burkinabè</p>
                <h3 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">
                  Institutions officielles burkinabè
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Ministère, organismes professionnels, festival national et structures de formation qui structurent la filière cinématographique au Burkina Faso.
                </p>
              </motion.div>

              {partnersLoading ? (
                <div className="text-center py-12 text-muted-foreground">Chargement…</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {officialPartners.map((partner, i) => (
                    <PartnerCard key={partner.id} partner={partner} index={i} />
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-border/30 pt-16 sm:pt-24">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mb-8 sm:mb-10"
              >
                <p className="uppercase tracking-[0.25em] text-xs text-primary mb-3">Écosystème de collaboration</p>
                <h3 className="font-serif text-3xl sm:text-4xl text-foreground mb-3">
                  Partenaires, fonds & réseaux
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Fonds, diffuseurs, marchés, programmes de formation et sociétés de production qui rendent les projets possibles.
                </p>
              </motion.div>

              {partnersLoading ? (
                <div className="text-center py-12 text-muted-foreground">Chargement…</div>
              ) : (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                    {otherWithLogos.map((partner, i) => (
                      <PartnerCard key={partner.id} partner={partner} index={i} />
                    ))}
                  </div>

                  {otherWithoutLogos.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {otherWithoutLogos.map((partner, i) => (
                        <PartnerCard
                          key={partner.id}
                          partner={partner}
                          index={otherWithLogos.length + i}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

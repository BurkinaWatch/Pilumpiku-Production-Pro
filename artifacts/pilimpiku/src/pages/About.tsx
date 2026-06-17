import { useSeo } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import { useGetSiteSettings } from "@workspace/api-client-react";

const HISTOIRE_FALLBACK = `Pilumpiku Production a été fondée en janvier 2011 à Ouagadougou par la réalisatrice et productrice Mamounata Nikiéma, diplômée d'un Master 2 en réalisation documentaire de l'Université Gaston Berger de Saint-Louis, au Sénégal.

Le nom — pilumpiku, qui signifie « papillon » en mooré — n'est pas anodin. Il dit la chrysalide, la mue, l'envol : l'engagement d'une maison de production qui croit que le cinéma accompagne les métamorphoses d'une société, en révélant ce qui change, ce qui résiste, ce qui doit naître.

Depuis Ouagadougou, Pilumpiku produit et coproduit des films documentaires d'auteur avec des partenaires de toute l'Afrique et d'Europe. La société anime également la plateforme audiovisuelle Sulunsuku (lancée en 2018) et programme le festival de cinéma en plein air Sobatè, qui rapproche le grand écran des publics des quartiers populaires de la capitale.

Devise : "A New Vision for a New Africa"`;

const VISION_FALLBACK = `Faire du documentaire un espace d'écoute, de mémoire et de transmission. Mettre à l'honneur les voix des femmes, des jeunes et des oubliés de l'histoire officielle. Soutenir l'émergence d'une nouvelle génération de cinéastes burkinabè et sahéliens, libres dans leurs formes et exigeants dans leurs récits.`;

const FOUNDER_BIO_FALLBACK = `Née en 1979 au Burkina Faso, Mamounata Nikiéma obtient son baccalauréat littéraire en 2001, puis se tourne vers le cinéma documentaire après une formation en communication à l'Université de Ouagadougou. En 2008, elle obtient un Master 2 en réalisation documentaire de création à l'Université Gaston Berger de Saint-Louis (Sénégal), dans le cadre du programme Africadoc.

De 2009 à 2014, elle assure la fonction de Secrétaire Générale de l'association Africadoc Burkina, contribuant au développement du documentaire de création au Burkina Faso. En 2011, elle fonde Pilumpiku Production à Ouagadougou.

Comme réalisatrice, elle signe notamment « L'Odyssée d'Omar » (2020, long-métrage documentaire, coproduit avec Les Films de la Pluie, diffusé sur Tënk) et « Intacte » (2022, court-métrage documentaire). Elle avait auparavant réalisé « Lumière d'octobre » (2015), documentaire de 75 minutes sur l'insurrection burkinabè de 2014, ainsi que la série documentaire « Une journée avec… » (2011).

Comme productrice, elle accompagne une filmographie exigeante : « Au fantôme du père » de Marie-Laurentine Bayala (2018), « Sur les traces d'un migrant » de Delphine Yerbanga (2021, Grand Prix du Président du Faso au FESPACO), « Pingda » (2024), « Loin de moi la colère » de Joël Akafou (2025), la coproduction finlandaise « Katseiden alla » de Jenni Kivistö et Jussi Rastas (2025), et « Djeliya, mémoire du Mandé » de Boubacar Sangaré, sélectionné en première mondiale à Visions du Réel 2026.

En octobre 2017, elle est lauréate du programme B-Faso Creative lancé par l'organisation Africalia. La même année, elle remporte le Prix Nomadis Images au Ouaga Producers Lab. En novembre 2018, elle reçoit le Prix du Public au Festival des Identités Culturelles de Ouagadougou.

Figure majeure du paysage cinématographique ouest-africain, elle est élue en mai 2022 présidente de la Fédération Nationale des Ciné-Clubs et Associations cinématographiques du Burkina Faso (FNCA), puis présidente de la Confédération AES du Cinéma. Elle est Chevalier de l'Ordre du Mérite des Arts, des Lettres et de la Communication du Burkina Faso.`;


const DISTINCTIONS = [
  { annee: "2026", texte: "Sélection en première mondiale à Visions du Réel — « Djeliya, mémoire du Mandé »" },
  { annee: "2025", texte: "Coproduction internationale avec la Finlande — « Katseiden alla »" },
  { annee: "2022", texte: "Présidente de la Fédération Nationale des Ciné-Clubs du Burkina Faso (FNCA)" },
  { annee: "2022", texte: "Présidente de la Confédération AES du Cinéma" },
  { annee: "2021", texte: "Grand Prix du Président du Faso au FESPACO — « Sur les traces d'un migrant »" },
  { annee: "2018", texte: "Prix du Public — Festival des Identités Culturelles de Ouagadougou" },
  { annee: "2018", texte: "Chevalier de l'Ordre du Mérite des Arts, des Lettres et de la Communication" },
  { annee: "2017", texte: "Prix Nomadis Images — Ouaga Producers Lab" },
  { annee: "2017", texte: "Lauréate du programme B-Faso Creative (Africalia)" },
  { annee: "2011", texte: "Fondation de Pilumpiku Production à Ouagadougou" },
];

export default function About() {
  useSeo({
    title: "À Propos",
    description:
      "Découvrez l'histoire, la vision et l'équipe de Pilumpiku Production, société de production cinématographique fondée en 2011 à Ouagadougou par Mamounata Nikiéma.",
  });

  const { data: settings } = useGetSiteSettings();

  const histoire = settings?.aboutHistoire || HISTOIRE_FALLBACK;
  const vision = settings?.aboutVision || VISION_FALLBACK;
  const founderName = settings?.founderName || "Mamounata Nikiéma";
  const founderTitle = settings?.founderTitle || "Fondatrice · Réalisatrice & Productrice · Présidente FNCA";
  const founderBio = settings?.founderBio || FOUNDER_BIO_FALLBACK;
  const founderImage = settings?.founderImage || "/img/mamounata-spla.jpg";

  return (
    <div className="flex flex-col w-full bg-background pt-20 sm:pt-24">

      {/* Hero */}
      <section className="relative min-h-[44vh] sm:h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/img/fespaco.jpg"
            alt="FESPACO — Festival Panafricain du Cinéma de Ouagadougou"
            className="w-full h-full object-cover"
            loading="lazy"
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
              <h2 className="font-serif text-3xl mb-6 text-primary">Les Racines</h2>
              <p className="text-muted-foreground font-light leading-relaxed whitespace-pre-line" data-testid="text-about-histoire">
                {histoire}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card p-6 sm:p-10 md:p-12 border border-border/50 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <h2 className="font-serif text-3xl mb-6 text-foreground">Notre Vision</h2>
              <p className="text-lg sm:text-xl font-serif italic text-muted-foreground leading-relaxed whitespace-pre-line" data-testid="text-about-vision">
                {vision}
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

      {/* Partenariats */}
      <section className="py-12 sm:py-16 bg-card border-y border-border/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10"
          >
            <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-2">Partenariats & Coproductions</h3>
            <p className="text-muted-foreground font-light text-sm max-w-lg mx-auto">
              Pilumpiku collabore avec des structures de production en Côte d'Ivoire, Niger, Sénégal, Mali, Togo, Cameroun, Gabon, Finlande, France et au-delà.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 text-xs uppercase tracking-widest text-muted-foreground/60"
          >
            {["Burkina Faso", "Côte d'Ivoire", "Sénégal", "Mali", "Togo", "Niger", "Cameroun", "Gabon", "Finlande", "France", "Belgique", "Canada"].map((pays) => (
              <span key={pays} className="border border-border/30 px-3 py-2">{pays}</span>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
}

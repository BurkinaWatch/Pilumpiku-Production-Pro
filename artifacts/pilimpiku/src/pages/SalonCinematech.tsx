import { motion } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import { Monitor, Package, Lightbulb, Users, Trophy, ChevronDown, Mail, Phone } from "lucide-react";

const programmes = [
  {
    id: "exposition",
    icon: Package,
    label: "Exposition-vente de matériels",
    accentColor: "#E8921A",
    bordure: "border-[#E8921A]/40",
    couleur: "from-[#E8921A]/20 to-transparent",
    description:
      "Un espace dédié à la découverte et à l'acquisition de matériels professionnels pour le cinéma et l'audiovisuel. Caméras, éclairages, accessoires de prise de vue et de son — les meilleures marques du secteur présentent leurs équipements aux professionnels et passionnés.",
    details: [
      "Matériels caméra, son & lumière",
      "Démonstrations live par les fabricants",
      "Tarifs préférentiels pour les professionnels accrédités",
      "Ouvert au grand public & aux étudiants",
    ],
  },
  {
    id: "symposium",
    icon: Lightbulb,
    label: "Symposium Technologie & Innovation",
    accentColor: "#C9A84C",
    bordure: "border-[#C9A84C]/40",
    couleur: "from-[#C9A84C]/20 to-transparent",
    description:
      "Un espace de réflexion et d'échanges autour des mutations technologiques qui transforment le secteur cinématographique et audiovisuel en Afrique. Experts, innovateurs et professionnels se réunissent pour anticiper l'avenir de l'industrie.",
    details: [
      "Panels d'experts & tables rondes",
      "Innovation numérique & IA dans le cinéma",
      "Enjeux de la distribution africaine",
      "Accès ouvert sur inscription",
    ],
  },
  {
    id: "ateliers",
    icon: Users,
    label: "Ateliers Découvertes pour les Jeunes",
    accentColor: "#D4783A",
    bordure: "border-[#D4783A]/40",
    couleur: "from-[#D4783A]/20 to-transparent",
    description:
      "Des ateliers pratiques et ludiques conçus pour initier la jeune génération aux métiers du cinéma et de l'audiovisuel. Réalisation, montage, prise de son, lumière — les jeunes talents découvrent les coulisses du 7e art entre les mains de professionnels passionnés.",
    details: [
      "Sessions pratiques sur les métiers techniques",
      "Encadrés par des professionnels du secteur",
      "Ouverts aux élèves, lycéens & étudiants",
      "Matériel fourni — inscription obligatoire",
    ],
  },
  {
    id: "concours",
    icon: Trophy,
    label: "Concours des Étudiants en Cinéma",
    accentColor: "#A67C52",
    bordure: "border-[#A67C52]/40",
    couleur: "from-[#A67C52]/20 to-transparent",
    description:
      "Une compétition dédiée aux étudiants en cinéma spécialisés dans les métiers techniques. Courts métrages, documentaires, essais visuels — les jeunes créateurs présentent leurs œuvres devant un jury professionnel et concourent pour des prix qui propulsent leur carrière.",
    details: [
      "Catégories : image, son, montage, réalisation",
      "Jury composé de professionnels reconnus",
      "Prix et opportunités de production",
      "Dépôt de candidature en ligne",
    ],
  },
];

const chiffres = [
  { valeur: "2018", label: "Première édition", detail: "Lancé sous le nom Ciné-Équipement", accent: "#E8921A" },
  { valeur: "4", label: "Programmes", detail: "Exposition, Symposium, Ateliers, Concours", accent: "#C9A84C" },
  { valeur: "ICC", label: "Focus Industries Créatives", detail: "Au service de toute la filière culturelle", accent: "#D4783A" },
];

export default function SalonCinematech() {
  useSeo({
    title: "Salon CinémaTECH — Pilumpiku Production",
    description:
      "Le Salon CinémaTECH est un rendez-vous incontournable dédié à la technologie et à l'innovation dans le cinéma et l'audiovisuel au Burkina Faso. Exposition-vente, symposium, ateliers jeunes et concours étudiants.",
  });

  const scrollToContent = () => {
    const el = document.getElementById("cinematech-content");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">

      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-28 sm:pt-52 sm:pb-36 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary/8 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 max-w-[60px] bg-primary/60" />
              <span className="text-primary text-xs uppercase tracking-[0.3em] font-light">
                Pilumpiku Production · Ouagadougou
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl md:text-9xl text-foreground leading-none mb-6">
              Salon
              <br />
              <span className="text-primary italic">CinémaTECH</span>
            </h1>

            <p className="text-muted-foreground text-lg sm:text-xl font-light max-w-2xl leading-relaxed">
              Le rendez-vous burkinabè dédié à la technologie, à l'innovation
              et aux métiers du cinéma et de l'audiovisuel. Exposition,
              symposium, ateliers et compétition réunis en un même lieu.
            </p>
          </motion.div>

          <motion.button
            onClick={scrollToContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-10 flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-widest hover:text-primary transition-colors group"
          >
            <span>Découvrir le programme</span>
            <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform duration-300" />
          </motion.button>
        </div>
      </section>

      {/* ─── Chiffres clés ───────────────────────────────────────── */}
      <section className="py-12 sm:py-16 border-y border-border/40 bg-card/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {chiffres.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative overflow-hidden bg-card border border-border/50 p-7 group"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at top left, ${c.accent}12, transparent 70%)` }}
                />
                <div className="relative z-10">
                  <div className="font-serif text-5xl sm:text-6xl mb-3 font-light" style={{ color: c.accent }}>
                    {c.valeur}
                  </div>
                  <div className="text-foreground text-sm uppercase tracking-widest mb-2">{c.label}</div>
                  <div className="h-px w-8 mb-3" style={{ background: c.accent + "60" }} />
                  <p className="text-muted-foreground text-xs font-light leading-relaxed">{c.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── À propos ────────────────────────────────────────────── */}
      <section id="cinematech-content" className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-primary/60" />
                <span className="text-primary text-[0.65rem] uppercase tracking-[0.3em]">Notre mission</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
                Technologie &<br />
                <span className="text-primary italic">Cinéma</span> réunis
              </h2>
              <div className="space-y-4 text-muted-foreground font-light leading-relaxed text-sm sm:text-base">
                <p>
                  Le <strong className="text-foreground font-normal">Salon CinémaTECH</strong> est
                  né de la volonté de Pilumpiku Production de créer un pont entre les
                  professionnels de l'image et les acteurs du monde technologique.
                  Lancé en 2018 sous le nom Ciné-Équipement, il a évolué pour devenir
                  un rendez-vous annuel ancré dans le paysage cinématographique burkinabè.
                </p>
                <p>
                  Il réunit exposants, experts, enseignants et étudiants autour d'une
                  ambition commune : <em className="text-foreground">propulser l'audiovisuel
                  africain par l'accès aux outils, aux savoirs et aux réseaux</em>.
                </p>
                <p>
                  En partenariat étroit avec le <strong className="text-foreground font-normal">Labo Piiulgu</strong>,
                  le Salon CinémaTECH structure une filière locale capable de rivaliser
                  sur les marchés internationaux, notamment grâce au programme
                  <em> Piiulgu Pic Th</em> de pitch en anglais.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-sm bg-card border border-border/50 p-10 sm:p-14 flex flex-col items-center justify-center text-center min-h-[340px]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                <Monitor size={64} className="text-primary/40 mb-6" />
                <p className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-4">
                  «&nbsp;L'outil au service<br/>
                  <span className="text-primary italic">de la création&nbsp;»</span>
                </p>
                <p className="text-muted-foreground text-xs font-light uppercase tracking-widest">
                  Pilumpiku Production · Ouagadougou, Burkina Faso
                </p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-primary/20 rounded-sm -z-10" />
              <div className="absolute -top-4 -left-4 w-20 h-20 border border-primary/10 rounded-sm -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Programmes ──────────────────────────────────────────── */}
      <section id="exposition" className="py-16 sm:py-24 bg-card/30 border-y border-border/40">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-primary/60" />
              <span className="text-primary text-[0.65rem] uppercase tracking-[0.3em]">Au programme</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground mb-3">
              Nos quatre piliers
            </h2>
            <p className="text-muted-foreground font-light max-w-xl">
              Quatre espaces complémentaires pour couvrir tous les aspects de la
              technologie cinématographique, de l'équipement à la formation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programmes.map((prog, i) => {
              const Icon = prog.icon;
              return (
                <motion.div
                  key={prog.id}
                  id={prog.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative overflow-hidden bg-card border ${prog.bordure} p-7 sm:p-9 group hover:border-opacity-80 transition-all duration-300`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${prog.couleur} opacity-60 pointer-events-none`} />
                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 rounded-sm flex items-center justify-center mb-6 border"
                      style={{ background: `${prog.accentColor}15`, borderColor: `${prog.accentColor}40`, color: prog.accentColor }}
                    >
                      <Icon size={20} />
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-4">{prog.label}</h3>
                    <p className="text-muted-foreground font-light leading-relaxed mb-6 text-sm sm:text-base">
                      {prog.description}
                    </p>
                    <ul className="space-y-2">
                      {prog.details.map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: prog.accentColor }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Contact CTA ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-primary/60" />
              <span className="text-primary text-[0.65rem] uppercase tracking-[0.3em]">Participer</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
              Rejoindre le Salon CinémaTECH
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-8">
              Vous souhaitez exposer vos équipements, soumettre une communication au
              Symposium, inscrire vos étudiants ou participer en tant que partenaire ?
              Contactez l'équipe Pilumpiku Production.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+22674690442"
                className="flex items-center gap-3 border border-primary/30 text-primary px-6 py-3 rounded-sm uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                <Phone size={14} />
                +226 74 69 04 42
              </a>
              <a
                href="/contact"
                className="flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-sm uppercase tracking-widest text-xs hover:bg-secondary transition-colors duration-300"
              >
                <Mail size={14} />
                Nous contacter
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

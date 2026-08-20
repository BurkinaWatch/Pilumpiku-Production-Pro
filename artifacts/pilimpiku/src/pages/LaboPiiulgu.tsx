import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import { X, MapPin, Phone, Mail, Users, Mic2, BookOpen, HandCoins } from "lucide-react";

const programmes = [
  {
    id: "afterwork",
    icon: Mic2,
    label: "Afterwork",
    couleur: "from-[#E8921A]/20 to-transparent",
    bordure: "border-[#E8921A]/40",
    accentColor: "#E8921A",
    description:
      "Chaque mois, Labo Piiulgu accueille un(e) professionnel(le) du cinéma et de l'audiovisuel pour un échange informel autour de son métier. Networking, partage d'expérience et ambiance conviviale.",
    details: ["Focus métiers (son & mixage, production, réalisation…)", "Invités professionnels du secteur", "Format 1 heure — 17H30 / 18H30", "Réservation : 2 500 F CFA"],
  },
  {
    id: "b2b",
    icon: Users,
    label: "Rendez-vous Be to Be",
    sousLabel: "ICC SOÃSGA",
    couleur: "from-[#C9A84C]/20 to-transparent",
    bordure: "border-[#C9A84C]/40",
    accentColor: "#C9A84C",
    description:
      "Des séances individuelles d'accompagnement en entrepreneuriat créatif. Prenez rendez-vous pour un coaching personnalisé autour de votre projet dans les industries créatives et culturelles (ICC).",
    details: ["Accompagnement en Entrepreneuriat Créatif", "Sessions de 2 heures — 14H30 / 16H30", "10 000 F CFA / séance", "Sur rendez-vous uniquement"],
  },
  {
    id: "conference",
    icon: BookOpen,
    label: "Conférence Thématique",
    couleur: "from-[#8B4513]/20 to-transparent",
    bordure: "border-[#8B4513]/40",
    accentColor: "#D4783A",
    description:
      "Des conférences de fond animées par des experts des industries créatives et culturelles. Jeunesse & Innovation, journalisme culturel, critique de cinéma… Des sujets qui font avancer la filière.",
    details: ["Invités : experts des ICC", "Thématiques : innovation, culture, cinéma", "Ouvert au grand public", "Entrée libre ou sur inscription"],
  },
  {
    id: "tontine",
    icon: HandCoins,
    label: "Tontine Cinéma",
    couleur: "from-[#E8921A]/20 to-transparent",
    bordure: "border-[#E8921A]/40",
    accentColor: "#E8921A",
    description:
      "Un collectif de producteurs basé sur le principe de la tontine africaine appliqué au cinéma. Ensemble, les membres garantissent des budgets réguliers et préservent leur indépendance créative.",
    details: ["Force collective — Budget garanti", "Production régulière", "Votre indépendance créative préservée", "Contact pour rejoindre le collectif"],
  },
  {
    id: "picth",
    icon: BookOpen,
    label: "Piiulgu Pic Th",
    couleur: "from-[#4A8BA0]/20 to-transparent",
    bordure: "border-[#4A8BA0]/40",
    accentColor: "#5BA3BB",
    description:
      "Maîtrisez l'art du pitch en anglais et conquérez les marchés internationaux. Un programme de formation spécialisé pour préparer les cinéastes burkinabè à présenter leurs projets sur les grandes scènes mondiales.",
    details: ["Pitch en anglais pour marchés internationaux", "Techniques de présentation de projets", "Préparation aux marchés & co-productions", "En partenariat avec le Salon CinémalEch"],
  },
];

const evenementsArchives = [
  {
    src: "/img/labo/afterwork-claver-zongo.jpg",
    alt: "Afterwork – Claver ZONGO, Producer Manager",
    type: "Afterwork",
    date: "Avril 2025",
  },
  {
    src: "/img/labo/afterwork-producer-manager.jpg",
    alt: "Afterwork – Autour du métier de Producer Manager",
    type: "Afterwork",
    date: "Avril 2025",
  },
  {
    src: "/img/labo/espace-reunion.jpg",
    alt: "Séance de travail à l'Espace Piiulgu",
    type: "Espace",
    date: null,
  },
  {
    src: "/img/labo/afterwork-son-mixage-1.jpg",
    alt: "Afterwork – Focus Métiers : Son & Mixage",
    type: "Afterwork",
    date: "Juillet 2025",
  },
  {
    src: "/img/labo/afterwork-gueswende-porgo.jpg",
    alt: "Afterwork – Gueswende Seydou PORGO, Ingénieur Son",
    type: "Afterwork",
    date: "Juillet 2025",
  },
  {
    src: "/img/labo/rendez-vous-b2b-juillet.jpg",
    alt: "Rendez-vous Be to Be / ICC SOÃSGA",
    type: "Be to Be",
    date: "Juillet 2025",
  },
  {
    src: "/img/labo/conference-vincent-koala.jpg",
    alt: "Conférence – Vincent KOALA, Jeunesse & Innovation dans les ICC",
    type: "Conférence",
    date: null,
  },
  {
    src: "/img/labo/tontine-cinema.jpg",
    alt: "Tontine Cinéma – Un collectif de producteurs",
    type: "Tontine",
    date: null,
  },
  {
    src: "/img/labo/afterwork-annick-kandolo.jpg",
    alt: "Afterwork – Annick Rachel KANDOLO, Journalisme Culturel & Critique de Cinéma",
    type: "Afterwork",
    date: "Septembre 2025",
  },
  {
    src: "/img/labo/rendez-vous-b2b-nikiema.jpg",
    alt: "Rendez-vous Be to Be – Mamounata NIKIEMA",
    type: "Be to Be",
    date: "Octobre 2025",
  },
  {
    src: "/img/labo/espace-interview.jpg",
    alt: "Entretien à l'Espace Piiulgu",
    type: "Espace",
    date: null,
  },
  {
    src: "/img/labo/afterwork-esther-barry.jpg",
    alt: "Afterwork Cinéma – Esther BARRY, Directrice de la Photographie",
    type: "Afterwork",
    date: "Octobre 2025",
  },
  {
    src: "/img/labo/espace-audience.jpg",
    alt: "Participants à un événement Labo Piiulgu",
    type: "Espace",
    date: null,
  },
  {
    src: "/img/labo/conference-strategie-serie.jpg",
    alt: "Conférence – Stratégies de production et coproduction d'une série",
    type: "Conférence",
    date: "Novembre 2025",
  },
  {
    src: "/img/labo/conference-speaker.jpg",
    alt: "Intervenant lors d'une conférence Labo Piiulgu",
    type: "Conférence",
    date: null,
  },
  {
    src: "/img/labo/afterwork-mamadou-gnanou.jpg",
    alt: "Afterwork Cinéma – Mamadou M. GNANOU, Producteur / Réalisateur",
    type: "Afterwork",
    date: "Novembre 2025",
  },
  {
    src: "/img/labo/espace-conference-nuit.jpg",
    alt: "Soirée de conférence à l'Espace Piiulgu",
    type: "Espace",
    date: null,
  },
  {
    src: "/img/labo/piiulgu-pic-th.jpg",
    alt: "Piiulgu Pic Th – Maîtrisez l'art du pitch en anglais",
    type: "Pic Th",
    date: null,
  },
  {
    src: "/img/labo/afterwork-laure-guire.jpg",
    alt: "Afterwork Cinéma – Laure Azoumi GUIRE, Actrice & Metteuse en scène",
    type: "Afterwork",
    date: "Mars 2026",
  },
  {
    src: "/img/labo/espace-coworking.jpg",
    alt: "Espace Coworking Labo Piiulgu – Vue extérieure",
    type: "Espace",
    date: null,
  },
  {
    src: "/img/labo/espace-labo-interieur.jpg",
    alt: "Intérieur du Labo Piiulgu – Séance de travail",
    type: "Espace",
    date: null,
  },
];

const evenementsRecents = [
  {
    src: "/img/labo/afterwork-producer-manager-2025.jpg",
    alt: "Afterwork autour du métier de Producer Manager",
    type: "Afterwork",
    date: "Avril 2025",
  },
  {
    src: "/img/labo/afterwork-claver-zongo-2025.jpg",
    alt: "Afterwork avec Claver Zongo, Producer Manager",
    type: "Afterwork",
    date: "Avril 2025",
  },
  {
    src: "/img/labo/rendez-vous-b2b-icc-soasga-2025.jpg",
    alt: "Rendez-vous Be to Be ICC SOÃSGA en entrepreneuriat créatif",
    type: "Be to Be",
    date: "Juillet 2025",
  },
  {
    src: "/img/labo/afterwork-son-mixage-juillet-2025.jpg",
    alt: "Afterwork Cinéma, focus métiers : son et mixage",
    type: "Afterwork",
    date: "Juillet 2025",
  },
  {
    src: "/img/labo/afterwork-gueswende-porgo-2025.jpg",
    alt: "Afterwork Son et Mixage avec Gueswende Seydou Porgo",
    type: "Afterwork",
    date: "Juillet 2025",
  },
  {
    src: "/img/labo/tontine-cinema-2025.jpg",
    alt: "Tontine Cinéma, le collectif des producteurs",
    type: "Tontine",
    date: "2025",
  },
  {
    src: "/img/labo/espace-piiulgu-rencontre.jpg",
    alt: "Temps d'échange collectif à l'Espace Piiulgu",
    type: "Espace",
    date: "2025",
  },
  {
    src: "/img/labo/afterwork-annick-kandolo-2025.jpg",
    alt: "Afterwork avec Annick Rachel Kandolo, journaliste et critique de cinéma",
    type: "Afterwork",
    date: "Septembre 2025",
  },
  {
    src: "/img/labo/espace-piiulgu-interview.jpg",
    alt: "Entretien enregistré à l'Espace Piiulgu",
    type: "Espace",
    date: "2025",
  },
  {
    src: "/img/labo/rendez-vous-b2b-mamounata-nikiema-2025.jpg",
    alt: "Rendez-vous Be to Be avec Mamounata Nikiema",
    type: "Be to Be",
    date: "Octobre 2025",
  },
];

const evenements = [...evenementsRecents, ...evenementsArchives];

const typeBadgeColors: Record<string, string> = {
  Afterwork: "bg-[#E8921A]/20 text-[#E8921A] border-[#E8921A]/30",
  "Be to Be": "bg-[#C9A84C]/20 text-[#C9A84C] border-[#C9A84C]/30",
  Conférence: "bg-[#D4783A]/20 text-[#D4783A] border-[#D4783A]/30",
  Tontine: "bg-[#E8921A]/20 text-[#E8921A] border-[#E8921A]/30",
  "Pic Th": "bg-[#5BA3BB]/20 text-[#5BA3BB] border-[#5BA3BB]/30",
  Espace: "bg-white/10 text-white/60 border-white/20",
};

export default function LaboPiiulgu() {
  useSeo({
    title: "Labo Piiulgu",
    description:
      "Le Labo Piiulgu est un espace de développement professionnel dédié aux acteurs des industries créatives : Afterwork, Rendez-vous Be to Be, Conférences thématiques, Tontine Cinéma.",
  });

  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i === null ? null : (i - 1 + evenements.length) % evenements.length));
  const next = () => setLightbox((i) => (i === null ? null : (i + 1) % evenements.length));

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 max-w-[60px] bg-primary/60" />
              <span className="text-primary text-xs uppercase tracking-[0.3em] font-light">
                Espace Piiulgu · Kologh-Naaba
              </span>
            </div>
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-foreground leading-none mb-6">
              Labo
              <br />
              <span className="text-primary italic">Piiulgu</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl font-light max-w-2xl leading-relaxed">
              Un espace de développement professionnel dédié aux acteurs
              des industries créatives et culturelles au Burkina Faso.
              Rencontres, formation, accompagnement et entraide.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap gap-6 mt-10 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-primary shrink-0" />
              <span>Espace Piiulgu / Pilumpiku Production — Kologh-Naaba, Ouagadougou</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-primary shrink-0" />
              <span>+226 74 69 04 42</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-primary shrink-0" />
              <span>piiulgu@gmail.com</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Programmes ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground mb-3">
              Nos programmes
            </h2>
            <p className="text-muted-foreground font-light max-w-xl">
              Quatre dispositifs complémentaires pour accompagner les professionnels
              des ICC à chaque étape de leur parcours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programmes.map((prog, i) => {
              const Icon = prog.icon;
              return (
                <motion.div
                  key={prog.id}
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
                      style={{
                        background: `${prog.accentColor}15`,
                        borderColor: `${prog.accentColor}40`,
                        color: prog.accentColor,
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-1">
                      {prog.label}
                    </h3>
                    {prog.sousLabel && (
                      <p className="text-xs uppercase tracking-widest mb-4" style={{ color: prog.accentColor }}>
                        {prog.sousLabel}
                      </p>
                    )}

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

      {/* ─── Galerie événements ───────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-primary/60" />
              <span className="text-primary text-[0.65rem] uppercase tracking-[0.3em]">
                Carnet vivant
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground mb-3">
              La vie du Labo
            </h2>
            <p className="text-muted-foreground font-light max-w-2xl">
              Des rencontres qui circulent d&apos;une voix à l&apos;autre : métiers,
              échanges, accompagnements et élans collectifs au cœur de Piiulgu.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-4 sm:gap-6 mb-4 sm:mb-6">
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => openLightbox(0)}
              className="group relative overflow-hidden rounded-[2.5rem_0.75rem_2.5rem_0.75rem] border border-primary/20 bg-card text-left"
            >
              <img
                src={evenements[0].src}
                alt={evenements[0].alt}
                className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute left-5 right-5 bottom-5 sm:left-7 sm:right-7 sm:bottom-7">
                <span className={`inline-block text-[0.6rem] uppercase tracking-wider px-2 py-0.5 border rounded-sm mb-3 ${typeBadgeColors[evenements[0].type]}`}>
                  {evenements[0].type}
                </span>
                <p className="font-serif text-2xl sm:text-3xl text-white leading-tight">
                  Métiers, voix &amp; trajectoires
                </p>
                <p className="text-white/70 text-xs sm:text-sm mt-2">
                  Cliquez pour découvrir l&apos;affiche en grand format
                </p>
              </div>
            </motion.button>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
              {[1, 2].map((i) => {
                const ev = evenements[i];
                return (
                  <motion.button
                    key={ev.src}
                    type="button"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => openLightbox(i)}
                    className={`group relative overflow-hidden border border-border/50 bg-card text-left ${
                      i === 1
                        ? "rounded-[0.75rem_2rem_0.75rem_2rem]"
                        : "rounded-[2rem_0.75rem_2rem_0.75rem]"
                    }`}
                  >
                    <img
                      src={ev.src}
                      alt={ev.alt}
                      className="w-full h-full min-h-[180px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                    <span className={`absolute left-3 bottom-3 text-[0.55rem] uppercase tracking-wider px-2 py-0.5 border rounded-sm ${typeBadgeColors[ev.type]}`}>
                      {ev.type}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4">
            {evenements.slice(3).map((ev, i) => {
              const eventIndex = i + 3;
              const organicShape = eventIndex % 3 === 0
                ? "rounded-[1.75rem_0.5rem_1.75rem_0.5rem]"
                : eventIndex % 3 === 1
                  ? "rounded-[0.5rem_1.75rem_0.5rem_1.75rem]"
                  : "rounded-[1rem]";

              return (
              <motion.div
                key={ev.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.07 }}
                className={`break-inside-avoid mb-3 sm:mb-4 group relative overflow-hidden cursor-pointer ${organicShape}`}
                onClick={() => openLightbox(eventIndex)}
              >
                <img
                  src={ev.src}
                  alt={ev.alt}
                  className="w-full block object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100">
                  <span
                    className={`self-start text-[0.6rem] uppercase tracking-wider px-2 py-0.5 border rounded-sm mb-1 ${typeBadgeColors[ev.type] ?? ""}`}
                  >
                    {ev.type}
                  </span>
                  {ev.date && (
                    <span className="text-white/80 text-xs">{ev.date}</span>
                  )}
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Contact CTA ──────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-card/30 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
              Rejoindre le Labo Piiulgu
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-8">
              Vous souhaitez participer à un Afterwork, prendre rendez-vous pour un
              accompagnement, ou rejoindre la Tontine Cinéma ? Contactez-nous.
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
                href="mailto:piiulgu@gmail.com"
                className="flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-sm uppercase tracking-widest text-xs hover:bg-secondary transition-colors duration-300"
              >
                <Mail size={14} />
                piiulgu@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Lightbox ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-5 right-5 text-white/70 hover:text-white p-2 z-10"
              onClick={closeLightbox}
              aria-label="Fermer"
            >
              <X size={28} />
            </button>

            <button
              className="absolute left-3 sm:left-6 text-white/50 hover:text-white text-3xl sm:text-4xl font-thin p-3 z-10 select-none"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Précédent"
            >
              ‹
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-[90vh] max-w-[90vw] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={evenements[lightbox].src}
                alt={evenements[lightbox].alt}
                className="max-h-[80vh] max-w-[88vw] object-contain rounded-sm"
              />
              <div className="mt-4 text-center">
                <span
                  className={`inline-block text-[0.6rem] uppercase tracking-wider px-2 py-0.5 border rounded-sm mr-2 ${typeBadgeColors[evenements[lightbox].type] ?? ""}`}
                >
                  {evenements[lightbox].type}
                </span>
                <span className="text-white/60 text-sm">{evenements[lightbox].alt}</span>
              </div>
            </motion.div>

            <button
              className="absolute right-3 sm:right-6 text-white/50 hover:text-white text-3xl sm:text-4xl font-thin p-3 z-10 select-none"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Suivant"
            >
              ›
            </button>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {evenements.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === lightbox ? "bg-primary" : "bg-white/30"}`}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import {
  Play, Pause, VolumeX, Volume2, BookOpen, Film, Newspaper, Globe,
  ChevronDown, X, ExternalLink, Users, ShoppingBag, Video, Megaphone,
} from "lucide-react";
import lancementImg from "@assets/LANCEMENT_Avant_Première_1781907420364.jpg";

const rubriques = [
  { label: "Avis du cinéphile", couleur: "#C9A84C", url: "https://sulunsuku.net/?cat=24", description: "Opinions et critiques de cinéphiles passionnés" },
  { label: "Clap",              couleur: "#D4783A", url: "https://sulunsuku.net/?cat=10", description: "Coulisses et journées sur les plateaux de tournage" },
  { label: "Eclairage",         couleur: "#E8921A", url: "https://sulunsuku.net/?cat=19", description: "Portraits et analyses de professionnels du cinéma" },
  { label: "En Salle",          couleur: "#B8860B", url: "https://sulunsuku.net/?cat=11", description: "Films africains actuellement à l'affiche" },
  { label: "Festivals",         couleur: "#CD853F", url: "https://sulunsuku.net/?cat=12", description: "Couverture des grands festivals de cinéma africain" },
  { label: "Hommages",          couleur: "#A67C52", url: "https://sulunsuku.net/?cat=20", description: "Tributs aux figures emblématiques du 7e art" },
  { label: "Regard",            couleur: "#8B6914", url: "https://sulunsuku.net/?cat=14", description: "Critiques et perspectives sur les œuvres" },
  { label: "Vie de Star",       couleur: "#D2691E", url: "https://sulunsuku.net/?cat=23", description: "Actualité des artistes et cinéastes africains" },
  { label: "Zoom Sur",          couleur: "#C9853F", url: "https://sulunsuku.net/?cat=22", description: "Focus thématiques sur le cinéma du continent" },
];

const articlesRecents = [
  {
    titre: "Steven Markovitz : un as de la production cinématographique",
    rubrique: "Eclairage",
    couleur: "#E8921A",
    url: "https://sulunsuku.net/?p=331",
    description: "Portrait d'un producteur visionnaire qui a façonné le paysage du cinéma africain contemporain. Fondateur de Big World Cinema, il incarne la passion au service des récits du continent.",
  },
  {
    titre: "Une journée sur le plateau de tournage",
    rubrique: "Clap",
    couleur: "#D4783A",
    url: "https://sulunsuku.net/?p=326",
    description: "Immersion dans les coulisses d'un tournage burkinabè : entre technique, patience et passion du cinéma, les équipes révèlent leur quotidien.",
  },
  {
    titre: "La vitrine du film documentaire se consolide",
    rubrique: "Festivals",
    couleur: "#E8921A",
    url: "https://sulunsuku.net/?p=322",
    description: "Le documentaire africain gagne en visibilité grâce aux festivals qui le soutiennent et lui ouvrent de nouvelles scènes internationales.",
  },
  {
    titre: "Un hommage aux morts, mais aussi aux vivants !",
    rubrique: "Festivals",
    couleur: "#CD853F",
    url: "https://sulunsuku.net/?p=319",
    description: "Reportage sur une cérémonie d'hommage qui célèbre la mémoire du passé tout en encourageant les créateurs d'aujourd'hui.",
  },
];

const articlesPortraits = [
  {
    titre: "Steven Markovitz : un as de la production cinématographique",
    rubrique: "Eclairage",
    url: "https://sulunsuku.net/?p=331",
    description: "Portrait du fondateur de Big World Cinema, producteur emblématique du cinéma africain contemporain, dont les films ont rayonné dans les plus grands festivals du monde.",
  },
];

const articlesFestivals = [
  {
    titre: "La vitrine du film documentaire se consolide",
    url: "https://sulunsuku.net/?p=322",
    description: "Comment les festivals africains et internationaux contribuent à renforcer la place du documentaire africain sur la scène mondiale.",
  },
  {
    titre: "Un hommage aux morts, mais aussi aux vivants !",
    url: "https://sulunsuku.net/?p=319",
    description: "Reportage sur une cérémonie de cinéma qui mêle mémoire et célébration des créateurs encore actifs.",
  },
  {
    titre: "Le panafricanisme honore ses héros",
    url: "https://sulunsuku.net/?p=298",
    description: "Au FESPACO, le cinéma panafricain rend hommage à ses pionniers tout en accueillant la nouvelle génération de cinéastes.",
  },
  {
    titre: "Une ouverture dédiée aux devanciers",
    url: "https://sulunsuku.net/?p=282",
    description: "La cérémonie d'ouverture du festival célèbre ceux qui ont pavé la voie pour le cinéma africain d'aujourd'hui.",
  },
];

const valeurs = [
  {
    icon: Film,
    titre: "Documentaire & Fiction",
    texte: "Spécialisée dans la réalisation de films documentaires, Sulunsuku Production met en lumière les figures emblématiques du cinéma africain et burkinabè.",
    accent: "#E8921A",
  },
  {
    icon: Newspaper,
    titre: "Journalisme Culturel",
    texte: "Avec «\u00a0Avant-première\u00a0», le premier magazine cinéma en ligne du Burkina Faso, Sulunsuku production couvre l'actualité du 7e art avec une équipe entièrement féminine.",
    accent: "#C9A84C",
  },
  {
    icon: Globe,
    titre: "Rayonnement Africain",
    texte: "Valoriser le cinéma burkinabè et africain sur la scène internationale, promouvoir le pays des Hommes intègres comme terre de création et d'excellence cinématographique.",
    accent: "#D4783A",
  },
  {
    icon: BookOpen,
    titre: "Formation & Transmission",
    texte: "Sulunsuku Production accompagne la jeune génération de cinéastes, partage les savoirs et crée des ponts entre les professionnels du secteur audiovisuel.",
    accent: "#A67C52",
  },
];

const ressources = [
  {
    id: "repertoire",
    icon: Users,
    titre: "Répertoire des Professionnels africains",
    accent: "#E8921A",
    description: "Un annuaire vivant qui réunit réalisateurs, producteurs, techniciens, distributeurs et diffuseurs du continent africain. Retrouver les acteurs de l'industrie, construire des collaborations, renforcer le réseau panafricain du cinéma.",
    items: [
      "Réalisateurs & réalisatrices",
      "Producteurs indépendants",
      "Techniciens & équipes de tournage",
      "Distributeurs & diffuseurs",
      "Festivals & programmateurs",
    ],
  },
  {
    id: "boutique",
    icon: ShoppingBag,
    titre: "Boutique en ligne",
    accent: "#C9A84C",
    description: "Un espace dédié à l'acquisition de films africains, livres sur le cinéma du continent, supports audiovisuels et objets de la culture cinématographique burkinabè. Soutenir les œuvres en les achetant, c'est aussi un geste militant.",
    items: [
      "Films documentaires en VOD",
      "DVD & supports physiques",
      "Livres & revues spécialisées",
      "Affiches & objets collectors",
      "Abonnements magazines",
    ],
  },
  {
    id: "masterclass",
    icon: Video,
    titre: "Master class vidéo",
    accent: "#D4783A",
    description: "Des formations animées par des professionnels reconnus du cinéma africain — réalisateurs primés, producteurs expérimentés, monteurs, chefs opérateurs. Apprendre par ceux qui font, transmettre par ceux qui savent.",
    items: [
      "Écriture de scénario documentaire",
      "Production & financement de films",
      "Prise de vue & direction photo",
      "Montage & post-production",
      "Distribution & promotion internationale",
    ],
  },
  {
    id: "promotion",
    icon: Megaphone,
    titre: "Promotion des œuvres africaines",
    accent: "#A67C52",
    description: "Accompagner la visibilité des films africains : stratégies de diffusion, soumission aux festivals, relations presse, campagnes numériques. Parce qu'une œuvre mérite d'être vue, et que la visibilité se construit.",
    items: [
      "Stratégie festivals internationaux",
      "Relations presse & médias",
      "Présence sur les plateformes VOD",
      "Campagnes de communication",
      "Réseau de diffusion panafricain",
    ],
  },
];

export default function Sulunsuku() {
  useSeo({
    title: "Sulunsuku — Pilumpiku Production",
    description:
      "Sulunsuku Production, entreprise spécialisée dans la réalisation de films documentaires. Découvrez «\u00a0Avant-première\u00a0», le magazine cinéma en ligne dédié au 7e art burkinabè et africain.",
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const generiqueRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [pressOpen, setPressOpen] = useState(false);
  const [generiqueActive, setGeneriqueActive] = useState(
    () => !sessionStorage.getItem("sulunsuku_generique_played"),
  );
  const [generiqueReady, setGeneriqueReady] = useState(false);

  const skipGenerique = () => {
    sessionStorage.setItem("sulunsuku_generique_played", "1");
    setGeneriqueActive(false);
  };

  useEffect(() => {
    if (!generiqueActive) return;
    const video = generiqueRef.current;
    if (!video) return;
    video.muted = false;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }, []);

  useEffect(() => {
    if (generiqueActive) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => setIsPlaying(false));
    }
  }, [generiqueActive]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { video.play(); setIsPlaying(true); }
    else { video.pause(); setIsPlaying(false); }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const scrollToContent = () => {
    const el = document.getElementById("sulunsuku-content");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">

      {/* ─── Générique ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {generiqueActive && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] bg-black flex items-center justify-center overflow-hidden"
          >
            <video
              ref={generiqueRef}
              src="/video/Sulunsuku_generique.mp4"
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${generiqueReady ? "opacity-100" : "opacity-0"}`}
              onCanPlay={() => setGeneriqueReady(true)}
              onEnded={skipGenerique}
            />
            {!generiqueReady && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-center"
                >
                  <div className="font-serif text-4xl text-white/20 tracking-widest">Sulun<span className="italic text-primary/40">suku</span></div>
                </motion.div>
              </div>
            )}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              onClick={skipGenerique}
              className="absolute bottom-8 right-8 flex items-center gap-3 bg-white/15 hover:bg-white/25 border border-white/50 hover:border-white text-white text-sm uppercase tracking-[0.2em] px-5 py-3 backdrop-blur-sm transition-all duration-200"
              aria-label="Passer le générique"
            >
              <span>Passer</span>
              <ChevronDown size={14} className="rotate-[-90deg]" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Hero Cinématique ────────────────────────────────────────── */}
      <section className="relative w-full h-screen min-h-[600px] flex items-end overflow-hidden">
        <video
          ref={videoRef}
          src="/video/ANIMATION_SULUNSUKU_avec_musique_1781907420363.mp4"
          loop
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
          onCanPlay={() => setVideoReady(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent pointer-events-none" />
        {!videoReady && (
          <div className="absolute inset-0 bg-background">
            <img src="/img/sulunsuku.webp" alt="Sulunsuku" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          </div>
        )}
        <div className="absolute top-28 right-5 sm:right-8 flex gap-2 z-20">
          <button onClick={togglePlay} className="w-9 h-9 rounded-sm border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-all duration-200" aria-label={isPlaying ? "Pause" : "Lecture"}>
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button onClick={toggleMute} className="w-9 h-9 rounded-sm border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-all duration-200" aria-label={isMuted ? "Activer le son" : "Couper le son"}>
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 pb-16 sm:pb-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-12 bg-primary/60" />
              <span className="text-primary text-[0.65rem] uppercase tracking-[0.35em] font-light">Pilumpiku Production · Ouagadougou</span>
            </div>
            <h1 className="font-serif text-7xl sm:text-9xl md:text-[10rem] lg:text-[12rem] text-foreground leading-none tracking-tight mb-4">
              Sulun<span className="text-primary italic">suku</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg font-light max-w-lg leading-relaxed">
              Entreprise spécialisée dans la réalisation de films documentaires, au service du 7<sup>e</sup> art burkinabè et africain.
            </p>
          </motion.div>
          <motion.button onClick={scrollToContent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="mt-10 flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-widest hover:text-primary transition-colors group">
            <span>Découvrir</span>
            <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform duration-300" />
          </motion.button>
        </div>
      </section>

      {/* ─── Manifeste ──────────────────────────────────────────────── */}
      <section id="sulunsuku-content" className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-primary/60" />
                <span className="text-primary text-[0.65rem] uppercase tracking-[0.3em]">Notre identité</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
                Raconter <br /><span className="text-primary italic">l'Afrique</span> par <br />l'image
              </h2>
              <div className="space-y-4 text-muted-foreground font-light leading-relaxed text-sm sm:text-base">
                <p>
                  Fondée à Ouagadougou, Sulunsuku Production est une entreprise spécialisée dans la réalisation de films documentaires. Notre mission&nbsp;: mettre en lumière l'expérience de figures emblématiques du cinéma africain, valoriser les créateurs et créatrices qui font rayonner le 7<sup>e</sup> art burkinabè.
                </p>
                <p>
                  Portée par une équipe de femmes dévouées à la réussite du projet, dirigée par <strong className="text-foreground font-normal">Mamounata Nikiéma</strong>, Sulunsuku Production ambitionne de promouvoir le cinéma du pays des Hommes intègres et du continent africain sur toutes les scènes du monde.
                </p>
                <p>
                  Le nom <em className="text-primary">Sulunsuku</em> porte en lui l'essence de cette vision&nbsp;: une parole, une image, une mémoire vivante transmise de génération en génération.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} className="relative">
              <div className="relative overflow-hidden rounded-sm aspect-[4/5]">
                <img src="/img/sulunsuku.webp" alt="Sulunsuku Production" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="h-px w-10 bg-primary mb-3" />
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Pilumpiku Production · Ouagadougou, Burkina Faso</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-primary/20 rounded-sm -z-10" />
              <div className="absolute -top-4 -left-4 w-20 h-20 border border-primary/10 rounded-sm -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Avant-première Magazine ─────────────────────────────────── */}
      <section id="avant-premiere" className="py-20 sm:py-32 bg-card/30 border-y border-border/40">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-10 bg-primary/60" />
              <span className="text-primary text-[0.65rem] uppercase tracking-[0.3em]">Le magazine</span>
              <div className="h-px w-10 bg-primary/60" />
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-foreground mb-6">«&nbsp;Avant-première&nbsp;»</h2>
            <p className="text-muted-foreground font-light text-base sm:text-lg leading-relaxed">
              Le premier magazine bimensuel en ligne dédié au cinéma au Burkina Faso. Lancé officiellement le <strong className="text-foreground font-normal">24 janvier 2019</strong> à Ouagadougou, en présence du représentant du Ministère de la Culture, des Arts et du Tourisme.
            </p>
            <div className="mt-6">
              <a href="https://sulunsuku.net" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-widest hover:underline">
                Lire le magazine sur sulunsuku.net <ExternalLink size={11} />
              </a>
            </div>
          </motion.div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { chiffre: "2019", label: "Année de lancement", detail: "Lancé officiellement le 24 janvier 2019 à Ouagadougou", accent: "#E8921A" },
              { chiffre: "9",    label: "Rubriques éditoriales", detail: "Avis du cinéphile, Clap, Eclairage, En Salle, Festivals, Hommages, Regard, Vie de Star, Zoom Sur", accent: "#C9A84C" },
              { chiffre: "100%", label: "Équipe féminine", detail: "Une rédaction composée uniquement de femmes dévouées", accent: "#D4783A" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="relative overflow-hidden bg-card border border-border/50 p-8 group">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse at top left, ${item.accent}10, transparent 70%)` }} />
                <div className="relative z-10">
                  <div className="font-serif text-5xl sm:text-6xl mb-3 font-light" style={{ color: item.accent }}>{item.chiffre}</div>
                  <div className="text-foreground text-sm uppercase tracking-widest mb-3">{item.label}</div>
                  <div className="h-px w-8 mb-3" style={{ background: item.accent + "60" }} />
                  <p className="text-muted-foreground text-xs font-light leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rubriques — 9 vraies catégories du site */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-8 text-center">Les 9 rubriques</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {rubriques.map((r, i) => (
                <motion.a key={i} href={r.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start gap-3 px-4 py-3 border rounded-sm hover:bg-white/5 transition-all duration-200 group" style={{ borderColor: r.couleur + "40" }}>
                  <div className="w-1 h-full min-h-[2rem] rounded-full mt-0.5 shrink-0" style={{ background: r.couleur }} />
                  <div>
                    <span className="text-sm font-light text-foreground group-hover:text-primary transition-colors" style={{ color: r.couleur }}>{r.label}</span>
                    <p className="text-[0.65rem] text-muted-foreground font-light mt-0.5 leading-snug">{r.description}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Derniers articles */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-8 text-center">Derniers articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {articlesRecents.map((a, i) => (
                <motion.a key={i} href={a.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group bg-card border border-border/40 p-6 hover:border-primary/40 hover:bg-card/80 transition-all duration-300 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[0.6rem] uppercase tracking-widest font-medium px-2 py-0.5 rounded-sm" style={{ color: a.couleur, background: a.couleur + "15", border: `1px solid ${a.couleur}30` }}>{a.rubrique}</span>
                  </div>
                  <h4 className="font-serif text-base text-foreground group-hover:text-primary transition-colors leading-snug">{a.titre}</h4>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed flex-1">{a.description}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-[0.65rem] uppercase tracking-widest group-hover:gap-2 transition-all">
                    Lire l'article <ExternalLink size={10} />
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Portraits de Professionnels ─────────────────────────────── */}
      <section id="portraits" className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-primary/60" />
              <span className="text-primary text-[0.65rem] uppercase tracking-[0.3em]">Rubrique Eclairage</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground mb-4">Portraits de professionnels</h2>
            <p className="text-muted-foreground font-light text-base max-w-2xl leading-relaxed">
              La rubrique <em>Eclairage</em> d'Avant-Première donne la parole aux figures qui façonnent le cinéma africain — producteurs, réalisateurs, techniciens, distributeurs. Des récits humains au cœur d'une industrie en plein essor.
            </p>
          </motion.div>

          {articlesPortraits.map((article, i) => (
            <motion.a key={i} href={article.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-5 gap-0 bg-card border border-border/40 overflow-hidden group hover:border-primary/40 transition-colors duration-300 block mb-4">
              <div className="lg:col-span-2 bg-gradient-to-br from-[#E8921A]/10 via-[#C9A84C]/5 to-transparent flex items-center justify-center min-h-[160px] p-10 border-b lg:border-b-0 lg:border-r border-border/30">
                <div className="text-center">
                  <div className="w-16 h-px bg-primary/50 mx-auto mb-4" />
                  <span className="text-[0.6rem] uppercase tracking-[0.3em] text-primary/70">Eclairage</span>
                  <div className="w-16 h-px bg-primary/50 mx-auto mt-4" />
                </div>
              </div>
              <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-center">
                <span className="text-[0.6rem] uppercase tracking-[0.25em] text-primary/70 mb-3 block">À la une</span>
                <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-4 leading-tight group-hover:text-primary transition-colors duration-300">{article.titre}</h3>
                <p className="text-muted-foreground font-light text-sm leading-relaxed mb-6">{article.description}</p>
                <span className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-widest group-hover:gap-3 transition-all duration-200">
                  Lire sur Sulunsuku.net <ExternalLink size={11} />
                </span>
              </div>
            </motion.a>
          ))}

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8 text-center">
            <a href="https://sulunsuku.net/?cat=19" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-primary/30 text-primary px-6 py-3 rounded-sm uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
              Tous les portraits & éclairages <ExternalLink size={11} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── Couverture de festivals ──────────────────────────────────── */}
      <section id="festivals" className="py-20 sm:py-32 bg-card/30 border-y border-border/40">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-primary/60" />
              <span className="text-primary text-[0.65rem] uppercase tracking-[0.3em]">Rubrique Festivals</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <h2 className="font-serif text-3xl sm:text-5xl text-foreground mb-4">Couverture de festivals</h2>
                <p className="text-muted-foreground font-light text-base max-w-2xl leading-relaxed">
                  Du FESPACO — le plus grand festival de cinéma africain — aux festivals internationaux en Europe et en Amérique du Nord, Avant-Première suit en direct l'actualité des grands rendez-vous du 7<sup>e</sup> art africain.
                </p>
              </div>
              <a href="https://sulunsuku.net/?cat=12" target="_blank" rel="noopener noreferrer" className="shrink-0 inline-flex items-center gap-2 border border-primary/30 text-primary px-5 py-2.5 rounded-sm uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-300 whitespace-nowrap">
                Tous les festivals <ExternalLink size={11} />
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {articlesFestivals.map((a, i) => (
              <motion.a key={i} href={a.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="group bg-card border border-border/40 p-6 hover:border-primary/40 hover:bg-card/80 transition-all duration-300 flex flex-col gap-3 block">
                <div className="w-8 h-px bg-primary/50" />
                <h4 className="font-serif text-base sm:text-lg text-foreground group-hover:text-primary transition-colors leading-snug">{a.titre}</h4>
                <p className="text-xs text-muted-foreground font-light leading-relaxed flex-1">{a.description}</p>
                <span className="inline-flex items-center gap-1 text-primary text-[0.65rem] uppercase tracking-widest group-hover:gap-2 transition-all">
                  Lire l'article <ExternalLink size={10} />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Éclairages & Analyses ───────────────────────────────────── */}
      <section id="eclairages" className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-primary/60" />
              <span className="text-primary text-[0.65rem] uppercase tracking-[0.3em]">Regard critique</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground mb-4">Éclairages & analyses</h2>
            <p className="text-muted-foreground font-light text-base max-w-2xl leading-relaxed">
              Des pièces de fond sur l'état du cinéma africain : analyses économiques, critiques d'œuvres, décryptages de tendances. Comprendre l'industrie pour mieux y prendre part.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                titre: "Critiques d'œuvres",
                icone: "◆",
                texte: "Des lectures détaillées de films documentaires et de fiction africains — mise en scène, narration, portée culturelle. La rubrique <em>Regard</em> et <em>Avis du cinéphile</em> ouvrent le débat sur les œuvres.",
                lien: "https://sulunsuku.net/?cat=14",
                libelle: "Rubrique Regard",
              },
              {
                titre: "Analyses de l'industrie",
                icone: "◇",
                texte: "Production, financement, distribution : comment fonctionne l'industrie cinématographique africaine ? Qui en sont les acteurs, quels en sont les défis et les opportunités émergentes ?",
                lien: "https://sulunsuku.net/?cat=19",
                libelle: "Rubrique Eclairage",
              },
              {
                titre: "Zoom thématiques",
                icone: "○",
                texte: "Des dossiers sur des sujets transversaux — représentation des femmes dans le cinéma, cinéma de genre en Afrique, nouvelles formes documentaires, diaspora et identité.",
                lien: "https://sulunsuku.net/?cat=22",
                libelle: "Rubrique Zoom Sur",
              },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card border border-border/50 p-7 group hover:border-primary/40 transition-all duration-300">
                <div className="text-primary/50 text-2xl mb-5">{item.icone}</div>
                <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors">{item.titre}</h3>
                <p className="text-muted-foreground font-light text-sm leading-relaxed mb-5" dangerouslySetInnerHTML={{ __html: item.texte }} />
                <a href={item.lien} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary text-[0.65rem] uppercase tracking-widest hover:gap-2.5 transition-all">
                  {item.libelle} <ExternalLink size={10} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Nos valeurs ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-32 bg-card/20 border-y border-border/30">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-primary/60" />
              <span className="text-primary text-[0.65rem] uppercase tracking-[0.3em]">Ce que nous portons</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground">Notre vision</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {valeurs.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group relative overflow-hidden bg-card border border-border/50 p-7 sm:p-9 hover:border-opacity-80 transition-all duration-300">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${v.accent}0A, transparent 60%)` }} />
                  <div className="relative z-10">
                    <div className="w-11 h-11 rounded-sm flex items-center justify-center mb-6 border" style={{ background: v.accent + "15", borderColor: v.accent + "40", color: v.accent }}>
                      <Icon size={18} />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-3">{v.titre}</h3>
                    <p className="text-muted-foreground font-light text-sm leading-relaxed">{v.texte}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Presse / Lancement ─────────────────────────────────────── */}
      <section className="py-20 sm:py-32 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-primary/60" />
                <span className="text-primary text-[0.65rem] uppercase tracking-[0.3em]">La presse en parle</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground">Le lancement officiel</h2>
            </div>
            <p className="text-muted-foreground text-xs font-light sm:text-right max-w-xs leading-relaxed">
              Publié dans le quotidien burkinabè <em>Sidwaya</em>&nbsp;— janvier 2019.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="group cursor-pointer relative overflow-hidden rounded-sm" onClick={() => setPressOpen(true)}>
              <img src={lancementImg} alt="Article Sidwaya — Lancement d'Avant-première, janvier 2019" className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs uppercase tracking-widest border border-white/50 px-5 py-2 backdrop-blur-sm rounded-sm">Voir l'article</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                <p className="text-[0.6rem] text-muted-foreground uppercase tracking-widest">© Sidwaya — «&nbsp;Un journal en ligne pour la promotion du 7<sup>e</sup> art&nbsp;»</p>
              </div>
            </div>
            <div className="space-y-6 text-muted-foreground font-light leading-relaxed text-sm sm:text-base">
              <blockquote className="border-l-2 border-primary pl-5">
                <p className="text-foreground font-serif text-lg sm:text-xl italic leading-relaxed mb-2">
                  «&nbsp;Avec une équipe rédactionnelle composée uniquement de femmes dévouées à la réussite du projet, le bimensuel <em className="text-primary"> Avant-première</em> se prépare à promouvoir le cinéma du pays des Hommes intègres et du continent africain.&nbsp;»
                </p>
                <footer className="text-xs uppercase tracking-widest text-primary/80">Mamounata Nikiéma — Responsable de Sulunsuku Production</footer>
              </blockquote>
              <p>
                Consacré au 7<sup>e</sup> art, le magazine en ligne <em>Avant-première</em> a été officiellement lancé le jeudi 24 janvier 2019 à Ouagadougou. Ce support de diffusion bimensuel ambitionne de valoriser le 7<sup>e</sup> art burkinabè et africain.
              </p>
              <p>
                Le magazine est composé de neuf rubriques, parmi lesquelles <em>Vie de star</em>, <em>Éclairage</em>, <em>Zoom sur</em>, <em>Clap</em>, <em>Festivals</em>, <em>Regard</em>, <em>Avis du cinéphile</em>, <em>Hommages</em> et <em>En Salle</em>.
              </p>
              <blockquote className="border-l-2 border-primary/50 pl-5 mt-4">
                <p className="text-muted-foreground italic text-sm leading-relaxed mb-2">«&nbsp;Longue vie à cette tribune et beaucoup de courage aux initiateurs.&nbsp;»</p>
                <footer className="text-xs uppercase tracking-widest text-primary/60">Nestor Kahoun — Représentant du Ministère de la Culture</footer>
              </blockquote>
              <div className="pt-2">
                <a href="https://sulunsuku.net" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-primary/40 text-primary px-6 py-3 rounded-sm uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                  <Globe size={12} /> Visiter sulunsuku.net
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Communauté & Ressources ─────────────────────────────────── */}
      <section className="py-20 sm:py-32 bg-card/30 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-primary/60" />
              <span className="text-primary text-[0.65rem] uppercase tracking-[0.3em]">Communauté & Ressources</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground mb-4">L'écosystème Sulunsuku</h2>
            <p className="text-muted-foreground font-light text-base max-w-2xl leading-relaxed">
              Au-delà du magazine, Sulunsuku ambitionne de devenir un écosystème complet pour les professionnels et amateurs de cinéma africain.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ressources.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div key={r.id} id={r.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group relative bg-card border border-border/50 p-7 sm:p-8 hover:border-primary/40 transition-all duration-300 scroll-mt-24">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${r.accent}08, transparent 60%)` }} />
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-11 h-11 rounded-sm flex items-center justify-center shrink-0 border" style={{ background: r.accent + "15", borderColor: r.accent + "40", color: r.accent }}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg sm:text-xl text-foreground leading-snug group-hover:text-primary transition-colors">{r.titre}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground font-light text-sm leading-relaxed mb-5">{r.description}</p>
                    <ul className="space-y-1.5">
                      {r.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground/70 font-light">
                          <div className="w-1 h-1 rounded-full shrink-0" style={{ background: r.accent + "80" }} />
                          {item}
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

      {/* ─── CTA Contact ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-primary/60" />
              <span className="text-primary text-[0.65rem] uppercase tracking-[0.3em]">Travailler ensemble</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5 leading-tight">
              Collaborer avec <br /><span className="text-primary italic">Sulunsuku</span>
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-10 max-w-lg">
              Vous souhaitez co-produire un film documentaire, participer à <em>Avant-première</em> ou nouer un partenariat avec Sulunsuku Production&nbsp;? Contactez-nous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact" className="flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-3.5 rounded-sm uppercase tracking-widest text-xs hover:bg-secondary transition-colors duration-300">
                Nous contacter
              </a>
              <a href="/projets" className="flex items-center justify-center gap-3 border border-primary/30 text-primary px-8 py-3.5 rounded-sm uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                Voir nos projets
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Lightbox presse ────────────────────────────────────────── */}
      <AnimatePresence>
        {pressOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4" onClick={() => setPressOpen(false)}>
            <button className="absolute top-5 right-5 text-white/70 hover:text-white p-2 z-10" onClick={() => setPressOpen(false)} aria-label="Fermer">
              <X size={28} />
            </button>
            <motion.img initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }} src={lancementImg} alt="Article Sidwaya — Lancement d'Avant-première" className="max-h-[90vh] max-w-[90vw] object-contain rounded-sm" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

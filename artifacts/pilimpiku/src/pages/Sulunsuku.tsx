import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import { Play, Pause, VolumeX, Volume2, BookOpen, Film, Newspaper, Globe, ChevronDown, X } from "lucide-react";
import lancementImg from "@assets/LANCEMENT_Avant_Première_1781907420364.jpg";

const rubriques = [
  { label: "Vie de star", couleur: "#E8921A" },
  { label: "Éclairage", couleur: "#C9A84C" },
  { label: "Zoom sur", couleur: "#D4783A" },
  { label: "Édito", couleur: "#A67C52" },
  { label: "Critique", couleur: "#8B6914" },
  { label: "Agenda", couleur: "#B8860B" },
  { label: "Portrait", couleur: "#CD853F" },
  { label: "Reportage", couleur: "#D2691E" },
];

const valeurs = [
  {
    icon: Film,
    titre: "Documentaire & Fiction",
    texte:
      "Spécialisée dans la réalisation de films documentaires, Sulunsuku Production met en lumière les figures emblématiques du cinéma africain et burkinabè.",
    accent: "#E8921A",
  },
  {
    icon: Newspaper,
    titre: "Journalisme Culturel",
    texte:
      "Avec «\u00a0Avant-première\u00a0», le premier magazine cinéma en ligne du Burkina Faso, Sulunsuku production couvre l'actualité du 7e art avec une équipe entièrement féminine.",
    accent: "#C9A84C",
  },
  {
    icon: Globe,
    titre: "Rayonnement Africain",
    texte:
      "Valoriser le cinéma burkinabè et africain sur la scène internationale, promouvoir le pays des Hommes intègres comme terre de création et d'excellence cinématographique.",
    accent: "#D4783A",
  },
  {
    icon: BookOpen,
    titre: "Formation & Transmission",
    texte:
      "Sulunsuku Production accompagne la jeune génération de cinéastes, partage les savoirs et crée des ponts entre les professionnels du secteur audiovisuel.",
    accent: "#A67C52",
  },
];

export default function Sulunsuku() {
  useSeo({
    title: "Sulunsuku — Pilumpiku Production",
    description:
      "Sulunsuku Production, entreprise spécialisée dans la réalisation de films documentaires. Découvrez «\u00a0Avant-première\u00a0», le magazine cinéma en ligne dédié au 7e art burkinabè et africain.",
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [pressOpen, setPressOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => setIsPlaying(false));
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
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

      {/* ─── Hero Cinématique ────────────────────────────────────────── */}
      <section className="relative w-full h-screen min-h-[600px] flex items-end overflow-hidden">
        {/* Vidéo de fond */}
        <video
          ref={videoRef}
          src="/video/ANIMATION_SULUNSUKU_avec_musique_1781907420363.mp4"
          loop
          playsInline
          muted
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
          onCanPlay={() => setVideoReady(true)}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent pointer-events-none" />

        {/* Placeholder si vidéo pas encore prête */}
        {!videoReady && (
          <div className="absolute inset-0 bg-background">
            <img
              src="/img/sulunsuku.webp"
              alt="Sulunsuku"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          </div>
        )}

        {/* Contrôles vidéo */}
        <div className="absolute top-28 right-5 sm:right-8 flex gap-2 z-20">
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-sm border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-all duration-200"
            aria-label={isPlaying ? "Pause" : "Lecture"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={toggleMute}
            className="w-9 h-9 rounded-sm border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-all duration-200"
            aria-label={isMuted ? "Activer le son" : "Couper le son"}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>

        {/* Contenu héro */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-12 bg-primary/60" />
              <span className="text-primary text-[0.65rem] uppercase tracking-[0.35em] font-light">
                Pilumpiku Production · Ouagadougou
              </span>
            </div>

            <h1 className="font-serif text-7xl sm:text-9xl md:text-[10rem] lg:text-[12rem] text-foreground leading-none tracking-tight mb-4">
              Sulun<span className="text-primary italic">suku</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg font-light max-w-lg leading-relaxed">
              Entreprise spécialisée dans la réalisation de films documentaires,
              au service du 7<sup>e</sup> art burkinabè et africain.
            </p>
          </motion.div>

          <motion.button
            onClick={scrollToContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-10 flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-widest hover:text-primary transition-colors group"
          >
            <span>Découvrir</span>
            <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform duration-300" />
          </motion.button>
        </div>
      </section>

      {/* ─── Manifeste ──────────────────────────────────────────────── */}
      <section id="sulunsuku-content" className="py-20 sm:py-32">
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
                <span className="text-primary text-[0.65rem] uppercase tracking-[0.3em]">
                  Notre identité
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
                Raconter <br />
                <span className="text-primary italic">l'Afrique</span> par <br />
                l'image
              </h2>
              <div className="space-y-4 text-muted-foreground font-light leading-relaxed text-sm sm:text-base">
                <p>
                  Fondée à Ouagadougou, Sulunsuku Production est une entreprise
                  spécialisée dans la réalisation de films documentaires. Notre
                  mission&nbsp;: mettre en lumière l'expérience de figures
                  emblématiques du cinéma africain, valoriser les créateurs et
                  créatrices qui font rayonner le 7<sup>e</sup> art burkinabè.
                </p>
                <p>
                  Portée par une équipe de femmes dévouées à la réussite du
                  projet, dirigée par <strong className="text-foreground font-normal">Mamounata Nikiéma</strong>,
                  Sulunsuku Production ambitionne de promouvoir le cinéma du
                  pays des Hommes intègres et du continent africain sur toutes
                  les scènes du monde.
                </p>
                <p>
                  Le nom <em className="text-primary">Sulunsuku</em> porte en
                  lui l'essence de cette vision&nbsp;: une parole, une image,
                  une mémoire vivante transmise de génération en génération.
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
              <div className="relative overflow-hidden rounded-sm aspect-[4/5]">
                <img
                  src="/img/sulunsuku.webp"
                  alt="Sulunsuku Production"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="h-px w-10 bg-primary mb-3" />
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">
                    Pilumpiku Production · Ouagadougou, Burkina Faso
                  </p>
                </div>
              </div>
              {/* Accent décoratif */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-primary/20 rounded-sm -z-10" />
              <div className="absolute -top-4 -left-4 w-20 h-20 border border-primary/10 rounded-sm -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Avant-première Magazine ─────────────────────────────────── */}
      <section className="py-20 sm:py-32 bg-card/30 border-y border-border/40">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16 sm:mb-20"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-10 bg-primary/60" />
              <span className="text-primary text-[0.65rem] uppercase tracking-[0.3em]">
                Le magazine
              </span>
              <div className="h-px w-10 bg-primary/60" />
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-foreground mb-6">
              «&nbsp;Avant-première&nbsp;»
            </h2>
            <p className="text-muted-foreground font-light text-base sm:text-lg leading-relaxed">
              Le premier magazine bimensuel en ligne dédié au cinéma au Burkina Faso.
              Lancé officiellement le <strong className="text-foreground font-normal">24 janvier 2019</strong> à Ouagadougou,
              en présence du représentant du Ministère de la Culture, des Arts et du Tourisme.
            </p>
          </motion.div>

          {/* Détails du magazine */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                chiffre: "2019",
                label: "Année de lancement",
                detail: "Lancé officiellement le 24 janvier 2019 à Ouagadougou",
                accent: "#E8921A",
              },
              {
                chiffre: "8",
                label: "Rubriques éditoriales",
                detail: "Vie de star, Éclairage, Zoom sur, Édito et bien d'autres",
                accent: "#C9A84C",
              },
              {
                chiffre: "100%",
                label: "Équipe féminine",
                detail: "Une rédaction composée uniquement de femmes dévouées",
                accent: "#D4783A",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative overflow-hidden bg-card border border-border/50 p-8 group"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at top left, ${item.accent}10, transparent 70%)` }}
                />
                <div className="relative z-10">
                  <div
                    className="font-serif text-5xl sm:text-6xl mb-3 font-light"
                    style={{ color: item.accent }}
                  >
                    {item.chiffre}
                  </div>
                  <div className="text-foreground text-sm uppercase tracking-widest mb-3">
                    {item.label}
                  </div>
                  <div className="h-px w-8 mb-3" style={{ background: item.accent + "60" }} />
                  <p className="text-muted-foreground text-xs font-light leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rubriques */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-8 text-center">
              Les rubriques
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {rubriques.map((r, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="px-5 py-2 border text-sm font-light tracking-wide rounded-sm"
                  style={{
                    borderColor: r.couleur + "50",
                    color: r.couleur,
                    background: r.couleur + "0D",
                  }}
                >
                  {r.label}
                </motion.span>
              ))}
            </div>
            <p className="text-center text-muted-foreground text-xs font-light mt-6 tracking-wide">
              Retrouvez <em>Avant-première</em> sur{" "}
              <a
                href="https://www.sulunsuku.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                www.sulunsuku.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Nos valeurs ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-primary/60" />
              <span className="text-primary text-[0.65rem] uppercase tracking-[0.3em]">
                Ce que nous portons
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-foreground">
              Notre vision
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {valeurs.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden bg-card border border-border/50 p-7 sm:p-9 hover:border-opacity-80 transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${v.accent}0A, transparent 60%)` }}
                  />
                  <div className="relative z-10">
                    <div
                      className="w-11 h-11 rounded-sm flex items-center justify-center mb-6 border"
                      style={{
                        background: v.accent + "15",
                        borderColor: v.accent + "40",
                        color: v.accent,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-3">
                      {v.titre}
                    </h3>
                    <p className="text-muted-foreground font-light text-sm leading-relaxed">
                      {v.texte}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Presse / Lancement ─────────────────────────────────────── */}
      <section className="py-20 sm:py-32 bg-card/30 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-primary/60" />
                <span className="text-primary text-[0.65rem] uppercase tracking-[0.3em]">
                  La presse en parle
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground">
                Le lancement officiel
              </h2>
            </div>
            <p className="text-muted-foreground text-xs font-light sm:text-right max-w-xs leading-relaxed">
              Publié dans le quotidien burkinabè <em>Sidwaya</em>&nbsp;—
              janvier 2019.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
          >
            {/* Image presse cliquable */}
            <div
              className="group cursor-pointer relative overflow-hidden rounded-sm"
              onClick={() => setPressOpen(true)}
            >
              <img
                src={lancementImg}
                alt="Article Sidwaya — Lancement d'Avant-première, janvier 2019"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs uppercase tracking-widest border border-white/50 px-5 py-2 backdrop-blur-sm rounded-sm">
                  Voir l'article
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                <p className="text-[0.6rem] text-muted-foreground uppercase tracking-widest">
                  © Sidwaya — «&nbsp;Un journal en ligne pour la promotion du 7<sup>e</sup> art&nbsp;»
                </p>
              </div>
            </div>

            {/* Extrait de l'article */}
            <div className="space-y-6 text-muted-foreground font-light leading-relaxed text-sm sm:text-base">
              <blockquote className="border-l-2 border-primary pl-5">
                <p className="text-foreground font-serif text-lg sm:text-xl italic leading-relaxed mb-2">
                  «&nbsp;Avec une équipe rédactionnelle composée uniquement de femmes dévouées à la réussite du projet, le bimensuel
                  <em className="text-primary"> Avant-première</em> se prépare à promouvoir le cinéma du pays des Hommes intègres et du continent africain.&nbsp;»
                </p>
                <footer className="text-xs uppercase tracking-widest text-primary/80">
                  Mamounata Nikiéma — Responsable de Sulunsuku Production
                </footer>
              </blockquote>

              <p>
                Consacré au 7<sup>e</sup> art, le magazine en ligne <em>Avant-première</em> a
                été officiellement lancé le jeudi 24 janvier 2019 à Ouagadougou.
                Ce support de diffusion bimensuel, selon la responsable de la structure,
                Mamounata Nikiéma, ambitionne de valoriser le 7<sup>e</sup> art
                burkinabè et africain.
              </p>

              <p>
                Le magazine est composé de huit rubriques, parmi lesquelles
                <em> Vie de star</em>, <em>Éclairage</em>, <em>Zoom sur</em>,
                <em> Édito</em>, etc. L'idée de ce journal en ligne date de 2017.
                Il a été présenté à la presse, le jeudi 24 janvier 2019.
              </p>

              <p>
                Le lancement officiel d'<em>Avant-première</em> a été fait par le
                représentant du ministre de la Culture, des Arts et du Tourisme,
                Nestor Kahoun. Pour lui, le cinéma constitue une véritable industrie
                pour le Burkina Faso.
              </p>

              <blockquote className="border-l-2 border-primary/50 pl-5 mt-4">
                <p className="text-muted-foreground italic text-sm leading-relaxed mb-2">
                  «&nbsp;Longue vie à cette tribune et beaucoup de courage aux initiateurs.&nbsp;»
                </p>
                <footer className="text-xs uppercase tracking-widest text-primary/60">
                  Nestor Kahoun — Représentant du Ministère de la Culture
                </footer>
              </blockquote>

              <div className="pt-2">
                <a
                  href="https://www.sulunsuku.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-primary/40 text-primary px-6 py-3 rounded-sm uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  <Globe size={12} />
                  Visiter sulunsuku.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA Contact ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-primary/60" />
              <span className="text-primary text-[0.65rem] uppercase tracking-[0.3em]">
                Travailler ensemble
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-5 leading-tight">
              Collaborer avec <br />
              <span className="text-primary italic">Sulunsuku</span>
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-10 max-w-lg">
              Vous souhaitez co-produire un film documentaire, participer à
              <em> Avant-première</em> ou nouer un partenariat avec Sulunsuku Production&nbsp;?
              Contactez-nous.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-3.5 rounded-sm uppercase tracking-widest text-xs hover:bg-secondary transition-colors duration-300"
              >
                Nous contacter
              </a>
              <a
                href="/projets"
                className="flex items-center justify-center gap-3 border border-primary/30 text-primary px-8 py-3.5 rounded-sm uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                Voir nos projets
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Lightbox presse ────────────────────────────────────────── */}
      <AnimatePresence>
        {pressOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setPressOpen(false)}
          >
            <button
              className="absolute top-5 right-5 text-white/70 hover:text-white p-2 z-10"
              onClick={() => setPressOpen(false)}
              aria-label="Fermer"
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              src={lancementImg}
              alt="Article Sidwaya — Lancement d'Avant-première"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

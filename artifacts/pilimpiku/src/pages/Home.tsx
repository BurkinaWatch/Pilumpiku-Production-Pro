import { useSeo } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ProjectCard } from "@/components/ProjectCard";
import { Link } from "wouter";
import {
  useListProjects,
  useGetSiteSettings,
  useListPartners,
} from "@workspace/api-client-react";

function parseStatNumber(s: string): number {
  const m = s.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

function statSuffix(s: string): string {
  return s.replace(/\d+/g, "");
}

export default function Home() {
  useSeo({
    title: "Accueil",
    description:
      "Pilumpiku Production — Une société de production cinématographique engagée, créative et tournée vers l'international.",
  });

  const { data: projects } = useListProjects();
  const { data: settings } = useGetSiteSettings();
  const { data: partnersData } = useListPartners();

  const allProjects = projects ?? [];
  const flagged = allProjects.filter((p) => p.featured);
  const featuredProjects = (flagged.length > 0 ? flagged : allProjects).slice(
    0,
    3,
  );
  const partners = (partnersData ?? []).map((p) => p.nom);
  const heroBadge = settings?.heroBadge ?? "Ouagadougou · Burkina Faso";
  const heroSubtitle =
    settings?.heroSubtitle ??
    "Une société de production cinématographique engagée, créative et tournée vers l'international.";
  const quoteText = settings?.quoteText ?? "";
  const quoteAuthor = settings?.quoteAuthor ?? "— Pilumpiku Production";
  const statsProjets = settings?.statsProjets ?? "8+";
  const statsPays = settings?.statsPays ?? "12+";
  const statsFestivals = settings?.statsFestivals ?? "5+";

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/img/burkina-cinema.jpg"
            alt="Cinéma au Burkina Faso"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/50 to-background/90" />
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ x: ["0vw", "100vw"], y: ["50vh", "20vh"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 opacity-[0.08]"
          >
            <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor" className="text-primary">
              <path d="M50 20C40 20 20 30 15 45C10 60 25 75 45 80C48 81 50 80 50 80C50 80 48 60 50 20Z" />
              <path d="M50 20C60 20 80 30 85 45C90 60 75 75 55 80C52 81 50 80 50 80C50 80 52 60 50 20Z" />
            </svg>
          </motion.div>
          <motion.div
            animate={{ x: ["100vw", "-10vw"], y: ["80vh", "40vh"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
            className="absolute right-0 opacity-[0.05] scale-75"
          >
            <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor" className="text-primary">
              <path d="M50 20C40 20 20 30 15 45C10 60 25 75 45 80C48 81 50 80 50 80C50 80 48 60 50 20Z" />
              <path d="M50 20C60 20 80 30 85 45C90 60 75 75 55 80C52 81 50 80 50 80C50 80 52 60 50 20Z" />
            </svg>
          </motion.div>
        </div>

        <div className="container relative z-20 mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block border border-primary/50 text-primary uppercase tracking-[0.2em] text-[0.65rem] px-4 py-2 rounded-sm mb-8"
            data-testid="text-hero-badge"
          >
            {heroBadge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tight mb-6 max-w-5xl"
            data-testid="text-hero-title"
          >
            {settings?.heroTitleLine1 ?? "Telling African Stories"}{" "}
            <span className="text-primary italic">
              {settings?.heroTitleLine2 ?? "to the World."}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl font-light mb-12"
            data-testid="text-hero-subtitle"
          >
            {heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link
              href="/projets"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-sm uppercase tracking-widest text-xs hover:bg-secondary transition-colors duration-300"
              data-testid="link-discover-projects"
            >
              Découvrir nos projets
            </Link>
            <Link
              href="/contact"
              className="border border-foreground/30 text-foreground px-8 py-4 rounded-sm uppercase tracking-widest text-xs hover:bg-foreground hover:text-background transition-colors duration-300"
              data-testid="link-collaborate"
            >
              Collaborer avec nous
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-muted-foreground opacity-50"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-current to-transparent" />
        </motion.div>
      </section>

      {/* Counters */}
      <section className="py-24 bg-background relative z-20 border-b border-border/20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            <AnimatedCounter
              end={parseStatNumber(statsProjets)}
              suffix={statSuffix(statsProjets)}
              label="Projets développés"
            />
            <AnimatedCounter
              end={parseStatNumber(statsPays)}
              suffix={statSuffix(statsPays)}
              label="Pays partenaires"
            />
            <AnimatedCounter
              end={parseStatNumber(statsFestivals)}
              suffix={statSuffix(statsFestivals)}
              label="Sélections en festivals"
            />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-32 bg-background relative z-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
                Projets Récents
              </h2>
              <p className="text-muted-foreground font-light max-w-md">
                Des œuvres singulières qui portent la voix de l'Afrique sur la
                scène internationale.
              </p>
            </div>
            <Link
              href="/projets"
              className="uppercase tracking-widest text-xs text-primary hover:text-secondary transition-colors whitespace-nowrap flex items-center gap-2"
              data-testid="link-all-projects"
            >
              Voir tous les projets <span className="text-lg">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      {quoteText && (
        <section className="py-40 bg-[#0F0600] relative overflow-hidden border-y border-border/20">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, var(--tw-colors-primary) 0%, transparent 50%)",
            }}
          />
          <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
            <blockquote className="font-serif italic text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight max-w-5xl mx-auto mb-8">
              "{quoteText}"
            </blockquote>
            <cite className="uppercase tracking-[0.3em] text-sm text-primary not-italic">
              — {quoteAuthor}
            </cite>
          </div>
        </section>
      )}

      {/* Marquee Partners */}
      {partners.length > 0 && (
        <section className="py-16 bg-background border-b border-border/20 overflow-hidden relative z-20">
          <div className="container mx-auto px-6 md:px-12 mb-8 text-center">
            <h3 className="uppercase tracking-widest text-xs text-muted-foreground">
              Ils nous font confiance
            </h3>
          </div>
          <div className="flex whitespace-nowrap">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="flex gap-16 items-center text-xl md:text-3xl font-serif text-foreground/40 pr-16"
            >
              {[...partners, ...partners].map((partner, i) => (
                <div key={i} className="flex items-center gap-16">
                  <span>{partner}</span>
                  <span className="text-primary/30 text-sm">✦</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}

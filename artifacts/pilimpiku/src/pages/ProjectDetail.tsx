import { useSeo } from "@/hooks/use-seo";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "wouter";
import { ProjectCard } from "@/components/ProjectCard";
import NotFound from "./not-found";
import { Play, X, Images, Download } from "lucide-react";
import { useState } from "react";
import {
  useGetProjectBySlug,
  useListProjects,
} from "@workspace/api-client-react";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading, isError } = useGetProjectBySlug(slug ?? "");
  const { data: allProjects } = useListProjects();
  const [showTrailer, setShowTrailer] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useSeo({
    title: project?.titre ?? "Projet",
    description: project?.synopsis ?? "",
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        Chargement...
      </div>
    );
  }

  if (isError || !project) {
    return <NotFound />;
  }

  const otherProjects = (allProjects ?? [])
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const galerie = project.galerie ?? [];
  const hasGalerie = galerie.length > 0;

  const { trailerEmbedSrc, trailerPassword, trailerExternalUrl } = (() => {
    if (!project.trailerUrl) return { trailerEmbedSrc: null, trailerPassword: null, trailerExternalUrl: null };
    try {
      const url = new URL(project.trailerUrl);
      const isYoutube = url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be");
      const isVimeo = url.hostname.includes("vimeo.com");
      if (isYoutube) {
        const videoId = url.searchParams.get("v") ?? url.pathname.replace(/^\//, "");
        return { trailerEmbedSrc: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`, trailerPassword: null, trailerExternalUrl: null };
      }
      if (isVimeo) {
        const password = url.searchParams.get("vimeo_password");
        const pathParts = url.pathname.replace(/^\//, "").split("/");
        const videoId = pathParts[0];
        const privateHash = pathParts[1] ?? null;
        const params = new URLSearchParams({ autoplay: "1", color: "c9a84c", title: "0", byline: "0", portrait: "0" });
        if (privateHash) params.set("h", privateHash);
        return { trailerEmbedSrc: `https://player.vimeo.com/video/${videoId}?${params.toString()}`, trailerPassword: password, trailerExternalUrl: null };
      }
      return { trailerEmbedSrc: null, trailerPassword: null, trailerExternalUrl: project.trailerUrl };
    } catch {
      return { trailerEmbedSrc: null, trailerPassword: null, trailerExternalUrl: null };
    }
  })();

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      <section className="relative min-h-[50vh] sm:h-[80vh] flex items-end pb-14 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={project.image}
            alt={project.titre}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 max-w-3xl">
              <span className="text-[0.65rem] uppercase tracking-widest bg-background/50 backdrop-blur-sm px-3 py-1 rounded border border-border/50 text-foreground">
                {project.categorie}
              </span>
              <span className="text-[0.65rem] uppercase tracking-widest bg-primary/20 backdrop-blur-sm px-3 py-1 rounded border border-primary/30 text-primary">
                {project.statut}
              </span>
            </div>
            <h1
              className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-foreground mb-3 sm:mb-4"
              data-testid="text-project-title"
            >
              {project.titre}
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-muted-foreground font-serif italic max-w-3xl">
              {project.intention.split("\n")[0]}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-10 sm:mb-16"
              >
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4 sm:mb-6">
                  Synopsis
                </h2>
                <p className="text-muted-foreground font-light text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {project.synopsis}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mb-10 sm:mb-16"
              >
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4 sm:mb-6">
                  Note d'intention
                </h2>
                <p className="text-muted-foreground font-light text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {project.intention}
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <div className="bg-card border border-border/50 p-6 sm:p-8 rounded-md mb-6 sm:mb-8">
                  <h3 className="font-serif text-xl text-foreground mb-4 sm:mb-6 border-b border-border/50 pb-4">
                    Fiche Technique
                  </h3>

                  <dl className="space-y-3 sm:space-y-4 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground uppercase tracking-widest text-[0.65rem]">
                        Année
                      </dt>
                      <dd className="text-foreground">{project.annee}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground uppercase tracking-widest text-[0.65rem]">
                        Durée
                      </dt>
                      <dd className="text-foreground">{project.duree}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground uppercase tracking-widest text-[0.65rem]">
                        Langue
                      </dt>
                      <dd className="text-foreground">{project.langue}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground uppercase tracking-widest text-[0.65rem]">
                        Statut
                      </dt>
                      <dd className="text-primary">{project.statut}</dd>
                    </div>
                  </dl>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4">
                  {trailerExternalUrl ? (
                    <a
                      href={trailerExternalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground px-6 py-4 rounded-sm uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <Play size={14} /> Voir le film
                    </a>
                  ) : project.trailerUrl ? (
                    <button
                      onClick={() => setShowTrailer(true)}
                      data-testid="button-show-trailer"
                      className="w-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground px-6 py-4 rounded-sm uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <Play size={14} /> Voir la bande-annonce
                    </button>
                  ) : null}
                  <Link
                    href="/contact"
                    className="w-full text-center bg-transparent border border-border text-foreground hover:bg-foreground hover:text-background px-6 py-4 rounded-sm uppercase tracking-widest text-xs transition-colors"
                  >
                    Contacter l'équipe
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {hasGalerie && (
        <section className="py-14 sm:py-24 border-t border-border/20">
          <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-end justify-between mb-8 sm:mb-12">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-widest text-primary mb-2">
                    Dossier de Presse
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl text-foreground flex items-center gap-3">
                    <Images size={24} className="text-primary/60" />
                    Galerie
                  </h2>
                </div>
                <a
                  href={`mailto:pilumpikuproduction@gmail.com?subject=Dossier de presse — ${project.titre}`}
                  className="hidden md:flex items-center gap-2 uppercase tracking-widest text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Download size={12} /> Demander le dossier complet
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                {galerie.map((src, i) => (
                  <motion.button
                    key={src}
                    onClick={() => setLightboxIndex(i)}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i }}
                    className={`relative overflow-hidden rounded-sm group ${
                      i === 0 ? "col-span-2 row-span-2 aspect-[3/4]" : "aspect-square"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${project.titre} — photo ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </motion.button>
                ))}
              </div>

              <div className="mt-5 flex md:hidden">
                <a
                  href={`mailto:pilumpikuproduction@gmail.com?subject=Dossier de presse — ${project.titre}`}
                  className="flex items-center gap-2 uppercase tracking-widest text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Download size={12} /> Demander le dossier complet
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {otherProjects.length > 0 && (
        <section className="py-14 sm:py-24 bg-[#0F0600] border-t border-border/20">
          <div className="container mx-auto px-4 sm:px-6 md:px-12">
            <div className="flex justify-between items-end mb-8 sm:mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground">
                Autres Projets
              </h2>
              <Link
                href="/projets"
                className="uppercase tracking-widest text-xs text-primary hover:text-secondary transition-colors"
              >
                Voir tout →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {otherProjects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <AnimatePresence>
        {showTrailer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-3 sm:p-4"
          >
            <div className="relative w-full max-w-5xl aspect-video bg-black border border-border/50 rounded-lg overflow-hidden shadow-2xl">
              <button
                onClick={() => setShowTrailer(false)}
                data-testid="button-close-trailer"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-background/50 hover:bg-primary text-foreground hover:text-primary-foreground p-2 rounded-full backdrop-blur-md transition-colors"
              >
                <X size={20} />
              </button>
              {trailerEmbedSrc ? (
                <>
                  <iframe
                    src={trailerEmbedSrc}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                    title={`Bande-annonce — ${project.titre}`}
                  />
                  {trailerPassword && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-background/90 backdrop-blur-sm border border-border/50 rounded px-4 py-2 text-sm">
                      <span className="text-muted-foreground uppercase tracking-widest text-[0.6rem]">Mot de passe</span>
                      <span className="font-mono text-primary font-medium select-all">{trailerPassword}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/50">
                  <Play size={48} className="mb-4 opacity-50" />
                  <p className="font-serif italic text-sm sm:text-base">
                    Lecteur vidéo non disponible
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-3 sm:p-4"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-background/20 hover:bg-primary text-white p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            {lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-primary text-white px-2 sm:px-3 py-4 rounded transition-colors text-xl"
              >
                ‹
              </button>
            )}

            {lightboxIndex < galerie.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-primary text-white px-2 sm:px-3 py-4 rounded transition-colors text-xl"
              >
                ›
              </button>
            )}

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              src={galerie[lightboxIndex]}
              alt={`${project.titre} — photo ${lightboxIndex + 1}`}
              className="max-h-[85vh] max-w-[88vw] object-contain rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {galerie.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === lightboxIndex ? "bg-primary" : "bg-white/30"}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

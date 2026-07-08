import { useState, useMemo, useEffect } from "react";
import { useSearch } from "wouter";
import { useSeo } from "@/hooks/use-seo";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { useListProjects } from "@workspace/api-client-react";

const STATUS_PREFIXES: Record<string, string[]> = {
  "En développement": ["en développement", "développement"],
  "Produit": ["produit", "production", "coproduction", "réalisation"],
  "Post-production": ["post-production"],
};

const FORMAT_GROUPS: Record<string, string[]> = {
  "Longs métrages": ["Long-métrage documentaire", "Long-métrage de fiction"],
  "Courts métrages": ["Court-métrage documentaire", "Court-métrage de fiction"],
};

export default function Projects() {
  useSeo({
    title: "Nos Projets",
    description:
      "Découvrez les films, documentaires et fictions de Pilumpiku Production.",
  });

  const search = useSearch();
  const { data: projects, isLoading } = useListProjects();

  const initialFilter = useMemo(() => {
    const params = new URLSearchParams(search);
    return params.get("filter") ?? "Tous";
  }, [search]);

  const [activeFilter, setActiveFilter] = useState(initialFilter);

  useEffect(() => {
    setActiveFilter(initialFilter);
  }, [initialFilter]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    (projects ?? []).forEach((p: any) => cats.add(p.categorie));
    return [
      "Tous",
      "Longs métrages",
      "Courts métrages",
      ...Array.from(cats).filter(
        (c) =>
          !["Long-métrage documentaire", "Long-métrage de fiction",
            "Court-métrage documentaire", "Court-métrage de fiction"].includes(c)
      ),
      "En développement",
      "Produit",
      "Post-production",
    ];
  }, [projects]);

  const filteredProjects = (projects ?? []).filter((p: any) => {
    if (activeFilter === "Tous") return true;

    const formatGroup = FORMAT_GROUPS[activeFilter];
    if (formatGroup) return formatGroup.includes(p.categorie);

    const prefixes = STATUS_PREFIXES[activeFilter];
    if (prefixes) {
      const statut = (p.statut ?? "").toLowerCase();
      return prefixes.some((prefix) => statut.startsWith(prefix));
    }

    return p.categorie === activeFilter;
  });

  return (
    <div className="flex flex-col w-full bg-background pt-24 sm:pt-32 pb-16 sm:pb-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl mb-4 sm:mb-6 text-foreground">
            Nos Projets
          </h1>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto">
            Des histoires singulières, portées par des visions d'auteurs
            puissantes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              data-testid={`button-filter-${cat}`}
              className={`px-3 sm:px-4 py-2 text-xs uppercase tracking-widest rounded-sm transition-all duration-300 border ${
                activeFilter === cat
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-transparent border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: any) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            Aucun projet ne correspond à ce filtre pour le moment.
          </div>
        )}
        {isLoading && (
          <div className="text-center py-20 text-muted-foreground">
            Chargement...
          </div>
        )}
      </div>
    </div>
  );
}

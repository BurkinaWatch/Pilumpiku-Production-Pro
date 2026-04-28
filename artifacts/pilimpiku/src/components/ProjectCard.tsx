import { motion } from "framer-motion";
import { Link } from "wouter";
import type { Project } from "@workspace/api-client-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projets/${project.slug}`} data-testid={`link-project-${project.slug}`}>
      <motion.div
        className="group relative overflow-hidden rounded-md cursor-none"
        whileHover="hover"
      >
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={project.image}
            alt={project.titre}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />
          <motion.div
            className="absolute inset-0 bg-primary/80 mix-blend-multiply opacity-0"
            variants={{ hover: { opacity: 1 } }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
          <span className="text-[0.65rem] uppercase tracking-widest bg-background/50 backdrop-blur-sm px-2 py-1 rounded border border-border/50 text-foreground">
            {project.categorie}
          </span>
          <span className="text-[0.65rem] uppercase tracking-widest bg-primary/20 backdrop-blur-sm px-2 py-1 rounded border border-primary/30 text-primary">
            {project.statut}
          </span>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end"
          variants={{
            hover: { y: -10 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex justify-between items-end mb-2 text-xs uppercase tracking-widest text-muted-foreground">
            <span>{project.annee}</span>
            <span>{project.duree}</span>
          </div>
          <h3 className="font-serif text-3xl mb-2 text-foreground">
            {project.titre}
          </h3>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            variants={{
              hover: { height: "auto", opacity: 1 },
            }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
              {project.synopsis}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </Link>
  );
}

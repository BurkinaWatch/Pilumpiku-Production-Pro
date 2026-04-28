import { useSeo } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import { useListNews } from "@workspace/api-client-react";

export default function News() {
  useSeo({
    title: "Actualités",
    description: "Les dernières nouvelles et annonces de Pilumpiku Production.",
  });

  const { data: news, isLoading } = useListNews();

  return (
    <div className="flex flex-col w-full bg-background pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-6 text-foreground">
            Actualités
          </h1>
        </motion.div>

        {isLoading && (
          <div className="text-center py-20 text-muted-foreground">
            Chargement...
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(news ?? []).map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-none border border-border/50 bg-card overflow-hidden rounded-sm"
              data-testid={`card-news-${item.id}`}
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.titre}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[0.65rem] uppercase tracking-widest text-primary border border-primary/30 px-2 py-1 rounded-sm bg-primary/10">
                    {item.categorie}
                  </span>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">
                    {item.dateLabel}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                  {item.titre}
                </h3>
                <p className="text-muted-foreground font-light text-sm">
                  {item.excerpt}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {!isLoading && (news ?? []).length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            Aucune actualité pour le moment.
          </div>
        )}
      </div>
    </div>
  );
}

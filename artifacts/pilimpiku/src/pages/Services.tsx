import { useSeo } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useListServices } from "@workspace/api-client-react";

function getIcon(name: string): LucideIcon {
  const map = Icons as unknown as Record<string, LucideIcon>;
  return map[name] ?? Icons.Sparkles;
}

export default function Services() {
  useSeo({
    title: "Services",
    description:
      "Production, coproduction, développement et formation avec Pilumpiku Production.",
  });

  const { data: services, isLoading } = useListServices();

  return (
    <div className="flex flex-col w-full bg-background pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-6 text-foreground">
            Nos Services
          </h1>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto text-lg">
            Une expertise complète au service de la création cinématographique
            en Afrique et au-delà.
          </p>
        </motion.div>

        {isLoading && (
          <div className="text-center py-20 text-muted-foreground">
            Chargement...
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(services ?? []).map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border/50 p-10 hover:border-primary/50 transition-colors group relative overflow-hidden"
                data-testid={`card-service-${service.id}`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                  <Icon size={120} />
                </div>

                <div className="text-primary mb-8 border border-primary/20 w-16 h-16 flex items-center justify-center rounded-sm bg-primary/5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon size={24} />
                </div>

                <h3 className="font-serif text-3xl text-foreground mb-4">
                  {service.titre}
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

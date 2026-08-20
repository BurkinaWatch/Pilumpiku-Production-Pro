import { useSeo } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import {
  Camera,
  Film,
  Globe,
  GraduationCap,
  MapPin,
  Send,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useListServices } from "@workspace/api-client-react";

const serviceIcons: Record<string, LucideIcon> = {
  Camera,
  Film,
  Globe,
  GraduationCap,
  MapPin,
  Send,
};

function getIcon(name: string): LucideIcon {
  return serviceIcons[name] ?? Sparkles;
}

export default function Services() {
  useSeo({
    title: "Services",
    description:
      "Production, coproduction, développement et formation avec Pilumpiku Production.",
  });

  const { data: services, isLoading } = useListServices();

  return (
    <div className="flex flex-col w-full bg-background pt-24 sm:pt-32 pb-16 sm:pb-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 sm:mb-24"
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl mb-4 sm:mb-6 text-foreground">
            Nos Services
          </h1>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto text-base sm:text-lg">
            Une expertise complète au service de la création cinématographique
            en Afrique et au-delà.
          </p>
        </motion.div>

        {isLoading && (
          <div className="text-center py-20 text-muted-foreground">
            Chargement...
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {(services ?? []).map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border/50 p-6 sm:p-8 md:p-10 hover:border-primary/50 transition-colors group relative overflow-hidden"
                data-testid={`card-service-${service.id}`}
              >
                <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                  <Icon size={100} />
                </div>

                <div className="text-primary mb-6 sm:mb-8 border border-primary/20 w-14 h-14 flex items-center justify-center rounded-sm bg-primary/5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                  <Icon size={22} />
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-3 sm:mb-4">
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

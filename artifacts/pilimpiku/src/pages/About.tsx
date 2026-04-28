import { useSeo } from "@/hooks/use-seo";
import { motion } from "framer-motion";
import { useGetSiteSettings } from "@workspace/api-client-react";

export default function About() {
  useSeo({
    title: "À Propos",
    description:
      "Découvrez l'histoire, la vision et l'équipe de Pilumpiku Production.",
  });

  const { data: settings } = useGetSiteSettings();

  return (
    <div className="flex flex-col w-full bg-background pt-24">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/img/fespaco.jpg"
            alt="FESPACO — Festival Panafricain du Cinéma de Ouagadougou"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
        </div>
        <div className="container relative z-10 mx-auto px-6 md:px-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl mb-6 text-foreground"
          >
            Notre Histoire
          </motion.h1>
        </div>
      </section>

      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl mb-6 text-primary">
                Les Racines
              </h2>
              <p
                className="text-muted-foreground font-light leading-relaxed whitespace-pre-line"
                data-testid="text-about-histoire"
              >
                {settings?.aboutHistoire ?? ""}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card p-12 border border-border/50 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <h2 className="font-serif text-3xl mb-6 text-foreground">
                Notre Vision
              </h2>
              <p
                className="text-xl font-serif italic text-muted-foreground leading-relaxed whitespace-pre-line"
                data-testid="text-about-vision"
              >
                {settings?.aboutVision ?? ""}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {settings?.founderName && (
        <section className="py-24 bg-card border-t border-border/20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-square relative"
              >
                {settings.founderImage && (
                  <img
                    src={settings.founderImage}
                    alt={settings.founderName}
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 border border-primary/20 m-4 pointer-events-none" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-serif text-4xl text-foreground mb-2">
                  {settings.founderName}
                </h2>
                <p className="uppercase tracking-widest text-xs text-primary mb-8">
                  {settings.founderTitle}
                </p>
                <p className="text-muted-foreground font-light leading-relaxed whitespace-pre-line">
                  {settings.founderBio}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

import { useSeo } from "@/hooks/use-seo";
import { LaboServicePage } from "@/components/LaboServicePage";
import { Lightbulb } from "lucide-react";

export default function CoachingEntrepreneuriat() {
  useSeo({
    title: "Coaching entrepreneuriat créatif & ICC — Labo Piiulgu",
    description:
      "Un accompagnement en entrepreneuriat créatif pour les porteurs de projets des industries créatives et culturelles. Business model, stratégie et réseaux professionnels.",
  });
  return (
    <LaboServicePage
      cfg={{
        slug: "Coaching entrepreneuriat créatif & ICC",
        title: "Coaching Entrepreneuriat créatif",
        subtitle: "Industries Créatives & Culturelles · Labo Piiulgu",
        description:
          "Un coaching spécialisé pour les créateurs et entrepreneurs des industries créatives et culturelles (ICC) qui souhaitent structurer et développer leur activité.",
        longDescription:
          "Que vous soyez réalisateur, producteur, journaliste culturel, designer ou porteur d'un projet culturel, ce programme vous donne les clés pour transformer votre passion en activité pérenne. Nous travaillons ensemble sur la structuration de votre projet, votre business model, votre positionnement et l'accès aux financements dédiés aux ICC.",
        details: [
          "Diagnostic de votre projet et de votre positionnement",
          "Construction du business model créatif",
          "Stratégie de développement et de revenus",
          "Accès aux financements ICC (locaux et internationaux)",
          "Intégration dans le réseau des professionnels Labo Piiulgu",
          "Suivi mensuel de l'avancement de votre projet",
        ],
        pricing: "Sur devis — formule individuelle ou en groupe",
        schedule: "Sessions programmées selon disponibilité",
        accentColor: "#A67C52",
        icon: Lightbulb,
        formTitle: "Demander un coaching entrepreneuriat",
      }}
    />
  );
}

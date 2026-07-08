import { useSeo } from "@/hooks/use-seo";
import { LaboServicePage } from "@/components/LaboServicePage";
import { Film } from "lucide-react";

export default function CoachingProduction() {
  useSeo({
    title: "Coaching & mentorats sur la production — Labo Piiulgu",
    description:
      "Un mentorat professionnel pour maîtriser les aspects techniques et stratégiques de la production audiovisuelle. Financement, devis, coproductions — avancez avec confiance.",
  });
  return (
    <LaboServicePage
      cfg={{
        slug: "Coaching & mentorats sur la production",
        title: "Coaching Production",
        subtitle: "Mentorat audiovisuel · Labo Piiulgu",
        description:
          "Un mentorat professionnel pour maîtriser tous les rouages de la production audiovisuelle : de la planification budgétaire à la recherche de financements internationaux.",
        longDescription:
          "La production d'un film ou d'une série est un parcours complexe. Ce programme de coaching vous accompagne sur les aspects pratiques : élaboration du plan de financement, rédaction du devis, stratégie de coproduction, gestion de plateau et commercialisation de l'œuvre. Nos mentors sont des producteurs expérimentés ayant travaillé sur des projets sélectionnés en festivals internationaux.",
        details: [
          "Élaboration du plan de financement de votre projet",
          "Rédaction et validation du devis de production",
          "Stratégie de recherche de coproducteurs africains et internationaux",
          "Gestion administrative et légale de la production",
          "Préparation aux pitch de coproduction",
          "Accompagnement post-production et distribution",
        ],
        pricing: "Sur devis selon le stade et la nature du projet",
        schedule: "Sessions individuelles sur rendez-vous",
        accentColor: "#D4783A",
        icon: Film,
        formTitle: "Demander un coaching production",
      }}
    />
  );
}

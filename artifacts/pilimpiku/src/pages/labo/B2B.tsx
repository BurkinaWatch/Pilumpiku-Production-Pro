import { useSeo } from "@/hooks/use-seo";
import { LaboServicePage } from "@/components/LaboServicePage";
import { Users } from "lucide-react";

export default function B2B() {
  useSeo({
    title: "Rendez-vous B to B — ICC SOASGA · Labo Piiulgu",
    description:
      "Des séances individuelles d'accompagnement en entrepreneuriat créatif. 2 heures de coaching personnalisé, 10 000 F CFA / séance. Sur rendez-vous uniquement.",
  });
  return (
    <LaboServicePage
      cfg={{
        slug: "B to B — projets ICC SOASGA",
        title: "Rendez-vous B to B",
        subtitle: "ICC SOÃSGA · Labo Piiulgu",
        description:
          "Des séances individuelles de coaching intensif pour les porteurs de projets des industries créatives. Un accompagnement personnalisé, confidentiel et centré sur vos besoins.",
        longDescription:
          "Le Rendez-vous Be to Be (B to B) est un format de coaching individuel de 2 heures, conçu pour aller droit au but. Vous arrivez avec votre projet, vos questions et vos blocages — notre consultant repart avec vous vers des solutions concrètes. Idéal pour débloquer une étape critique, préparer une présentation ou valider une décision stratégique.",
        details: [
          "Session individuelle de 2 heures en face-à-face",
          "Coaching personnalisé en entrepreneuriat créatif ICC",
          "Accompagnement sur votre projet spécifique",
          "Compte-rendu et plan d'action après chaque session",
          "Confidentialité totale de vos échanges",
          "Possibilité d'enchaîner plusieurs sessions",
        ],
        pricing: "10 000 F CFA / séance de 2 heures",
        schedule: "14h30 – 16h30 · Sur rendez-vous uniquement",
        accentColor: "#5BA3BB",
        icon: Users,
        formTitle: "Prendre rendez-vous B to B",
      }}
    />
  );
}

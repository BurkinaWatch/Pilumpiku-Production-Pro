import { useSeo } from "@/hooks/use-seo";
import { LaboServicePage } from "@/components/LaboServicePage";
import { PenLine } from "lucide-react";

export default function Scenario() {
  useSeo({
    title: "Accompagnement en écriture de scénario — Labo Piiulgu",
    description:
      "Un accompagnement personnalisé pour développer votre projet documentaire ou fiction. Coaching, résidences d'écriture et feedback de professionnels du cinéma burkinabè.",
  });
  return (
    <LaboServicePage
      cfg={{
        slug: "Accompagnement en écriture de scénario",
        title: "Écriture de scénario",
        subtitle: "Développement de projets · Labo Piiulgu",
        description:
          "Un accompagnement sur mesure pour transformer votre idée en un scénario solide, prêt à séduire les comités de sélection et les coproducteurs.",
        longDescription:
          "Piloté par des professionnels expérimentés du cinéma africain, ce programme vous guide à chaque étape de l'écriture : de la note d'intention au découpage technique, en passant par le développement des personnages et la structure dramaturgique. Que vous travailliez sur un documentaire ou une fiction, notre accompagnement s'adapte à votre projet.",
        details: [
          "Séances individuelles de coaching en écriture",
          "Feedback professionnel sur votre synopsis et traitement",
          "Travail sur la structure dramaturgique et les personnages",
          "Préparation aux dossiers de financement (FESPACO, OIF, etc.)",
          "Accès aux résidences d'écriture partenaires",
          "Suivi jusqu'à la version finale du scénario",
        ],
        pricing: "Sur devis selon la durée et le type de projet",
        schedule: "Sessions programmées selon disponibilité — sur rendez-vous",
        accentColor: "#C9A84C",
        icon: PenLine,
        formTitle: "Demander un accompagnement",
      }}
    />
  );
}

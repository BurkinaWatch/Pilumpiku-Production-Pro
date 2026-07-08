import { useSeo } from "@/hooks/use-seo";
import { LaboServicePage } from "@/components/LaboServicePage";
import { Building2 } from "lucide-react";

export default function Coworking() {
  useSeo({
    title: "Espace de Coworking Piiulgu — Labo Piiulgu",
    description:
      "Rejoignez l'Espace de Coworking Piiulgu, un espace de travail partagé dédié aux professionnels des industries créatives et culturelles à Ouagadougou.",
  });
  return (
    <LaboServicePage
      cfg={{
        slug: "Espace de Coworking Piiulgu",
        title: "Espace de Coworking Piiulgu",
        subtitle: "Labo Piiulgu · Kologh-Naaba",
        description:
          "Un espace de travail professionnel, créatif et inspirant, conçu pour les acteurs des industries créatives et culturelles au Burkina Faso.",
        longDescription:
          "L'Espace Piiulgu est un lieu de convergence pour les cinéastes, producteurs, journalistes culturels et entrepreneurs créatifs. Wifi haut débit, postes de travail individuels, salle de réunion et ambiance propice à la création — tout y est pensé pour vous permettre de travailler dans les meilleures conditions.",
        details: [
          "Wifi haut débit & postes de travail individuels",
          "Salle de réunion disponible sur réservation",
          "Imprimante, scanner et matériel bureautique",
          "Accès à la communauté Labo Piiulgu",
          "Possibilité d'assister aux événements mensuels",
          "Adresse professionnelle à Kologh-Naaba, Ouagadougou",
        ],
        pricing: "Formule journalière ou mensuelle — nous contacter pour les tarifs",
        schedule: "Lundi – Vendredi · 8h00 – 18h00",
        accentColor: "#E8921A",
        icon: Building2,
        formTitle: "Réserver un accès Coworking",
      }}
    />
  );
}

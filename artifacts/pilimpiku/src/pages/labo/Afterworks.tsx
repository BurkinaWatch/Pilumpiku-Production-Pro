import { useSeo } from "@/hooks/use-seo";
import { LaboServicePage } from "@/components/LaboServicePage";
import { Mic2 } from "lucide-react";

export default function Afterworks() {
  useSeo({
    title: "Afterworks Cinéma — Labo Piiulgu",
    description:
      "Chaque mois, un professionnel du cinéma partage son parcours et son métier lors d'un Afterwork convivial au Labo Piiulgu. Networking, échanges et inspiration. 2 500 F CFA.",
  });
  return (
    <LaboServicePage
      cfg={{
        slug: "Afterworks Cinéma",
        title: "Afterworks Cinéma",
        subtitle: "Rencontres mensuelles · Labo Piiulgu",
        description:
          "Chaque mois, un professionnel du cinéma et de l'audiovisuel ouvre les portes de son métier lors d'un échange informel et convivial. Networking, partage et inspiration.",
        longDescription:
          "Les Afterworks Cinéma sont au cœur de l'identité du Labo Piiulgu. Sur un format d'une heure, un invité — réalisateur, producteur, ingénieur du son, directeur de la photographie, acteur — partage son parcours, ses méthodes de travail et répond aux questions des participants. Un moment unique pour tisser des liens professionnels durables dans un cadre détendu.",
        details: [
          "Un(e) professionnel(le) du cinéma ou de l'audiovisuel invité(e) chaque mois",
          "Échanges ouverts : parcours, métier, conseils pratiques",
          "Séance de networking après l'intervention",
          "Accès à tous les profils : étudiants, professionnels, passionnés",
          "Programme disponible en avance sur nos réseaux sociaux",
          "Réservation conseillée pour garantir votre place",
        ],
        pricing: "2 500 F CFA / personne",
        schedule: "17h30 – 18h30 · Une fois par mois",
        accentColor: "#E8921A",
        icon: Mic2,
        formTitle: "S'inscrire à un Afterwork",
      }}
    />
  );
}

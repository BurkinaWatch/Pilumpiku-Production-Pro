import { ExternalLink, Circle } from "lucide-react";

const pages = [
  {
    section: "Navigation principale",
    items: [
      { label: "Accueil", path: "/", description: "Hero, citation, compteurs, citation → géré via onglet Site", status: "db" },
      { label: "Actualités", path: "/actualites", description: "Articles et nouvelles de Pilumpiku Production → géré via onglet Actualités", status: "db" },
      { label: "À propos", path: "/a-propos", description: "Histoire, vision, fondatrice, partenaires → géré via onglets Site & Partenaires", status: "db" },
      { label: "Contact", path: "/contact", description: "Formulaire de contact, infos → email géré via onglet Site", status: "db" },
    ],
  },
  {
    section: "Productions",
    items: [
      { label: "Films documentaires", path: "/productions/films-documentaires", description: "Formulaire d'inscription — contenu statique", status: "static" },
      { label: "Couverture d'évènements", path: "/productions/couverture-evenements", description: "Formulaire d'inscription — contenu statique", status: "static" },
      { label: "Publicité & Communication", path: "/productions/pub-communication", description: "Formulaire d'inscription — contenu statique", status: "static" },
      { label: "Vidéos institutionnelles", path: "/productions/videos-institutionnelles", description: "Formulaire d'inscription — contenu statique", status: "static" },
      { label: "Projets & films", path: "/projets", description: "Filmographie et réalisations → géré via onglet Projets", status: "db" },
    ],
  },
  {
    section: "Sulunsuku",
    items: [
      { label: "Magazine Avant-Première", path: "/sulunsuku#avant-premiere", description: "9 rubriques réelles de sulunsuku.net — contenu statique (code)", status: "static" },
      { label: "Portraits de professionnels", path: "/sulunsuku#portraits", description: "Article Eclairage de sulunsuku.net — contenu statique (code)", status: "static" },
      { label: "Couverture de festivals", path: "/sulunsuku#festivals", description: "4 articles Festivals de sulunsuku.net — contenu statique (code)", status: "static" },
      { label: "Éclairages & analyses", path: "/sulunsuku#eclairages", description: "Rubriques analytiques — contenu statique (code)", status: "static" },
      { label: "Répertoire / Boutique / Master class / Promotion", path: "/sulunsuku#repertoire", description: "4 sections Communauté & Ressources — contenu statique (code)", status: "static" },
    ],
  },
  {
    section: "CinémaTECH",
    items: [
      { label: "Salon CinémaTECH", path: "/salon-cinematech", description: "Informations et inscription au salon — contenu statique", status: "static" },
    ],
  },
  {
    section: "Labo Piiulgu",
    items: [
      { label: "Tournage & Réalisation", path: "/labo-piiulgu/tournage-realisation", description: "Formulaire d'inscription — contenu statique", status: "static" },
      { label: "Montage & Post-production", path: "/labo-piiulgu/montage-post-production", description: "Formulaire d'inscription — contenu statique", status: "static" },
      { label: "Photographie", path: "/labo-piiulgu/photographie", description: "Formulaire d'inscription — contenu statique", status: "static" },
      { label: "Journalisme culturel", path: "/labo-piiulgu/journalisme-culturel", description: "Formulaire d'inscription — contenu statique", status: "static" },
    ],
  },
];

const tabs = [
  { name: "Projets & Films", description: "Gérer la filmographie et les réalisations affichées sur la page /projets" },
  { name: "Actualités", description: "Créer, modifier et supprimer les articles de la page /actualites" },
  { name: "Services", description: "Gérer les services affichés dans les pages Productions et Labo Piiulgu" },
  { name: "Partenaires", description: "Gérer les logos et noms des partenaires affichés sur la page À propos" },
  { name: "Site", description: "Modifier les textes de la page d'accueil, les compteurs, la biographie de la fondatrice et les infos de contact" },
];

export function DashboardAdmin() {
  return (
    <div className="space-y-10">
      {/* Légende */}
      <div className="flex items-center gap-6 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Circle size={8} className="fill-green-500 text-green-500" /> Contenu gérable depuis l'admin (base de données)
        </span>
        <span className="flex items-center gap-1.5">
          <Circle size={8} className="fill-amber-400 text-amber-400" /> Contenu statique (modifiable dans le code source)
        </span>
      </div>

      {/* Structure du site */}
      <div>
        <h2 className="font-serif text-2xl text-foreground mb-6">Structure du site</h2>
        <div className="space-y-6">
          {pages.map((section) => (
            <div key={section.section}>
              <h3 className="text-xs uppercase tracking-widest text-primary/70 mb-3 font-medium">{section.section}</h3>
              <div className="divide-y divide-border/30 border border-border/40 rounded-sm overflow-hidden">
                {section.items.map((item) => (
                  <div key={item.path} className="flex items-start gap-4 px-4 py-3 bg-card hover:bg-card/80 transition-colors">
                    <div className="mt-1 shrink-0">
                      {item.status === "db"
                        ? <Circle size={8} className="fill-green-500 text-green-500" />
                        : <Circle size={8} className="fill-amber-400 text-amber-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground font-light">{item.label}</span>
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary/50 hover:text-primary transition-colors"
                        >
                          <ExternalLink size={11} />
                        </a>
                      </div>
                      <p className="text-xs text-muted-foreground/70 mt-0.5 leading-relaxed">{item.description}</p>
                    </div>
                    <code className="text-[0.6rem] text-muted-foreground/50 font-mono shrink-0 mt-0.5 hidden sm:block">{item.path.split("#")[0]}</code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Onglets de l'admin */}
      <div>
        <h2 className="font-serif text-2xl text-foreground mb-6">Guide des onglets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tabs.map((tab, i) => (
            <div key={i} className="bg-card border border-border/40 rounded-sm p-4">
              <div className="text-sm font-medium text-primary mb-1">{tab.name}</div>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">{tab.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Note Sulunsuku */}
      <div className="bg-amber-950/20 border border-amber-700/30 rounded-sm p-5">
        <h3 className="text-sm font-medium text-amber-400 mb-2">Pages à contenu statique</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Les pages <strong className="text-foreground font-normal">Sulunsuku</strong>, <strong className="text-foreground font-normal">CinémaTECH</strong>, <strong className="text-foreground font-normal">Productions</strong> et <strong className="text-foreground font-normal">Labo Piiulgu</strong> sont construites directement dans le code source.
          Pour modifier leur contenu, il faut éditer les fichiers correspondants dans <code className="text-xs bg-white/10 px-1 rounded">artifacts/pilimpiku/src/pages/</code>.
        </p>
      </div>
    </div>
  );
}

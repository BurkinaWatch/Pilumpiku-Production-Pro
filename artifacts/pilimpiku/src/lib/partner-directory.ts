export const PARTNER_LOGOS: Record<string, string> = {
  FESPACO: "/logos/fespaco.png",
  ABCA: "/logos/abca.png",
  ISIS: "/logos/isis-se.png",
  "Ministère de la Communication, de la Culture, des Arts et du Tourisme":
    "/logos/ministere-communication-burkina.jpg",
  "FNCA Burkina Faso": "/logos/fnca.png",
  Eurodoc: "/logos/eurodoc.png",
  Africalia: "/logos/africalia.png",
  "Confédération AES du Cinéma": "/logos/aes.png",
  "Sunuy Films": "/logos/sunuy.png",
  "FDCT-PAIC Burkina Faso": "/logos/fdct.png",
  "CNC France": "/logos/cnc.png",
  "TV5 Monde": "/logos/tv5monde.png",
  "Téléfilm Canada": "/logos/telefilm.png",
  "Hot Docs Blue Ice Fund": "/logos/hotdocs.png",
  Tënk: "/logos/tenk.png",
  "Fonds Image de la Francophonie": "/logos/fonds-image-francophonie.png",
  "Fonds Jeune Création Francophone": "/logos/oif.png",
  "FONSIC — Côte d'Ivoire": "/logos/fonsic.png",
  "Aide aux Cinémas du Monde": "/logos/aide-aux-cinemas-du-monde.png",
  "Université Gaston Berger": "/logos/ugb.webp",
  "Durban FilmMart": "/logos/dfmi.png",
  "Les Ateliers Yennenga": "/logos/ateliers-yennenga.png",
  "DOK Co-Pro Market": "/logos/dok-co-pro-market.jpg",
  "La Fabrique Cinéma": "/logos/la-fabrique-cinema.png",
  EAVE: "/logos/eave.png",
  "Lully Grâce Production": "/logos/lully-grace.png",
  "FOPICA — Sénégal": "/logos/fopica.jpg",
  SENTOO: "/logos/sentoo.png",
  "Red Sea Fund": "/logos/red-sea-fund.png",
  "Miradas Doc — Tenerife": "/logos/miradas-doc.png",
  "Les Films de la pluie": "/logos/filmsdelapluie.png",
};

export const EXCLUDED_PUBLIC_PARTNERS = new Set([
  "Confédération AES du Cinéma",
]);

export const OFFICIAL_PARTNER_ORDER = [
  "Ministère de la Communication, de la Culture, des Arts et du Tourisme",
  "ABCA",
  "FESPACO",
  "ISIS",
  "FNCA Burkina Faso",
  "FDCT-PAIC Burkina Faso",
];

export type OfficialInstitutionDetails = {
  nom: string;
  description: string;
};

export const OFFICIAL_INSTITUTION_DETAILS: Record<
  string,
  OfficialInstitutionDetails
> = {
  "Ministère de la Communication, de la Culture, des Arts et du Tourisme": {
    nom: "Ministère de la Communication, de la Culture, des Arts et du Tourisme",
    description:
      "Institution de tutelle et partenaire public de la filière culturelle et cinématographique au Burkina Faso.",
  },
  ABCA: {
    nom: "ABCA",
    description:
      "Organisation professionnelle de référence pour le cinéma et l'audiovisuel burkinabè.",
  },
  ISIS: {
    nom: "ISIS",
    description:
      "Institut supérieur de l'image et du son, structure burkinabè de formation aux métiers du cinéma et de l'audiovisuel.",
  },
};

export function getAboutPartnerNames(
  partners: ReadonlyArray<{ nom: string }>,
): string[] {
  const visiblePartners = partners.filter(
    ({ nom }) => !EXCLUDED_PUBLIC_PARTNERS.has(nom),
  );
  const availableNames = new Set(visiblePartners.map(({ nom }) => nom));
  const officialNames = OFFICIAL_PARTNER_ORDER.filter(
    (name) => availableNames.has(name) || name in OFFICIAL_INSTITUTION_DETAILS,
  );
  const officialNameSet = new Set(officialNames);
  const partnersWithLogos = visiblePartners
    .filter(
      ({ nom }) => !officialNameSet.has(nom) && Boolean(PARTNER_LOGOS[nom]),
    )
    .map(({ nom }) => nom);

  return [...officialNames, ...partnersWithLogos];
}
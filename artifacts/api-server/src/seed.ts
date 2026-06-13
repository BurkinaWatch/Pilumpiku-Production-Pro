import {
  db,
  projectsTable,
  newsTable,
  servicesTable,
  partnersTable,
  siteSettingsTable,
} from "@workspace/db";
import { sql } from "drizzle-orm";
import { logger } from "./lib/logger";

const PROJECTS = [
  {
    slug: "djeliya-memoire-du-mande",
    titre: "Djeliya, mémoire du Mandé",
    categorie: "Long-métrage documentaire",
    statut: "Sélection officielle Visions du Réel 2026 · Première mondiale",
    annee: 2026,
    duree: "1h 58",
    langue: "Bambara, Dioula, Malinké",
    synopsis:
      "Sékou Timité a une ambition : suivre la voie d'un père qu'il n'a jamais connu pour devenir un « Djeli », un griot — ces gardiens de la mémoire orale en Afrique de l'Ouest. Seul de la fratrie à s'intéresser à l'art en désuétude du griot, il laisse sa famille et son village malien derrière lui et part se confronter au monde sur les routes du légendaire Empire mandingue.\n\nTiraillé entre ses envies de grandeur, les besoins matériels de sa famille et le temps long de l'apprentissage, il se confronte aux obstacles d'un présent parfois chaotique et croise sur son chemin les plus grands griots de la région ou de simples individus en prise avec le quotidien. Son voyage initiatique devient le portrait poétique d'une Afrique de l'Ouest à la recherche de sa mémoire commune.",
    intention:
      "« Je suis né au Mali et j'ai grandi au Burkina Faso, à l'époque de la guerre de Noël, suite à un conflit frontalier entre les deux pays. Avec Djeliya Mémoire du Mandé, je raconte un univers culturel bien plus mélangé et bien plus poreux que ce qu'insinue une frontière établie par le colon. Le film est le portrait d'un espace à la recherche de sa mémoire. » — Boubacar Sangaré\n\nUn road-movie initiatique à travers six pays — Mali, Burkina Faso, Côte d'Ivoire, Sénégal, Gambie, Guinée Conakry — sur les traces de l'Empire mandingue. 22 000 km de route, sept ans de travail, 38 partenaires institutionnels. Le film allie l'imaginaire du voyage et le réalisme de la rencontre impromptue, le conte du griot et la parole des gens du commun.\n\nFICHE TECHNIQUE\nRéalisation : Boubacar Sangaré\nImage : Isso Emmanuel Bationo\nSon : Seydou G. Porgo, Manuel Vidal\nMontage : Gladys Joujou\nÉtolonnage : Michael Derrossett\nProduction : Pilumpiku Production (Mamounata Nikiéma) · Ladybirds Films (Jules David) · Sunuy Films (Souleymane Kébé) · Lully Grâce Production (Franck Vléhi) · DS Productions (André S. Diarra)\nDiffusion : TV5MONDE\n\nRÉALISATEUR\nBoubacar Sangaré est cinéaste, auteur-réalisateur et juriste originaire du Burkina Faso, vivant en France. Son premier documentaire « Or de vie » a été distingué dans de nombreux festivals internationaux. Djeliya, Mémoire du Mandé est son deuxième film. Il développe actuellement plusieurs projets dont « Les dieux délinquants », son premier long-métrage de fiction.",
    image: "/img/djeliya.jpg",
    galerie: [
      "/img/djeliya-affiche-fr.jpg",
      "/img/djeliya-photo-1.png",
      "/img/djeliya-photo-2.png",
      "/img/djeliya-realisateur.png",
      "/img/djeliya-affiche-en.png",
    ],
    sortOrder: 5,
    featured: true,
  },
  {
    slug: "katseiden-alla",
    titre: "Katseiden alla (Sous les regards)",
    categorie: "Long-métrage documentaire",
    statut: "Coproduction internationale · 2025",
    annee: 2025,
    duree: "1h 28",
    langue: "Finnois, Français",
    synopsis:
      "Un chorégraphe burkinabé installé en Finlande aspire à son village natal tout en cherchant une véritable connexion humaine. Il choisit de combattre les inégalités à l'aide d'un simple minibus.",
    intention:
      "Coproduction Burkina Faso – Finlande, réalisée par Jenni Kivistö et Jussi Rastas. Une réflexion sensible sur l'exil, l'art et la solidarité, où Pilumpiku Production accompagne le projet en tant que coproducteur.",
    image: "/img/katseiden.jpg",
    sortOrder: 10,
    featured: false,
  },
  {
    slug: "loin-de-moi-la-colere",
    titre: "Loin de moi la colère",
    categorie: "Long-métrage documentaire",
    statut: "Produit · Sortie 3 juin 2026",
    annee: 2025,
    duree: "1h 23",
    langue: "Français",
    synopsis:
      "Au village de Ziglo, en Côte d'Ivoire, la guerre civile de 2011 a laissé de nombreuses victimes. Maman Jo, figure autochtone, décide de prendre le destin du village en main en créant un espace de parole pour les femmes.",
    intention:
      "Réalisé par Joël Akafou, ce documentaire produit par Pilumpiku Production donne la voix à celles que l'Histoire oublie. Une œuvre sur la résilience, la mémoire et la reconstruction collective.",
    image: "/img/loin-colere.jpg",
    sortOrder: 15,
    featured: true,
  },
  {
    slug: "vieux-pere",
    titre: "Vieux-Père (Old Father)",
    categorie: "Long-métrage documentaire",
    statut: "Production exécutive Burkina · Sélection FIFP Cannes",
    annee: 2024,
    duree: "1h 12",
    langue: "Français",
    synopsis:
      "Amado Komi, surnommé « Vieux-Père », semble condamné à une jeunesse éternelle : à trente-cinq ans, il mesure un mètre trente-sept et a le corps d'un enfant de dix ans. Star au Burkina Faso grâce à ses rôles d'enfant acteur, il découvre lors d'une tournée en France la maladie rare dont il souffre. Le traitement hormonal qui s'ensuit lui permettra, à presque 40 ans, de vivre une métamorphose totale qui l'amènera à redéfinir son identité.",
    intention:
      "Réalisé par Marine de Royer (Keren Production / Canal+ International). Pilumpiku Production assure la production exécutive au Burkina Faso aux côtés de Pierre Claver Zongo. Avant-première au Canal Olympia Idrissa Ouédraogo (Pissy, Ouagadougou) en mai 2024. Sélectionné au Festival International du Film Pan Africain de Cannes (FIFP), projeté le 24 octobre.",
    image: "/img/vieux-pere.jpg",
    sortOrder: 18,
    featured: true,
  },
  {
    slug: "pingda",
    titre: "Pingda",
    categorie: "Long-métrage de fiction",
    statut: "Produit · 2024",
    annee: 2024,
    duree: "Long-métrage",
    langue: "Mooré, Français",
    synopsis:
      "Dans un monde en constante mutation numérique, Pingda est une jeune étudiante en fin de cycle d'économie qui doit subvenir aux besoins de ses parents démunis. Après des concours de la fonction publique infructueux et des demandes de stage sans réponse, elle est victime de harcèlement sexuel lorsqu'elle enchaîne les petits boulots.\n\nUn jour, elle poste une photo d'elle sur les réseaux sociaux en tenue traditionnelle « Faso-danfani ». Une dame la contacte en inbox pour commander le même tissu — et c'est là que tout commence. Pingda découvre alors le pouvoir du digital pour transformer un destin contraint en aventure entrepreneuriale.",
    intention:
      "PINGDA est né d'un partenariat entre le PNUD (Projet Transformation Digitale Inclusive) et le Fonds de Développement Culturel et Touristique du Burkina Faso (FDCT), dans le cadre d'une initiative de formation aux compétences numériques des femmes dans le secteur cinématographique.\n\n32 femmes ont été formées à divers métiers du digital dans le cinéma. Réunies sous le label « Le Collectif Amazones Production », elles ont concrétisé leur formation en réalisant ce long-métrage de fiction — une première collective et historique.\n\nFICHE TECHNIQUE\nRéalisation : Le Collectif Amazones Production\nImage : Esther M.C. Barry\nSon : Seydou G. Porgo\nMontage : Gaëtan Y. Somé / Mahouli Mayang\nPost-production : Studio Créatine\nMusique : Dondo Paré\nProduction Déléguée : Mamounata Nikiéma (Pilumpiku Production)\n\nRÉALISATRICES\nSalimata Ouedraogo · Oumoule Sahadatou Yago · Aicha Nonkane · Kadiguetou Gansore · Mariam Ouattara · Worokia Kayoulou · Rosalie W. Konkobo · Rachelle B. Somé · Kadi Traore · Natalie N. Tandia · Aminata Diallo · Nathalie Tandia · Eve-Noëllie Djebolo · Mahouli Mayang",
    image: "/img/pingda.jpg",
    galerie: [
      "/img/pingda-affiche.png",
      "/img/pingda-tournage-1.jpg",
      "/img/pingda-tournage-2.jpg",
      "/img/pingda-tournage-3.jpg",
    ],
    sortOrder: 20,
    featured: false,
  },
  {
    slug: "odyssee-omar",
    titre: "L'Odyssée d'Omar",
    categorie: "Long-métrage documentaire",
    statut: "Réalisation Mamounata Nikièma · 2020 · Disponible sur Tënk",
    annee: 2020,
    duree: "1h 17",
    langue: "Français, Allemand",
    synopsis:
      "À Ouagadougou, Yves-Omar est un ancien instituteur reconverti en entrepreneur accompli. Ses affaires le poussent à voyager toujours plus pour développer son entreprise et créer de nouveaux partenariats — Paris, Munich, Bruxelles, Lomé. Des routes burkinabè aux routes européennes, le spectateur embarque comme passager d'Yves-Omar, business man dans l'automobile, qui parcourt des milliers de kilomètres pour acheter des voitures accessibles à la classe moyenne de son pays.",
    intention:
      "En s'inspirant de son propre vécu, Mamounata Nikièma propose une autre façon d'appréhender les liens entre l'Europe et l'Afrique : l'expérience d'un homme qui, tel Ulysse, rentre chez lui après de longs voyages, avec à chaque fois le plaisir de retrouver le Burkina Faso. Coproduction Pilumpiku Production / Les Films de la pluie (Sylvie Plunian). Sélection FESPACO, Vues d'Afrique (Canada), États Généraux du Film Documentaire de Lussas, Koudougou Doc, FESTICAB, Rencontres de Films en Bretagne. Disponible en VOD sur Tënk depuis janvier 2022.",
    image: "/img/odyssee-omar.webp",
    sortOrder: 22,
    featured: true,
  },
  {
    slug: "intacte",
    titre: "Intacte",
    categorie: "Court-métrage documentaire",
    statut: "Réalisation Mamounata Nikiéma · 2022",
    annee: 2022,
    duree: "34 min",
    langue: "Français",
    synopsis:
      "Court-métrage documentaire écrit par Inoussa Baguian et réalisé par Mamounata Nikiéma. Un regard intime sur les corps, les héritages et la transmission.",
    intention:
      "En tant que réalisatrice, Mamounata Nikiéma signe ici une œuvre personnelle qui prolonge sa réflexion d'autrice sur les histoires intimes et collectives portées par les femmes du Burkina Faso.",
    image: "/img/intacte.jpg",
    sortOrder: 25,
    featured: false,
  },
  {
    slug: "traces-d-un-migrant",
    titre: "Sur les traces d'un migrant",
    categorie: "Long-métrage documentaire",
    statut: "Coproduction · Grand Prix Président FESPACO 2021",
    annee: 2021,
    duree: "1h 10",
    langue: "Français, Wolof, Mooré",
    synopsis:
      "Awa et Adama sont deux sœurs jumelles âgées de 24 ans. Nées d'un père burkinabè et d'une mère sénégalaise, elles sont aujourd'hui orphelines de mère. Vivant avec leur tante à Saint-Louis du Sénégal, elles se mettent en quête de leur père Abdoulaye Ouédraogo, parti « faire sa vie » lorsqu'elles avaient huit ans, et porté disparu depuis des années. Drissa Ouédraogo, son frère, accompagne les jumelles à sa recherche, en parcourant le Burkina Faso, le Sénégal et la Guinée-Bissau, à la rencontre des familles que leur père a fondées sur sa route.",
    intention:
      "Coproduction Pilumpiku Production (Mamounata Nikièma) et STEPS (Tiny Mungwe & Don Edkins, Afrique du Sud), dans le cadre du programme panafricain Generation Africa. Musique Alif Naaba, montage Jupiter Sodré. Soutien du Fonds Image de la Francophonie, du Centre Cinématographique Marocain, du Fonds Jeune Création Francophone et de la résidence DocMonde de Bobo-Dioulasso. Premier long-métrage de Delphine Yerbanga, lauréat du Grand Prix du Président du Faso au FESPACO 2021. Sélectionné au Festival International du Film de Femmes de Salé (FIFFS) 2022.",
    image: "/img/traces-d-un-migrant.webp",
    sortOrder: 30,
    featured: true,
  },
  {
    slug: "au-fantome-du-pere",
    titre: "Au fantôme du père",
    categorie: "Documentaire",
    statut: "Produit · 2018",
    annee: 2018,
    duree: "52 min",
    langue: "Français",
    synopsis:
      "Documentaire de Marie-Laurentine Bayala, mené avec Adja Claire Lagedemond, qui dialogue avec l'absence d'un père et la mémoire familiale.",
    intention:
      "Pilumpiku Production assure ici la production déléguée d'un premier film d'autrice, dans la continuité de son engagement pour les voix féminines du cinéma burkinabè.",
    image: "/img/au-fantome-du-pere.webp",
    sortOrder: 35,
    featured: false,
  },
  {
    slug: "etincelles",
    titre: "Étincelles",
    categorie: "Long-métrage documentaire",
    statut: "Coproduction · 2019 · Prix Nokouè 2020",
    annee: 2019,
    duree: "62 min",
    langue: "Français",
    synopsis:
      "Mailo est le village natal de Bawa Kadadé Riba, né en 1975. Chrétien d'un père musulman, il ne reconnaît plus son village, divisé par des tensions religieuses avec, comme ligne de démarcation, le goudron : les musulmans d'un côté, les chrétiens de l'autre. Pourtant, tous sont une même famille. Tout le monde connaît le problème mais personne n'en parle. Alors, pour délier les langues et provoquer la parole autour du vivre ensemble, Bawa retourne au village avec un projet : construire sa maison du côté musulman.",
    intention:
      "Production déléguée The Kingdom (France), coproduction Pilumpiku Production. Image Michel K. Zongo, montage Amina Weïra & Julien Sallé. Soutien du Fonds Jeune Création Francophone, accompagnement post-production à Montréal avec Téléfilm Canada. Sélections : États Généraux du Film Documentaire de Lussas (2019), Saint-Louis Docs, FIFIDHO Niamey, Ânûû-rû Âboro (Nouvelle-Calédonie). Prix Nokouè d'argent au festival Lagunimages de Cotonou (2020).",
    image: "/img/etincelles.webp",
    sortOrder: 33,
    featured: false,
  },
  {
    slug: "lutte-continue",
    titre: "La Lutte Continue",
    categorie: "Court-métrage de fiction",
    statut: "Prix du Public FESTIC 2021 · Soutien Francophonie",
    annee: 2016,
    duree: "13 min",
    langue: "Français",
    synopsis:
      "Djata se tue à la tâche pour combler sa famille. Elle sert dans la soumission son mari Ossana, préoccupé à remporter la compétition de lutte traditionnelle. Pendant le combat, il perd face à son adversaire.\n\nAu même moment, Djata fend la foule et terrasse dans la surprise le lutteur qui vient de défaire son mari. Elle se cambre et demande à se battre avec Batiga, le champion en titre.",
    intention:
      "Un film qui joue sur un double sens : la lutte sportive traditionnelle burkinabè et le combat silencieux des femmes pour leur émancipation. L'arène de lutte devient le théâtre d'un renversement inattendu — Djata, effacée et dévouée, surgit comme une force que personne n'avait vue venir.\n\nPremier court-métrage de fiction de Marie-Laurentine Bayala, soutenu par le Fonds Image de la Francophonie. Prix du Public au Festival des Identités Culturelles (FESTIC) 2021. Première au Togo en décembre 2016.\n\nFICHE TECHNIQUE\nRéalisation : Marie Laurentine Bayala\nImage : Michael Sabdano\nSon : Moumouni Jupiter Soudré\nMontage : Sounkalo Dao\nDirecteur artistique : Guy Désire Yameogo\nProductrice déléguée : Mamounata Nikiéma\nProduction : Pilumpiku Production (Burkina Faso)\n\nAVEC\nMariam Ouédraogo · Ibrahima Sidibeé · Wabinlé Nabié · Aristide Tarnagda · Ibrahim Zongo\n\nRÉALISATRICE\nMarie Laurentine Bayala est réalisatrice burkinabè. Diplômée en communication et journalisme de l'Université de Ouagadougou, puis d'un Master 2 en réalisation documentaire à l'Université Gaston Berger du Sénégal. Sélectionnée au Hubert Fellowship Program aux États-Unis en 2017. Elle a réalisé plus de 9 films et fonde aujourd'hui sa propre maison de production, StorybiZ.",
    image: "/img/lutte-continue.webp",
    galerie: [
      "/img/lutte-affiche.jpg",
      "/img/lutte-photo-1.jpg",
      "/img/lutte-realisatrice.jpg",
    ],
    sortOrder: 38,
    featured: false,
  },
  {
    slug: "une-journee-avec",
    titre: "Une journée avec…",
    categorie: "Série télévisée documentaire",
    statut: "Réalisation Mamounata Nikiéma · 2011",
    annee: 2011,
    duree: "13 min / épisode",
    langue: "Français",
    synopsis:
      "Série documentaire courte de 13 minutes par épisode, dont un épisode est réalisé par Mamounata Nikiéma. Portraits du quotidien et figures du Burkina Faso.",
    intention:
      "Premier travail de réalisation télévisuelle de Mamounata Nikiéma, à l'origine de l'aventure qui mènera à la création de Pilumpiku Production.",
    image: "/img/burkina-cinema-2.jpg",
    sortOrder: 40,
    featured: false,
  },
  {
    slug: "sulunsuku",
    titre: "Sulunsuku — plateforme audiovisuelle",
    categorie: "Plateforme",
    statut: "Actif",
    annee: 2018,
    duree: "En continu",
    langue: "Multilingue",
    synopsis:
      "Plateforme africaine d'accompagnement et de diffusion audiovisuelle lancée par Pilumpiku Productions en 2018. Sulunsuku met en réseau réalisateurs, producteurs et publics pour faire circuler les films d'auteur sur le continent.",
    intention:
      "Construire des circuits de diffusion africains pour les films africains, hors des seuls festivals occidentaux.",
    image: "/img/sulunsuku.webp",
    sortOrder: 70,
    featured: false,
  },
  {
    slug: "sobate-festival",
    titre: "Sobatè — festival de cinéma en plein air",
    categorie: "Festival",
    statut: "Actif",
    annee: 2019,
    duree: "Édition annuelle",
    langue: "Multilingue",
    synopsis:
      "Festival de cinéma en plein air programmé par Pilumpiku Productions dans les quartiers populaires de Ouagadougou. Projections gratuites, débats, rencontres avec les auteurs : faire revenir le grand écran là où il a disparu.",
    intention:
      "Démocratiser radicalement l'accès au cinéma. Rappeler que le film est d'abord une expérience collective, sous les étoiles.",
    image: "/img/fespaco.jpg",
    sortOrder: 80,
    featured: false,
  },
];

const NEWS = [
  {
    titre: "Vieux-Père sélectionné au Festival International du Film Pan Africain de Cannes",
    categorie: "Festival",
    dateLabel: "Octobre 2025",
    excerpt:
      "Le documentaire « Vieux-Père (Old Father) » de Marine de Royer, dont Pilumpiku Production assure la production exécutive au Burkina Faso, est officiellement sélectionné au Festival International du Film Pan Africain de Cannes. Projection le vendredi 24 octobre à 21h30.\n\nLe film suit Amado Komi, comédien burkinabè connu pour ses rôles d'enfant à la télévision et au théâtre, qui découvre lors d'une tournée en France la maladie hormonale dont il souffre et entame une métamorphose. Une production Keren Production / Canal+ International, en coproduction avec Pierre Claver Zongo et Pilumpiku Production pour le Burkina Faso.",
    image: "/img/vieux-pere.jpg",
    sortOrder: 5,
  },
  {
    titre: "DJELIYA, Mémoire du Mandé — Première mondiale à Visions du Réel 2026",
    categorie: "Festival",
    dateLabel: "Avril 2026",
    excerpt:
      "Coproduit par Pilumpiku Production, le long-métrage documentaire DJELIYA, MÉMOIRE DU MANDÉ de Boubacar Sangaré est officiellement sélectionné en Compétition Internationale de Longs Métrages — Première Mondiale — au Festival Visions du Réel (Nyon, Suisse, 17–26 avril 2026).\n\nFruit de douze années de travail, plus de trois mois de tournage répartis sur sept ans dans six pays aux anciennes frontières de l'empire Mandingue (Burkina Faso, Côte d'Ivoire, Gambie, Guinée, Mali, Sénégal), 22 000 km de route et 38 partenaires : un projet profondément panafricain.",
    image: "/img/djeliya.jpg",
    sortOrder: 1,
  },
  {
    titre: "Mamounata Nikiéma élue présidente de la Confédération AES du Cinéma",
    categorie: "Distinction",
    dateLabel: "2024",
    excerpt:
      "La fondatrice de Pilumpiku Productions prend la tête de la Confédération AES du Cinéma, regroupant les organisations cinématographiques du Burkina Faso, du Mali et du Niger. Une responsabilité continentale qui prolonge son engagement à structurer la filière.",
    image: "/img/mamounata-spla.jpg",
    sortOrder: 10,
  },
  {
    titre: "Élection à la présidence de la FNCA",
    categorie: "Distinction",
    dateLabel: "Mai 2022",
    excerpt:
      "Mamounata Nikiéma est élue présidente de la Fédération Nationale des Ciné-Clubs et Associations cinématographiques du Burkina Faso (FNCA), qui fédère le réseau historique des ciné-clubs du pays.",
    image: "/img/mamounata-cnc.jpg",
    sortOrder: 20,
  },
  {
    titre: "Loin de moi la colère — sortie en salles le 3 juin 2026",
    categorie: "Sortie de film",
    dateLabel: "Juin 2026",
    excerpt:
      "Produit par Pilumpiku Production et réalisé par Joël Akafou, le documentaire « Loin de moi la colère » sort en salles le 3 juin 2026. Le film suit Maman Jo, qui crée un espace de parole pour les femmes du village de Ziglo après la guerre civile ivoirienne de 2011.",
    image: "/img/loin-colere.jpg",
    sortOrder: 30,
  },
  {
    titre: "Pingda — premier film de fiction de trois jeunes réalisatrices",
    categorie: "Sortie de film",
    dateLabel: "2024",
    excerpt:
      "Pilumpiku Production accompagne Aminata Diallo, Eve-Noëlle Djebolo et Kadiguetou Gansore pour leur premier court-métrage de fiction « Pingda », sur un scénario d'Abdoul Aziz Nikiéma. Une étape forte de notre engagement pour l'émergence des autrices burkinabè.",
    image: "/img/pingda.jpg",
    sortOrder: 40,
  },
  {
    titre: "Sulunsuku — plateforme audiovisuelle africaine",
    categorie: "Plateforme",
    dateLabel: "2018",
    excerpt:
      "Pilumpiku Productions lance Sulunsuku, plateforme dédiée à la circulation des films d'auteur sur le continent africain. Une réponse concrète à la difficulté chronique de diffusion du cinéma indépendant.",
    image: "/img/sulunsuku.webp",
    sortOrder: 50,
  },
  {
    titre: "Ouaga Film Lab 2018 : les portes se referment",
    categorie: "Événement",
    dateLabel: "Octobre 2018",
    excerpt:
      "C'est fini pour le Ouaga Film Lab 3. Dix jours durant, réalisateurs et producteurs ont bénéficié de formations et de masterclasses avec pour objectif de développer leurs projets. Les lauréats participants ont reçu leurs attestations lors d'une cérémonie de clôture au Splendide Hôtel de Ouagadougou.",
    image:
      "https://image.over-blog.com/E5BmUoCXiI9ieYgWgMjkGHtIXDY=/940x320/smart/filters:no_upscale()/image%2F0818284%2F20181005%2Fob_38870c_laure-ats-ofl-3.JPG",
    sortOrder: 55,
  },
  {
    titre: "OUAGA FILM LAB 2018 : «Silence, ça tourne pour les pitchs !»",
    categorie: "Événement",
    dateLabel: "Septembre 2018",
    excerpt:
      "Ce vendredi 28 septembre 2018, l'honneur était aux porteurs de projets de passer devant les membres du jury afin de les convaincre. Jean Baptiste P. OUEDRAOGO et Claver Zongo, porteurs du projet «WAKAT» du Burkina Faso, ont notamment présenté leur film devant un jury de professionnels du cinéma africain.",
    image:
      "https://image.over-blog.com/b2oXfJ3Q4Bvo5EEHaDagGdgnvTY=/940x320/smart/filters:no_upscale()/image%2F0818284%2F20181001%2Fob_99110b_dsc-0996.JPG",
    sortOrder: 60,
  },
  {
    titre: "Gaston Kaboré : «Celui qui transmet est celui qui apprend le plus»",
    categorie: "Masterclass",
    dateLabel: "Septembre 2018",
    excerpt:
      "L'édition 2018 de Ouaga Film Lab s'est tenue du 20 au 29 septembre. Une occasion pour les acteurs, réalisateurs, producteurs et amoureux du cinéma de se retrouver autour d'une masterclass avec le cinéaste burkinabè Gaston Kaboré, en échange avec Giona A. Nazzaro, figure majeure du cinéma mondial.",
    image:
      "https://image.over-blog.com/vyy0bCf8F9eA-zgsVTGBw9QiClc=/940x320/smart/filters:no_upscale()/image%2F0818284%2F20181001%2Fob_b9cebd_dsc-0782.JPG",
    sortOrder: 65,
  },
  {
    titre: "Masterclass de Mohamed Ben Attia : «Ils ont fait leur fils comme un projet de vie»",
    categorie: "Masterclass",
    dateLabel: "Septembre 2018",
    excerpt:
      "La 4e masterclass de l'édition 2018 de Ouaga Film Lab s'est déroulée au Ciné Burkina de Ouagadougou. Mohamed Ben Attia, réalisateur tunisien, a partagé sa vision du cinéma et de la narration avec les jeunes cinéastes burkinabè et africains présents.",
    image:
      "https://image.over-blog.com/2yOBlKUlk7nj3sdU54v1QRChrUo=/940x320/smart/filters:no_upscale()/image%2F0818284%2F20181001%2Fob_209230_dsc-0888.JPG",
    sortOrder: 70,
  },
  {
    titre: "Le rendez-vous manqué — hommage à Idrissa Ouédraogo",
    categorie: "Hommage",
    dateLabel: "Septembre 2018",
    excerpt:
      "La stupeur était sans pareille pour les acteurs du 7e art burkinabè : le dimanche 18 février 2018, Idrissa Ouédraogo nous quittait. Pilumpiku Production lui rend hommage, lui qui avait animé une masterclass au Ouaga Film Lab en septembre 2017 — un rendez-vous désormais gravé dans les mémoires.",
    image:
      "https://image.over-blog.com/bWStzcjFAdeQqWHsOB6_jeYS4Ko=/940x320/smart/filters:no_upscale()/image%2F0818284%2F20180926%2Fob_ac17dc_master-class-idrissa.jpg",
    sortOrder: 75,
  },
  {
    titre: "Le métier de directeur de production : un atelier pour mieux le connaître",
    categorie: "Formation",
    dateLabel: "Septembre 2018",
    excerpt:
      "Qui est le directeur de production ? Quel est son rôle ? Quelles qualités doit-il avoir pour réussir son œuvre ? Sékou Traoré, producteur de la société Abissia Productions, a répondu à ces questions lors d'un atelier organisé au Ouaga Film Lab 2018.",
    image:
      "https://image.over-blog.com/LYzZidyLRGsKQ4P02Zv6BGmpH6A=/940x320/smart/filters:no_upscale()/image%2F0818284%2F20180926%2Fob_63c915_sekou-traore.JPG",
    sortOrder: 80,
  },
  {
    titre: "Bientôt une épine en moins pour les cinéastes !",
    categorie: "Actualité cinéma",
    dateLabel: "Septembre 2018",
    excerpt:
      "Bientôt un Bureau d'Accueil et de Tournage en Afrique de l'Ouest (BATAO). C'est un projet dont l'ambition est de mettre un terme aux difficultés de production rencontrées par les cinéastes étrangers souhaitant tourner en Afrique de l'Ouest. Une annonce saluée lors du Ouaga Film Lab 2018.",
    image:
      "https://image.over-blog.com/uUnoiTc7EcMctUAAMccVXSHh81w=/940x320/smart/filters:no_upscale()/image%2F0818284%2F20180923%2Fob_9afdd9_dsc-1347.JPG",
    sortOrder: 85,
  },
  {
    titre: "Ouaga Producers Lab II : l'appréciation des participants",
    categorie: "Formation",
    dateLabel: "Septembre 2018",
    excerpt:
      "Nous voilà à la deuxième journée du Ouaga Producers Lab. Les participants attendent beaucoup de cette semaine de formation. Comment perçoivent-ils ce début ? Comment apprécient-ils le formateur et sa méthode ? Les jeunes producteurs burkinabè partagent leurs impressions.",
    image:
      "https://image.over-blog.com/s4iBoJidhHeFw5T9K4dN0ieqSd0=/940x320/smart/filters:no_upscale()/image%2F0818284%2F20180922%2Fob_078b94_thumbnail-1.jpg",
    sortOrder: 90,
  },
  {
    titre: "Ouaga Producers Lab : quand la jeunesse refuse de marcher sur les traces des anciens",
    categorie: "Formation",
    dateLabel: "Septembre 2018",
    excerpt:
      "Ouaga Films Lab a ouvert ses portes le jeudi 20 septembre 2018, à Ouagadougou. La première activité a été un atelier sur le métier de producteur, animé par le producteur béninois Faissol Gnonlonfin. Les jeunes participants ont exprimé leur volonté de tracer leur propre voie dans le cinéma africain.",
    image:
      "https://image.over-blog.com/G_w376k0m7KyeTZXVWKDzWbNbnQ=/940x320/smart/filters:no_upscale()/image%2F0818284%2F20180922%2Fob_41d886_thumbnail-4.jpg",
    sortOrder: 95,
  },
  {
    titre: "Ouaga Film Lab 2018 : soyez au rendez-vous du 20 au 29 septembre",
    categorie: "Événement",
    dateLabel: "Septembre 2018",
    excerpt:
      "Pilumpiku Production vous donne rendez-vous du 20 au 29 septembre 2018 au Splendide Hôtel de Ouagadougou pour la 3e édition du Ouaga Film Lab. Au programme : ateliers de développement de projets, masterclasses avec des cinéastes de renom, sessions de pitch et rencontres professionnelles.",
    image:
      "https://image.over-blog.com/97rW8Ioo95rqPQjTFtBpydziHuw=/940x320/smart/filters:no_upscale()/image%2F0818284%2F20180919%2Fob_a0e414_ofl-2018-dossier-de-presse-2-glisse.jpg",
    sortOrder: 100,
  },
  {
    titre: "Galerie Ciné-Équipements : une immersion dans l'univers cinématographique",
    categorie: "Événement",
    dateLabel: "Mars 2018",
    excerpt:
      "En marge de la 5e édition des Journées Cinématographiques de la Femme Africaine (JCFA), s'est ouverte le lundi 5 mars 2018 la première édition de la « Galerie Ciné-Équipements », une exposition-vente d'équipements cinematographiques tenue à l'ISIS (Institut Supérieur de l'Image et du Son) de Ouagadougou. Initiée par Mamounata Nikiéma, la galerie réunit outils de prise de vue, maquillage-costume et matériel de projection — offrant aux cinéphiles, professionnels et scolaires un espace de découverte inédit des outils du septième art.\n\nCet événement a réuni des exposants, des ateliers-découvertes, des visites guidées et des jeux-concours sur le cinéma burkinabè. La marraine Suzanne Kourouma, chef du département marché du film au FESPACO, a salué l'initiative : « À partir de ce soir, il y a quelque chose de grand qui commence à naître. »\n\n(Source : Faso24, 6 mars 2018)",
    image: "/img/fespaco.jpg",
    sortOrder: 105,
  },
  {
    titre: "« Il n'y a aucune caméra conçue pour la peau noire » — Mamounata Nikiéma",
    categorie: "Interview",
    dateLabel: "Mars 2018",
    excerpt:
      "À l'occasion de la 1ère édition de la Galerie Ciné-Équipements aux JCFA 2018, Mamounata Nikiéma a accordé une interview au site Queen MAFA. Elle y explique la genèse de ce projet né lors d'une formation en entrepreneuriat culturel : « L'objectif, c'était de voir comment je pouvais apporter ma contribution à rendre nos sociétés autonomes. »\n\nMais c'est sa réflexion sur la technologie cinématographique qui a suscité le plus grand intérêt : « Il n'y a aucune caméra spécialement conçue pour la peau noire. Comme nous avons des techniciens, pourquoi ne pas y penser ? » Une interpellation forte adressée à l'industrie du cinéma mondial, et une invitation à repenser la technologie du cinéma depuis le Burkina Faso et l'Afrique.\n\n(Source : Queen MAFA, 6 mars 2018)",
    image: "/img/mamounata-cnc.jpg",
    sortOrder: 110,
  },
  {
    titre: "1ère Galerie Ciné-Équipements : un espace de commercialisation des outils audiovisuels",
    categorie: "Événement",
    dateLabel: "Mars 2018",
    excerpt:
      "La 1ère édition de la Galerie Ciné-Équipements s'est tenue du 3 au 7 mars 2018 à Ouagadougou dans les locaux de l'ISIS, en partenariat avec le Ministère de la Culture et le FESPACO. Initiée par PILUMPIKU PRODUCTION, l'événement avait pour ambition de créer des espaces occasionnels de commercialisation de matériels de cinéma et de l'audiovisuel, de former les jeunes professionnels et d'ouvrir les scolaires à l'univers technique du 7e art.\n\n« C'est un espace ouvert aux professionnels du cinéma qui ont la possibilité de venir s'enquérir des nouvelles technologies, mais aussi ouvert au grand public notamment les scolaires pour les ateliers de découverte », a précisé la promotrice Mamounata Nikiéma. Le directeur de l'ISIS, Souleymane Ouédraogo, a salué l'initiative : « C'est le moment pour le grand public, les professionnels et les étudiants de découvrir quels sont les équipements utilisés dans l'audiovisuel. »\n\n(Source : Lefaso.net, 5 mars 2018)",
    image: "/img/burkina-cinema-2.jpg",
    sortOrder: 115,
  },
  {
    titre: "Dans les coulisses des JCFA : la Galerie Ciné-Équipements de Mamounata Nikiéma",
    categorie: "Reportage",
    dateLabel: "Mars 2018",
    excerpt:
      "Le site ArtistesBF est allé dans les coulisses des JCFA pour découvrir la Galerie Ciné-Équipements, « une idée ingénieuse de la réalisatrice productrice Mamounata Nikiéma ». Grues, bobines magnétiques, téléobjectifs, appareils photo analogiques, matériel de projection, trépieds… tout était réuni pour permettre aux jeunes de comprendre l'histoire du cinéma et découvrir avec quel matériel on réalise un film.\n\nParmi les activités phares : « Minute retour », un espace où de jeunes cinéastes ayant des projets en développement pouvaient les présenter et recevoir les conseils du réalisateur Guy Désiré Yaméogo. « J'essaye de leur donner un certain nombre de clés pour leur permettre d'avancer. Je souhaite que cet événement grandisse, parce qu'ailleurs ça existe », a-t-il déclaré.\n\n(Source : ArtistesBF, 10 mars 2018)",
    image: "/img/fespaco.jpg",
    sortOrder: 120,
  },
  {
    titre: "Pourquoi le cinéma de demain viendra de Corée du Sud",
    categorie: "Actualité cinéma",
    dateLabel: "Juillet 2016",
    excerpt:
      "Une des plus grandes usines de films au monde s'intéresse de très près au futur du cinéma en réalité virtuelle. Avec Samsung et Oculus comme soutien, la Corée du Sud pourrait bien devenir le Hollywood de la VR. Depuis les salles immersives ScreenX — trois écrans offrant une vision à 180° — jusqu'aux casques Gear VR, les studios coréens multiplient les innovations pour réinventer l'expérience cinématographique.\n\n« La réalité virtuelle est différente de la 3D. La 3D n'était pas un changement de paradigme. Alors que la VR signifie une véritable convergence de différents médias », explique Yelena Rachitsky d'Oculus. 80 % des possesseurs d'un Gear VR regardent quasi exclusivement du contenu vidéo chaque jour — preuve que la VR n'est pas qu'une lubie de gamers, mais un véritable marché multimédia grand public.\n\n(Source : Numerama, 27 juillet 2016)",
    image: "/img/burkina-cinema-2.jpg",
    sortOrder: 125,
  },
];

const SERVICES = [
  {
    titre: "Production de documentaires d'auteur",
    description:
      "De l'écriture à la diffusion, Pilumpiku accompagne les cinéastes dans la fabrication de films documentaires exigeants, ancrés dans les réalités africaines contemporaines.",
    icon: "Film",
    sortOrder: 10,
  },
  {
    titre: "Coproductions internationales",
    description:
      "Partenariats avec des sociétés de production africaines, européennes et nord-américaines pour faire circuler les films au-delà des frontières.",
    icon: "Globe",
    sortOrder: 20,
  },
  {
    titre: "Services de tournage au Burkina",
    description:
      "Repérages, équipes techniques, autorisations, logistique : nous accueillons les productions étrangères au Burkina Faso et dans la sous-région.",
    icon: "MapPin",
    sortOrder: 30,
  },
  {
    titre: "Sulunsuku — diffusion africaine",
    description:
      "Plateforme d'accompagnement et de diffusion lancée en 2018 pour faire circuler les films d'auteur africains sur le continent.",
    icon: "Send",
    sortOrder: 40,
  },
  {
    titre: "Sobatè — projections grand public",
    description:
      "Programmation du festival Sobatè et de cycles de projections en plein air dans les quartiers populaires de Ouagadougou.",
    icon: "Camera",
    sortOrder: 50,
  },
  {
    titre: "Formation et transmission",
    description:
      "Ateliers, masterclasses et accompagnement de la jeune génération de cinéastes burkinabè et sahéliens, en partenariat avec la FNCA et la Confédération AES du Cinéma.",
    icon: "GraduationCap",
    sortOrder: 60,
  },
];

const PARTNERS = [
  {
    nom: "FESPACO",
    description:
      "Festival Panafricain du Cinéma et de la Télévision de Ouagadougou — la plus ancienne et la plus prestigieuse manifestation du cinéma africain.",
    sortOrder: 10,
  },
  {
    nom: "FNCA Burkina Faso",
    description:
      "Fédération Nationale des Ciné-Clubs et Associations cinématographiques du Burkina, présidée par Mamounata Nikiéma depuis 2022.",
    sortOrder: 20,
  },
  {
    nom: "Confédération AES du Cinéma",
    description:
      "Organisation regroupant les acteurs du cinéma du Burkina Faso, du Mali et du Niger, présidée par Mamounata Nikiéma.",
    sortOrder: 30,
  },
  {
    nom: "Africalia",
    description:
      "Organisation belge de coopération culturelle, partenaire de longue date de Pilumpiku autour de la plateforme Sulunsuku.",
    sortOrder: 40,
  },
  {
    nom: "Ouaga Film Lab",
    description:
      "Résidence d'écriture et de développement de projets de cinéma à Ouagadougou.",
    sortOrder: 50,
  },
  {
    nom: "Durban FilmMart",
    description:
      "Marché du film de Durban (Afrique du Sud), partenaire de coproduction et de pitch pour les films africains.",
    sortOrder: 60,
  },
  {
    nom: "Université Gaston Berger",
    description:
      "Université Gaston Berger de Saint-Louis (Sénégal) — alma mater de Mamounata Nikiéma (Master 2 réalisation documentaire).",
    sortOrder: 70,
  },
  {
    nom: "CNC France",
    description:
      "Centre national du cinéma et de l'image animée — programme d'accompagnement des productrices et producteurs ACP.",
    sortOrder: 80,
  },
  {
    nom: "Visions du Réel — Nyon",
    description:
      "Festival international de cinéma de Nyon (Suisse), dédié au cinéma du réel et à la création documentaire.",
    sortOrder: 90,
  },
  {
    nom: "Lully Grâce Production",
    description:
      "Société de production ivoirienne (Franck Vlehi, Laurent Bitty), coproductrice de Djeliya, mémoire du Mandé.",
    sortOrder: 100,
  },
  {
    nom: "Sunuy Films",
    description:
      "Société de production sénégalaise (Souleymane Kébé), coproductrice de Djeliya, mémoire du Mandé.",
    sortOrder: 110,
  },
  {
    nom: "DS Productions",
    description:
      "Société de production malienne (Andrey Samoute Diarra), coproductrice de Djeliya, mémoire du Mandé.",
    sortOrder: 120,
  },
  {
    nom: "Ladybirds Films",
    description:
      "Société de production française (Jules David), coproductrice de Djeliya, mémoire du Mandé.",
    sortOrder: 130,
  },
  {
    nom: "FDCT-PAIC Burkina Faso",
    description:
      "Fonds de Développement Culturel et Touristique — Programme d'Appui aux Industries Créatives, Ministère de la Culture du Burkina Faso.",
    sortOrder: 140,
  },
  {
    nom: "FONSIC — Côte d'Ivoire",
    description:
      "Fonds de Soutien à l'Industrie Cinématographique de Côte d'Ivoire, en partenariat avec l'OIF (CLAP ACP 2).",
    sortOrder: 150,
  },
  {
    nom: "FOPICA — Sénégal",
    description:
      "Fonds de Promotion de l'Industrie Cinématographique et Audiovisuelle du Sénégal.",
    sortOrder: 160,
  },
  {
    nom: "CNCM — Mali",
    description:
      "Centre National de la Cinématographie du Mali — appui logistique et technique.",
    sortOrder: 170,
  },
  {
    nom: "Aide aux Cinémas du Monde",
    description:
      "CNC France · Institut français · Union européenne · États ACP — programme international de soutien à la création.",
    sortOrder: 180,
  },
  {
    nom: "Fonds Image de la Francophonie",
    description:
      "Organisation internationale de la Francophonie — soutien à la création audiovisuelle francophone.",
    sortOrder: 190,
  },
  {
    nom: "Fonds Jeune Création Francophone",
    description:
      "Programme de soutien à la jeune création audiovisuelle dans l'espace francophone.",
    sortOrder: 200,
  },
  {
    nom: "TV5 Monde",
    description:
      "Chaîne francophone internationale, partenaire de diffusion.",
    sortOrder: 210,
  },
  {
    nom: "Hot Docs Blue Ice Fund",
    description:
      "Fonds canadien dédié au soutien des documentaires africains.",
    sortOrder: 220,
  },
  {
    nom: "Red Sea Fund",
    description:
      "Fonds saoudien de soutien aux cinémas d'Afrique, du Moyen-Orient et d'Asie.",
    sortOrder: 230,
  },
  {
    nom: "Les Films de la pluie",
    description:
      "Société de production française dirigée par Sylvie Plunian, coproductrice de « L'Odyssée d'Omar » de Mamounata Nikièma.",
    sortOrder: 240,
  },
  {
    nom: "Tënk",
    description:
      "Plateforme de référence du cinéma documentaire en VOD ; diffuse « L'Odyssée d'Omar » depuis janvier 2022.",
    sortOrder: 250,
  },
  {
    nom: "The Kingdom",
    description:
      "Société de production française dirigée par Marie-Odile Gazin et Julie Nguyen Van Qui, productrice déléguée du long-métrage documentaire « Étincelles » de Bawa Kadadé Riba (coproduction Pilumpiku).",
    sortOrder: 260,
  },
  {
    nom: "Téléfilm Canada",
    description:
      "Agence fédérale canadienne du cinéma ; partenaire de l'accompagnement en post-production à Montréal pour « Étincelles » via le Fonds Jeune Création Francophone.",
    sortOrder: 270,
  },
  {
    nom: "STEPS",
    description:
      "Société de production sud-africaine (Tiny Mungwe & Don Edkins) à l'origine du programme panafricain Generation Africa, coproductrice de « Sur les traces d'un migrant » de Delphine Yerbanga.",
    sortOrder: 280,
  },
  {
    nom: "Generation Africa",
    description:
      "Initiative panafricaine de coproduction documentaire portée par STEPS ; a soutenu « Sur les traces d'un migrant » de Delphine Yerbanga (Pilumpiku).",
    sortOrder: 290,
  },
];

const SETTINGS = {
  heroBadge: "Pilumpiku Productions · Ouagadougou",
  heroTitleLine1: "Le cinéma comme",
  heroTitleLine2: "métamorphose",
  heroSubtitle:
    "Société de production cinématographique fondée en 2011 à Ouagadougou par Mamounata Nikiéma. Nous accompagnons des écritures documentaires qui interrogent les transformations sociales, politiques et culturelles de l'Afrique contemporaine — et donnent toute leur place aux voix des femmes et des jeunesses africaines.",
  quoteText:
    "Comme le papillon qui sort de sa chrysalide, le cinéma est pour nous un acte de transformation : celle des regards, celle des sociétés, celle d'un continent qui se raconte enfin lui-même.",
  quoteAuthor: "Mamounata Nikiéma",
  statsProjets: "11",
  statsPays: "15+",
  statsFestivals: "20+",
  aboutHistoire:
    "Pilumpiku Productions a été fondée en 2011 à Ouagadougou par la réalisatrice et productrice Mamounata Nikiéma, alors jeune diplômée d'un Master 2 en réalisation documentaire de l'Université Gaston Berger de Saint-Louis (Sénégal).\n\nLe nom — pilumpiku, le papillon en mooré — n'a rien d'anodin. Il dit la chrysalide, la mue, l'envol. Il dit l'engagement d'une maison de production qui croit que le cinéma peut accompagner les métamorphoses d'une société, en montrant ce qui change, ce qui résiste, ce qui doit naître.\n\nDepuis Ouagadougou, Pilumpiku produit et coproduit des films documentaires d'auteur, anime la plateforme audiovisuelle Sulunsuku (lancée en 2018) et programme le festival de cinéma en plein air Sobatè, qui rapproche le grand écran des publics populaires des quartiers de la capitale.",
  aboutVision:
    "Faire du documentaire un espace d'écoute, de mémoire et de transmission. Mettre à l'honneur les voix des femmes, des jeunes et des oubliés de l'histoire officielle. Soutenir l'émergence d'une nouvelle génération de cinéastes burkinabè et sahéliens, libres dans leurs formes et exigeants dans leurs récits.",
  founderName: "Mamounata Nikiéma",
  founderTitle: "Fondatrice · Réalisatrice & Productrice · Présidente FNCA",
  founderBio:
    "Née en 1979, Mamounata Nikiéma obtient son baccalauréat en 2001, puis un Master 2 en réalisation documentaire à l'Université Gaston Berger de Saint-Louis (Sénégal) en 2008.\n\nEn 2011, elle fonde à Ouagadougou Pilumpiku Production et signe la même année son premier travail de réalisation pour la télévision dans la série « Une journée avec… ». Elle réalise ensuite le long-métrage documentaire « L'Odyssée d'Omar » (2020, coproduit avec Les Films de la pluie, diffusé sur Tënk) puis le court-métrage « Intacte » (2022).\n\nComme productrice, elle accompagne « Au fantôme du père » de Marie-Laurentine Bayala (2018), « Sur les traces d'un migrant » de Delphine Yerbanga (2021, Grand Prix du Président du Faso au FESPACO), « Pingda » (2024), « Loin de moi la colère » de Joël Akafou (2025), la coproduction finlandaise « Katseiden alla » (2025), et « Djeliya, mémoire du Mandé » de Boubacar Sangaré, sélectionné en première mondiale au festival Visions du Réel 2026.\n\nReconnue très tôt pour son travail de productrice, elle remporte en septembre 2017 le Prix Nomadis Images au Ouaga Producers Lab, premier atelier dédié aux productrices et producteurs burkinabè.\n\nFigure majeure du paysage culturel ouest-africain, elle a été élue en mai 2022 présidente de la Fédération Nationale des Ciné-Clubs et Associations cinématographiques (FNCA), puis présidente de la Confédération AES du Cinéma. Elle est Chevalier de l'Ordre du Mérite des Arts, des Lettres et de la Communication du Burkina Faso.\n\nÀ travers Pilumpiku, la plateforme Sulunsuku et le festival Sobatè, elle œuvre sans relâche à élargir les publics du cinéma africain et à former la relève.",
  founderImage: "/img/mamounata-spla.jpg",
  contactEmail: "pilumpikuproduction@gmail.com",
  contactPhone: "+226 70 14 92 33 / +226 78 70 12 32",
  contactAddress: "S/C BP 68 Ouagadougou 01, Burkina Faso",
};

async function seed() {
  logger.info("Starting seed...");

  await db
    .insert(projectsTable)
    .values(PROJECTS)
    .onConflictDoUpdate({
      target: projectsTable.slug,
      set: {
        titre: sql`excluded.titre`,
        categorie: sql`excluded.categorie`,
        statut: sql`excluded.statut`,
        annee: sql`excluded.annee`,
        duree: sql`excluded.duree`,
        langue: sql`excluded.langue`,
        synopsis: sql`excluded.synopsis`,
        intention: sql`excluded.intention`,
        image: sql`excluded.image`,
        galerie: sql`excluded.galerie`,
        sortOrder: sql`excluded.sort_order`,
        featured: sql`excluded.featured`,
      },
    });
  logger.info({ count: PROJECTS.length }, "Seeded projects (upsert)");

  const [existingNews] = await db.select().from(newsTable).limit(1);
  if (!existingNews) {
    await db.insert(newsTable).values(NEWS);
    logger.info({ count: NEWS.length }, "Seeded news");
  } else {
    logger.info("News already seeded — skipping");
  }

  const [existingService] = await db.select().from(servicesTable).limit(1);
  if (!existingService) {
    await db.insert(servicesTable).values(SERVICES);
    logger.info({ count: SERVICES.length }, "Seeded services");
  } else {
    logger.info("Services already seeded — skipping");
  }

  const [existingPartner] = await db.select().from(partnersTable).limit(1);
  if (!existingPartner) {
    await db.insert(partnersTable).values(PARTNERS);
    logger.info({ count: PARTNERS.length }, "Seeded partners");
  } else {
    logger.info("Partners already seeded — skipping");
  }

  const [existingSettings] = await db.select().from(siteSettingsTable).limit(1);
  if (!existingSettings) {
    await db.insert(siteSettingsTable).values(SETTINGS);
    logger.info("Seeded site settings");
  } else {
    logger.info("Site settings already seeded — skipping");
  }

  logger.info("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  logger.error({ err }, "Seed failed");
  process.exit(1);
});

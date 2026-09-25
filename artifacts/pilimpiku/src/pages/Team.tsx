import { useSeo } from "@/hooks/use-seo";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Camera, Clapperboard, X } from "lucide-react";
import { useEffect, useState } from "react";

import imageLight from "@assets/download_1790322562405.png";
import imageCamera from "@assets/download_1790322616731.png";
import imageCourtyard from "@assets/download_1790322865387.png";
import imageGround from "@assets/download_1790322877443.png";
import imageMonitor from "@assets/download_1790322882526.png";
import imageWall from "@assets/download_1790322890440.png";
import imageEquipment from "@assets/download_1790322899909.png";
import imageCameraGround from "@assets/download_1790322907276.png";
import imageTripod from "@assets/download_1790322911125.png";

type ShootImage = {
  src: string;
  alt: string;
  label: string;
  orientation: "landscape" | "portrait";
};

const shootImages: ShootImage[] = [
  {
    src: imageLight,
    alt: "Une équipe ajuste une grande source de lumière devant un décor en terre",
    label: "La lumière se partage",
    orientation: "landscape",
  },
  {
    src: imageCamera,
    alt: "Une caméra portée au milieu d'une discussion sur le tournage",
    label: "Regarder ensemble",
    orientation: "landscape",
  },
  {
    src: imageCourtyard,
    alt: "Une équipe installe une caméra dans une cour, sous les arbres",
    label: "Le décor est vivant",
    orientation: "landscape",
  },
  {
    src: imageGround,
    alt: "Deux personnes vérifient une caméra au ras du sol",
    label: "Au plus près",
    orientation: "landscape",
  },
  {
    src: imageMonitor,
    alt: "Une caméra et une perche son suivent une scène sous un auvent",
    label: "Le cadre circule",
    orientation: "landscape",
  },
  {
    src: imageWall,
    alt: "Des membres de l'équipe se retrouvent autour d'un décor en terre",
    label: "Entre deux prises",
    orientation: "landscape",
  },
  {
    src: imageEquipment,
    alt: "Une personne prépare un équipement de tournage au sol",
    label: "Chaque détail compte",
    orientation: "landscape",
  },
  {
    src: imageCameraGround,
    alt: "Une caméra est tenue au milieu d'une conversation avec l'équipe",
    label: "La confiance en mouvement",
    orientation: "landscape",
  },
  {
    src: imageTripod,
    alt: "Une équipe travaille autour d'une caméra sur trépied en plein air",
    label: "Faire corps",
    orientation: "landscape",
  },
];

function FrameImage({
  image,
  index,
  onOpen,
}: {
  image: ShootImage;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.65, delay: Math.min(index * 0.04, 0.24) }}
      className="group relative block w-full overflow-hidden border border-foreground/10 bg-[#24160f] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      data-testid={`button-team-image-${index + 1}`}
      aria-label={`Agrandir la photographie : ${image.label}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-[#150b07]/80 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
        <span className="font-serif text-lg leading-none text-foreground sm:text-xl">{image.label}</span>
        <ArrowUpRight
          aria-hidden="true"
          className="shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          size={18}
        />
      </span>
    </motion.button>
  );
}

export default function Team() {
  useSeo({
    title: "Équipe",
    description:
      "Entrez dans les coulisses de Pilumpiku Production et découvrez le travail collectif qui fait vivre les tournages à Ouagadougou.",
  });

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    if (selectedImage === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  const closeLightbox = () => setSelectedImage(null);
  const showPrevious = () =>
    setSelectedImage((current) =>
      current === null ? current : (current - 1 + shootImages.length) % shootImages.length,
    );
  const showNext = () =>
    setSelectedImage((current) =>
      current === null ? current : (current + 1) % shootImages.length,
    );

  return (
    <div className="w-full overflow-hidden bg-background pt-20 sm:pt-24">
      <section className="relative min-h-[calc(100svh-5rem)] border-b border-border/40">
        <div className="absolute inset-0">
          <img
            src={shootImages[0].src}
            alt={shootImages[0].alt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#120905]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-[#120905]/20" />
        </div>

        <div className="container relative mx-auto flex min-h-[calc(100svh-5rem)] flex-col justify-end px-4 pb-12 sm:px-6 sm:pb-16 md:px-12 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mb-5 text-[0.68rem] uppercase tracking-[0.28em] text-primary sm:text-xs"
          >
            Pilumpiku Production · Ouagadougou
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="max-w-4xl font-serif text-[3.6rem] leading-[0.86] text-foreground sm:text-7xl md:text-8xl lg:text-[9.2rem]"
          >
            Le film
            <br />
            <span className="pl-[12vw] text-primary">se fait</span>
            <br />
            <span className="text-foreground/80">ensemble.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.58 }}
            className="mt-8 flex flex-col gap-6 border-t border-foreground/25 pt-5 sm:flex-row sm:items-end sm:justify-between"
          >
            <p className="max-w-sm text-sm leading-relaxed text-foreground/75 sm:text-base">
              Sur un plateau, une histoire prend forme dans les gestes, les regards et les
              attentions de toutes les personnes présentes.
            </p>
            <a
              href="#gestes"
              className="flex w-fit items-center gap-3 text-[0.68rem] uppercase tracking-[0.22em] text-primary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              data-testid="link-team-scroll"
            >
              Entrer dans les coulisses
              <ArrowDown size={15} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      <section id="gestes" className="container mx-auto px-4 py-20 sm:px-6 sm:py-28 md:px-12">
        <div className="grid gap-10 md:grid-cols-[0.72fr_1.28fr] md:gap-20">
          <div>
            <p className="mb-4 text-[0.68rem] uppercase tracking-[0.24em] text-primary">
              Les gestes du cinéma
            </p>
            <h2 className="max-w-xs font-serif text-4xl leading-[0.95] text-foreground sm:text-5xl">
              Rien ne se fait seul.
            </h2>
          </div>
          <div className="max-w-2xl space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              Une caméra se déplace, une lumière s&apos;ouvre, une voix se pose. Autour d&apos;elle,
              une équipe observe, propose, ajuste et recommence. C&apos;est cette circulation qui
              donne sa force à chaque image.
            </p>
            <p>
              Chez Pilumpiku, les films documentaires et de fiction naissent d&apos;un travail
              attentif aux personnes et aux lieux. Les coulisses ne sont pas à côté du récit :
              elles en sont la matière, le rythme et la mémoire.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[0.68rem] uppercase tracking-[0.2em] text-primary/80">
              <span className="h-px w-10 bg-primary/60" />
              Une présence après l&apos;autre
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/40 bg-[#21120b]/55">
        <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 md:px-12">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-[0.68rem] uppercase tracking-[0.24em] text-primary">Sur le terrain</p>
              <h2 className="font-serif text-4xl leading-none text-foreground sm:text-6xl">Le plateau, au présent.</h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Des fragments de tournage, sans pose. Le travail se lit dans les détails.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
            {shootImages.slice(1, 7).map((image, index) => (
              <div
                key={image.src}
                className={index === 0 || index === 3 ? "lg:col-span-7" : "lg:col-span-5"}
              >
                <FrameImage image={image} index={index + 1} onOpen={() => setSelectedImage(index + 1)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 sm:px-6 sm:py-28 md:px-12">
        <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-20">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative z-10 overflow-hidden border border-foreground/10 bg-[#24160f] p-2 sm:p-3"
            >
              <img
                src={shootImages[7].src}
                alt={shootImages[7].alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>
            <div className="absolute -bottom-7 -right-3 z-20 hidden w-2/5 border border-primary/40 bg-background p-2 sm:block">
              <img
                src={shootImages[8].src}
                alt={shootImages[8].alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <span className="absolute -left-2 -top-8 font-serif text-8xl leading-none text-primary/15 sm:-left-6 sm:text-[10rem]">
              09
            </span>
          </div>
          <div>
            <p className="mb-4 text-[0.68rem] uppercase tracking-[0.24em] text-primary">Ce qui reste</p>
            <h2 className="max-w-lg font-serif text-4xl leading-[0.94] text-foreground sm:text-6xl">
              Une équipe, c&apos;est aussi ce qui se passe entre les images.
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Les installations, les pauses, les vérifications et les échanges construisent une
              manière de travailler. Ils rendent possible une relation juste avec les histoires
              que nous choisissons de raconter.
            </p>
            <div className="mt-9 grid max-w-md grid-cols-2 gap-5 border-t border-border/60 pt-5 text-sm text-muted-foreground">
              <div>
                <Camera size={17} className="mb-3 text-primary" aria-hidden="true" />
                <span className="block leading-relaxed">Observer avant de filmer</span>
              </div>
              <div>
                <Clapperboard size={17} className="mb-3 text-primary" aria-hidden="true" />
                <span className="block leading-relaxed">Construire avec les autres</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/40 bg-[#140a06]">
        <div className="container mx-auto px-4 py-20 sm:px-6 sm:py-28 md:px-12">
          <div className="grid gap-8 md:grid-cols-[0.65fr_1.35fr] md:gap-16">
            <div>
              <p className="mb-4 text-[0.68rem] uppercase tracking-[0.24em] text-primary">La suite du cadre</p>
              <h2 className="font-serif text-4xl leading-none text-foreground sm:text-5xl">
                Les histoires continuent.
              </h2>
            </div>
            <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Chaque tournage laisse des traces : dans un lieu, dans une équipe, dans le regard
                porté sur le monde. C&apos;est ce mouvement collectif que nous emportons vers le
                prochain film.
              </p>
              <a
                href="/contact"
                className="group flex w-fit shrink-0 items-center gap-3 border-b border-primary/60 pb-2 text-[0.68rem] uppercase tracking-[0.2em] text-primary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                data-testid="link-team-contact"
              >
                Parlons d&apos;un projet
                <ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Photographie : ${shootImages[selectedImage].label}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0d0604]/95 p-4 sm:p-8"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center border border-foreground/20 text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-8 sm:top-8"
              aria-label="Fermer la photographie"
              data-testid="button-close-team-image"
            >
              <X size={20} />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 p-3 text-foreground/65 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:block"
              aria-label="Photographie précédente"
              data-testid="button-previous-team-image"
            >
              <ArrowUpRight className="-rotate-135" size={24} />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 p-3 text-foreground/65 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:block"
              aria-label="Photographie suivante"
              data-testid="button-next-team-image"
            >
              <ArrowUpRight className="rotate-45" size={24} />
            </button>
            <motion.figure
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative max-h-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={shootImages[selectedImage].src}
                alt={shootImages[selectedImage].alt}
                className="max-h-[78svh] w-auto max-w-full object-contain"
              />
              <figcaption className="mt-3 flex items-center justify-between gap-4 text-sm text-muted-foreground">
                <span className="font-serif text-lg text-foreground">{shootImages[selectedImage].label}</span>
                <span>{String(selectedImage + 1).padStart(2, "0")} / {String(shootImages.length).padStart(2, "0")}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
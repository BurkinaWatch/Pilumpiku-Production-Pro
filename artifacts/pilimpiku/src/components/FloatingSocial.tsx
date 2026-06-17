import { Instagram, Linkedin, Video, Facebook } from "lucide-react";

const links = [
  {
    href: "https://www.instagram.com/mamounatan?igsh=MTZoaWZpYXdsaHE1Mw==",
    icon: Instagram,
    label: "Instagram",
  },
  {
    href: "https://www.facebook.com/pilumpikuproduction",
    icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://bf.linkedin.com/in/pilumpiku-production-8b97642b5",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://www.youtube.com/@pilumpikuproduction7508",
    icon: Video,
    label: "YouTube",
  },
];

export function FloatingSocial() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-10 h-10 bg-background/80 backdrop-blur-sm border border-foreground/20 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-lg"
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  );
}

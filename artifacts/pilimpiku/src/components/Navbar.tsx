import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { ButterflyLogo } from "./ButterflyLogo";
import { Menu, X, ShieldCheck, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@workspace/replit-auth-web";

type ServiceItem = { name: string; path: string };
type ProductCategory = {
  name: string;
  fullName: string;
  path: string;
  services: ServiceItem[];
};

const productCategories: ProductCategory[] = [
  {
    name: "Productions",
    fullName: "Productions Cinéma et Audiovisuel",
    path: "/services",
    services: [
      { name: "Écriture & développement de scénarios", path: "/services#ecriture" },
      { name: "Production — films, fictions, séries", path: "/services#production" },
      { name: "Postproduction & promotion", path: "/services#postproduction" },
      { name: "Production exécutive internationale", path: "/services#executif" },
    ],
  },
  {
    name: "Sulunsuku",
    fullName: "Plateforme digitale Sulunsuku",
    path: "/sulunsuku",
    services: [
      { name: "Magazine en ligne Avant-Première", path: "/sulunsuku#magazine" },
      { name: "Répertoire des Professionnels", path: "/sulunsuku#repertoire" },
      { name: "Boutique en ligne", path: "/sulunsuku#boutique" },
      { name: "Diffusion master class & promotion des œuvres", path: "/sulunsuku#masterclass" },
    ],
  },
  {
    name: "CinémaTECH",
    fullName: "Salon CinémaTECH",
    path: "/salon-cinematech",
    services: [
      { name: "Exposition-vente de matériels", path: "/salon-cinematech#exposition" },
      { name: "Symposium technologie & innovation", path: "/salon-cinematech#symposium" },
      { name: "Ateliers découvertes pour les jeunes", path: "/salon-cinematech#ateliers" },
      { name: "Concours des étudiants en cinéma", path: "/salon-cinematech#concours" },
    ],
  },
  {
    name: "Labo Piiulgu",
    fullName: "Labo Piiulgu",
    path: "/labo-piiulgu",
    services: [
      { name: "Espace de Coworking Piiulgu", path: "/labo-piiulgu#coworking" },
      { name: "Accompagnement en écriture de scénario", path: "/labo-piiulgu#scenario" },
      { name: "Coaching & mentorats sur la production", path: "/labo-piiulgu#coaching" },
      { name: "Coaching entrepreneuriat créatif & ICC", path: "/labo-piiulgu#entrepreneuriat" },
      { name: "B to B — projets ICC SOASGA", path: "/labo-piiulgu#b2b" },
      { name: "Afterworks Cinéma", path: "/labo-piiulgu#afterworks" },
    ],
  },
];

const simpleNavLinks = [
  { name: "Accueil", path: "/" },
  { name: "Projets", path: "/projets" },
  { name: "Actualités", path: "/actualites" },
  { name: "Partenaires", path: "/partenaires" },
  { name: "À propos", path: "/a-propos" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(null);
  const [location, setLocation] = useLocation();
  const { user } = useAuth();
  const isAdmin = !!user?.isAdmin;
  const navRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    if (location !== path) {
      setLocation(path);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const isProductActive = (cat: ProductCategory) =>
    location === cat.path || location.startsWith(cat.path + "#");

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-40 transition-all duration-500 ease-in-out border-b border-transparent",
          isScrolled
            ? "bg-[#1A0A00]/90 backdrop-blur-md border-border/50 py-3"
            : "bg-transparent py-4 md:py-6",
        )}
      >
        <div
          ref={navRef}
          className="container mx-auto px-4 sm:px-6 md:px-8 xl:px-12 flex items-center justify-between gap-4 md:gap-6"
        >
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-2 md:gap-3 z-50 shrink-0"
            data-testid="link-logo-home"
          >
            <ButterflyLogo className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />
            <div>
              <div className="font-serif text-base md:text-xl tracking-widest leading-none">
                PILUMPIKU
              </div>
              <div className="text-primary text-[0.5rem] md:text-[0.55rem] tracking-[0.3em] uppercase">
                Production
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 min-w-0">
            <ul className="flex items-center gap-3 xl:gap-5 text-[0.65rem] xl:text-[0.7rem] uppercase tracking-[0.18em] xl:tracking-widest whitespace-nowrap">

              {/* Accueil */}
              <li>
                <a
                  href="/"
                  onClick={(e) => handleNavClick(e, "/")}
                  className={cn(
                    "hover:text-primary transition-colors duration-300",
                    location === "/" ? "text-primary" : "text-muted-foreground",
                  )}
                  data-testid="link-nav-accueil"
                >
                  Accueil
                </a>
              </li>

              {/* Projets */}
              <li>
                <a
                  href="/projets"
                  onClick={(e) => handleNavClick(e, "/projets")}
                  className={cn(
                    "hover:text-primary transition-colors duration-300",
                    location === "/projets" ? "text-primary" : "text-muted-foreground",
                  )}
                  data-testid="link-nav-projets"
                >
                  Projets
                </a>
              </li>

              {/* Product category dropdowns */}
              {productCategories.map((cat) => (
                <li key={cat.name} className="relative">
                  <button
                    onClick={() => toggleDropdown(cat.name)}
                    aria-expanded={openDropdown === cat.name}
                    className={cn(
                      "flex items-center gap-1 hover:text-primary transition-colors duration-300 cursor-pointer",
                      isProductActive(cat) || openDropdown === cat.name
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {cat.name}
                    <ChevronDown
                      size={10}
                      className={cn(
                        "transition-transform duration-200",
                        openDropdown === cat.name ? "rotate-180" : "",
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {openDropdown === cat.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-[#1A0A00]/95 backdrop-blur-md border border-border/40 rounded-sm shadow-2xl overflow-hidden z-50"
                      >
                        {/* Category header */}
                        <div className="px-4 py-3 border-b border-border/30">
                          <a
                            href={cat.path}
                            onClick={(e) => handleNavClick(e, cat.path)}
                            className="font-serif text-[0.75rem] text-primary tracking-wider hover:text-primary/80 transition-colors"
                          >
                            {cat.fullName}
                          </a>
                        </div>
                        {/* Services list */}
                        <ul className="py-1">
                          {cat.services.map((service) => (
                            <li key={service.name}>
                              <a
                                href={service.path}
                                onClick={(e) => handleNavClick(e, service.path)}
                                className="block px-4 py-2.5 text-[0.65rem] normal-case tracking-wide text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors duration-200"
                              >
                                {service.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}

              {/* Simple links */}
              {simpleNavLinks.slice(2).map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className={cn(
                      "hover:text-primary transition-colors duration-300",
                      location === link.path ? "text-primary" : "text-muted-foreground",
                    )}
                    data-testid={`link-nav-${link.path.slice(1)}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 shrink-0">
              {isAdmin && (
                <a
                  href="/admin"
                  onClick={(e) => handleNavClick(e, "/admin")}
                  className="border border-primary/40 text-primary px-3 py-2 rounded-sm uppercase tracking-widest text-[0.65rem] hover:bg-primary hover:text-primary-foreground transition-colors duration-300 flex items-center gap-1.5 whitespace-nowrap"
                  data-testid="link-admin-nav"
                >
                  <ShieldCheck size={12} /> Admin
                </a>
              )}
              <a
                href="/contact"
                onClick={(e) => handleNavClick(e, "/contact")}
                className="bg-primary text-primary-foreground px-4 xl:px-6 py-2 rounded-sm uppercase tracking-widest text-[0.65rem] xl:text-xs hover:bg-secondary transition-colors duration-300 whitespace-nowrap"
                data-testid="link-collaborer-nav"
              >
                Collaborer
              </a>
            </div>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden z-50 text-foreground p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            data-testid="button-mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg overflow-y-auto"
          >
            <nav className="min-h-full flex flex-col justify-center px-8 py-24">

              {/* Simple links — top */}
              <ul className="space-y-4 text-xl font-serif text-center mb-8">
                <li>
                  <a
                    href="/"
                    onClick={(e) => handleNavClick(e, "/")}
                    className={cn("hover:text-primary transition-colors", location === "/" ? "text-primary" : "text-foreground")}
                    data-testid="link-mobile-accueil"
                  >
                    Accueil
                  </a>
                </li>
                <li>
                  <a
                    href="/projets"
                    onClick={(e) => handleNavClick(e, "/projets")}
                    className={cn("hover:text-primary transition-colors", location === "/projets" ? "text-primary" : "text-foreground")}
                    data-testid="link-mobile-projets"
                  >
                    Projets
                  </a>
                </li>
              </ul>

              {/* Divider */}
              <div className="border-t border-border/30 my-4" />

              {/* Product categories — expandable */}
              <ul className="space-y-2 mb-4">
                {productCategories.map((cat) => (
                  <li key={cat.name} className="border-b border-border/20 last:border-0">
                    <button
                      onClick={() =>
                        setOpenMobileCategory((prev) =>
                          prev === cat.name ? null : cat.name,
                        )
                      }
                      className="w-full flex items-center justify-between py-3 text-sm uppercase tracking-widest text-foreground hover:text-primary transition-colors"
                    >
                      <span>{cat.fullName}</span>
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-200 shrink-0",
                          openMobileCategory === cat.name ? "rotate-180 text-primary" : "",
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {openMobileCategory === cat.name && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-3 pb-3 space-y-2"
                        >
                          {cat.services.map((service) => (
                            <li key={service.name}>
                              <a
                                href={service.path}
                                onClick={(e) => handleNavClick(e, service.path)}
                                className="block text-xs text-muted-foreground hover:text-primary transition-colors py-1 leading-relaxed"
                              >
                                — {service.name}
                              </a>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="border-t border-border/30 my-4" />

              {/* Remaining simple links */}
              <ul className="space-y-4 text-xl font-serif text-center">
                {simpleNavLinks.slice(2).map((link) => (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      onClick={(e) => handleNavClick(e, link.path)}
                      className={cn(
                        "hover:text-primary transition-colors",
                        location === link.path ? "text-primary" : "text-foreground",
                      )}
                      data-testid={`link-mobile-${link.path.slice(1)}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                {isAdmin && (
                  <li>
                    <a
                      href="/admin"
                      onClick={(e) => handleNavClick(e, "/admin")}
                      className="text-primary"
                      data-testid="link-mobile-admin"
                    >
                      Admin
                    </a>
                  </li>
                )}
              </ul>

              <div className="mt-10 text-center">
                <a
                  href="/contact"
                  onClick={(e) => handleNavClick(e, "/contact")}
                  className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-sm uppercase tracking-widest text-xs hover:bg-secondary transition-colors"
                >
                  Collaborer
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

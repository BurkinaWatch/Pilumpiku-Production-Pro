import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { ButterflyLogo } from "./ButterflyLogo";
import { Menu, X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@workspace/replit-auth-web";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { user } = useAuth();
  const isAdmin = !!user?.isAdmin;

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    if (
      e.button !== 0 ||
      e.ctrlKey ||
      e.metaKey ||
      e.altKey ||
      e.shiftKey
    ) {
      return;
    }
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location !== path) {
      setLocation(path);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Projets", path: "/projets" },
    { name: "À propos", path: "/a-propos" },
    { name: "Services", path: "/services" },
    { name: "Actualités", path: "/actualites" },
    { name: "Partenaires", path: "/partenaires" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 w-full z-40 transition-all duration-500 ease-in-out border-b border-transparent",
          isScrolled
            ? "bg-[#1A0A00]/90 backdrop-blur-md border-border/50 py-3"
            : "bg-transparent py-6",
        )}
      >
        <div className="container mx-auto px-6 md:px-8 xl:px-12 flex items-center justify-between gap-6">
          <a
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-3 z-50 shrink-0"
            data-testid="link-logo-home"
          >
            <ButterflyLogo className="w-12 h-12 md:w-14 md:h-14" />
            <div>
              <div className="font-serif text-xl tracking-widest leading-none">
                PILUMPIKU
              </div>
              <div className="text-primary text-[0.55rem] tracking-[0.3em] uppercase">
                Production
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 min-w-0">
            <ul className="flex items-center gap-4 xl:gap-7 text-[0.7rem] xl:text-xs uppercase tracking-[0.2em] xl:tracking-widest whitespace-nowrap">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className={cn(
                      "hover:text-primary transition-colors duration-300",
                      location === link.path
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                    data-testid={`link-nav-${link.path === "/" ? "accueil" : link.path.slice(1)}`}
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

          <button
            className="lg:hidden z-50 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            data-testid="button-mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg flex items-center justify-center"
          >
            <nav className="text-center">
              <ul className="space-y-8 text-2xl font-serif">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <a
                      href={link.path}
                      onClick={(e) => handleNavClick(e, link.path)}
                      className={cn(
                        "hover:text-primary transition-colors",
                        location === link.path
                          ? "text-primary"
                          : "text-foreground",
                      )}
                      data-testid={`link-mobile-${link.path === "/" ? "accueil" : link.path.slice(1)}`}
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { Link } from "wouter";
import { ButterflyLogo } from "./ButterflyLogo";
import { Instagram, Linkedin, Video, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0A0400] pt-16 sm:pt-24 pb-10 sm:pb-12 border-t border-border/50 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16">
          <div className="sm:col-span-2">
            <Link href="/" className="inline-block mb-5 sm:mb-6">
              <div className="flex items-center gap-3">
                <ButterflyLogo className="w-12 h-12 sm:w-16 sm:h-16" />
                <div>
                  <div className="font-serif text-xl sm:text-2xl tracking-widest leading-none">PILUMPIKU</div>
                  <div className="text-primary text-[0.65rem] tracking-[0.3em] uppercase">Production</div>
                </div>
              </div>
            </Link>
            <p className="text-muted-foreground font-serif italic text-lg sm:text-xl max-w-sm">
              "Un nouveau regard pour une nouvelle Afrique"
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg text-foreground mb-4 sm:mb-6">Navigation</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li><Link href="/projets" className="text-muted-foreground hover:text-primary transition-colors duration-300">Nos Projets</Link></li>
              <li><Link href="/a-propos" className="text-muted-foreground hover:text-primary transition-colors duration-300">À Propos</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors duration-300">Services</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-foreground mb-4 sm:mb-6">Contact & Réseaux</h4>
            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-muted-foreground text-sm">
              <li>S/C BP 68 Ouagadougou 01, Burkina Faso</li>
              <li><a href="mailto:pilumpikuproduction@gmail.com" className="hover:text-primary transition-colors break-all">pilumpikuproduction@gmail.com</a></li>
              <li>+226 70 14 92 33 / +226 78 70 12 32</li>
            </ul>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <a href="https://www.instagram.com/mamounatan?igsh=MTZoaWZpYXdsaHE1Mw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 bg-foreground/10 border border-foreground/20 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/pilumpikuproduction" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 bg-foreground/10 border border-foreground/20 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="https://bf.linkedin.com/in/pilumpiku-production-8b97642b5" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 bg-foreground/10 border border-foreground/20 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="https://www.youtube.com/@pilumpikuproduction7508" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-11 sm:h-11 bg-foreground/10 border border-foreground/20 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                <Video size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground text-center sm:text-left">
          <p>© {new Date().getFullYear()} Pilumpiku Production. Tous droits réservés.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 items-center">
            <Link href="/mentions-legales" className="hover:text-foreground transition-colors">Mentions légales</Link>
            <Link href="/politique-de-confidentialite" className="hover:text-foreground transition-colors">Politique de confidentialité</Link>
            <Link
              href="/admin"
              className="text-muted-foreground/60 hover:text-primary transition-colors text-xs uppercase tracking-widest"
              data-testid="link-admin-footer"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

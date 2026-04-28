import { Link } from "wouter";
import { ButterflyLogo } from "./ButterflyLogo";
import { Instagram, Linkedin, Video, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0A0400] pt-24 pb-12 border-t border-border/50 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-3">
                <ButterflyLogo className="w-16 h-16" />
                <div>
                  <div className="font-serif text-2xl tracking-widest leading-none">PILUMPIKU</div>
                  <div className="text-primary text-[0.65rem] tracking-[0.3em] uppercase">Production</div>
                </div>
              </div>
            </Link>
            <p className="text-muted-foreground font-serif italic text-xl max-w-sm">
              "Raconter l'Afrique au monde"
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg text-foreground mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="/projets" className="text-muted-foreground hover:text-primary transition-colors duration-300">Nos Projets</Link></li>
              <li><Link href="/a-propos" className="text-muted-foreground hover:text-primary transition-colors duration-300">À Propos</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors duration-300">Services</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-foreground mb-6">Contact & Réseaux</h4>
            <ul className="space-y-4 mb-8 text-muted-foreground">
              <li>S/C BP 68 Ouagadougou 01, Burkina Faso</li>
              <li><a href="mailto:pilumpikuproduction@gmail.com" className="hover:text-primary transition-colors">pilumpikuproduction@gmail.com</a></li>
              <li>+226 70 14 92 33 / +226 78 70 12 32</li>
            </ul>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/mamounatan?igsh=MTZoaWZpYXdsaHE1Mw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/pilumpikuproduction" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="https://bf.linkedin.com/in/pilumpiku-production-8b97642b5" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="https://www.youtube.com/@pilumpikuproduction7508" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                <Video size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Pilumpiku Production. Tous droits réservés.</p>
          <div className="flex gap-6 items-center">
            <Link href="#" className="hover:text-foreground transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Politique de confidentialité</Link>
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

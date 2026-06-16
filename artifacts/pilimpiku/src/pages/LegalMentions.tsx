import { useSeo } from "@/hooks/use-seo";
import { motion } from "framer-motion";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-5 pb-3 border-b border-border/50">
        {title}
      </h2>
      <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
        {children}
      </div>
    </section>
  );
}

export default function LegalMentions() {
  useSeo({
    title: "Mentions légales",
    description: "Mentions légales de Pilimpiku Production conformément au droit burkinabé.",
  });

  return (
    <div className="flex flex-col w-full bg-background pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-serif text-5xl md:text-6xl mb-4 text-foreground">
            Mentions légales
          </h1>
          <p className="text-muted-foreground mb-16 text-sm">
            Conformément à la législation burkinabé applicable aux services de communication en ligne,
            notamment la Loi n°034-2009/AN du 16 juin 2009 relative aux communications électroniques
            et la Loi n°061-2008/AN du 27 novembre 2008 portant réglementation générale des réseaux
            et services de communications électroniques au Burkina Faso, les informations ci-dessous
            sont portées à la connaissance des utilisateurs du présent site.
          </p>

          <Section title="1. Éditeur du site">
            <p>
              <span className="text-foreground font-medium">Raison sociale :</span> Pilimpiku Production
            </p>
            <p>
              <span className="text-foreground font-medium">Forme juridique :</span> Entreprise individuelle / Structure de production audiovisuelle
            </p>
            <p>
              <span className="text-foreground font-medium">Siège social :</span> Ouagadougou, Burkina Faso
            </p>
            <p>
              <span className="text-foreground font-medium">Directrice générale et fondatrice :</span> Mamounata Nikiéma
            </p>
            <p>
              <span className="text-foreground font-medium">Adresse électronique :</span>{" "}
              <a href="mailto:contact@pilimpiku.com" className="text-primary hover:underline">
                contact@pilimpiku.com
              </a>
            </p>
            <p>
              <span className="text-foreground font-medium">Registre du Commerce et du Crédit Mobilier (RCCM) :</span>{" "}
              Ouagadougou — en cours d'enregistrement
            </p>
            <p>
              <span className="text-foreground font-medium">Numéro d'Identifiant Financier Unique (IFU) :</span>{" "}
              En cours d'attribution par la Direction Générale des Impôts (DGI) du Burkina Faso
            </p>
          </Section>

          <Section title="2. Directeur de la publication">
            <p>
              La directrice de la publication du présent site est Madame <strong className="text-foreground">Mamounata Nikiéma</strong>,
              en sa qualité de représentante légale de Pilimpiku Production.
            </p>
            <p>
              Conformément aux dispositions de la Loi n°034-2009/AN du 16 juin 2009 relative
              aux communications électroniques au Burkina Faso, le directeur de la publication
              est responsable du contenu éditorial diffusé sur ce site.
            </p>
          </Section>

          <Section title="3. Propriété intellectuelle">
            <p>
              L'ensemble des éléments constituant ce site — textes, images, photographies, vidéos,
              graphismes, logos, sons, logiciels et toute autre donnée — est protégé par les
              dispositions de la Loi n°032-99/AN du 22 décembre 1999 portant protection de la
              propriété littéraire et artistique au Burkina Faso, ainsi que par les conventions
              internationales applicables, notamment la Convention de Berne pour la protection
              des œuvres littéraires et artistiques.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation ou exploitation,
              totale ou partielle, des éléments de ce site, quel que soit le moyen ou le procédé
              utilisé, est strictement interdite sans l'autorisation écrite préalable de
              Pilimpiku Production.
            </p>
            <p>
              Les marques et logos figurant sur ce site sont des marques déposées ou en cours d'enregistrement.
              Toute reproduction ou utilisation non autorisée constitue une contrefaçon sanctionnée
              par les juridictions compétentes burkinabé.
            </p>
          </Section>

          <Section title="4. Responsabilité éditoriale">
            <p>
              Pilimpiku Production s'efforce de fournir des informations exactes et à jour sur
              ce site. Toutefois, elle ne saurait garantir l'exactitude, la complétude ni la
              pertinence de ces informations. En conséquence, Pilimpiku Production décline toute
              responsabilité pour toute imprécision, inexactitude ou omission portant sur des
              informations disponibles sur ce site.
            </p>
            <p>
              Ce site peut contenir des liens hypertextes vers des sites tiers. Ces liens sont
              fournis à titre informatif. Pilimpiku Production ne contrôle pas le contenu de ces
              sites et n'assume aucune responsabilité quant aux informations qui y figurent.
            </p>
          </Section>

          <Section title="5. Protection des données personnelles">
            <p>
              La collecte et le traitement des données personnelles des utilisateurs de ce site
              sont régis par la Loi n°010-2004/AN du 20 avril 2004 relative à la protection des
              données à caractère personnel au Burkina Faso et placés sous le contrôle de la
              Commission de l'Informatique et des Libertés (CIL) du Burkina Faso.
            </p>
            <p>
              Pour toute information relative au traitement de vos données personnelles,
              veuillez consulter notre{" "}
              <a href="/politique-de-confidentialite" className="text-primary hover:underline">
                Politique de confidentialité
              </a>
              .
            </p>
          </Section>

          <Section title="6. Droit applicable et juridiction compétente">
            <p>
              Le présent site et ses mentions légales sont régis par le droit burkinabé.
              Tout litige relatif à l'utilisation de ce site, à son contenu ou aux présentes
              mentions légales relèvera de la compétence exclusive des juridictions burkinabé
              compétentes, notamment du Tribunal de Grande Instance de Ouagadougou.
            </p>
            <p>
              En cas de litige, les parties s'engagent à privilégier une résolution amiable
              avant tout recours judiciaire, conformément aux principes généraux du droit
              burkinabé.
            </p>
          </Section>

          <Section title="7. Contact">
            <p>
              Pour toute question relative aux présentes mentions légales ou à l'utilisation
              de ce site, vous pouvez nous contacter à l'adresse suivante :
            </p>
            <p>
              <a href="mailto:contact@pilimpiku.com" className="text-primary hover:underline">
                contact@pilimpiku.com
              </a>
            </p>
          </Section>

          <p className="text-xs text-muted-foreground/50 mt-12 pt-6 border-t border-border/30">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

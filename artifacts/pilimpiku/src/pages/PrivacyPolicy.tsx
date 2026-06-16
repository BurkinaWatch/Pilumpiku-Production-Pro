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

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="font-medium text-foreground mb-3">{title}</h3>
      <div className="space-y-3 pl-4 border-l border-border/40">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  useSeo({
    title: "Politique de confidentialité",
    description:
      "Politique de confidentialité de Pilimpiku Production conformément à la Loi n°010-2004/AN du Burkina Faso.",
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
            Politique de confidentialité
          </h1>
          <p className="text-muted-foreground mb-16 text-sm leading-relaxed">
            La présente politique de confidentialité est établie conformément à la{" "}
            <strong className="text-foreground">Loi n°010-2004/AN du 20 avril 2004</strong>{" "}
            relative à la protection des données à caractère personnel au Burkina Faso,
            placée sous le contrôle de la{" "}
            <strong className="text-foreground">
              Commission de l'Informatique et des Libertés (CIL) du Burkina Faso
            </strong>
            . Elle décrit la manière dont Pilimpiku Production collecte, utilise, conserve et
            protège les données à caractère personnel des utilisateurs de son site web.
          </p>

          <Section title="1. Responsable du traitement">
            <p>
              Le responsable du traitement des données à caractère personnel au sens de
              l'article 3 de la Loi n°010-2004/AN est :
            </p>
            <div className="bg-card border border-border/50 rounded p-5 mt-4 space-y-2">
              <p><span className="text-foreground font-medium">Entité :</span> Pilimpiku Production</p>
              <p><span className="text-foreground font-medium">Représentante légale :</span> Mamounata Nikiéma</p>
              <p><span className="text-foreground font-medium">Siège social :</span> Ouagadougou, Burkina Faso</p>
              <p>
                <span className="text-foreground font-medium">Contact :</span>{" "}
                <a href="mailto:contact@pilimpiku.com" className="text-primary hover:underline">
                  contact@pilimpiku.com
                </a>
              </p>
            </div>
          </Section>

          <Section title="2. Données collectées">
            <p>
              Dans le cadre de l'exploitation de son site web, Pilimpiku Production peut être
              amenée à collecter les catégories de données à caractère personnel suivantes :
            </p>

            <SubSection title="2.1 Données collectées via le formulaire de contact">
              <p>— Nom et prénom</p>
              <p>— Adresse électronique (e-mail)</p>
              <p>— Objet du message</p>
              <p>— Contenu du message librement rédigé</p>
            </SubSection>

            <SubSection title="2.2 Données de navigation (collectées automatiquement)">
              <p>— Adresse IP (anonymisée autant que possible)</p>
              <p>— Type et version de navigateur</p>
              <p>— Pages visitées et durée de consultation</p>
              <p>— Date et heure d'accès</p>
              <p>— URL de provenance (référent)</p>
            </SubSection>

            <p className="mt-4">
              Pilimpiku Production s'engage à ne collecter que les données strictement nécessaires
              aux finalités poursuivies, conformément au principe de minimisation des données
              consacré par la Loi n°010-2004/AN.
            </p>
            <p>
              <strong className="text-foreground">Aucune donnée sensible</strong> au sens de
              l'article 4 de ladite loi (origine raciale ou ethnique, opinions politiques,
              convictions religieuses ou philosophiques, données de santé ou relatives à la
              vie sexuelle) n'est collectée par ce site.
            </p>
          </Section>

          <Section title="3. Finalités du traitement">
            <p>
              Les données collectées sont traitées pour les finalités suivantes, conformément
              à l'article 5 de la Loi n°010-2004/AN :
            </p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-xs border border-border/50">
                <thead>
                  <tr className="bg-card">
                    <th className="text-left p-3 text-foreground font-medium border-b border-border/50">Finalité</th>
                    <th className="text-left p-3 text-foreground font-medium border-b border-border/50">Base légale</th>
                    <th className="text-left p-3 text-foreground font-medium border-b border-border/50">Durée de conservation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  <tr>
                    <td className="p-3">Répondre aux demandes de contact et de collaboration</td>
                    <td className="p-3">Consentement de la personne concernée (art. 6 al. a)</td>
                    <td className="p-3">3 ans à compter du dernier échange</td>
                  </tr>
                  <tr>
                    <td className="p-3">Amélioration du site et analyse de la navigation</td>
                    <td className="p-3">Intérêt légitime du responsable du traitement (art. 6 al. f)</td>
                    <td className="p-3">13 mois glissants</td>
                  </tr>
                  <tr>
                    <td className="p-3">Respect des obligations légales et comptables</td>
                    <td className="p-3">Obligation légale (art. 6 al. c)</td>
                    <td className="p-3">10 ans (Acte uniforme OHADA relatif au droit comptable)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              Les données ne sont en aucun cas utilisées à des fins commerciales ou de prospection,
              ni cédées à des tiers à des fins de marketing sans le consentement exprès et préalable
              des personnes concernées.
            </p>
          </Section>

          <Section title="4. Destinataires des données">
            <p>
              Les données à caractère personnel collectées sont destinées exclusivement au personnel
              habilité de Pilimpiku Production. Elles peuvent être communiquées aux prestataires
              techniques suivants, dans le strict cadre de l'exécution de leurs missions :
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>
                <strong className="text-foreground">Replit, Inc.</strong> — hébergeur du site
                (San Francisco, États-Unis), soumis aux garanties adéquates requises par
                la CIL pour les transferts hors Burkina Faso
              </li>
              <li>
                <strong className="text-foreground">Prestataires d'envoi d'e-mails</strong>{" "}
                — pour la transmission des messages issus du formulaire de contact
              </li>
            </ul>
            <p className="mt-4">
              Ces sous-traitants s'engagent contractuellement à traiter les données exclusivement
              selon les instructions de Pilimpiku Production et à les protéger avec un niveau
              de sécurité adéquat.
            </p>
          </Section>

          <Section title="5. Transferts de données hors du Burkina Faso">
            <p>
              L'hébergement de ce site étant assuré par une société établie aux États-Unis d'Amérique,
              certaines données peuvent être transférées hors du territoire burkinabé. Ces transferts
              sont effectués dans le respect des dispositions des articles 24 à 27 de la
              Loi n°010-2004/AN relatifs aux transferts de données à caractère personnel vers des
              pays tiers, et sous réserve des garanties appropriées.
            </p>
            <p>
              Pilimpiku Production s'assure que tout transfert vers un État ne bénéficiant pas
              d'une protection adéquate est encadré par des clauses contractuelles types ou
              des garanties équivalentes conformes aux exigences de la CIL du Burkina Faso.
            </p>
          </Section>

          <Section title="6. Droits des personnes concernées">
            <p>
              Conformément aux articles 17 à 22 de la Loi n°010-2004/AN, toute personne
              physique dont les données sont traitées par Pilimpiku Production dispose des
              droits suivants :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {[
                {
                  titre: "Droit d'accès (art. 17)",
                  desc: "Obtenir confirmation que des données vous concernant sont traitées et en recevoir une copie.",
                },
                {
                  titre: "Droit de rectification (art. 18)",
                  desc: "Exiger la correction de données inexactes, incomplètes ou obsolètes vous concernant.",
                },
                {
                  titre: "Droit à l'effacement (art. 20)",
                  desc: "Demander la suppression de vos données lorsque leur traitement n'est plus justifié.",
                },
                {
                  titre: "Droit d'opposition (art. 22)",
                  desc: "Vous opposer, pour des raisons légitimes, au traitement de données vous concernant.",
                },
                {
                  titre: "Droit de limitation",
                  desc: "Demander la suspension temporaire du traitement de vos données dans certains cas.",
                },
                {
                  titre: "Droit à la portabilité",
                  desc: "Recevoir vos données dans un format structuré et lisible par machine.",
                },
              ].map((droit) => (
                <div
                  key={droit.titre}
                  className="bg-card border border-border/50 rounded p-4"
                >
                  <p className="text-foreground font-medium text-xs mb-1">{droit.titre}</p>
                  <p className="text-xs">{droit.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6">
              Pour exercer l'un de ces droits, adressez une demande écrite accompagnée d'une
              copie d'un justificatif d'identité à :
            </p>
            <p className="mt-2">
              <a href="mailto:contact@pilimpiku.com" className="text-primary hover:underline">
                contact@pilimpiku.com
              </a>
            </p>
            <p className="mt-2">
              Pilimpiku Production s'engage à répondre à votre demande dans un délai de{" "}
              <strong className="text-foreground">30 jours ouvrables</strong> à compter de
              sa réception, conformément aux obligations prévues par la Loi n°010-2004/AN.
            </p>
            <p className="mt-4 text-xs text-muted-foreground/70">
              Si vous estimez que vos droits n'ont pas été respectés, vous pouvez introduire
              une réclamation auprès de la{" "}
              <strong className="text-foreground/70">
                Commission de l'Informatique et des Libertés (CIL) du Burkina Faso
              </strong>
              , autorité de contrôle nationale compétente, conformément à l'article 35
              de la Loi n°010-2004/AN.
            </p>
          </Section>

          <Section title="7. Sécurité des données">
            <p>
              Pilimpiku Production met en œuvre toutes les mesures techniques et organisationnelles
              appropriées pour garantir la sécurité des données à caractère personnel contre
              toute destruction accidentelle ou illicite, perte, altération, diffusion ou accès
              non autorisé, conformément à l'article 25 de la Loi n°010-2004/AN.
            </p>
            <p>
              Ces mesures comprennent notamment :
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Le chiffrement des communications via le protocole HTTPS (TLS)</li>
              <li>La restriction de l'accès aux données aux seules personnes habilitées</li>
              <li>Des sauvegardes régulières des données</li>
              <li>La mise à jour régulière des systèmes et logiciels utilisés</li>
            </ul>
            <p className="mt-4">
              En cas de violation de données à caractère personnel susceptible d'engendrer un
              risque pour les droits et libertés des personnes, Pilimpiku Production s'engage
              à notifier la CIL et, le cas échéant, les personnes concernées dans les meilleurs
              délais.
            </p>
          </Section>

          <Section title="8. Cookies et traceurs">
            <p>
              Ce site peut utiliser des cookies — fichiers textes déposés sur le terminal de
              l'utilisateur lors de sa navigation. Conformément à la réglementation burkinabé
              applicable et aux bonnes pratiques numériques, les types de cookies suivants
              peuvent être utilisés :
            </p>
            <SubSection title="8.1 Cookies strictement nécessaires">
              <p>
                Indispensables au fonctionnement technique du site (session, préférences
                d'affichage). Ils ne requièrent pas de consentement préalable.
              </p>
            </SubSection>
            <SubSection title="8.2 Cookies de mesure d'audience">
              <p>
                Utilisés pour analyser les statistiques de fréquentation du site dans le but
                d'améliorer l'expérience utilisateur. Leur dépôt est subordonné à votre
                consentement préalable.
              </p>
            </SubSection>
            <p className="mt-4">
              Vous pouvez paramétrer ou refuser les cookies à tout moment via les paramètres
              de votre navigateur. Le refus de certains cookies peut affecter votre expérience
              de navigation.
            </p>
          </Section>

          <Section title="9. Déclaration à la CIL">
            <p>
              Conformément à l'article 8 de la Loi n°010-2004/AN du 20 avril 2004 relative à
              la protection des données à caractère personnel, les traitements de données mis
              en œuvre par Pilimpiku Production dans le cadre de ce site font l'objet d'une
              déclaration auprès de la{" "}
              <strong className="text-foreground">
                Commission de l'Informatique et des Libertés (CIL) du Burkina Faso
              </strong>
              .
            </p>
            <p>
              La CIL est joignable à l'adresse suivante :{" "}
              <strong className="text-foreground">
                01 BP 6444 Ouagadougou 01, Burkina Faso
              </strong>
              .
            </p>
          </Section>

          <Section title="10. Modification de la politique de confidentialité">
            <p>
              Pilimpiku Production se réserve le droit de modifier la présente politique de
              confidentialité à tout moment, notamment pour se conformer aux évolutions
              législatives et réglementaires applicables au Burkina Faso ou à l'évolution
              de ses pratiques en matière de traitement des données.
            </p>
            <p>
              Toute modification substantielle sera portée à la connaissance des utilisateurs
              par voie d'affichage sur le présent site. La date de la dernière mise à jour
              est indiquée en bas de cette page. Il appartient à l'utilisateur de consulter
              régulièrement la présente politique.
            </p>
          </Section>

          <Section title="11. Droit applicable">
            <p>
              La présente politique de confidentialité est régie par le droit burkinabé,
              et notamment par la{" "}
              <strong className="text-foreground">
                Loi n°010-2004/AN du 20 avril 2004
              </strong>{" "}
              relative à la protection des données à caractère personnel. Tout litige relatif
              à son interprétation ou à son exécution relèvera de la compétence exclusive des
              juridictions burkinabé, et plus particulièrement du Tribunal de Grande Instance
              de Ouagadougou.
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

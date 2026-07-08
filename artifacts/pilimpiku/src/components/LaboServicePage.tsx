import { useState, type FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, CheckCircle, type LucideIcon } from "lucide-react";

export interface LaboServiceConfig {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  details: string[];
  pricing?: string;
  schedule?: string;
  accentColor: string;
  icon: LucideIcon;
  formTitle?: string;
  extraFields?: ReactNode;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

async function submitInscription(data: {
  service: string;
  nom: string;
  email: string;
  telephone: string;
  message: string;
}) {
  const res = await fetch(`${BASE}/api/inscriptions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? "Erreur serveur");
  }
}

export function LaboServicePage({ cfg }: { cfg: LaboServiceConfig }) {
  const Icon = cfg.icon;
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await submitInscription({ service: cfg.slug, nom, email, telephone, message });
      setStatus("success");
      setNom(""); setEmail(""); setTelephone(""); setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Une erreur est survenue");
    }
  };

  const inputCls =
    "w-full bg-background border border-border/60 rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 transition-colors";

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">

      {/* ─── Hero ───────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
            style={{ background: cfg.accentColor }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/labo-piiulgu"
              className="inline-flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-widest hover:text-primary transition-colors mb-10 group"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Labo Piiulgu
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: cfg.accentColor + "90" }} />
              <span className="text-xs uppercase tracking-[0.3em] font-light" style={{ color: cfg.accentColor }}>
                {cfg.subtitle}
              </span>
            </div>

            <div className="flex items-start gap-6 mb-6">
              <div
                className="w-14 h-14 rounded-sm flex items-center justify-center border shrink-0 mt-1"
                style={{ background: cfg.accentColor + "15", borderColor: cfg.accentColor + "40", color: cfg.accentColor }}
              >
                <Icon size={24} />
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-foreground leading-tight">
                {cfg.title}
              </h1>
            </div>

            <p className="text-muted-foreground text-base sm:text-lg font-light max-w-2xl leading-relaxed">
              {cfg.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Corps : détails + formulaire ───────────────── */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Colonne gauche — infos service */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {cfg.longDescription && (
                <p className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base mb-8">
                  {cfg.longDescription}
                </p>
              )}

              <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-6">Ce que vous obtenez</h2>
              <ul className="space-y-3 mb-8">
                {cfg.details.map((d, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-sm flex items-center justify-center border"
                      style={{ background: cfg.accentColor + "15", borderColor: cfg.accentColor + "40", color: cfg.accentColor }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5.5L3.5 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {d}
                  </motion.li>
                ))}
              </ul>

              {(cfg.pricing || cfg.schedule) && (
                <div className="flex flex-col gap-3 p-6 border border-border/50 rounded-sm bg-card/40">
                  {cfg.schedule && (
                    <div>
                      <span className="text-[0.65rem] uppercase tracking-widest" style={{ color: cfg.accentColor }}>Horaires</span>
                      <p className="text-foreground text-sm font-light mt-0.5">{cfg.schedule}</p>
                    </div>
                  )}
                  {cfg.pricing && (
                    <div>
                      <span className="text-[0.65rem] uppercase tracking-widest" style={{ color: cfg.accentColor }}>Tarif</span>
                      <p className="text-foreground text-sm font-light mt-0.5">{cfg.pricing}</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Colonne droite — formulaire */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="bg-card border border-border/50 rounded-sm p-7 sm:p-9">
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">
                  {cfg.formTitle ?? "S'inscrire"}
                </h2>
                <p className="text-muted-foreground text-xs font-light mb-7">
                  Remplissez ce formulaire — nous vous recontacterons rapidement.
                </p>

                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center gap-4"
                  >
                    <CheckCircle size={40} className="text-primary" />
                    <div>
                      <p className="font-serif text-xl text-foreground mb-2">Inscription reçue !</p>
                      <p className="text-muted-foreground text-sm font-light">
                        Merci <strong className="text-foreground font-normal">{nom || "pour votre inscription"}</strong>.
                        <br />Notre équipe vous contactera sous peu.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-2 text-xs uppercase tracking-widest text-primary hover:underline"
                    >
                      Nouvelle inscription
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-1.5">
                          Nom complet <span style={{ color: cfg.accentColor }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={nom}
                          onChange={(e) => setNom(e.target.value)}
                          placeholder="Votre nom"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-1.5">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          value={telephone}
                          onChange={(e) => setTelephone(e.target.value)}
                          placeholder="+226 XX XX XX XX"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-1.5">
                        Email <span style={{ color: cfg.accentColor }}>*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-1.5">
                        Message / Motivation
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Parlez-nous de votre projet ou de vos attentes…"
                        rows={4}
                        className={inputCls + " resize-none"}
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-red-400">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-3.5 text-xs uppercase tracking-widest font-medium rounded-sm transition-all duration-300 disabled:opacity-60"
                      style={{ background: cfg.accentColor, color: "#fff" }}
                    >
                      {status === "loading" ? "Envoi en cours…" : "Envoyer ma demande d'inscription"}
                    </button>

                    <p className="text-center text-[0.6rem] text-muted-foreground/60 leading-relaxed">
                      Vos données sont utilisées uniquement pour traiter votre inscription.
                      Contact&nbsp;: piiulgu@gmail.com
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}

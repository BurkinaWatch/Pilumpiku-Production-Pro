import { Download, ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
  );
}

function isAppleDevice() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    if (
      isStandalone() ||
      sessionStorage.getItem("pilimpiku_install_prompt_seen")
    ) {
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt,
    );
    const timer = window.setTimeout(() => setVisible(true), 900);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("pilimpiku_install_prompt_seen", "1");
    setVisible(false);
  };

  const install = async () => {
    if (!deferredPrompt) {
      setShowInstructions(true);
      return;
    }

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      dismiss();
    } else {
      setDeferredPrompt(null);
      setShowInstructions(true);
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-4 bottom-4 z-[10000] mx-auto max-w-md rounded-sm border border-primary/40 bg-background/95 p-5 text-foreground shadow-2xl backdrop-blur-md sm:inset-x-auto sm:right-6 sm:bottom-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby="install-prompt-title"
    >
      <button
        type="button"
        onClick={dismiss}
        className="absolute right-3 top-3 p-1 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Fermer"
      >
        <X size={17} />
      </button>

      <div className="flex gap-4 pr-5">
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-primary text-primary-foreground">
          <Download size={19} />
        </div>
        <div>
          <p
            id="install-prompt-title"
            className="font-serif text-xl text-primary"
          >
            Installer Pilumpiku
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Ajoutez l&apos;application à votre écran d&apos;accueil pour
            retrouver facilement notre univers cinéma.
          </p>
        </div>
      </div>

      {showInstructions && (
        <div className="mt-4 border-l border-primary/50 pl-3 text-sm leading-relaxed text-muted-foreground">
          {isAppleDevice() ? (
            <>
              Dans Safari, touchez <strong className="text-foreground">Partager</strong>,
              puis <strong className="text-foreground">Sur l&apos;écran d&apos;accueil</strong>.
            </>
          ) : (
            <>
              Ouvrez le menu de votre navigateur, puis choisissez{" "}
              <strong className="text-foreground">
                Installer l&apos;application
              </strong>{" "}
              ou <strong className="text-foreground">Ajouter à l&apos;écran d&apos;accueil</strong>.
            </>
          )}
        </div>
      )}

      <div className="mt-5 flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={dismiss}
          className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          Plus tard
        </button>
        <button
          type="button"
          onClick={install}
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-secondary"
        >
          {deferredPrompt ? "Installer" : "Voir comment faire"}
          {!deferredPrompt && <ExternalLink size={14} />}
        </button>
      </div>
    </div>
  );
}
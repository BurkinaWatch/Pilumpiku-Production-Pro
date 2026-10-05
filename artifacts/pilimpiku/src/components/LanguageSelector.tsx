import { Languages } from "lucide-react";
import { LOCALES, useI18n, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LanguageSelectorProps = {
  compact?: boolean;
  className?: string;
  testId: string;
};

export function LanguageSelector({
  compact = false,
  className,
  testId,
}: LanguageSelectorProps) {
  const { locale, setLocale } = useI18n();

  return (
    <label className={cn("inline-flex items-center gap-2", className)}>
      <Languages size={14} aria-hidden="true" className="shrink-0 text-primary" />
      <span className="sr-only">Choisir la langue</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        aria-label="Choisir la langue"
        data-testid={testId}
        className={cn(
          "cursor-pointer bg-background/30 text-foreground outline-none focus-visible:ring-1 focus-visible:ring-primary",
          compact
            ? "max-w-40 border border-border/60 px-3 py-2 text-xs"
            : "max-w-28 border border-border/70 px-2 py-2 text-[0.65rem] uppercase tracking-wide",
        )}
      >
        {LOCALES.map(({ code, nativeName }) => (
          <option key={code} value={code} className="bg-background text-foreground">
            {nativeName}
          </option>
        ))}
      </select>
    </label>
  );
}

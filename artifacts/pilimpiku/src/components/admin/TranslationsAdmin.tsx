import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import {
  getListContentTranslationsQueryKey,
  useGetSiteSettings,
  useListContentTranslations,
  useListNews,
  useListPartners,
  useListProjects,
  useListServices,
  useUpsertContentTranslation,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  AlertCircle,
  Check,
  ChevronDown,
  Languages,
  LoaderCircle,
  Save,
} from "lucide-react";

type EntityType = "projects" | "news" | "services" | "partners" | "settings";
type Locale = "en" | "es" | "pt" | "de" | "zh-CN" | "mos" | "dyu" | "ff";
type TranslationForm = Record<string, string>;
type ContentRecord = {
  id: number;
  title: string;
  fields: Record<string, string>;
};

const entityOptions: { value: EntityType; label: string; singular: string }[] = [
  { value: "projects", label: "Projects", singular: "project" },
  { value: "news", label: "News", singular: "article" },
  { value: "services", label: "Services", singular: "service" },
  { value: "partners", label: "Partners", singular: "partner" },
  { value: "settings", label: "Site settings", singular: "settings record" },
];

const localeOptions: { value: Locale; label: string; native: string }[] = [
  { value: "en", label: "English", native: "English" },
  { value: "es", label: "Spanish", native: "Español" },
  { value: "pt", label: "Portuguese", native: "Português" },
  { value: "de", label: "German", native: "Deutsch" },
  { value: "zh-CN", label: "Chinese (Simplified)", native: "简体中文" },
  { value: "mos", label: "Mooré", native: "Mooré" },
  { value: "dyu", label: "Dioula", native: "Dioula" },
  { value: "ff", label: "Fula", native: "Fulfulde" },
];

const translatableFields: Record<EntityType, { key: string; label: string; multiline?: boolean }[]> = {
  projects: [
    { key: "titre", label: "Title" },
    { key: "categorie", label: "Category" },
    { key: "statut", label: "Status" },
    { key: "duree", label: "Duration" },
    { key: "langue", label: "Language" },
    { key: "synopsis", label: "Synopsis", multiline: true },
    { key: "intention", label: "Director's note", multiline: true },
  ],
  news: [
    { key: "titre", label: "Title" },
    { key: "categorie", label: "Category" },
    { key: "dateLabel", label: "Date label" },
    { key: "excerpt", label: "Excerpt", multiline: true },
  ],
  services: [
    { key: "titre", label: "Title" },
    { key: "description", label: "Description", multiline: true },
  ],
  partners: [
    { key: "nom", label: "Name" },
    { key: "description", label: "Description", multiline: true },
  ],
  settings: [
    { key: "heroBadge", label: "Hero badge" },
    { key: "heroTitleLine1", label: "Hero title · line 1" },
    { key: "heroTitleLine2", label: "Hero title · line 2" },
    { key: "heroSubtitle", label: "Hero subtitle", multiline: true },
    { key: "quoteText", label: "Quote", multiline: true },
    { key: "quoteAuthor", label: "Quote author" },
    { key: "aboutHistoire", label: "Our story", multiline: true },
    { key: "aboutVision", label: "Our vision", multiline: true },
    { key: "founderName", label: "Founder name" },
    { key: "founderTitle", label: "Founder title" },
    { key: "founderBio", label: "Founder biography", multiline: true },
    { key: "contactAddress", label: "Contact address", multiline: true },
  ],
};

function asText(value: unknown): string {
  return value == null ? "" : String(value);
}

export function TranslationsAdmin() {
  const [entityType, setEntityType] = useState<EntityType>("projects");
  const [recordId, setRecordId] = useState("");
  const [locale, setLocale] = useState<Locale>("en");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const projectsQuery = useListProjects();
  const newsQuery = useListNews();
  const servicesQuery = useListServices();
  const partnersQuery = useListPartners();
  const settingsQuery = useGetSiteSettings();
  const translationsQuery = useListContentTranslations({ locale });
  const upsert = useUpsertContentTranslation();
  const form = useForm<TranslationForm>({ defaultValues: {} });

  const records = useMemo<ContentRecord[]>(() => {
    switch (entityType) {
      case "projects":
        return (projectsQuery.data ?? []).map((item) => ({
          id: item.id,
          title: item.titre || `Project ${item.id}`,
          fields: Object.fromEntries(
            ["titre", "categorie", "statut", "duree", "langue", "synopsis", "intention"].map(
              (key) => [key, asText(item[key as keyof typeof item])],
            ),
          ),
        }));
      case "news":
        return (newsQuery.data ?? []).map((item) => ({
          id: item.id,
          title: item.titre || `Article ${item.id}`,
          fields: Object.fromEntries(
            ["titre", "categorie", "dateLabel", "excerpt"].map((key) => [
              key,
              asText(item[key as keyof typeof item]),
            ]),
          ),
        }));
      case "services":
        return (servicesQuery.data ?? []).map((item) => ({
          id: item.id,
          title: item.titre || `Service ${item.id}`,
          fields: { titre: asText(item.titre), description: asText(item.description) },
        }));
      case "partners":
        return (partnersQuery.data ?? []).map((item) => ({
          id: item.id,
          title: item.nom || `Partner ${item.id}`,
          fields: { nom: asText(item.nom), description: asText(item.description) },
        }));
      case "settings": {
        const item = settingsQuery.data;
        if (!item) return [];
        const keys = translatableFields.settings.map(({ key }) => key);
        return [
          {
            id: item.id,
            title: "Site settings",
            fields: Object.fromEntries(
              keys.map((key) => [key, asText(item[key as keyof typeof item])]),
            ),
          },
        ];
      }
    }
  }, [
    entityType,
    projectsQuery.data,
    newsQuery.data,
    servicesQuery.data,
    partnersQuery.data,
    settingsQuery.data,
  ]);

  useEffect(() => {
    setRecordId(records[0] ? String(records[0].id) : "");
  }, [entityType, records.length]);

  const selectedRecord = records.find((record) => String(record.id) === recordId);
  const currentTranslation = (translationsQuery.data ?? []).find(
    (translation) =>
      translation.entityType === entityType &&
      translation.entityId === Number(recordId) &&
      translation.locale === locale,
  );
  const fieldDefinitions = translatableFields[entityType];
  const translatedCount = fieldDefinitions.filter(
    ({ key }) => Boolean(currentTranslation?.fields?.[key]?.trim()),
  ).length;
  const isTranslationLoading = translationsQuery.isLoading;
  const sourceQuery =
    entityType === "projects"
      ? projectsQuery
      : entityType === "news"
        ? newsQuery
        : entityType === "services"
          ? servicesQuery
          : entityType === "partners"
            ? partnersQuery
            : settingsQuery;
  const hasSourceError = sourceQuery.isError;

  useEffect(() => {
    if (!selectedRecord) {
      form.reset({});
      return;
    }
    form.reset(
      Object.fromEntries(
        fieldDefinitions.map(({ key }) => [
          key,
          currentTranslation?.fields?.[key] ?? "",
        ]),
      ),
    );
  }, [recordId, entityType, locale, selectedRecord, currentTranslation, form, fieldDefinitions]);

  function handleEntityChange(value: string) {
    setEntityType(value as EntityType);
  }

  function onSubmit(values: TranslationForm) {
    if (!selectedRecord) return;
    const fields = Object.fromEntries(
      fieldDefinitions.map(({ key }) => [key, values[key] ?? ""]),
    );
    upsert.mutate(
      {
        data: {
          entityType,
          entityId: selectedRecord.id,
          locale,
          fields,
        },
      },
      {
        onSuccess: () => {
          void queryClient.invalidateQueries({
            queryKey: getListContentTranslationsQueryKey({ locale }),
          });
          toast({ title: "Translation saved", description: "The selected locale is up to date." });
        },
        onError: (error: Error) => {
          toast({
            title: "Could not save translation",
            description: error.message || "Please try again.",
            variant: "destructive",
          });
        },
      },
    );
  }

  const isSourceLoading = sourceQuery.isLoading;
  const isComplete = fieldDefinitions.length > 0 && translatedCount === fieldDefinitions.length;

  return (
    <section className="min-h-[70vh] text-foreground" data-testid="translations-admin">
      <header className="mb-7 flex flex-col gap-5 border-b border-border/70 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
            <Languages size={14} strokeWidth={1.8} />
            Pilumpiku · Language desk
          </div>
          <h2 className="font-serif text-3xl leading-tight sm:text-4xl">Translations</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Review the French master copy beside each locale. Blank fields stay blank until a
            translator completes them.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-sm border border-border/70 bg-card/70 px-4 py-3">
          <span className="flex size-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
            <Languages size={16} />
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Locale coverage</p>
            <p className="mt-0.5 font-mono text-sm">
              {translatedCount.toString().padStart(2, "0")}
              <span className="text-muted-foreground"> / {fieldDefinitions.length} fields</span>
            </p>
          </div>
        </div>
      </header>

      <div className="mb-6 grid grid-cols-1 gap-3 rounded-sm border border-border/70 bg-card/70 p-4 md:grid-cols-[1fr_1.35fr_1fr] md:p-5">
        <div className="space-y-2">
          <Label htmlFor="translation-entity" className="text-xs uppercase tracking-wider text-muted-foreground">
            Content type
          </Label>
          <Select value={entityType} onValueChange={handleEntityChange}>
            <SelectTrigger id="translation-entity" data-testid="select-translation-entity" className="bg-background/70">
              <SelectValue />
              <ChevronDown className="ml-auto size-4 opacity-50" />
            </SelectTrigger>
            <SelectContent>
              {entityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} data-testid={`option-entity-${option.value}`}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="translation-record" className="text-xs uppercase tracking-wider text-muted-foreground">
            Source record
          </Label>
          <Select value={recordId} onValueChange={setRecordId} disabled={isSourceLoading || records.length === 0}>
            <SelectTrigger id="translation-record" data-testid="select-translation-record" className="bg-background/70">
              <SelectValue placeholder={entityType === "settings" ? "Settings record" : "Choose a record"} />
            </SelectTrigger>
            <SelectContent>
              {records.map((record) => (
                <SelectItem key={record.id} value={String(record.id)} data-testid={`option-record-${record.id}`}>
                  <span className="mr-2 font-mono text-xs text-muted-foreground">
                    {String(record.id).padStart(3, "0")}
                  </span>
                  {record.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="translation-locale" className="text-xs uppercase tracking-wider text-muted-foreground">
            Target locale
          </Label>
          <Select value={locale} onValueChange={(value) => setLocale(value as Locale)}>
            <SelectTrigger id="translation-locale" data-testid="select-translation-locale" className="bg-background/70">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {localeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} data-testid={`option-locale-${option.value}`}>
                  <span className="flex w-full items-center justify-between gap-8">
                    <span>{option.label}</span>
                    <span className="font-mono text-xs text-muted-foreground">{option.value}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isSourceLoading ? (
        <div className="space-y-3" data-testid="state-source-loading">
          {[0, 1, 2].map((item) => (
            <div key={item} className="grid animate-pulse grid-cols-1 gap-3 rounded-sm border border-border/60 bg-card/40 p-4 md:grid-cols-2">
              <div className="h-20 rounded bg-muted/60" />
              <div className="h-20 rounded bg-muted/60" />
            </div>
          ))}
        </div>
      ) : hasSourceError ? (
        <div className="flex items-center gap-3 rounded-sm border border-destructive/40 bg-destructive/5 p-5" data-testid="state-source-error">
          <AlertCircle className="size-5 text-destructive" />
          <div className="flex-1">
            <p className="font-medium">Source content could not be loaded</p>
            <p className="text-sm text-muted-foreground">Try loading the admin again in a moment.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => void sourceQuery.refetch()} data-testid="button-retry-source">
            Retry
          </Button>
        </div>
      ) : !selectedRecord ? (
        <div className="rounded-sm border border-dashed border-border px-6 py-14 text-center" data-testid="state-no-records">
          <div className="mx-auto mb-4 flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Languages size={19} />
          </div>
          <h3 className="font-serif text-xl">No {entityOptions.find((item) => item.value === entityType)?.label.toLowerCase()} to translate</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            French source records will appear here when they are available.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {entityOptions.find((item) => item.value === entityType)?.singular} · #{String(selectedRecord.id).padStart(3, "0")}
              </p>
              <h3 className="mt-1 font-serif text-xl">{selectedRecord.title}</h3>
            </div>
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${
                isTranslationLoading
                  ? "border-border text-muted-foreground"
                  : isComplete
                    ? "border-emerald-700/35 bg-emerald-900/20 text-emerald-300"
                    : "border-primary/30 bg-primary/10 text-primary"
              }`}
              data-testid="status-translation"
            >
              {isTranslationLoading ? (
                <LoaderCircle className="size-3.5 animate-spin" />
              ) : isComplete ? (
                <Check className="size-3.5" />
              ) : (
                <span className="size-1.5 rounded-full bg-current" />
              )}
              {isTranslationLoading
                ? "Checking saved copy"
                : isComplete
                  ? "All listed fields translated"
                  : currentTranslation
                    ? `${translatedCount} of ${fieldDefinitions.length} fields translated`
                    : "No translation saved yet"}
            </div>
          </div>

          {translationsQuery.isError && (
            <div className="mb-4 flex items-center gap-2 rounded-sm border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive" data-testid="state-translation-error">
              <AlertCircle size={16} />
              Saved translations could not be checked. Existing translated values may be unavailable.
              <Button variant="link" className="ml-auto h-auto p-0 text-destructive" onClick={() => void translationsQuery.refetch()} data-testid="button-retry-translations">
                Retry
              </Button>
            </div>
          )}

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="hidden grid-cols-2 gap-3 px-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground md:grid">
                <div>French source</div>
                <div className="flex items-center justify-between">
                  <span>{localeOptions.find((item) => item.value === locale)?.native} translation</span>
                  <span className="font-mono tracking-normal">{locale}</span>
                </div>
              </div>
              {fieldDefinitions.map(({ key, label, multiline }) => {
                const source = selectedRecord.fields[key] ?? "";
                const translatedValue = currentTranslation?.fields?.[key] ?? "";
                return (
                  <section
                    key={key}
                    className="grid grid-cols-1 gap-0 overflow-hidden rounded-sm border border-border/70 bg-card/55 md:grid-cols-2"
                    data-testid={`translation-row-${key}`}
                  >
                    <div className="border-b border-border/60 bg-muted/25 p-4 md:border-b-0 md:border-r">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <Label htmlFor={`source-${key}`} className="text-xs font-medium text-muted-foreground">
                          {label}
                        </Label>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">FR</span>
                      </div>
                      <div
                        id={`source-${key}`}
                        className={`whitespace-pre-wrap text-sm leading-6 ${source ? "text-foreground/85" : "italic text-muted-foreground"}`}
                        data-testid={`source-value-${key}`}
                      >
                        {source || "French source is empty"}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <Label htmlFor={`translation-${key}`} className="text-xs font-medium">{label}</Label>
                        {!translatedValue && (
                          <span className="rounded-full border border-primary/25 px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-primary">
                            Needs translation
                          </span>
                        )}
                      </div>
                      {multiline ? (
                        <Textarea
                          id={`translation-${key}`}
                          rows={Math.min(7, key.includes("Bio") || key.includes("synopsis") || key.includes("Histoire") || key.includes("Vision") ? 5 : 3)}
                          placeholder={`Write ${localeOptions.find((item) => item.value === locale)?.label} copy…`}
                          className="min-h-20 resize-y border-border/70 bg-background/55 text-sm leading-6 focus-visible:ring-primary/50"
                          {...form.register(key)}
                          data-testid={`input-translation-${key}`}
                        />
                      ) : (
                        <Input
                          id={`translation-${key}`}
                          placeholder={`Write ${localeOptions.find((item) => item.value === locale)?.label} copy…`}
                          className="border-border/70 bg-background/55 text-sm focus-visible:ring-primary/50"
                          {...form.register(key)}
                          data-testid={`input-translation-${key}`}
                        />
                      )}
                      <p className="mt-2 text-[10px] text-muted-foreground">
                        {translatedValue ? "Saved locale value" : "No saved value — enter a translation"}
                      </p>
                    </div>
                  </section>
                );
              })}
              <div className="sticky bottom-3 z-10 flex flex-col gap-3 border border-border/70 bg-background/95 p-3 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div className="flex min-h-8 items-center gap-2 text-xs text-muted-foreground" data-testid="save-feedback">
                  {upsert.isPending ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin text-primary" />
                      Saving this record in {locale}…
                    </>
                  ) : upsert.isError ? (
                    <>
                      <AlertCircle className="size-4 text-destructive" />
                      Save failed. Your edits are still here; try again.
                    </>
                  ) : upsert.isSuccess ? (
                    <>
                      <Check className="size-4 text-emerald-400" />
                      Translation saved for this record and locale.
                    </>
                  ) : form.formState.isDirty ? (
                    "Unsaved changes"
                  ) : currentTranslation ? (
                    "Showing saved translation"
                  ) : (
                    "New translation · no source text is copied into blank fields"
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={upsert.isPending || isTranslationLoading || translationsQuery.isError}
                  className="min-w-44"
                  data-testid="button-save-translation"
                >
                  {upsert.isPending ? <LoaderCircle className="mr-2 size-4 animate-spin" /> : <Save className="mr-2 size-4" />}
                  {upsert.isPending ? "Saving…" : "Save translation"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </>
      )}
    </section>
  );
}

export default TranslationsAdmin;

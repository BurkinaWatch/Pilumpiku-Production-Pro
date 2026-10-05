import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";

export const SUPPORTED_LOCALES = [
  "fr",
  "en",
  "es",
  "pt",
  "de",
  "zh-CN",
  "mos",
  "dyu",
  "ff",
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALES: { code: Locale; nativeName: string }[] = [
  { code: "fr", nativeName: "Français" },
  { code: "en", nativeName: "English" },
  { code: "es", nativeName: "Español" },
  { code: "pt", nativeName: "Português" },
  { code: "de", nativeName: "Deutsch" },
  { code: "zh-CN", nativeName: "简体中文" },
  { code: "mos", nativeName: "Mooré" },
  { code: "dyu", nativeName: "Dioula" },
  { code: "ff", nativeName: "Fulfulde" },
];

const messages: Record<string, Partial<Record<Locale, string>>> = {
  "Accueil": { en: "Home", es: "Inicio", pt: "Início", de: "Startseite", "zh-CN": "首页", mos: "Yĩngré", dyu: "So", ff: "Galle" },
  "Projets": { en: "Projects", es: "Proyectos", pt: "Projetos", de: "Projekte", "zh-CN": "项目", mos: "Tʋʋm-noore", dyu: "Baara", ff: "Golle" },
  "Actualités": { en: "News", es: "Noticias", pt: "Notícias", de: "Aktuelles", "zh-CN": "新闻", mos: "Kibare", dyu: "Kibaru", ff: "Kabaaruuji" },
  "À propos": { en: "About", es: "Nosotros", pt: "Sobre", de: "Über uns", "zh-CN": "关于我们", mos: "Tẽn-d sẽn yaa", dyu: "Anw ka kan", ff: "Baɗte amen" },
  "Équipe": { en: "Team", es: "Equipo", pt: "Equipe", de: "Team", "zh-CN": "团队", mos: "Tʋʋm-demba", dyu: "Baara kɛla", ff: "Gollodɓe" },
  "Contact": { en: "Contact", es: "Contacto", pt: "Contato", de: "Kontakt", "zh-CN": "联系", mos: "Pʋg-n-taab", dyu: "Ka kuma", ff: "Jokkondiral" },
  "Productions": { en: "Productions", es: "Producciones", pt: "Produções", de: "Produktionen", "zh-CN": "制作", mos: "Pʋg-tʋʋma", dyu: "Produksɔn", ff: "Produksiyon" },
  "Collaborer": { en: "Work with us", es: "Colabora", pt: "Colabore", de: "Zusammenarbeiten", "zh-CN": "合作", mos: "Tʋʋm taaba", dyu: "Baara kɛ ta", ff: "Gollu e amen" },
  "Admin": { en: "Admin", es: "Admin", pt: "Admin", de: "Admin", "zh-CN": "管理", mos: "Tʋʋm-soaba", dyu: "Kɔndiya", ff: "Jooni" },
  "Administration": { en: "Administration", es: "Administración", pt: "Administração", de: "Verwaltung", "zh-CN": "管理后台", mos: "Tʋʋm-soabã", dyu: "Kɔndiya", ff: "Joonde" },
  "Sombre": { en: "Dark", es: "Oscuro", pt: "Escuro", de: "Dunkel", "zh-CN": "深色", mos: "Yĩng-yĩnga", dyu: "Dibi", ff: "Niɓɓere" },
  "Clair": { en: "Light", es: "Claro", pt: "Claro", de: "Hell", "zh-CN": "浅色", mos: "Yĩng-pɛɛga", dyu: "Jɛman", ff: "Jayngol" },
  "Espace d'administration": { en: "Admin area", es: "Área de administración", pt: "Área de administração", de: "Administrationsbereich", "zh-CN": "管理区域", mos: "Tʋʋm-soabã zĩig", dyu: "Kɔndiya yɔrɔ", ff: "Nder joonde" },
  "Vue d'ensemble": { en: "Overview", es: "Resumen", pt: "Visão geral", de: "Übersicht", "zh-CN": "概览", mos: "Yɛl-kẽedre", dyu: "Jateminɛ", ff: "Yiyde" },
  "Services": { en: "Services", es: "Servicios", pt: "Serviços", de: "Leistungen", "zh-CN": "服务", mos: "Tʋʋma", dyu: "Baaraw", ff: "Golle" },
  "Partenaires": { en: "Partners", es: "Socios", pt: "Parceiros", de: "Partner", "zh-CN": "合作伙伴", mos: "Tʋʋm-taaba", dyu: "Baarakɛla", ff: "Renndoɓe" },
  "Paramètres": { en: "Settings", es: "Configuración", pt: "Configurações", de: "Einstellungen", "zh-CN": "设置", mos: "Tʋʋm-sõngre", dyu: "Labɛn", ff: "Teelte" },
  "Traductions": { en: "Translations", es: "Traducciones", pt: "Traduções", de: "Übersetzungen", "zh-CN": "翻译", mos: "Yɛl-bɩɩbo", dyu: "Ladɔnni", ff: "Firooji" },
  "Découvrir nos projets": { en: "Discover our projects", es: "Descubre nuestros proyectos", pt: "Conheça nossos projetos", de: "Unsere Projekte entdecken", "zh-CN": "探索我们的项目", mos: "Yã tʋʋmdã", dyu: "An ka baara lajɛ", ff: "Yiy golle amen" },
  "Collaborer avec nous": { en: "Work with us", es: "Colabora con nosotros", pt: "Colabore conosco", de: "Mit uns zusammenarbeiten", "zh-CN": "与我们合作", mos: "Tʋʋm taaba", dyu: "Baara kɛ anw fɛ", ff: "Gollu e amen" },
  "Charger...": { en: "Loading...", es: "Cargando...", pt: "Carregando...", de: "Wird geladen...", "zh-CN": "加载中…", mos: "Lãmb n be...", dyu: "Ka lajɛ...", ff: "Nana..." },
  "Enregistrer les modifications": { en: "Save changes", es: "Guardar cambios", pt: "Salvar alterações", de: "Änderungen speichern", "zh-CN": "保存更改", mos: "Tõnd bɩɩbo", dyu: "Ka ɲɛnabɔ", ff: "Danndu bayle" },
  "Se connecter": { en: "Sign in", es: "Iniciar sesión", pt: "Entrar", de: "Anmelden", "zh-CN": "登录", mos: "Kẽ", dyu: "Don", ff: "Naatu" },
  "Se déconnecter": { en: "Sign out", es: "Cerrar sesión", pt: "Sair", de: "Abmelden", "zh-CN": "退出登录", mos: "Kẽ yĩnga", dyu: "Bɔ", ff: "Yaltu" },
  "Enregistrer": { en: "Save", es: "Guardar", pt: "Salvar", de: "Speichern", "zh-CN": "保存", mos: "Tõnd", dyu: "Ka ɲɛnabɔ", ff: "Danndu" },
  "Annuler": { en: "Cancel", es: "Cancelar", pt: "Cancelar", de: "Abbrechen", "zh-CN": "取消", mos: "Bɩɩ", dyu: "Bɔ", ff: "Haaytu" },
  "Envoyer": { en: "Send", es: "Enviar", pt: "Enviar", de: "Senden", "zh-CN": "发送", mos: "Tũn", dyu: "Ci", ff: "Neldu" },
  "Lire la suite": { en: "Read more", es: "Leer más", pt: "Leia mais", de: "Weiterlesen", "zh-CN": "阅读更多", mos: "Karem n yɩɩd", dyu: "Ka ɲininka", ff: "Tarno ɓurnde" },
  "Mentions légales": { en: "Legal notice", es: "Aviso legal", pt: "Aviso legal", de: "Impressum", "zh-CN": "法律声明", mos: "Sariya kibare", dyu: "Sariya kunnafoni", ff: "Tinndinol laawol" },
  "Politique de confidentialité": { en: "Privacy policy", es: "Política de privacidad", pt: "Política de privacidade", de: "Datenschutzerklärung", "zh-CN": "隐私政策", mos: "Sõngre kibare", dyu: "Kunnafoni ɲɛnamuya", ff: "Laawol suturo" },
  "Fermer le menu": { en: "Close menu", es: "Cerrar menú", pt: "Fechar menu", de: "Menü schließen", "zh-CN": "关闭菜单", mos: "Gũud menü", dyu: "Dafa menu", ff: "Uddu meniyu" },
  "Ouvrir le menu": { en: "Open menu", es: "Abrir menú", pt: "Abrir menu", de: "Menü öffnen", "zh-CN": "打开菜单", mos: "Yʋʋg menü", dyu: "Yɛlɛ menu", ff: "Uddit meniyu" },
};

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translate: (source: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function validLocale(value: string | null): value is Locale {
  return value !== null && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

function translateSource(source: string, locale: Locale): string {
  const trimmed = source.trim().replace(/\s+/g, " ");
  const translated = messages[trimmed]?.[locale];
  if (!translated) return source;
  const leading = source.match(/^\s*/)?.[0] ?? "";
  const trailing = source.match(/\s*$/)?.[0] ?? "";
  return `${leading}${translated}${trailing}`;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const currentLocale = useRef<Locale>("fr");
  const originalTexts = useRef(new WeakMap<Text, string>());
  const originalAttributes = useRef(new WeakMap<Element, Map<string, string>>());
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "fr";
    const saved = window.localStorage.getItem("pilimpiku_locale");
    return validLocale(saved) ? saved : "fr";
  });
  currentLocale.current = locale;

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("pilimpiku_locale", nextLocale);
      document.documentElement.lang = nextLocale;
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    void queryClient.invalidateQueries();
    const root = document.body;
    const translateDom = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textNode = node as Text;
        const parent = textNode.parentElement;
        if (parent?.closest("script,style,textarea,code,pre,[data-no-translate]")) return;
        const original = originalTexts.current.get(textNode) ?? textNode.data;
        originalTexts.current.set(textNode, original);
        const translated = translateSource(original, locale);
        if (translated !== textNode.data) textNode.data = translated;
        return;
      }
      if (!(node instanceof Element)) return;
      const attributes = ["aria-label", "title", "placeholder", "alt"];
      for (const name of attributes) {
        const current = node.getAttribute(name);
        if (current === null) continue;
        let saved = originalAttributes.current.get(node);
        if (!saved) {
          saved = new Map();
          originalAttributes.current.set(node, saved);
        }
        const original = saved.get(name) ?? current;
        saved.set(name, original);
        const translated = translateSource(original, locale);
        if (translated !== current) node.setAttribute(name, translated);
      }
      node.childNodes.forEach(translateDom);
    };

    translateDom(root);
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === "characterData" && record.target instanceof Text) {
          translateDom(record.target);
        } else {
          record.addedNodes.forEach(translateDom);
          if (record.type === "attributes" && record.target instanceof Element) {
            translateDom(record.target);
          }
        }
      }
    });
    observer.observe(root, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["aria-label", "title", "placeholder", "alt"],
    });
    return () => observer.disconnect();
  }, [locale, queryClient]);

  const translate = useCallback(
    (source: string) => translateSource(source, locale),
    [locale],
  );
  const context = useMemo(
    () => ({ locale, setLocale, translate }),
    [locale, setLocale, translate],
  );

  return (
    <LocaleContext.Provider value={context}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useI18n(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}

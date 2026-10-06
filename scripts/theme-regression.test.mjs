import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFileSync(join(rootDir, path), "utf8");

const webCss = read("artifacts/pilimpiku/src/index.css");
const appSource = read("artifacts/pilimpiku/src/App.tsx");
const navbarSource = read("artifacts/pilimpiku/src/components/Navbar.tsx");
const mobileColorsSource = read("artifacts/pilimpiku-mobile/constants/colors.ts");
const mobileColorHook = read("artifacts/pilimpiku-mobile/hooks/useColors.ts");

const lightCss = webCss.match(/\.light\s*\{([\s\S]*?)\n\}/)?.[1];
const darkCss = webCss.match(/:root,\s*\.dark\s*\{([\s\S]*?)\n\}/)?.[1];
assert.ok(lightCss, "The web light-theme token block must remain defined.");
assert.ok(darkCss, "The web dark-theme token block must remain defined.");

const tokenMap = {
  background: "background",
  foreground: "foreground",
  card: "card",
  cardForeground: "card-foreground",
  primary: "primary",
  primaryForeground: "primary-foreground",
  secondary: "secondary",
  secondaryForeground: "secondary-foreground",
  muted: "muted",
  mutedForeground: "muted-foreground",
  accent: "accent",
  accentForeground: "accent-foreground",
  destructive: "destructive",
  destructiveForeground: "destructive-foreground",
  border: "border",
  input: "input",
};

function hslTokenToHex(block, cssToken) {
  const match = block.match(
    new RegExp(`--${cssToken}:\\s*([\\d.]+)\\s+([\\d.]+)%\\s+([\\d.]+)%\\s*;`),
  );
  assert.ok(match, `Expected --${cssToken} in the web theme tokens.`);

  const hue = Number(match[1]);
  const saturation = Number(match[2]) / 100;
  const lightness = Number(match[3]) / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const hueSection = hue / 60;
  const secondary = chroma * (1 - Math.abs((hueSection % 2) - 1));
  const rgb =
    hueSection < 1
      ? [chroma, secondary, 0]
      : hueSection < 2
        ? [secondary, chroma, 0]
        : hueSection < 3
          ? [0, chroma, secondary]
          : hueSection < 4
            ? [0, secondary, chroma]
            : hueSection < 5
              ? [secondary, 0, chroma]
              : [chroma, 0, secondary];
  const offset = lightness - chroma / 2;

  return `#${rgb
    .map((channel) =>
      Math.round((channel + offset) * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

function mobilePalette(scheme) {
  const block = mobileColorsSource.match(
    new RegExp(`\\b${scheme}:\\s*\\{([^}]*)\\}`),
  )?.[1];
  assert.ok(block, `Expected a ${scheme} palette in the mobile tokens.`);
  return Object.fromEntries(
    [...block.matchAll(/(\w+):\s*['"](#\w{6})['"]/g)].map((match) => [
      match[1],
      match[2].toLowerCase(),
    ]),
  );
}

function relativeLuminance(hex) {
  const channels = hex
    .slice(1)
    .match(/../g)
    .map((channel) => parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(first, second) {
  const firstLuminance = relativeLuminance(first);
  const secondLuminance = relativeLuminance(second);
  return (
    (Math.max(firstLuminance, secondLuminance) + 0.05) /
    (Math.min(firstLuminance, secondLuminance) + 0.05)
  );
}

function findFiles(directory, extension) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return findFiles(path, extension);
    return entry.isFile() && path.endsWith(extension) ? [path] : [];
  });
}

test("web pages stay inside the shared theme, with dark mode as the default", () => {
  assert.match(appSource, /defaultTheme="dark"/);
  assert.match(appSource, /enableSystem=\{false\}/);

  const themeStart = appSource.indexOf("<ThemeProvider");
  const routerStart = appSource.indexOf("<WouterRouter");
  const themeEnd = appSource.indexOf("</ThemeProvider>");
  assert.ok(
    themeStart >= 0 && themeStart < routerStart && routerStart < themeEnd,
    "All web routes must render beneath the shared ThemeProvider.",
  );

  assert.match(navbarSource, /data-testid="button-theme-toggle-desktop"/);
  assert.match(navbarSource, /data-testid="button-theme-toggle-mobile"/);
});

test("the web light palette stays warm, readable, and slightly heavier", () => {
  const background = lightCss.match(/--background:\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/);
  const primary = lightCss.match(/--primary:\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/);
  assert.ok(background && primary, "Light background and primary tokens must exist.");

  const [backgroundHue, backgroundSaturation, backgroundLightness] =
    background.slice(1).map(Number);
  assert.ok(backgroundHue >= 30 && backgroundHue <= 45);
  assert.ok(backgroundSaturation >= 20 && backgroundSaturation <= 35);
  assert.ok(backgroundLightness >= 87 && backgroundLightness <= 93);

  const [primaryHue, primarySaturation, primaryLightness] =
    primary.slice(1).map(Number);
  assert.ok(primaryHue >= 18 && primaryHue <= 35);
  assert.ok(primarySaturation >= 50 && primarySaturation <= 70);
  assert.ok(primaryLightness >= 30 && primaryLightness <= 42);
  assert.match(webCss, /\.light body\s*\{[^}]*font-weight:\s*500/s);

  const palette = Object.fromEntries(
    Object.entries(tokenMap).map(([mobileToken, cssToken]) => [
      mobileToken,
      hslTokenToHex(lightCss, cssToken),
    ]),
  );
  const readablePairs = [
    ["foreground", "background"],
    ["foreground", "card"],
    ["secondaryForeground", "secondary"],
    ["mutedForeground", "muted"],
    ["primaryForeground", "primary"],
    ["accentForeground", "accent"],
    ["destructiveForeground", "destructive"],
  ];
  for (const [foreground, surface] of readablePairs) {
    assert.ok(
      contrastRatio(palette[foreground], palette[surface]) >= 4.5,
      `${foreground} must remain readable on ${surface}.`,
    );
  }
});

test("mobile light and dark palettes stay synchronized with the web tokens", () => {
  for (const [scheme, cssBlock] of [
    ["light", lightCss],
    ["dark", darkCss],
  ]) {
    const palette = mobilePalette(scheme);
    for (const [mobileToken, cssToken] of Object.entries(tokenMap)) {
      assert.equal(
        palette[mobileToken],
        hslTokenToHex(cssBlock, cssToken),
        `${scheme}.${mobileToken} must match web --${cssToken}.`,
      );
    }
    assert.equal(palette.text, palette.foreground);
    assert.equal(palette.tint, palette.primary);
  }

  assert.match(
    mobileColorHook,
    /scheme === ['"]dark['"]\s*\?\s*colors\.dark\s*:\s*colors\.light/,
  );
});

test("mobile screens use the theme hook and image fallbacks use themed surfaces", () => {
  const mobileAppDirectory = join(rootDir, "artifacts/pilimpiku-mobile/app");
  const screens = findFiles(mobileAppDirectory, ".tsx").filter(
    (path) => relative(mobileAppDirectory, path) !== "_layout.tsx",
  );
  assert.ok(screens.length >= 5, "Expected the mobile routes to be covered.");
  for (const path of screens) {
    assert.match(
      readFileSync(path, "utf8"),
      /useColors/,
      `${relative(rootDir, path)} must consume the theme palette.`,
    );
  }

  for (const path of [
    "artifacts/pilimpiku-mobile/app/(tabs)/index.tsx",
    "artifacts/pilimpiku-mobile/app/project/[slug].tsx",
    "artifacts/pilimpiku-mobile/components/ProjectCard.tsx",
    "artifacts/pilimpiku-mobile/components/NewsCard.tsx",
  ]) {
    assert.match(read(path), /backgroundColor:\s*colors\.(?:card|secondary|primary)/);
    assert.doesNotMatch(
      read(path),
      /backgroundColor:\s*['"]#[\da-f]{3,8}['"]/i,
      `${path} must not pin a theme surface to a fixed hex color.`,
    );
  }
});

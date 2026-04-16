import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type ProductKey = "mavic3Pro" | "mavic4Pro";

export type LinkPreset = {
  id: string;
  name: string;
  mavic3ProUrl: string;
  mavic4ProUrl: string;
  isActive: boolean;
};

export type SiteConfig = {
  prices: Record<ProductKey, string>;
  utmfyHeadScript: string;
  linkPresets: LinkPreset[];
  updatedAt: string;
};

export type PublicSiteConfig = {
  prices: Record<ProductKey, string>;
  cheapestPrice: string;
  checkoutUrls: Record<ProductKey, string>;
  activePresetId: string;
  activePresetName: string;
};

const CONFIG_DIR = path.join(process.cwd(), "data");
const CONFIG_FILE = path.join(CONFIG_DIR, "site-config.json");

const DEFAULT_CONFIG: SiteConfig = {
  prices: {
    mavic3Pro: "97",
    mavic4Pro: "137",
  },
  utmfyHeadScript: "",
  linkPresets: [
    {
      id: "preset-default",
      name: "Par principal",
      mavic3ProUrl: "",
      mavic4ProUrl: "",
      isActive: true,
    },
  ],
  updatedAt: new Date().toISOString(),
};

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizePrice(value: unknown, fallback: string) {
  const normalized = normalizeText(value).replace(",", ".");

  if (!normalized) {
    return fallback;
  }

  const parsed = Number(normalized.replace(/[^\d.]/g, ""));

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return normalized;
}

function parsePrice(value: string) {
  const parsed = Number(value.replace(",", ".").replace(/[^\d.]/g, ""));

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 0;
  }

  return parsed;
}

function formatPrice(value: string) {
  const parsed = parsePrice(value);

  if (!parsed) {
    return "$0";
  }

  const hasDecimals = !Number.isInteger(parsed);
  return `$${parsed.toLocaleString("en-US", {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

function normalizeLinkPreset(value: unknown, index: number): LinkPreset {
  const fallback = DEFAULT_CONFIG.linkPresets[0];
  const preset = typeof value === "object" && value !== null ? value : {};
  const raw = preset as Partial<LinkPreset>;

  return {
    id: normalizeText(raw.id) || `preset-${index + 1}`,
    name: normalizeText(raw.name) || `Par ${index + 1}`,
    mavic3ProUrl: normalizeText(raw.mavic3ProUrl),
    mavic4ProUrl: normalizeText(raw.mavic4ProUrl),
    isActive:
      typeof raw.isActive === "boolean" ? raw.isActive : index === 0 || fallback.isActive,
  };
}

export function sanitizeSiteConfig(input: unknown): SiteConfig {
  const raw = typeof input === "object" && input !== null ? input : {};
  const candidate = raw as Partial<SiteConfig>;
  const rawPrices =
    typeof candidate.prices === "object" && candidate.prices !== null
      ? candidate.prices
      : {};
  const priceValues = rawPrices as Partial<Record<ProductKey, string>>;
  const rawPresets = Array.isArray(candidate.linkPresets)
    ? candidate.linkPresets
    : DEFAULT_CONFIG.linkPresets;

  const linkPresets = rawPresets.map((preset, index) =>
    normalizeLinkPreset(preset, index),
  );

  const hasActivePreset = linkPresets.some((preset) => preset.isActive);
  if (!hasActivePreset && linkPresets.length > 0) {
    linkPresets[0].isActive = true;
  }

  if (linkPresets.length === 0) {
    linkPresets.push(DEFAULT_CONFIG.linkPresets[0]);
  }

  return {
    prices: {
      mavic3Pro: normalizePrice(priceValues.mavic3Pro, DEFAULT_CONFIG.prices.mavic3Pro),
      mavic4Pro: normalizePrice(priceValues.mavic4Pro, DEFAULT_CONFIG.prices.mavic4Pro),
    },
    utmfyHeadScript: normalizeText(candidate.utmfyHeadScript),
    linkPresets,
    updatedAt:
      normalizeText(candidate.updatedAt) || DEFAULT_CONFIG.updatedAt,
  };
}

async function ensureConfigFile() {
  await mkdir(CONFIG_DIR, { recursive: true });

  try {
    await readFile(CONFIG_FILE, "utf8");
  } catch {
    await writeFile(
      CONFIG_FILE,
      JSON.stringify(DEFAULT_CONFIG, null, 2),
      "utf8",
    );
  }
}

export async function loadSiteConfig() {
  await ensureConfigFile();

  const content = await readFile(CONFIG_FILE, "utf8");
  const parsed = JSON.parse(content) as unknown;
  const config = sanitizeSiteConfig(parsed);

  if (JSON.stringify(parsed) !== JSON.stringify(config)) {
    await saveSiteConfig(config);
  }

  return config;
}

export async function saveSiteConfig(input: SiteConfig) {
  const config = sanitizeSiteConfig({
    ...input,
    updatedAt: new Date().toISOString(),
  });

  await ensureConfigFile();
  await writeFile(CONFIG_FILE, JSON.stringify(config, null, 2), "utf8");

  return config;
}

export async function getPublicSiteConfig(): Promise<PublicSiteConfig> {
  const config = await loadSiteConfig();
  const activePreset =
    config.linkPresets.find((preset) => preset.isActive) ?? config.linkPresets[0];
  const cheapestNumericPrice = Math.min(
    parsePrice(config.prices.mavic3Pro),
    parsePrice(config.prices.mavic4Pro),
  );
  const cheapestPrice = formatPrice(String(cheapestNumericPrice));

  return {
    prices: {
      mavic3Pro: formatPrice(config.prices.mavic3Pro),
      mavic4Pro: formatPrice(config.prices.mavic4Pro),
    },
    cheapestPrice,
    checkoutUrls: {
      mavic3Pro: activePreset?.mavic3ProUrl ?? "",
      mavic4Pro: activePreset?.mavic4ProUrl ?? "",
    },
    activePresetId: activePreset?.id ?? "",
    activePresetName: activePreset?.name ?? "",
  };
}

export function extractHeadScriptBlocks(snippet: string) {
  const normalized = snippet.trim();

  if (!normalized) {
    return [];
  }

  const matches = Array.from(
    normalized.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi),
  );

  if (matches.length === 0) {
    return [normalized];
  }

  return matches
    .map((match) => match[1]?.trim() ?? "")
    .filter(Boolean);
}

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  getLocalizedCopy,
  isRtlLocale,
  isSupportedLocale,
  supportedLocales,
} from "./catalog";
import type {
  LocalizedPrice,
  LocalizationContext,
  SearchParamsInput,
} from "./types";

type HeaderLike = {
  get(name: string): string | null;
};

type BuildLocalizationInput = {
  headers?: HeaderLike;
  searchParams?: SearchParamsInput;
  basePrices: Record<string, number>;
};

type CacheEntry<T> = {
  value: T;
  updatedAt: number;
};

const DEFAULT_LOCALE = "en";
const BASE_CURRENCY = "USD";
const CACHE_DIR = path.join(process.cwd(), "data", "localization-cache");
const IP_COUNTRY_CACHE_FILE = path.join(CACHE_DIR, "ip-country.json");
const COUNTRY_METADATA_CACHE_FILE = path.join(CACHE_DIR, "country-metadata.json");
const EXCHANGE_RATES_CACHE_FILE = path.join(CACHE_DIR, "exchange-rates-usd.json");

const IP_COUNTRY_TTL_SECONDS = 60 * 60 * 24;
const COUNTRY_METADATA_TTL_SECONDS = 60 * 60 * 24 * 30;
const EXCHANGE_RATES_TTL_SECONDS = 60 * 60 * 6;
const EXCHANGE_RATES_STALE_TTL_SECONDS = 60 * 60 * 24 * 7;

const countryLocaleGroups: Record<string, string[]> = {
  es: ["AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "ES", "GT", "HN", "MX", "NI", "PA", "PE", "PR", "PY", "SV", "UY", "VE"],
  fr: ["BE", "BF", "BI", "BJ", "CD", "CF", "CG", "CI", "CM", "DJ", "FR", "GA", "GF", "GN", "GP", "HT", "LU", "MC", "MF", "MQ", "NE", "PF", "PM", "RE", "SN", "TD", "TG", "YT"],
  de: ["AT", "DE", "LI"],
  it: ["IT", "SM", "VA"],
  nl: ["NL"],
  "pt-BR": ["BR"],
  "pt-PT": ["AO", "CV", "GW", "MZ", "PT", "ST", "TL"],
  pl: ["PL"],
  sv: ["SE"],
  tr: ["TR"],
  ar: ["AE", "BH", "DZ", "EG", "IQ", "JO", "KW", "LB", "LY", "MA", "OM", "PS", "QA", "SA", "SD", "SY", "TN", "YE"],
  he: ["IL"],
  ru: ["BY", "KG", "KZ", "RU"],
  ja: ["JP"],
  ko: ["KR"],
  "zh-Hans": ["CN", "SG"],
  "zh-Hant": ["HK", "MO", "TW"],
  hi: ["IN"],
  id: ["ID"],
  en: ["AU", "CA", "GB", "IE", "NZ", "PH", "SG", "US", "ZA"],
};

const fallbackCurrencyMap: Record<string, string> = {
  US: "USD",
  CA: "CAD",
  GB: "GBP",
  AU: "AUD",
  NZ: "NZD",
  BR: "BRL",
  MX: "MXN",
  JP: "JPY",
  KR: "KRW",
  CN: "CNY",
  HK: "HKD",
  SG: "SGD",
  IN: "INR",
  ID: "IDR",
  TR: "TRY",
  PL: "PLN",
  SE: "SEK",
  RU: "RUB",
  IL: "ILS",
  AE: "AED",
  SA: "SAR",
  QA: "QAR",
  KW: "KWD",
  EG: "EGP",
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  ES: "EUR",
  NL: "EUR",
  PT: "EUR",
  BE: "EUR",
  AT: "EUR",
  IE: "EUR",
  CH: "CHF",
  NO: "NOK",
  DK: "DKK",
  ZA: "ZAR",
  TW: "TWD",
};

const zeroDecimalCurrencies = new Set([
  "BIF",
  "CLP",
  "DJF",
  "GNF",
  "ISK",
  "JPY",
  "KMF",
  "KRW",
  "PYG",
  "RWF",
  "UGX",
  "VND",
  "VUV",
  "XAF",
  "XOF",
  "XPF",
]);

function getHeader(headers: HeaderLike | undefined, name: string) {
  return headers?.get(name) ?? headers?.get(name.toLowerCase()) ?? "";
}

function getSearchParam(searchParams: SearchParamsInput | undefined, name: string) {
  const value = searchParams?.[name];
  return Array.isArray(value) ? value[0] : value;
}

function normalizeCountryCode(countryCode: unknown) {
  const normalized = String(countryCode ?? "").trim().slice(0, 2).toUpperCase();
  if (!/^[A-Z]{2}$/.test(normalized)) {
    return "";
  }

  return ["XX", "T1", "A1", "A2"].includes(normalized) ? "" : normalized;
}

function normalizeCurrency(currency: unknown) {
  const normalized = String(currency ?? "").trim().slice(0, 3).toUpperCase();
  return /^[A-Z]{3}$/.test(normalized) ? normalized : "";
}

function isLocalHost(headers?: HeaderLike) {
  const host = (
    getHeader(headers, "x-forwarded-host") ||
    getHeader(headers, "host")
  )
    .toLowerCase()
    .replace(/:\d+$/, "");

  return ["localhost", "127.0.0.1", "::1"].includes(host);
}

function allowQueryOverride(headers?: HeaderLike, searchParams?: SearchParamsInput) {
  return (
    process.env.NODE_ENV !== "production" ||
    isLocalHost(headers) ||
    Boolean(getSearchParam(searchParams, "debug_locale")) ||
    Boolean(getSearchParam(searchParams, "sc_test_locale"))
  );
}

function isPrivateIpv4(ip: string) {
  const parts = ip.split(".").map((part) => Number(part));
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) {
    return true;
  }

  const [a, b] = parts;
  return (
    a === 10 ||
    a === 127 ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 169 && b === 254) ||
    a === 0
  );
}

function isValidIp(ip: string) {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) || /^[0-9a-f:]+$/i.test(ip);
}

function isPublicIp(ip: string) {
  if (!isValidIp(ip)) {
    return false;
  }

  if (ip.includes(".")) {
    return !isPrivateIpv4(ip);
  }

  const normalized = ip.toLowerCase();
  return !(
    normalized === "::1" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    normalized.startsWith("fe80") ||
    normalized.startsWith("::ffff:10.") ||
    normalized.startsWith("::ffff:127.") ||
    normalized.startsWith("::ffff:192.168.")
  );
}

function getClientIp(headers?: HeaderLike) {
  const candidates: string[] = [];
  const cfIp = getHeader(headers, "cf-connecting-ip");
  if (cfIp) {
    candidates.push(cfIp.trim());
  }

  const forwardedFor = getHeader(headers, "x-forwarded-for");
  if (forwardedFor) {
    candidates.push(...forwardedFor.split(",").map((ip) => ip.trim()));
  }

  for (const header of ["x-real-ip", "x-client-ip", "x-forwarded"]) {
    const value = getHeader(headers, header);
    if (value) {
      candidates.push(value.trim());
    }
  }

  return candidates.find(isPublicIp) ?? candidates.find(isValidIp) ?? "";
}

async function ensureCacheDir() {
  await mkdir(CACHE_DIR, { recursive: true }).catch(() => undefined);
}

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function writeJsonFile(filePath: string, payload: unknown) {
  try {
    await ensureCacheDir();
    await writeFile(filePath, JSON.stringify(payload, null, 2), "utf8");
  } catch {
    // Some hosts have read-only filesystems. The app must keep working without cache writes.
  }
}

function hashIp(ip: string) {
  return createHash("sha256").update(ip).digest("hex");
}

async function fetchText(url: string, timeoutMs = 4000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        "User-Agent": "DjiMavicLocalization/1.0",
      },
    });

    if (!response.ok) {
      return null;
    }

    return response.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchJson<T>(url: string, timeoutMs = 4000) {
  const response = await fetchText(url, timeoutMs);
  if (!response) {
    return null;
  }

  try {
    return JSON.parse(response) as T;
  } catch {
    return null;
  }
}

async function readCacheEntry<T>(
  filePath: string,
  key: string,
  maxAgeSeconds: number,
) {
  const cache = await readJsonFile<Record<string, CacheEntry<T>>>(filePath);
  const entry = cache?.[key];

  if (!entry || typeof entry.updatedAt !== "number") {
    return null;
  }

  if (Date.now() - entry.updatedAt > maxAgeSeconds * 1000) {
    return null;
  }

  return entry.value;
}

async function writeCacheEntry<T>(filePath: string, key: string, value: T) {
  const cache = (await readJsonFile<Record<string, CacheEntry<T>>>(filePath)) ?? {};
  cache[key] = {
    value,
    updatedAt: Date.now(),
  };
  await writeJsonFile(filePath, cache);
}

async function lookupCountryByIp(ip: string) {
  if (!ip || !isPublicIp(ip)) {
    return null;
  }

  const cacheKey = hashIp(ip);
  const cached = await readCacheEntry<string>(
    IP_COUNTRY_CACHE_FILE,
    cacheKey,
    IP_COUNTRY_TTL_SECONDS,
  );

  if (cached) {
    return normalizeCountryCode(cached) || null;
  }

  const response = await fetchText(
    `https://ipapi.co/${encodeURIComponent(ip)}/country/`,
  );
  const countryCode = normalizeCountryCode(response);

  if (!countryCode) {
    return null;
  }

  await writeCacheEntry(IP_COUNTRY_CACHE_FILE, cacheKey, countryCode);
  return countryCode;
}

async function detectCountryCode(
  headers: HeaderLike | undefined,
  searchParams: SearchParamsInput | undefined,
  queryOverride: boolean,
) {
  if (queryOverride) {
    const requestedCountry = normalizeCountryCode(getSearchParam(searchParams, "country"));
    if (requestedCountry) {
      return {
        countryCode: requestedCountry,
        countrySource: "query_test",
      };
    }
  }

  const cfCountry = normalizeCountryCode(getHeader(headers, "cf-ipcountry"));
  const remoteIp = getClientIp(headers);

  if (cfCountry) {
    const countryFromIp = await lookupCountryByIp(remoteIp);
    if (countryFromIp) {
      return {
        countryCode: countryFromIp,
        countrySource:
          countryFromIp === cfCountry
            ? "cloudflare_verified"
            : "ip_api_corrected_cloudflare",
      };
    }

    return {
      countryCode: cfCountry,
      countrySource: "cloudflare",
    };
  }

  for (const header of [
    "x-vercel-ip-country",
    "x-nf-country",
    "x-country-code",
    "geoip-country-code",
    "x-appengine-country",
    "x-country",
  ]) {
    const headerCountry = normalizeCountryCode(getHeader(headers, header));
    if (headerCountry) {
      return {
        countryCode: headerCountry,
        countrySource: header,
      };
    }
  }

  const countryFromIp = await lookupCountryByIp(remoteIp);
  if (countryFromIp) {
    return {
      countryCode: countryFromIp,
      countrySource: "ip_api",
    };
  }

  return {
    countryCode: "US",
    countrySource: "default",
  };
}

function languageToSupportedLocale(language: string, countryCode = "") {
  const normalizedLanguage = language.toLowerCase().trim();
  const normalizedCountry = countryCode.toUpperCase().trim();

  if (normalizedLanguage === "pt") {
    return normalizedCountry === "BR" ? "pt-BR" : "pt-PT";
  }

  if (normalizedLanguage === "zh") {
    return ["TW", "HK", "MO"].includes(normalizedCountry)
      ? "zh-Hant"
      : "zh-Hans";
  }

  return supportedLocales.find((locale) => locale === normalizedLanguage) ?? null;
}

function countryDefaultLocale(countryCode: string) {
  for (const [locale, countries] of Object.entries(countryLocaleGroups)) {
    if (countries.includes(countryCode)) {
      return locale;
    }
  }

  return DEFAULT_LOCALE;
}

function detectLocale(
  countryCode: string,
  headers: HeaderLike | undefined,
  searchParams: SearchParamsInput | undefined,
  queryOverride: boolean,
) {
  if (queryOverride) {
    const requestedLocale = getSearchParam(searchParams, "lang");

    if (requestedLocale) {
      const exactMatch = supportedLocales.find(
        (locale) => locale.toLowerCase() === requestedLocale.toLowerCase(),
      );

      if (exactMatch) {
        return exactMatch;
      }

      const requestedLanguage = requestedLocale.replace("_", "-").split("-")[0];
      const mapped = languageToSupportedLocale(requestedLanguage, countryCode);
      if (mapped && isSupportedLocale(mapped)) {
        return mapped;
      }
    }
  }

  const defaultFromCountry = countryDefaultLocale(countryCode);
  if (isSupportedLocale(defaultFromCountry)) {
    return defaultFromCountry;
  }

  const acceptLanguage = getHeader(headers, "accept-language");
  for (const languagePart of acceptLanguage.split(",")) {
    const rawLocale = languagePart.split(";")[0]?.trim();
    if (!rawLocale) {
      continue;
    }

    const normalized = rawLocale.replace("_", "-");
    const exactMatch = supportedLocales.find(
      (locale) => locale.toLowerCase() === normalized.toLowerCase(),
    );
    if (exactMatch) {
      return exactMatch;
    }

    const [primaryLanguage, region = countryCode] = normalized.split("-");
    const mapped = languageToSupportedLocale(primaryLanguage, region);
    if (mapped && isSupportedLocale(mapped)) {
      return mapped;
    }
  }

  return DEFAULT_LOCALE;
}

async function getCountryCurrency(countryCode: string) {
  const fallbackCurrency = fallbackCurrencyMap[countryCode] ?? BASE_CURRENCY;
  const cachedCurrency = await readCacheEntry<string>(
    COUNTRY_METADATA_CACHE_FILE,
    countryCode,
    COUNTRY_METADATA_TTL_SECONDS,
  );

  if (cachedCurrency) {
    return normalizeCurrency(cachedCurrency) || fallbackCurrency;
  }

  const metadata = await fetchJson<
    Array<{ currencies?: Record<string, unknown> }>
  >(
    `https://restcountries.com/v3.1/alpha/${encodeURIComponent(
      countryCode,
    )}?fields=cca2,currencies,languages`,
  );

  const currency = normalizeCurrency(
    metadata?.[0]?.currencies ? Object.keys(metadata[0].currencies)[0] : "",
  );

  if (currency) {
    await writeCacheEntry(COUNTRY_METADATA_CACHE_FILE, countryCode, currency);
    return currency;
  }

  return fallbackCurrency;
}

async function readExchangeRatesCache(maxAgeSeconds: number) {
  const payload = await readJsonFile<{
    base: string;
    updatedAt: number;
    rates: Record<string, number>;
  }>(EXCHANGE_RATES_CACHE_FILE);

  if (!payload?.rates || typeof payload.updatedAt !== "number") {
    return null;
  }

  if (Date.now() - payload.updatedAt > maxAgeSeconds * 1000) {
    return null;
  }

  return payload.rates;
}

async function writeExchangeRatesCache(rates: Record<string, number>) {
  await writeJsonFile(EXCHANGE_RATES_CACHE_FILE, {
    base: BASE_CURRENCY,
    updatedAt: Date.now(),
    rates,
  });
}

async function getExchangeRates() {
  const cachedRates = await readExchangeRatesCache(EXCHANGE_RATES_TTL_SECONDS);
  if (cachedRates) {
    return cachedRates;
  }

  const response = await fetchJson<{
    rates?: Record<string, number>;
    conversion_rates?: Record<string, number>;
  }>("https://open.er-api.com/v6/latest/USD");
  const rates = response?.rates ?? response?.conversion_rates ?? null;

  if (rates && Object.keys(rates).length > 0) {
    await writeExchangeRatesCache(rates);
    return rates;
  }

  return (await readExchangeRatesCache(EXCHANGE_RATES_STALE_TTL_SECONDS)) ?? {};
}

function currencyFractionDigits(currency: string) {
  return zeroDecimalCurrencies.has(currency.toUpperCase()) ? 0 : 2;
}

function numberParts(amount: number, currency: string, locale: string, digits: number) {
  try {
    const parts = new Intl.NumberFormat(locale, {
      currency,
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
      style: "currency",
    }).formatToParts(amount);

    return {
      formatted: parts.map((part) => part.value).join(""),
      symbol:
        parts.find((part) => part.type === "currency")?.value ?? currency,
      integer: parts
        .filter((part) => part.type === "integer" || part.type === "group")
        .map((part) => part.value)
        .join(""),
      fraction: parts.find((part) => part.type === "fraction")?.value ?? "",
    };
  } catch {
    const fallbackAmount = amount.toLocaleString("en-US", {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });
    const [integer, fraction = ""] = fallbackAmount.split(".");

    return {
      formatted: `${currency} ${fallbackAmount}`,
      symbol: currency,
      integer,
      fraction,
    };
  }
}

export function formatLocalizedPrice(
  baseAmountUsd: number,
  requestedCurrency: string,
  locale: string,
  rates: Record<string, number>,
): LocalizedPrice {
  let currency = normalizeCurrency(requestedCurrency) || BASE_CURRENCY;
  let rate = currency === BASE_CURRENCY ? 1 : Number(rates[currency] ?? 0);

  if (currency !== BASE_CURRENCY && (!Number.isFinite(rate) || rate <= 0)) {
    currency = BASE_CURRENCY;
    rate = 1;
  }

  const digits = currencyFractionDigits(currency);
  const amount = Number((baseAmountUsd * rate).toFixed(digits));
  const parts = numberParts(amount, currency, locale, digits);

  return {
    currency,
    symbol: parts.symbol,
    integer: parts.integer,
    fraction: digits > 0 ? parts.fraction : "",
    digits,
    amount,
    formatted: parts.formatted,
  };
}

export async function buildLocalizationContext({
  headers,
  searchParams,
  basePrices,
}: BuildLocalizationInput): Promise<LocalizationContext> {
  const queryOverride = allowQueryOverride(headers, searchParams);
  const { countryCode, countrySource } = await detectCountryCode(
    headers,
    searchParams,
    queryOverride,
  );
  const locale = detectLocale(countryCode, headers, searchParams, queryOverride);
  const detectedCurrency = await getCountryCurrency(countryCode);
  const requestedCurrency = queryOverride
    ? normalizeCurrency(getSearchParam(searchParams, "currency"))
    : "";
  const currency = requestedCurrency || detectedCurrency;
  const rates = await getExchangeRates();

  const prices = Object.fromEntries(
    Object.entries(basePrices).map(([key, amount]) => [
      key,
      formatLocalizedPrice(amount, currency, locale, rates),
    ]),
  );

  return {
    countryCode,
    countrySource,
    locale,
    currency,
    queryOverride,
    isRtl: isRtlLocale(locale),
    copy: getLocalizedCopy(locale),
    prices,
  };
}

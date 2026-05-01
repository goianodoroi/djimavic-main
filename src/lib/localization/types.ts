export type LocalizedPrice = {
  currency: string;
  symbol: string;
  integer: string;
  fraction: string;
  digits: number;
  amount: number;
  formatted: string;
};

export type LocalizationContext = {
  countryCode: string;
  countrySource: string;
  locale: string;
  currency: string;
  queryOverride: boolean;
  isRtl: boolean;
  copy: Record<string, string>;
  prices: Record<string, LocalizedPrice>;
};

export type SearchParamsInput = Record<string, string | string[] | undefined>;

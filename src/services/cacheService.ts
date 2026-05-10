import type { AlphaVantageResponse } from '../types/ApiResponse';

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const getCacheKey = (symbol: string) => `av_cache_${symbol}`;

export const readCache = (symbol: string): AlphaVantageResponse | null => {
  try {
    const raw = localStorage.getItem(getCacheKey(symbol));
    if (!raw) return null;
    const { data, savedAt } = JSON.parse(raw);
    if (Date.now() - savedAt > CACHE_TTL_MS) return null;
    return data;
  } catch {
    return null;
  }
};

export const writeCache = (symbol: string, data: AlphaVantageResponse) => {
  try {
    localStorage.setItem(getCacheKey(symbol), JSON.stringify({ data, savedAt: Date.now() }));
  } catch {
    // localStorage full — skip
  }
};

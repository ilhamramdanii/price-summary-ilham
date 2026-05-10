import apiClient from './apiClient';
import type { AlphaVantageResponse } from '../types/ApiResponse';
import { API_KEY } from '../constants/config';
import { getMockData } from './mockData';
import { readCache, writeCache } from './cacheService';

const getFallback = (symbol: string): AlphaVantageResponse => {
  const cached = readCache(symbol);
  if (cached) return cached;

  const mock = getMockData(symbol);
  if (mock) return mock;

  throw new Error('API rate limit tercapai dan tidak ada data tersimpan.');
};

export const fetchDailySeries = async (symbol: string): Promise<AlphaVantageResponse> => {
  try {
    const { data } = await apiClient.get<AlphaVantageResponse>('', {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol,
        apikey: API_KEY,
      },
    });

    if (data['Error Message'] || data['Note'] || data['Information'] || !data['Time Series (Daily)']) {
      return getFallback(symbol);
    }

    writeCache(symbol, data);
    return data;
  } catch {
    return getFallback(symbol);
  }
};

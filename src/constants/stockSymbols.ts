import type { StockSymbol } from '../types/StockData';

export const STOCK_LIST: StockSymbol[] = [
  { symbol: 'BBCA', leverage: 5,    logo: '/logos/BBCA.svg' },
  { symbol: 'BBNI', leverage: 3,    logo: '/logos/BBNI.svg' },
  { symbol: 'TLKM', leverage: null, logo: '/logos/TLKM.svg' },
  { symbol: 'BMRI', leverage: 5,    logo: '/logos/BMRI.svg' },
  { symbol: 'ASII', leverage: 3,    logo: '/logos/ASII.svg' },
];

export const DEFAULT_STOCK = STOCK_LIST[0];

import { useState } from 'react';
import type { StockSymbol } from '../types/StockData';
import { DEFAULT_STOCK } from '../constants/stockSymbols';

export const useStockSymbol = () => {
  const [selectedStock, setSelectedStock] = useState<StockSymbol>(DEFAULT_STOCK);
  return { selectedStock, setSelectedStock };
};

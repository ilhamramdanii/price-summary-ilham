import { useQuery } from '@tanstack/react-query';
import { fetchDailySeries } from '../services/stockService';
import { transformToPriceInfo } from '../services/priceTransformer';

const STALE_TIME_MS = 5 * 60 * 1000;
const RETRY_COUNT   = 2;

export const useStockData = (symbol: string) => {
  return useQuery({
    queryKey: ['stockData', symbol],
    queryFn: () => fetchDailySeries(symbol),
    select: transformToPriceInfo,
    staleTime: STALE_TIME_MS,
    retry: RETRY_COUNT,
  });
};

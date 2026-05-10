import type { AlphaVantageResponse } from '../types/ApiResponse';
import type { PriceInfo } from '../types/PriceInfo';

// IDX price tick size by price range
const getPriceFraction = (price: number): number => {
  if (price >= 2_000) return 25;
  if (price >= 500)   return 5;
  if (price >= 200)   return 2;
  return 1;
};

// IDX Auto Rejection rates by prev close. Asymmetric for tier >= 5,000 per BEI regulation.
const getAutoRejectionRates = (prev: number): { araRate: number; arbRate: number } => {
  if (prev >= 5_000) return { araRate: 0.20, arbRate: 0.15 };
  if (prev >= 200)   return { araRate: 0.25, arbRate: 0.25 };
  return               { araRate: 0.35, arbRate: 0.35 };
};

const roundToFraction = (price: number, fraction: number): number =>
  Math.round(price / fraction) * fraction;

export const transformToPriceInfo = (raw: AlphaVantageResponse): PriceInfo => {
  const timeSeries = raw['Time Series (Daily)'];
  if (!timeSeries) throw new Error('Data time series tidak ditemukan.');
  const [todayDate, yesterdayDate] = Object.keys(timeSeries).sort().reverse();

  const todayRaw     = timeSeries[todayDate];
  const yesterdayRaw = timeSeries[yesterdayDate];

  const open   = parseFloat(todayRaw['1. open']);
  const high   = parseFloat(todayRaw['2. high']);
  const low    = parseFloat(todayRaw['3. low']);
  const close  = parseFloat(todayRaw['4. close']);
  const volume = parseInt(todayRaw['5. volume'], 10);
  const prev   = parseFloat(yesterdayRaw['4. close']);

  const change    = close - prev;
  const changePct = (change / prev) * 100;
  const lot       = Math.floor(volume / 100);

  const avg = (open + high + low + close) / 4;
  const val = volume * avg;

  const fraction = getPriceFraction(prev);
  const { araRate, arbRate } = getAutoRejectionRates(prev);
  const ara = roundToFraction(prev * (1 + araRate), fraction);
  const arb = roundToFraction(prev * (1 - arbRate), fraction);

  return { open, high, low, close, prev, change, changePct, lot, ara, arb, val, avg };
};

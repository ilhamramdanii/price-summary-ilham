const DECIMAL_PLACES = 2;

type Unit = { readonly threshold: number; readonly suffix: string };

const formatCompact = (value: number, units: readonly Unit[]): string => {
  for (const { threshold, suffix } of units) {
    if (value >= threshold) return `${(value / threshold).toFixed(DECIMAL_PLACES)}${suffix}`;
  }
  return value.toLocaleString('en-US');
};

const LOT_UNITS: readonly Unit[] = [
  { threshold: 1_000_000, suffix: 'M' },
  { threshold: 1_000,     suffix: 'K' },
];

const VAL_UNITS: readonly Unit[] = [
  { threshold: 1_000_000_000_000, suffix: 'T' },
  { threshold: 1_000_000_000,     suffix: 'B' },
  { threshold: 1_000_000,         suffix: 'M' },
];

export const formatPrice = (value: number): string =>
  Math.round(value).toLocaleString('en-US');

export const formatLot = (lot: number): string => formatCompact(lot, LOT_UNITS);

export const formatVal = (val: number): string => formatCompact(val, VAL_UNITS);

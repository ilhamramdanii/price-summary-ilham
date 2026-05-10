import { ChevronDown } from 'lucide-react';
import type { PriceInfo } from '../../types/PriceInfo';
import { formatPrice, formatLot, formatVal } from '../../utils/formatters';

interface Props {
  data: PriceInfo;
}

const Label = ({ text }: { text: string }) => (
  <span className="text-gray-400 text-sm">{text}</span>
);

interface ValueProps {
  text: string;
  className?: string;
  withChevron?: boolean;
}

const CHEVRON_SIZE = 13;

const Value = ({ text, className = 'text-white', withChevron = false }: ValueProps) => (
  <div className={`text-sm font-medium flex items-center gap-0.5 ${className}`}>
    <span>{text}</span>
    {withChevron && <ChevronDown size={CHEVRON_SIZE} className="text-gray-400" />}
  </div>
);

export const PRICE_GRID_COLUMNS = 'auto auto auto auto auto 1fr';

export const PriceGrid = ({ data }: Props) => {
  const { open, high, low, prev, lot, ara, arb, val, avg } = data;

  return (
    <div
      className="grid gap-x-3 sm:gap-x-5 gap-y-4 px-3 sm:px-5 py-4 bg-black"
      style={{ gridTemplateColumns: PRICE_GRID_COLUMNS }}
    >
      <Label text="Open" />
      <Value text={formatPrice(open)} />
      <Label text="Prev" />
      <Value text={formatPrice(prev)} />
      <Label text="Lot" />
      <Value text={formatLot(lot)} className="text-green-400 justify-end" />

      <Label text="High" />
      <Value text={formatPrice(high)} className="text-green-400" />
      <Label text="ARA" />
      <Value text={formatPrice(ara)} withChevron />
      <Label text="Val" />
      <Value text={formatVal(val)} className="text-green-400 justify-end" />

      <Label text="Low" />
      <Value text={formatPrice(low)} className="text-red-400" />
      <Label text="ARB" />
      <Value text={formatPrice(arb)} withChevron />
      <Label text="Avg" />
      <Value text={formatPrice(avg)} className="text-white justify-end" />
    </div>
  );
};

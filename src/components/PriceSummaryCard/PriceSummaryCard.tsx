import { useStockData } from '../../hooks/useStockData';
import type { StockSymbol } from '../../types/StockData';
import { PriceHeader } from './PriceHeader';
import { PriceGrid } from './PriceGrid';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ErrorCard } from './ErrorCard';

interface Props {
  stock: StockSymbol;
  options: StockSymbol[];
  onStockChange: (stock: StockSymbol) => void;
}

export const CARD_CLASS = 'bg-[#1E1E1E] rounded overflow-hidden w-full shadow-2xl border border-white/[0.07]';

export const PriceSummaryCard = ({ stock, options, onStockChange }: Props) => {
  const { data, isLoading, isError, error } = useStockData(stock.symbol);

  if (isLoading) return <LoadingSkeleton className={CARD_CLASS} />;
  if (isError || !data) return <ErrorCard className={CARD_CLASS} error={error} />;

  return (
    <div className={CARD_CLASS}>
      <PriceHeader
        symbol={stock.symbol}
        leverage={stock.leverage}
        logo={stock.logo}
        close={data.close}
        change={data.change}
        changePct={data.changePct}
        options={options}
        onSymbolChange={onStockChange}
      />
      <PriceGrid data={data} />
    </div>
  );
};

import { Zap, ArrowUpRight, ArrowDownRight, Edit2, MoreHorizontal, Landmark } from 'lucide-react';
import type { StockSymbol } from '../../types/StockData';
import { formatPrice } from '../../utils/formatters';

const ICON_SIZE = { zap: 9, logo: 13, arrow: 14, edit: 12, more: 17 } as const;

interface Props {
  symbol: string;
  leverage: number | null;
  logo?: string;
  close: number;
  change: number;
  changePct: number;
  options: StockSymbol[];
  onSymbolChange: (stock: StockSymbol) => void;
}

export const PriceHeader = ({ symbol, leverage, logo, close, change, changePct, options, onSymbolChange }: Props) => {
  const isPositive = change >= 0;
  const sign       = isPositive ? '+' : '';
  const colorClass = isPositive ? 'text-green-400' : 'text-red-400';
  const ArrowIcon  = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-3 border-b border-white/[0.06]">

      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-sm bg-white/[0.05] hover:bg-white/10 transition-colors cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden flex-shrink-0">
            {logo
              ? <img src={logo} alt={symbol} className="w-full h-full object-cover" />
              : <Landmark size={ICON_SIZE.logo} className="text-white" />
            }
          </div>
          <select
            value={symbol}
            onChange={(e) => {
              const stock = options.find((s) => s.symbol === e.target.value);
              if (stock) onSymbolChange(stock);
            }}
            className="text-white font-bold text-sm tracking-wide bg-transparent border-none outline-none cursor-pointer appearance-none"
          >
            {options.map((s) => (
              <option key={s.symbol} value={s.symbol} className="bg-[#1E1E1E]">
                {s.symbol}
              </option>
            ))}
          </select>
        </div>
        {leverage !== null && (
          <span className="border border-violet-400/35 text-violet-400/60 text-[10px] px-1 py-px rounded-[3px] flex items-center gap-0.5 bg-violet-900/30 font-semibold tracking-wide">
            <Zap size={8} className="text-violet-400/60 fill-violet-400/60 flex-shrink-0" />
            {leverage}x
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 flex-1 min-w-0 overflow-hidden">
        <span className="text-white text-base font-bold whitespace-nowrap flex-shrink-0">
          {formatPrice(close)}
        </span>
        <span className={`flex items-center gap-0.5 text-sm font-medium whitespace-nowrap ${colorClass}`}>
          <ArrowIcon size={ICON_SIZE.arrow} strokeWidth={2.5} className="flex-shrink-0" />
          {formatPrice(Math.abs(change))}
          <span className="text-xs">({sign}{changePct.toFixed(2)}%)</span>
        </span>
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button className="text-gray-500 hover:text-gray-300 transition-colors p-1 rounded-[3px] border border-gray-600/40">
          <Edit2 size={ICON_SIZE.edit} />
        </button>
        <button className="text-gray-500 hover:text-gray-300 transition-colors">
          <MoreHorizontal size={ICON_SIZE.more} />
        </button>
      </div>

    </div>
  );
};

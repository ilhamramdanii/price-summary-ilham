import type { StockSymbol } from '../../types/StockData';

interface Props {
  options: StockSymbol[];
  selected: StockSymbol;
  onChange: (stock: StockSymbol) => void;
}

export const StockSelector = ({ options, selected, onChange }: Props) => (
  <div className="flex items-center gap-3">
    <span className="text-gray-500 text-sm">Pilih saham</span>
    <select
      value={selected.symbol}
      onChange={(e) => {
        const stock = options.find((s) => s.symbol === e.target.value);
        if (stock) onChange(stock);
      }}
      className="bg-[#1E1E1E] text-white text-sm font-medium rounded-md px-3 py-1.5 border border-white/[0.07] focus:outline-none focus:border-blue-500/60 cursor-pointer"
    >
      {options.map((stock) => (
        <option key={stock.symbol} value={stock.symbol}>
          {stock.symbol}
        </option>
      ))}
    </select>
  </div>
);

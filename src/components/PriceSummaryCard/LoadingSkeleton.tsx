import { PRICE_GRID_COLUMNS } from './PriceGrid';

const SkeletonRow = () => (
  <>
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="h-4 bg-white/5 rounded animate-pulse" />
    ))}
  </>
);

interface Props {
  className: string;
}

export const LoadingSkeleton = ({ className }: Props) => (
  <div className={className}>
    <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
      <div className="w-7 h-7 rounded-full bg-white/10 animate-pulse" />
      <div className="h-4 w-20 bg-white/10 rounded animate-pulse" />
      <div className="h-4 w-28 bg-white/10 rounded animate-pulse ml-2" />
    </div>
    <div className="grid gap-x-4 gap-y-2.5 px-4 py-3" style={{ gridTemplateColumns: PRICE_GRID_COLUMNS }}>
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
    </div>
  </div>
);

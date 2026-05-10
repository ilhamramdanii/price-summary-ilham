interface Props {
  className: string;
  error: Error | null;
}

export const ErrorCard = ({ className, error }: Props) => (
  <div className={`${className} border-red-800/40 px-4 py-3`}>
    <p className="text-red-400 text-sm">
      {error?.message ?? 'Gagal memuat data saham.'}
    </p>
  </div>
);

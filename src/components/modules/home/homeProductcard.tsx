/** Small product card */
export const HomeProductCard = ({
  emoji,
  name,
  price,
}: {
  emoji: string;
  name: string;
  price: string;
}) => {
  return (
    <div
      className="bg-white rounded-2xl border border-surface-3 overflow-hidden
                 hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-card group"
    >
      {/* Emoji block */}
      <div
        className="flex items-center justify-center h-28 bg-surface-3 text-4xl select-none
                   group-hover:bg-accent-light transition-colors duration-300"
      >
        {emoji}
      </div>
      {/* Info */}
      <div className="p-3.5">
        <p className="text-sm font-semibold text-ink leading-tight truncate">
          {name}
        </p>
        <p className="text-sm font-bold text-accent mt-1">{price}</p>
      </div>
    </div>
  );
};

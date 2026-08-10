import RatingBadge from './RatingBadge';

export default function BrewCard({ brew, onEdit }) {
  return (
    <li className="flex items-center gap-4 border-b border-coffee-100 py-4 last:border-b-0">
      <RatingBadge rating={brew.rating} />

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-coffee-900">{brew.beans}</p>
        <div className="mt-1 flex flex-wrap gap-2">
          <span className="rounded-full border border-coffee-200 px-2 py-0.5 text-xs text-coffee-600">
            {brew.method}
          </span>
          <span className="rounded-full border border-coffee-200 px-2 py-0.5 text-xs text-coffee-600">
            🫘 {brew.coffeeGrams}g
          </span>
          <span className="rounded-full border border-coffee-200 px-2 py-0.5 text-xs text-coffee-600">
            💧 {brew.waterGrams}g
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onEdit(brew)}
        aria-label={`Edit ${brew.beans}`}
        className="shrink-0 rounded-lg border border-coffee-200 p-2 text-coffee-600 transition hover:bg-coffee-50"
      >
        ✏️
      </button>
    </li>
  );
}

import StarRating from './StarRating';
import { toTitleCase } from '../brewMethods';
import { formatRatio } from '../utils/ratio';

export default function BrewCard({ brew, onEdit, onDelete, style }) {
  return (
    <li
      style={style}
      className="group animate-fadeInUp rounded-3xl bg-white p-6 shadow-card ring-1 ring-espresso-50 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-lg font-bold text-espresso" title={brew.beans}>
            {brew.beans}
          </p>
          <span className="mt-1.5 inline-block rounded-full bg-espresso-50 px-2.5 py-0.5 text-xs font-medium text-espresso-400">
            {toTitleCase(brew.method)}
          </span>
        </div>
        <span className="shrink-0 rounded-full bg-sage-100 px-2.5 py-1 text-xs font-semibold text-sage-600">
          {formatRatio(brew.coffeeGrams, brew.waterGrams)}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-cream px-3 py-2">
          <dt className="text-xs text-espresso-400">Coffee</dt>
          <dd className="font-semibold text-espresso">{brew.coffeeGrams}g</dd>
        </div>
        <div className="rounded-xl bg-cream px-3 py-2">
          <dt className="text-xs text-espresso-400">Water</dt>
          <dd className="font-semibold text-espresso">{brew.waterGrams}g</dd>
        </div>
      </dl>

      {brew.tastingNotes && (
        <p className="mt-4 line-clamp-2 text-sm italic text-espresso-400">
          "{brew.tastingNotes}"
        </p>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-espresso-50 pt-4">
        <StarRating rating={brew.rating} />

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(brew)}
            aria-label={`Edit ${brew.beans}`}
            className="rounded-full p-2 text-espresso-400 transition-colors duration-150 hover:bg-espresso-50 hover:text-espresso"
          >
            ✏️
          </button>
          <button
            type="button"
            onClick={() => onDelete(brew)}
            aria-label={`Delete ${brew.beans}`}
            className="rounded-full p-2 text-espresso-400 transition-colors duration-150 hover:bg-red-50 hover:text-red-600"
          >
            🗑️
          </button>
        </div>
      </div>
    </li>
  );
}

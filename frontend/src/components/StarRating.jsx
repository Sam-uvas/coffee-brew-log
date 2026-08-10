// Display mode: ★★★★☆ + "4 / 5" badge, read-only (used on brew cards).
// Interactive mode: click a star to set the rating (used in the form modal).
export default function StarRating({ rating, onChange, interactive = false }) {
  const stars = [1, 2, 3, 4, 5];

  if (!interactive) {
    return (
      <div className="flex items-center gap-1.5" aria-label={`Rating ${rating} out of 5`}>
        <span className="text-caramel-600 tracking-tight" aria-hidden="true">
          {stars.map((n) => (n <= rating ? '★' : '☆')).join('')}
        </span>
        <span className="rounded-full bg-caramel-50 px-2 py-0.5 text-xs font-semibold text-caramel-600">
          {rating} / 5
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating out of 5">
      {stars.map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={n === rating}
          aria-label={`${n} star${n === 1 ? '' : 's'}`}
          onClick={() => onChange(n === rating ? 0 : n)}
          className="p-0.5 text-2xl leading-none text-caramel-400 transition-transform duration-150 hover:scale-110"
        >
          {n <= rating ? '★' : '☆'}
        </button>
      ))}
      <span className="ml-2 text-sm text-espresso-400">{rating} / 5</span>
    </div>
  );
}

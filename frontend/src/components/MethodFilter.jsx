import { BREW_METHODS, toTitleCase } from '../brewMethods';

export default function MethodFilter({ value, onChange }) {
  const pills = [{ label: 'All', value: '' }, ...BREW_METHODS.map((m) => ({ label: toTitleCase(m), value: m }))];

  return (
    <div
      role="group"
      aria-label="Filter by brew method"
      className="pill-row -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible"
    >
      {pills.map((pill) => {
        const isSelected = value === pill.value;
        return (
          <button
            key={pill.label}
            type="button"
            onClick={() => onChange(pill.value)}
            aria-pressed={isSelected}
            className={`shrink-0 snap-start rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              isSelected
                ? 'bg-espresso text-white shadow-soft'
                : 'bg-white text-espresso-400 ring-1 ring-inset ring-espresso-100 hover:bg-espresso-50 hover:text-espresso'
            }`}
          >
            {pill.label}
          </button>
        );
      })}
    </div>
  );
}

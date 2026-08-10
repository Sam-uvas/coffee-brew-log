import { BREW_METHODS } from '../brewMethods';

export default function MethodFilter({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter by method"
      className="w-full rounded-lg border border-coffee-200 bg-white px-3 py-2 text-sm text-coffee-900 focus:border-coffee-400 focus:outline-none focus:ring-1 focus:ring-coffee-400"
    >
      <option value="">Filter by method</option>
      {BREW_METHODS.map((method) => (
        <option key={method} value={method}>
          {method}
        </option>
      ))}
    </select>
  );
}

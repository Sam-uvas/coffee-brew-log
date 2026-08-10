// Auto-calculated coffee:water ratio, displayed as "1:15" etc.
// Read-only, derived — never sent to or stored by the backend.
export function formatRatio(coffeeGrams, waterGrams) {
  const coffee = Number(coffeeGrams);
  const water = Number(waterGrams);

  if (!coffee || !water || coffee <= 0 || water <= 0) return '—';

  const ratio = water / coffee;
  const rounded = Math.round(ratio * 10) / 10;
  const display = Number.isInteger(rounded) ? rounded : rounded.toFixed(1);

  return `1:${display}`;
}

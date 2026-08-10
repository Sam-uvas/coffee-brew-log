// Central list of brew methods so the filter pills and the add/edit
// form always stay in sync. Values are what's sent to/stored by the
// backend; toTitleCase() below only affects display.
export const BREW_METHODS = [
  'Aeropress',
  'Drip coffee',
  'V60',
  'French press',
  'Espresso',
  'Moka pot',
  'Chemex',
  'Cold brew',
];

// Display-only formatting — "Drip coffee" -> "Drip Coffee".
// The underlying value used for filtering/storage is untouched.
export function toTitleCase(method) {
  return method.replace(/\b\w/g, (char) => char.toUpperCase());
}

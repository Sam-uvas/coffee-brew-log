import { useState } from 'react';
import { BREW_METHODS } from '../brewMethods';

const EMPTY_FORM = {
  beans: '',
  method: '',
  coffeeGrams: '',
  waterGrams: '',
  rating: 0,
  tastingNotes: '',
};

function isBlank(value) {
  return value === undefined || value === null || String(value).trim() === '';
}

// Handles both "Add a brew" and "Edit a brew", matching the two
// wireframe states. `brew` is null for Add, populated for Edit.
export default function BrewFormModal({ brew, onClose, onSave, onDelete }) {
  const isEdit = Boolean(brew);
  const [form, setForm] = useState(
    brew
      ? {
          beans: brew.beans,
          method: brew.method,
          coffeeGrams: brew.coffeeGrams,
          waterGrams: brew.waterGrams,
          rating: brew.rating,
          tastingNotes: brew.tastingNotes,
        }
      : EMPTY_FORM
  );
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isValid =
    !isBlank(form.beans) &&
    !isBlank(form.method) &&
    !isBlank(form.coffeeGrams) &&
    !isBlank(form.waterGrams) &&
    !isBlank(form.tastingNotes) &&
    Number(form.coffeeGrams) > 0 &&
    Number(form.waterGrams) > 0;

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);
    setError('');
    try {
      await onSave({
        beans: form.beans.trim(),
        method: form.method,
        coffeeGrams: Number(form.coffeeGrams),
        waterGrams: Number(form.waterGrams),
        rating: Number(form.rating),
        tastingNotes: form.tastingNotes.trim(),
      });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (deleting) return;
    setDeleting(true);
    setError('');
    try {
      await onDelete(brew.id);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setDeleting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={isEdit ? 'Edit a brew' : 'Add a brew'}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-coffee-900">
            {isEdit ? 'Edit a brew' : 'Add a brew'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-xl leading-none text-coffee-600 hover:text-coffee-900"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-coffee-800" htmlFor="beans">
              Beans
            </label>
            <input
              id="beans"
              type="text"
              value={form.beans}
              onChange={(e) => handleChange('beans', e.target.value)}
              className="w-full rounded-lg border border-coffee-200 px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none focus:ring-1 focus:ring-coffee-400"
              placeholder="e.g. Zimbabwean highlands"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-coffee-800" htmlFor="method">
              Method
            </label>
            <select
              id="method"
              value={form.method}
              onChange={(e) => handleChange('method', e.target.value)}
              className="w-full rounded-lg border border-coffee-200 bg-white px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none focus:ring-1 focus:ring-coffee-400"
            >
              <option value="">Select a method</option>
              {BREW_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-coffee-800" htmlFor="coffeeGrams">
                Coffee grams
              </label>
              <input
                id="coffeeGrams"
                type="number"
                min="1"
                value={form.coffeeGrams}
                onChange={(e) => handleChange('coffeeGrams', e.target.value)}
                className="w-full rounded-lg border border-coffee-200 px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none focus:ring-1 focus:ring-coffee-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-coffee-800" htmlFor="waterGrams">
                Water grams
              </label>
              <input
                id="waterGrams"
                type="number"
                min="1"
                value={form.waterGrams}
                onChange={(e) => handleChange('waterGrams', e.target.value)}
                className="w-full rounded-lg border border-coffee-200 px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none focus:ring-1 focus:ring-coffee-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-coffee-800" htmlFor="rating">
              Rating (out of 5)
            </label>
            <input
              id="rating"
              type="number"
              min="0"
              max="5"
              value={form.rating}
              onChange={(e) => handleChange('rating', e.target.value)}
              className="w-full rounded-lg border border-coffee-200 px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none focus:ring-1 focus:ring-coffee-400"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-coffee-800" htmlFor="tastingNotes">
              Tasting notes
            </label>
            <input
              id="tastingNotes"
              type="text"
              value={form.tastingNotes}
              onChange={(e) => handleChange('tastingNotes', e.target.value)}
              className="w-full rounded-lg border border-coffee-200 px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none focus:ring-1 focus:ring-coffee-400"
              placeholder="e.g. Heavy body, soft finish, nutty"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex items-center gap-3 pt-1">
            {isEdit && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            )}
            <button
              type="submit"
              disabled={!isValid || submitting}
              className="ml-auto rounded-lg bg-coffee-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-coffee-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

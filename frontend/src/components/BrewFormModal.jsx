import { useState } from 'react';
import { BREW_METHODS, toTitleCase } from '../brewMethods';
import { formatRatio } from '../utils/ratio';
import StarRating from './StarRating';

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

const inputClasses =
  'w-full rounded-xl border border-espresso-100 bg-white px-3.5 py-2.5 text-sm text-espresso placeholder:text-espresso-200 transition-colors duration-150 focus:border-caramel focus:outline-none focus:ring-2 focus:ring-caramel-100';

const labelClasses = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-espresso-400';

// Handles both "Add a brew" and "Edit a brew". `brew` is null for Add,
// populated for Edit.
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
      className="animate-overlayIn fixed inset-0 z-50 flex items-center justify-center bg-espresso-900/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={isEdit ? 'Edit a brew' : 'Add a brew'}
      onClick={onClose}
    >
      <div
        className="animate-modalPop max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-lift sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-espresso">
              {isEdit ? 'Edit a brew' : 'Add a brew'}
            </h2>
            <p className="mt-1 text-sm text-espresso-400">
              {isEdit ? 'Update the details of this cup.' : 'Log the details of this cup.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-xl leading-none text-espresso-400 transition-colors duration-150 hover:bg-espresso-50 hover:text-espresso"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelClasses} htmlFor="beans">
              Beans
            </label>
            <input
              id="beans"
              type="text"
              value={form.beans}
              onChange={(e) => handleChange('beans', e.target.value)}
              className={inputClasses}
              placeholder="e.g. Zimbabwean highlands"
            />
          </div>

          <div>
            <label className={labelClasses} htmlFor="method">
              Method
            </label>
            <select
              id="method"
              value={form.method}
              onChange={(e) => handleChange('method', e.target.value)}
              className={`${inputClasses} appearance-none bg-white`}
            >
              <option value="">Select a method</option>
              {BREW_METHODS.map((method) => (
                <option key={method} value={method}>
                  {toTitleCase(method)}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClasses} htmlFor="coffeeGrams">
                Coffee (g)
              </label>
              <input
                id="coffeeGrams"
                type="number"
                min="1"
                value={form.coffeeGrams}
                onChange={(e) => handleChange('coffeeGrams', e.target.value)}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses} htmlFor="waterGrams">
                Water (g)
              </label>
              <input
                id="waterGrams"
                type="number"
                min="1"
                value={form.waterGrams}
                onChange={(e) => handleChange('waterGrams', e.target.value)}
                className={inputClasses}
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-cream px-3.5 py-2.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-espresso-400">
              Ratio
            </span>
            <span className="text-sm font-bold text-sage-600">
              {formatRatio(form.coffeeGrams, form.waterGrams)}
            </span>
          </div>

          <div>
            <label className={labelClasses}>Rating</label>
            <StarRating
              rating={Number(form.rating) || 0}
              onChange={(value) => handleChange('rating', value)}
              interactive
            />
          </div>

          <div>
            <label className={labelClasses} htmlFor="tastingNotes">
              Tasting notes
            </label>
            <input
              id="tastingNotes"
              type="text"
              value={form.tastingNotes}
              onChange={(e) => handleChange('tastingNotes', e.target.value)}
              className={inputClasses}
              placeholder="e.g. Heavy body, soft finish, nutty"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex items-center gap-3 pt-2">
            {isEdit && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-full border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors duration-150 hover:bg-red-50 disabled:opacity-50"
              >
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="ml-auto rounded-full px-4 py-2.5 text-sm font-semibold text-espresso-400 transition-colors duration-150 hover:bg-espresso-50 hover:text-espresso"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid || submitting}
              className="rounded-full bg-espresso px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-espresso-900 hover:shadow-card disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none"
            >
              {submitting ? 'Saving…' : isEdit ? 'Save Changes' : 'Save Brew'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EmptyState({ onNewBrew }) {
  return (
    <div className="animate-fadeInUp flex flex-col items-center rounded-3xl bg-white/60 px-6 py-20 text-center ring-1 ring-espresso-50">
      <span className="text-5xl" aria-hidden="true">
        ☕
      </span>
      <h2 className="mt-5 text-xl font-bold text-espresso">No brews yet.</h2>
      <p className="mt-1.5 text-sm text-espresso-400">
        Start building your coffee journal.
      </p>
      <button
        type="button"
        onClick={onNewBrew}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-espresso-900 hover:shadow-card"
      >
        <span className="text-base leading-none" aria-hidden="true">
          +
        </span>
        New Brew
      </button>
    </div>
  );
}

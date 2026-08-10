export default function Header({ onNewBrew }) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="text-3xl leading-none" aria-hidden="true">
          ☕
        </span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-espresso sm:text-3xl">
            Brew Journal
          </h1>
          <p className="mt-1 text-sm text-espresso-400 sm:text-base">
            Capture every cup. Perfect every brew.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onNewBrew}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-espresso-900 hover:shadow-card active:translate-y-0 sm:w-auto"
      >
        <span className="text-base leading-none" aria-hidden="true">
          +
        </span>
        New Brew
      </button>
    </header>
  );
}

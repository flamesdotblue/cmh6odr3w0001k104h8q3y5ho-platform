import { Home, Plus, Settings } from 'lucide-react';

export default function MobileNav({ onAddPress }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0px)' }}
      aria-label="Primary"
    >
      <div className="mx-auto w-full max-w-md px-4 pb-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-black/40">
          <div className="grid grid-cols-3">
            <button
              className="flex items-center justify-center gap-2 py-3 text-xs text-white"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Home"
            >
              <Home className="w-5 h-5" />
              <span className="sr-only sm:not-sr-only sm:inline">Home</span>
            </button>
            <button
              onClick={onAddPress}
              className="relative -mt-4 mx-auto inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white text-black shadow-lg active:scale-95"
              aria-label="Add"
            >
              <Plus className="w-6 h-6" />
            </button>
            <button
              className="flex items-center justify-center gap-2 py-3 text-xs text-white/80"
              onClick={() => alert('Settings coming soon')}
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
              <span className="sr-only sm:not-sr-only sm:inline">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

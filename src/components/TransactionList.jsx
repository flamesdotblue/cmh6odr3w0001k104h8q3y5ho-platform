import { useMemo, useState } from 'react';
import { Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export default function TransactionList({ transactions, onDelete }) {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('all');

  const filtered = useMemo(() => {
    let list = transactions;
    if (tab !== 'all') list = list.filter((t) => t.type === tab);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((t) => t.title.toLowerCase().includes(q));
    }
    return list;
  }, [transactions, query, tab]);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/30"
          />
        </div>
        <div className="grid grid-cols-3 gap-1 text-xs">
          <button onClick={() => setTab('all')} className={`px-3 py-2 rounded-lg border ${tab === 'all' ? 'bg-white text-black border-white' : 'bg-black/40 border-white/10 text-white/80'}`}>All</button>
          <button onClick={() => setTab('income')} className={`px-3 py-2 rounded-lg border ${tab === 'income' ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30' : 'bg-black/40 border-white/10 text-white/80'}`}>In</button>
          <button onClick={() => setTab('expense')} className={`px-3 py-2 rounded-lg border ${tab === 'expense' ? 'bg-rose-500/20 text-rose-200 border-rose-400/30' : 'bg-black/40 border-white/10 text-white/80'}`}>Out</button>
        </div>
      </div>

      <ul className="mt-4 divide-y divide-white/10">
        {filtered.length === 0 && (
          <li className="py-8 text-center text-sm text-white/60">No transactions</li>
        )}
        {filtered.map((t) => (
          <li key={t.id} className="py-3 flex items-center gap-3">
            <div className={`rounded-xl p-2 border ${t.type === 'income' ? 'bg-emerald-500/10 border-emerald-400/20' : 'bg-rose-500/10 border-rose-400/20'}`}>
              {t.type === 'income' ? (
                <ArrowUpCircle className="w-5 h-5 text-emerald-300" />
              ) : (
                <ArrowDownCircle className="w-5 h-5 text-rose-300" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{t.title}</p>
              <p className="text-xs text-white/60">{formatDate(t.date)}</p>
            </div>
            <div className="text-right mr-2">
              <p className={`text-sm font-semibold ${t.type === 'income' ? 'text-emerald-300' : 'text-rose-300'}`}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
              </p>
            </div>
            <button
              aria-label="Delete"
              onClick={() => onDelete(t.id)}
              className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-black/40 active:scale-95"
            >
              <Trash2 className="w-4 h-4 text-white/80" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function formatCurrency(n) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n || 0);
}

function formatDate(d) {
  if (!d) return '';
  try {
    const date = new Date(d);
    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  } catch {
    return d;
  }
}

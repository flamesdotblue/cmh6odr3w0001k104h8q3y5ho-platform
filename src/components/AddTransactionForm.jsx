import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

export default function AddTransactionForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const amt = Number(amount);
    if (!title.trim()) return setError('Please enter a title');
    if (!amount || Number.isNaN(amt) || amt <= 0) return setError('Enter a valid amount');
    onAdd({ title: title.trim(), amount: amt, type, date });
    setTitle('');
    setAmount('');
    setType('expense');
    setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
      {error && (
        <div className="text-xs text-rose-400">{error}</div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="block text-xs text-white/60 mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Coffee, Salary, Rent..."
            className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/30"
          />
        </div>
        <div>
          <label className="block text-xs text-white/60 mb-1">Amount</label>
          <input
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/30"
          />
        </div>
        <div>
          <label className="block text-xs text-white/60 mb-1">Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`rounded-xl px-3 py-2 text-sm border ${type === 'expense' ? 'bg-rose-500/20 border-rose-400/30 text-rose-200' : 'bg-black/40 border-white/10 text-white/80'}`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`rounded-xl px-3 py-2 text-sm border ${type === 'income' ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-200' : 'bg-black/40 border-white/10 text-white/80'}`}
            >
              Income
            </button>
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-xs text-white/60 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/30"
          />
        </div>
      </div>
      <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-4 py-3 text-sm font-medium active:scale-[0.99]">
        <PlusCircle className="w-4 h-4" />
        Add Transaction
      </button>
    </form>
  );
}

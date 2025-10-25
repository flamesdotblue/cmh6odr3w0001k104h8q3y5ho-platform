import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

function Stat({ label, value, icon: Icon, accent = 'emerald' }) {
  const color = accent === 'emerald' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : accent === 'rose' ? 'text-rose-400 bg-rose-400/10 border-rose-400/20' : 'text-white bg-white/5 border-white/10';
  return (
    <div className={`flex items-center justify-between rounded-2xl border ${color.split(' ').slice(-1)} p-4 bg-white/5`}>
      <div className="flex items-center gap-3">
        <div className={`inline-flex items-center justify-center rounded-xl border ${color} w-10 h-10`}>
          <Icon className={`w-5 h-5 ${color.split(' ')[0]}`} />
        </div>
        <div>
          <p className="text-xs text-white/60">{label}</p>
          <p className="text-lg font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function SummaryCards({ totals }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-4">
        <p className="text-xs text-white/60">Balance</p>
        <p className="mt-1 text-3xl font-semibold">{formatCurrency(totals.balance)}</p>
      </div>
      <Stat label="Income" value={formatCurrency(totals.income)} icon={ArrowUpCircle} accent="emerald" />
      <Stat label="Expenses" value={formatCurrency(totals.expenses)} icon={ArrowDownCircle} accent="rose" />
    </div>
  );
}

function formatCurrency(n) {
  if (Number.isNaN(n)) return '$0.00';
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);
}

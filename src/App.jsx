import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import SummaryCards from './components/SummaryCards';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const cached = localStorage.getItem('mtx:transactions');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mtx:transactions', JSON.stringify(transactions));
    } catch {}
  }, [transactions]);

  const addTransaction = (tx) => {
    setTransactions((prev) => [{ id: crypto.randomUUID(), ...tx }, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const totals = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />

      <main className="mx-auto w-full max-w-md px-4 -mt-10 pb-24">
        <SummaryCards totals={totals} />

        <div className="mt-6">
          <AddTransactionForm onAdd={addTransaction} />
        </div>

        <div className="mt-6">
          <TransactionList transactions={transactions} onDelete={deleteTransaction} />
        </div>
      </main>
    </div>
  );
}

export default App;

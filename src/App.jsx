import { useEffect, useMemo, useState } from 'react';
import SplashScreen from './components/SplashScreen';
import MobileNav from './components/MobileNav';
import HomeScreen from './components/HomeScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [transactions, setTransactions] = useState(() => {
    try {
      const cached = localStorage.getItem('mtx:transactions');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1400);
    return () => clearTimeout(t);
  }, []);

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

  const handleAddPress = () => {
    const el = document.getElementById('add-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.querySelector('input,button,select,textarea')?.focus?.();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {showSplash && <SplashScreen />}
      <HomeScreen
        totals={totals}
        transactions={transactions}
        onAdd={addTransaction}
        onDelete={deleteTransaction}
      />
      <MobileNav onAddPress={handleAddPress} />
    </div>
  );
}

export default App;

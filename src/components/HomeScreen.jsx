import Hero from './Hero';
import SummaryCards from './SummaryCards';
import AddTransactionForm from './AddTransactionForm';
import TransactionList from './TransactionList';

export default function HomeScreen({ totals, transactions, onAdd, onDelete }) {
  return (
    <>
      <Hero />
      <main className="mx-auto w-full max-w-md px-4 -mt-10 pb-28">
        <SummaryCards totals={totals} />
        <div className="mt-6">
          <AddTransactionForm onAdd={onAdd} />
        </div>
        <div className="mt-6">
          <TransactionList transactions={transactions} onDelete={onDelete} />
        </div>
      </main>
    </>
  );
}

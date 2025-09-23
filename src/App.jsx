import { useEffect, useState } from 'react';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import { priceFormatter } from './helpers';

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  function addTransaction(newTx) {
    setTransactions(prev => [...prev, newTx]);
  }

  function handleDeleteTransaction(id) {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  }

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const income = transactions.filter(
    transaction => transaction.type === 'income'
  );
  const expense = transactions.filter(
    transaction => transaction.type === 'expense'
  );

  const incomeTotal = income.reduce((acc, curr) => acc + curr.amount, 0);
  const expenseTotal = expense.reduce((acc, curr) => acc + curr.amount, 0);
  const balance = incomeTotal - expenseTotal;

  return (
    <main className='container'>
      <h1>Expense Tracker</h1>
      <h2>Balance: {priceFormatter(balance)}</h2>
      <TransactionForm onAdd={addTransaction} />
      <div className='transactions-cards'>
        <TransactionList
          title='Expense'
          items={expense}
          onDelete={handleDeleteTransaction}
        />
        <TransactionList
          title='Income'
          items={income}
          onDelete={handleDeleteTransaction}
        />
      </div>
    </main>
  );
}

export default App;

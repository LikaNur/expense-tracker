import { useState } from 'react';

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState('income');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!description || !amount) return;

    onAdd({
      id: crypto.randomUUID(),
      type,
      description,
      amount: Number(amount),
      date: new Date().toISOString(),
    });

    setDescription('');
    setAmount('');
    setType('income');
  }

  const isInvalid = !description.trim() || !amount || Number(amount) <= 0;

  return (
    <>
      <form aria-label='Submit form' onSubmit={handleSubmit}>
        <section className='operation'>
          <div className='operation-fields'>
            <label htmlFor='type-select'>Type</label>
            <select
              id='type-select'
              name='type'
              value={type}
              required
              onChange={e => setType(e.target.value)}
            >
              <option value='income'>Income</option>
              <option value='expense'>Expense</option>
            </select>
          </div>
          <div className='operation-fields'>
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              id='description'
              name='description'
              value={description}
              placeholder='Add description'
              required
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className='operation-fields'>
            <label htmlFor='amount'>Amount</label>
            <input
              type='number'
              id='amount'
              name='amount'
              value={amount}
              placeholder='Add amount'
              required
              onChange={e => setAmount(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className='add-btn'
            aria-label='Add'
            disabled={isInvalid}
          >
            Add
          </button>
        </section>
      </form>
    </>
  );
}

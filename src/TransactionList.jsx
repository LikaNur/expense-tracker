import { dateFormatter, priceFormatter } from './helpers';

export default function TransactionList({ title, items, onDelete }) {
  const total = items.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <section className='card-container'>
      <h2>{title}</h2>
      <div className='card'>
        {items.length === 0 ? (
          <p className='default-message'>No transactions yet...</p>
        ) : (
          <div className='info'>
            {items.map(item => {
              return (
                <>
                  <p>{item.description}</p>
                  <p>{priceFormatter(item.amount)}</p>
                  <p>{dateFormatter(item.date)}</p>
                  <button
                    onClick={() => onDelete(item.id)}
                    className='delete-btn'
                    aria-label='Delete'
                  >
                    Delete
                  </button>
                </>
              );
            })}
          </div>
        )}
        <hr />
        <p className='total'>Total: {priceFormatter(total)}</p>
      </div>
    </section>
  );
}

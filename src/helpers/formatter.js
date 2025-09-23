export function priceFormatter(price) {
  return new Intl.NumberFormat('us-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function dateFormatter(date) {
  return new Date(date).toLocaleDateString('us-US', {
    day: '2-digit',
    month: 'numeric',
    year: 'numeric',
  });
}

const formatter = Intl.NumberFormat('en-MY', {
  style: 'currency',
  currency: 'MYR',
});

export default function formatMoney(cents) {
  return formatter.format(cents / 100);
}

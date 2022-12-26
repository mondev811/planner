export const formatAmount = amount => {
  return Number(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

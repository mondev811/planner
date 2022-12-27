export const formatAmount = amount => {
  return Number(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const generateId = () => {
  const random = Math.random().toString(36).substring(2, 11);
  const date = Date.now().toString(36);
  return random + date;
};

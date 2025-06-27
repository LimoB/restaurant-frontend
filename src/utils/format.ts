export const formatCurrency = (val: string | number): string => {
  const num = Number(val);
  return isNaN(num) ? "0.00" : num.toFixed(2);
};

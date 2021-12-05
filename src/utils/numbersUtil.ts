export const formatNumbers = (decimalNumber: number) => {
  const formatter = new Intl.NumberFormat([], {
    minimumFractionDigits: 5,
    maximumFractionDigits: 5,
  });

  return formatter.format(decimalNumber);
};

export const round = (decimalNumber: number, precision: number) => {
  return (Math.round(decimalNumber * Math.pow(10, precision)) / Math.pow(10, precision)).toFixed(precision);
};

export const formatNumbers = (decimalNumber: number) => {
  const formatter = new Intl.NumberFormat([], {
    minimumFractionDigits: 5,      
    maximumFractionDigits: 5,
  });
 
  return formatter.format(decimalNumber);
};

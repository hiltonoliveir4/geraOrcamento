export function formatToEuro(value: number | string): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) {
    return ''; // ou lançar erro, conforme seu caso
  }

  const formatted = num.toLocaleString('pt-PT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const euroFormatted = formatted.replace(/\./g, ' ') + ' €';

  return euroFormatted;
}
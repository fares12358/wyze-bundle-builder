/**
 * Formats a number as a USD currency string.
 * @param {number} amount
 * @returns {string} e.g. "$27.98"
 */
export function formatCurrency(amount) {
  if (amount === null || amount === undefined) return '';
  return `$${Number(amount).toFixed(2)}`;
}

/**
 * Formats a monthly price with /mo suffix.
 * @param {number} amount
 * @returns {string} e.g. "$9.99/mo"
 */
export function formatMonthlyPrice(amount) {
  return `${formatCurrency(amount)}/mo`;
}

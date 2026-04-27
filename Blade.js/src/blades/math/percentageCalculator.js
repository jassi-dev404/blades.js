/**
 * Calculates what percentage one value is of a total.
 *
 * @param {number} value - The part value.
 * @param {number} total - The total (whole) value.
 * @returns {number} The percentage (value / total * 100), rounded to 2 decimal places.
 * @throws {Error} If total is zero or if inputs are not numbers.
 *
 * @example
 * calculatePercentage(25, 100);
 * calculatePercentage(3, 7);
 * calculatePercentage(0, 50);
 */
export default function calculatePercentage(value, total) {
  if (typeof value !== 'number' || typeof total !== 'number') {
    throw new Error('Both value and total must be numbers.');
  }
  if (total === 0) {
    throw new Error('Total cannot be zero.');
  }

  const percentage = (value / total) * 100;
  return Math.round(percentage * 100) / 100;
}

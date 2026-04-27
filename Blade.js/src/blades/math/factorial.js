/**
 * Calculates the factorial of a non-negative integer.
 *
 * For n <= 20, returns a regular number.
 * For n > 20, returns a BigInt to avoid precision loss.
 *
 * @param {number} n - The non-negative integer to compute the factorial of.
 * @returns {number|BigInt} n! as a number (for n <= 20) or BigInt (for n > 20).
 * @throws {Error} If n is negative, not an integer, or not a number.
 *
 * @example
 * factorial(0);
 * factorial(5);
 * factorial(10);
 * factorial(25);
 */
export default function factorial(n) {
  if (typeof n !== 'number') {
    throw new Error('Input must be a number.');
  }
  if (!Number.isInteger(n)) {
    throw new Error('Input must be an integer.');
  }
  if (n < 0) {
    throw new Error('Factorial is not defined for negative numbers.');
  }

  if (n > 20) {
    let result = BigInt(1);
    for (let i = 2; i <= n; i++) {
      result *= BigInt(i);
    }
    return result;
  }

  if (n === 0 || n === 1) return 1;

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

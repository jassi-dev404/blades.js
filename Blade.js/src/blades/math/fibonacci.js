/**
 * Generates the first n numbers in the Fibonacci sequence.
 *
 * @param {number} n - The number of Fibonacci numbers to generate.
 * @returns {BigInt[]} An array of the first n Fibonacci numbers as BigInt values.
 *   Returns an empty array if n is 0, [0n] if n is 1.
 * @throws {Error} If n is not a positive integer.
 *
 * @example
 * fibonacci(5);
 *
 *
 * @example
 * fibonacci(10);
 *
 */
export default function fibonacci(n) {
  if (typeof n !== 'number') {
    throw new Error('Input must be a number.');
  }
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('Input must be a non-negative integer.');
  }

  if (n === 0) return [];
  if (n === 1) return [BigInt(0)];

  const sequence = [BigInt(0), BigInt(1)];
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }

  return sequence;
}

/**
 * Calculates the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two integers.
 *
 * Uses the Euclidean algorithm for GCD and the identity: LCM(a, b) = |a * b| / GCD(a, b).
 *
 * @param {number} a - The first integer.
 * @param {number} b - The second integer.
 * @returns {{ gcd: number, lcm: number }} Object with:
 *   - gcd: The greatest common divisor of a and b.
 *   - lcm: The least common multiple of a and b.
 * @throws {Error} If either input is not an integer.
 *
 * @example
 * gcdLcm(12, 18);
 *
 *
 * @example
 * gcdLcm(7, 13);
 *
 */
export default function gcdLcm(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both inputs must be numbers.');
  }
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    throw new Error('Both inputs must be integers.');
  }

  const absA = Math.abs(a);
  const absB = Math.abs(b);

  function euclideanGCD(x, y) {
    while (y !== 0) {
      const temp = y;
      y = x % y;
      x = temp;
    }
    return x;
  }

  const gcd = euclideanGCD(absA, absB);

  const lcm = absA === 0 || absB === 0 ? 0 : (absA / gcd) * absB;

  return { gcd, lcm };
}

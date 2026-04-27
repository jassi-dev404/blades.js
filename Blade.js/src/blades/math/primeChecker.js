/**
 * Checks if a number is prime, finds the nearest prime, and returns its factors.
 *
 * @param {number} n - The number to analyze.
 * @returns {{ isPrime: boolean, nearestPrime: number, factors: number[] }} Object with:
 *   - isPrime: Whether the number is prime.
 *   - nearestPrime: The nearest prime number (the number itself if prime, otherwise the closest prime).
 *   - factors: Array of all positive divisors of the number.
 * @throws {Error} If n is not a positive integer.
 *
 * @example
 * checkPrime(7);
 *
 *
 * @example
 * checkPrime(10);
 *
 */
export default function checkPrime(n) {
  if (typeof n !== 'number') {
    throw new Error('Input must be a number.');
  }
  if (!Number.isInteger(n) || n < 1) {
    throw new Error('Input must be a positive integer.');
  }

  const isPrime = _isPrimeNumber(n);
  const nearestPrime = _findNearestPrime(n);
  const factors = _findFactors(n);

  return { isPrime, nearestPrime, factors };
}

/**
 * Check if a number is prime.
 * @param {number} num
 * @returns {boolean}
 */
function _isPrimeNumber(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

/**
 * Find the nearest prime number to n.
 * If equidistant, returns the smaller prime.
 * @param {number} num
 * @returns {number}
 */
function _findNearestPrime(num) {
  if (_isPrimeNumber(num)) return num;

  let lower = num - 1;
  let upper = num + 1;

  while (lower >= 2 || upper > 0) {
    if (lower >= 2 && _isPrimeNumber(lower)) {
      if (upper > num && _isPrimeNumber(upper) && (upper - num) < (num - lower)) {
        return upper;
      }
      return lower;
    }
    if (_isPrimeNumber(upper)) {
      return upper;
    }
    lower--;
    upper++;
  }

  return 2;
}

/**
 * Find all positive factors of a number.
 * @param {number} num
 * @returns {number[]}
 */
function _findFactors(num) {
  const factors = [];
  for (let i = 1; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      factors.push(i);
      if (i !== num / i) {
        factors.push(num / i);
      }
    }
  }
  return factors.sort((a, b) => a - b);
}

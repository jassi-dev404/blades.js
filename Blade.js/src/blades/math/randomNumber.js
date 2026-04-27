/**
 * Generates random numbers with configurable options.
 *
 * @param {object} [options] - Configuration options.
 * @param {number} [options.min=0] - Minimum value (inclusive).
 * @param {number} [options.max=100] - Maximum value (inclusive for integers, exclusive for floats).
 * @param {number} [options.count=1] - How many random numbers to generate.
 * @param {boolean} [options.integer=true] - If true, returns integers; if false, returns floating-point.
 * @param {number|null} [options.seed=null] - Optional seed for reproducible results. If null, uses Math.random().
 * @returns {number|number[]} A single number if count is 1, otherwise an array of numbers.
 * @throws {Error} If min >= max or count is not a positive integer.
 *
 * @example
 * randomNumber();
 * randomNumber({ min: 1, max: 10, count: 3, integer: true });
 * randomNumber({ min: 0, max: 1, integer: false });
 */
export default function randomNumber(options = {}) {
  const { min = 0, max = 100, count = 1, integer = true, seed = null } = options;

  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('min and max must be numbers.');
  }
  if (min >= max) {
    throw new Error('min must be less than max.');
  }
  if (!Number.isInteger(count) || count < 1) {
    throw new Error('count must be a positive integer.');
  }

  /** Simple seeded PRNG (mulberry32). */
  function seededRandom(s) {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /** Generate a single random value. */
  function generate() {
    const rand = seed !== null ? seededRandom(seed) : Math.random();
    if (integer) {
      return Math.floor(rand * (max - min + 1)) + min;
    }
    return rand * (max - min) + min;
  }

  if (count === 1) {
    return generate();
  }

  const results = [];
  for (let i = 0; i < count; i++) {
    if (seed !== null) {
      results.push(seededRandom(seed + i));
      const val = results[i] * (max - min) + min;
      results[i] = integer ? Math.floor(val) : val;
    } else {
      results.push(generate());
    }
  }

  return results;
}

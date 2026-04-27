/**
 * Creates a simple hash or checksum of a text string using one of several algorithms.
 *
 * Implements three lightweight hash algorithms:
 * - djb2: A widely-used string hash function by Daniel J. Bernstein.
 * - sdbm: A hash function from the sdbm database library.
 * - xor: A simple XOR-based checksum.
 *
 * These are non-cryptographic hashes suitable for display, checksums, and simple lookups.
 *
 * @param {string} text - The input text to hash.
 * @param {'djb2'|'sdbm'|'xor'} [algorithm='djb2'] - The hashing algorithm to use.
 * @returns {string} The hash as a hexadecimal string.
 * @throws {Error} If the algorithm is not supported or text is not a string.
 *
 * @example
 * simpleHash('Hello');
 * simpleHash('Hello', 'sdbm');
 * simpleHash('Hello', 'xor');
 */
export default function simpleHash(text, algorithm = 'djb2') {
  if (typeof text !== 'string') {
    throw new Error('Input must be a string.');
  }

  const algo = algorithm.toLowerCase();

  switch (algo) {
    case 'djb2':
      return djb2(text).toString(16);
    case 'sdbm':
      return sdbm(text).toString(16);
    case 'xor':
      return xorChecksum(text).toString(16);
    default:
      throw new Error(`Unsupported algorithm: '${algorithm}'. Use 'djb2', 'sdbm', or 'xor'.`);
  }
}

/**
 * DJB2 hash function.
 * @param {string} str
 * @returns {number}
 */
function djb2(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * SDBM hash function.
 * @param {string} str
 * @returns {number}
 */
function sdbm(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * Simple XOR checksum.
 * @param {string} str
 * @returns {number}
 */
function xorChecksum(str) {
  let checksum = 0;
  for (let i = 0; i < str.length; i++) {
    checksum ^= str.charCodeAt(i);
  }
  return checksum;
}

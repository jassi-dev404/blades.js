/**
 * Generates multiple checksums for data verification.
 *
 * Produces three different checksums from the input text:
 * - crc32-like: A simplified CRC-32 implementation (note: this is a simplified version,
 *   not the full IEEE 802.3 CRC-32 polynomial).
 * - luhn: The Luhn algorithm check digit (commonly used for credit card validation).
 * - simple: A simple additive checksum modulo 65536.
 *
 * @param {string} text - The input text to generate checksums for.
 * @returns {{ crc32: string, luhn: string, simple: string }} Object with:
 *   - crc32: CRC-32-like hash as a hex string.
 *   - luhn: Luhn check digit as a string.
 *   - simple: Simple additive checksum as a decimal string.
 * @throws {Error} If text is not a string.
 *
 * @example
 * checksumGenerator('Hello World');
 *
 */
export default function checksumGenerator(text) {
  if (typeof text !== 'string') {
    throw new Error('Input must be a string.');
  }

  return {
    crc32: crc32Like(text),
    luhn: luhnCheckDigit(text),
    simple: simpleChecksum(text),
  };
}

/**
 * Simplified CRC-32-like hash.
 * Uses a polynomial similar to CRC-32 but simplified for display purposes.
 * @param {string} str
 * @returns {string} Hex string.
 */
function crc32Like(str) {
  let crc = 0xffffffff;
  const table = [];

  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c;
  }

  for (let i = 0; i < str.length; i++) {
    crc = table[(crc ^ str.charCodeAt(i)) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff >>> 0).toString(16).padStart(8, '0');
}

/**
 * Luhn algorithm check digit.
 * Computes the check digit that would make the numeric representation of the text
 * pass the Luhn validation.
 * @param {string} str
 * @returns {string} Single digit check digit.
 */
function luhnCheckDigit(str) {
  const digits = str
    .split('')
    .map((ch) => ch.charCodeAt(0))
    .flatMap((code) => code.toString().split(''))
    .map(Number);

  let sum = 0;
  let alternate = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let n = digits[i];
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit.toString();
}

/**
 * Simple additive checksum modulo 65536.
 * @param {string} str
 * @returns {string} Decimal string.
 */
function simpleChecksum(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum = (sum + str.charCodeAt(i)) % 65536;
  }
  return sum.toString();
}

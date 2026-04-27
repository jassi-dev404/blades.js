/**
 * Converts a byte count into a human-readable file size string.
 *
 * @param {number} bytes - The number of bytes to format.
 * @returns {string} A human-readable file size (e.g., "1.5 MB", "256 bytes").
 * @throws {Error} If bytes is negative or not a number.
 *
 * @example
 * formatFileSize(0);
 * formatFileSize(1024);
 * formatFileSize(1572864);
 * formatFileSize(1073741824);
 */
export default function formatFileSize(bytes) {
  if (typeof bytes !== 'number') {
    throw new Error('Input must be a number.');
  }
  if (bytes < 0) {
    throw new Error('Bytes cannot be negative.');
  }
  if (bytes === 0) return '0 bytes';

  const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const unitIndex = Math.min(i, units.length - 1);
  const value = bytes / Math.pow(k, unitIndex);

  const decimals = unitIndex > 0 ? 1 : 0;
  return `${value.toFixed(decimals)} ${units[unitIndex]}`;
}

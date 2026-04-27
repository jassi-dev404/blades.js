/**
 * Truncates text with ellipsis
 * @param {string} text - Input text
 * @param {number} maxLength - Maximum length
 * @param {string} ellipsis - Ellipsis string (default '...')
 * @returns {string} Truncated string
 */
export default function truncate(text, maxLength = 100, ellipsis = '') {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - ellipsis.length).trim() + ellipsis;
}

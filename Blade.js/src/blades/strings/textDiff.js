/**
 * Compares two texts and finds only the differences
 * @param {string} text1 - First text
 * @param {string} text2 - Second text
 * @returns {{added: string[], removed: string[]}}
 */
export default function textDiff(text1, text2) {
  const words1 = text1.split(/\s+/);
  const words2 = text2.split(/\s+/);
  const set1 = new Set(words1);
  const set2 = new Set(words2);
  const added = [...set2].filter(w => !set1.has(w));
  const removed = [...set1].filter(w => !set2.has(w));
  return { added, removed };
}

/**
 * Converts a digital storage size from one unit to another.
 *
 * @param {number} value - The size value to convert.
 * @param {string} fromUnit - The source unit (bytes, kilobytes, megabytes, gigabytes, terabytes, petabytes, bits, kilobits, megabits).
 * @param {string} toUnit - The target unit (bytes, kilobytes, megabytes, gigabytes, terabytes, petabytes, bits, kilobits, megabits).
 * @returns {number} The converted size value rounded to 6 decimal places.
 * @throws {Error} If an unsupported data size unit is provided.
 */
export default function dataSizeConverter(value, fromUnit, toUnit) {
  const supportedUnits = [
    'bytes', 'kilobytes', 'megabytes', 'gigabytes', 'terabytes',
    'petabytes', 'bits', 'kilobits', 'megabits',
  ];

  const fromLower = fromUnit.toLowerCase();
  const toLower = toUnit.toLowerCase();

  if (!supportedUnits.includes(fromLower)) {
    throw new Error(`Unsupported data size unit: ${fromUnit}. Supported: ${supportedUnits.join(', ')}`);
  }
  if (!supportedUnits.includes(toLower)) {
    throw new Error(`Unsupported data size unit: ${toUnit}. Supported: ${supportedUnits.join(', ')}`);
  }

  if (fromLower === toLower) return value;

  const toBytes = {
    'bytes': 1,
    'kilobytes': 1000,
    'megabytes': 1e6,
    'gigabytes': 1e9,
    'terabytes': 1e12,
    'petabytes': 1e15,
    'bits': 0.125,
    'kilobits': 125,
    'megabits': 125000,
  };

  const valueInBytes = value * toBytes[fromLower];
  const result = valueInBytes / toBytes[toLower];

  return Math.round(result * 1e6) / 1e6;
}

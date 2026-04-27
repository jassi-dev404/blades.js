/**
 * Converts a speed value from one unit to another.
 *
 * @param {number} value - The speed value to convert.
 * @param {string} fromUnit - The source unit (km/h, mph, m/s, knots, ft/s).
 * @param {string} toUnit - The target unit (km/h, mph, m/s, knots, ft/s).
 * @returns {number} The converted speed value rounded to 4 decimal places.
 * @throws {Error} If an unsupported speed unit is provided.
 */
export default function speedConverter(value, fromUnit, toUnit) {
  const supportedUnits = ['km/h', 'mph', 'm/s', 'knots', 'ft/s'];

  const fromLower = fromUnit.toLowerCase();
  const toLower = toUnit.toLowerCase();

  if (!supportedUnits.includes(fromLower)) {
    throw new Error(`Unsupported speed unit: ${fromUnit}. Supported: ${supportedUnits.join(', ')}`);
  }
  if (!supportedUnits.includes(toLower)) {
    throw new Error(`Unsupported speed unit: ${toUnit}. Supported: ${supportedUnits.join(', ')}`);
  }

  if (fromLower === toLower) return value;

  const toMetersPerSecond = {
    'km/h': 1 / 3.6,
    'mph': 0.44704,
    'm/s': 1,
    'knots': 0.514444,
    'ft/s': 0.3048,
  };

  const valueInMs = value * toMetersPerSecond[fromLower];
  const result = valueInMs / toMetersPerSecond[toLower];

  return Math.round(result * 1e4) / 1e4;
}

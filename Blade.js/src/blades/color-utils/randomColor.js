/**
 * Generates a random color with configurable format and hue family.
 *
 * @param {Object} [options] - Configuration options.
 * @param {string} [options.format='hex'] - Output format: 'hex', 'rgb', or 'hsl'.
 * @param {string} [options.hue='random'] - Hue family:
 *   - 'random': any hue (0-360).
 *   - 'warm': reds, oranges, yellows (hue 0-60).
 *   - 'cool': greens, blues, purples (hue 180-300).
 *   - 'pastel': any hue with reduced saturation (30-60%) and high lightness (75-85%).
 * @returns {string} The generated color string in the requested format.
 *
 * @example
 * randomColor();
 * randomColor({ format: 'rgb' });
 * randomColor({ hue: 'warm' });
 * randomColor({ hue: 'pastel' });
 */
export default function randomColor(options = {}) {
  const { format = 'hex', hue = 'random' } = options;

  /**
   * Generate a random integer in [min, max].
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Determine hue range based on family.
   * @param {string} hueFamily
   * @returns {{ min: number, max: number }}
   */
  function getHueRange(hueFamily) {
    switch (hueFamily) {
      case 'warm': return { min: 0, max: 60 };
      case 'cool': return { min: 180, max: 300 };
      case 'pastel': return { min: 0, max: 360 };
      default: return { min: 0, max: 360 };
    }
  }

  const hueRange = getHueRange(hue);
  const h = rand(hueRange.min, hueRange.max);

  let s, l;
  if (hue === 'pastel') {
    s = rand(30, 60);
    l = rand(75, 85);
  } else {
    s = rand(50, 100);
    l = rand(35, 65);
  }

  function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }

  function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  const rgb = hslToRgb(h, s, l);

  switch (format) {
    case 'hex':
      return `${componentToHex(rgb.r)}${componentToHex(rgb.g)}${componentToHex(rgb.b)}`.toUpperCase();
    case 'rgb':
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    case 'hsl':
      return `hsl(${h}, ${s}%, ${l}%)`;
    default:
      return `${componentToHex(rgb.r)}${componentToHex(rgb.g)}${componentToHex(rgb.b)}`.toUpperCase();
  }
}

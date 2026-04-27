/**
 * Converts a color between different color formats (hex, rgb, hsl).
 *
 * Accepts a hex string, an RGB object {r, g, b}, or an HSL object {h, s, l},
 * and returns the color in the requested output format.
 *
 * @param {string|object} color - The color to convert:
 *   - Hex string: e.g. 'FF5733' or '#FF5733'
 *   - RGB object: { r: 255, g: 87, b: 51 }
 *   - HSL object: { h: 14, s: 100, l: 60 }
 * @param {string} toFormat - Target format: 'hex', 'rgb', or 'hsl'.
 * @returns {string|object} The converted color:
 *   - 'hex': uppercase hex string without '#' (e.g. 'FF5733')
 *   - 'rgb': string 'rgb(r, g, b)'
 *   - 'hsl': object { h, s, l } with s and l as percentages
 * @throws {Error} If the input color format is unrecognized or values are out of range.
 *
 * @example
 * colorConverter('FF5733', 'rgb');
 * colorConverter({ r: 255, g: 87, b: 51 }, 'hex');
 * colorConverter({ h: 14, s: 100, l: 60 }, 'hex');
 */
export default function colorConverter(color, toFormat) {
  let r, g, b;

  if (typeof color === 'string') {
    const hex = color.replace('#', '');
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
      throw new Error("Invalid hex color. Expected 6 hex digits (e.g. 'FF5733').");
    }
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else if (color && typeof color === 'object') {
    if ('r' in color && 'g' in color && 'b' in color) {
      r = color.r;
      g = color.g;
      b = color.b;
    } else if ('h' in color && 's' in color && 'l' in color) {
      ({ r, g, b } = hslToRgb(color.h, color.s, color.l));
    } else {
      throw new Error("Color object must be either { r, g, b } or { h, s, l }.");
    }
  } else {
    throw new Error("Color must be a hex string, an RGB object, or an HSL object.");
  }

  r = Math.max(0, Math.min(255, Math.round(r)));
  g = Math.max(0, Math.min(255, Math.round(g)));
  b = Math.max(0, Math.min(255, Math.round(b)));

  switch (toFormat) {
    case 'hex':
      return toHex(r, g, b);
    case 'rgb':
      return `rgb(${r}, ${g}, ${b})`;
    case 'hsl':
      return rgbToHsl(r, g, b);
    default:
      throw new Error("toFormat must be 'hex', 'rgb', or 'hsl'.");
  }
}

/** Convert component (0-255) to 2-digit hex. */
function toHex(r, g, b) {
  const comp = (c) => c.toString(16).padStart(2, '0').toUpperCase();
  return `${comp(r)}${comp(g)}${comp(b)}`;
}

/** Convert RGB to HSL object. */
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/** Convert HSL to RGB. */
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

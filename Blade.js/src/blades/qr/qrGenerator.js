/**
 * Generates a visual QR-like pattern as an SVG string from text input.
 *
 * This creates a grid-based visual pattern that resembles a QR code. Each cell's
 * color is determined by the character codes of the input text. For production
 * QR code generation, integrate a dedicated library such as `qrcode` or `qr-code-styling`.
 *
 * @param {string} text - The text to encode into a visual pattern.
 * @param {number} [size=200] - The width and height of the SVG in pixels.
 * @returns {string} An SVG string containing a grid of black and white rectangles.
 *
 * @example
 * const svg = qrGenerator("Hello World", 300);
 *
 */
export default function qrGenerator(text, size = 200) {
  if (!text || typeof text !== 'string') {
    text = ' ';
  }

  const cellCount = Math.max(10, Math.min(40, text.length * 2 + 5));
  const cellSize = size / cellCount;

  const filled = new Set();
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    for (let j = 0; j < cellCount; j++) {
      const hash = (code * (i + 1) * (j + 1) + code * 31 + j * 17) % (cellCount * cellCount);
      filled.add(hash);
    }
  }

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">`;
  svg += `<rect width="${size}" height="${size}" fill="white"/>`;

  const finderSize = cellSize * 3;
  const drawFinder = (x, y) => {
    svg += `<rect x="${x}" y="${y}" width="${finderSize}" height="${finderSize}" fill="black"/>`;
    svg += `<rect x="${x + cellSize * 0.5}" y="${y + cellSize * 0.5}" width="${cellSize * 2}" height="${cellSize * 2}" fill="white"/>`;
    svg += `<rect x="${x + cellSize}" y="${y + cellSize}" width="${cellSize}" height="${cellSize}" fill="black"/>`;
  };

  drawFinder(0, 0);
  drawFinder((cellCount - 3) * cellSize, 0);
  drawFinder(0, (cellCount - 3) * cellSize);

  for (let row = 0; row < cellCount; row++) {
    for (let col = 0; col < cellCount; col++) {
      const index = row * cellCount + col;
      if (row < 4 && col < 4) continue;
      if (row < 4 && col > cellCount - 5) continue;
      if (row > cellCount - 5 && col < 4) continue;

      if (filled.has(index)) {
        svg += `<rect x="${(col * cellSize).toFixed(1)}" y="${(row * cellSize).toFixed(1)}" width="${cellSize.toFixed(1)}" height="${cellSize.toFixed(1)}" fill="black"/>`;
      }
    }
  }

  svg += '</svg>';
  return svg;
}

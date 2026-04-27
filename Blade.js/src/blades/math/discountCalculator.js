/**
 * Calculates the final price after applying a discount.
 *
 * @param {number} originalPrice - The original price before discount.
 * @param {number} discountPercent - The discount percentage (0-100).
 * @returns {{ finalPrice: number, savings: number, discountPercent: number }} Object with:
 *   - finalPrice: The price after discount, rounded to 2 decimal places.
 *   - savings: The amount saved, rounded to 2 decimal places.
 *   - discountPercent: The discount percentage applied.
 * @throws {Error} If price is negative or discount is outside 0-100 range.
 *
 * @example
 * calculateDiscount(100, 20);
 *
 *
 * @example
 * calculateDiscount(59.99, 15);
 *
 */
export default function calculateDiscount(originalPrice, discountPercent) {
  if (typeof originalPrice !== 'number' || typeof discountPercent !== 'number') {
    throw new Error('Both originalPrice and discountPercent must be numbers.');
  }
  if (originalPrice < 0) {
    throw new Error('Original price cannot be negative.');
  }
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Discount percentage must be between 0 and 100.');
  }

  const savings = originalPrice * (discountPercent / 100);
  const finalPrice = originalPrice - savings;

  return {
    finalPrice: Math.round(finalPrice * 100) / 100,
    savings: Math.round(savings * 100) / 100,
    discountPercent,
  };
}

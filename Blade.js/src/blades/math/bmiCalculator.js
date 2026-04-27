/**
 * Calculates the Body Mass Index (BMI) and its corresponding category.
 *
 * BMI is calculated as weight in kilograms divided by height in meters squared.
 * Categories follow WHO classification:
 *   - Underweight: BMI < 18.5
 *   - Normal: 18.5 <= BMI < 25
 *   - Overweight: 25 <= BMI < 30
 *   - Obese Class I: 30 <= BMI < 35
 *   - Obese Class II: 35 <= BMI < 40
 *   - Obese Class III: BMI >= 40
 *
 * @param {number} weightKg - Weight in kilograms.
 * @param {number} heightCm - Height in centimeters.
 * @returns {{ bmi: number, category: string }} Object with:
 *   - bmi: The calculated BMI rounded to 1 decimal place.
 *   - category: The WHO classification string.
 * @throws {Error} If weight or height is invalid (zero, negative, or NaN).
 *
 * @example
 * calculateBMI(70, 175);
 *
 *
 * @example
 * calculateBMI(95, 170);
 *
 */
export default function calculateBMI(weightKg, heightCm) {
  if (typeof weightKg !== 'number' || typeof heightCm !== 'number') {
    throw new Error('Weight and height must be numbers.');
  }
  if (weightKg <= 0) {
    throw new Error('Weight must be a positive number.');
  }
  if (heightCm <= 0) {
    throw new Error('Height must be a positive number.');
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const roundedBmi = Math.round(bmi * 10) / 10;

  let category;
  if (roundedBmi < 18.5) {
    category = 'Underweight';
  } else if (roundedBmi < 25) {
    category = 'Normal';
  } else if (roundedBmi < 30) {
    category = 'Overweight';
  } else if (roundedBmi < 35) {
    category = 'Obese Class I';
  } else if (roundedBmi < 40) {
    category = 'Obese Class II';
  } else {
    category = 'Obese Class III';
  }

  return { bmi: roundedBmi, category };
}

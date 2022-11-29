import { Fraction } from "../types";

export const fractions: Fraction[] = [];

/**
 * Validate fraction, denominator must not be 0
 * @param fraction to be validated
 */
export function validateFraction(fraction: Fraction): {result: boolean, error: Error} {
  if(fraction.denominator == 0) {
    return {
      result: false,
      error: new Error('denominator cannot be 0')
    }
  }
  return {
    result: true,
    error: null
  }
}
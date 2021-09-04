"use strict";

export const spacingTiny = '5px';
export const spacingSmall = '10px';
export const spacingMedium = '30px';
export const spacingLarge = '40px';
export const spacingXLarge = '80px';

// Utility functions
export function sortByCKJ() {
  return function(a, b) {
    const lookup = {
      "C": 0,
      "K": 1,
      "J": 2
    }
    const aVal = lookup[a.group];
    const bVal = lookup[b.group];
    if (aVal < bVal) {
      return -1;
    }
    if (aVal > bVal) {
      return 1;
    }
    return 0;
  }
}

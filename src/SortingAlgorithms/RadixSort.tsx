// For base 10: O(d*n) Time | O(n) Space
// For general base: O(d*(n+b)) Time | O(n + b) Space
// d is the max number of digits
// n is the size of the array
// b is the base of the number system

import store from "../store";

import {
  animate_color_and_array,
  animate_color_and_array_finished,
} from "../SharedFunctions";

const radix_sort = async (array: number[]) => {
  let default_colors: string[] = store.getState().colors.slice();

  if (array.length === 0) return array;
  let mxDigits = countDigits(Math.max(...array));
  let sorted = new Array(array.length).fill(0);
  for (let digit = 1; digit <= mxDigits; digit++) {
    let counts = new Array(10).fill(0);
    for (const v of array) counts[getDigit(v, digit)] += 1;
    for (let i = 1; i < counts.length; i++) counts[i] += counts[i - 1];
    for (let index = array.length - 1; index >= 0; index--) {
      let v = array[index];
      let i = getDigit(v, digit);
      counts[i] -= 1;
      sorted[counts[i]] = v;
    }
    for (let i = 0; i < array.length; i++) {
      /* animation of the bars start */
      await animate_color_and_array(
        default_colors.slice(),
        array.slice(),
        i,
        i
      );
      /* animation of the bars end */
      array[i] = sorted[i];
      /* animation of the bars start */
      await animate_color_and_array(
        default_colors.slice(),
        array.slice(),
        i,
        i
      );
      /* animation of the bars end */
    }
  }

  /* animation finished start */
  animate_color_and_array_finished(default_colors.slice(), array.slice());
  /* animation finished end */

  return array;
};

// O(1) Time | O(1) Space
const getDigit = (num: number, place: number) =>
  Math.floor(num / 10 ** (place - 1)) % 10;

// O(d) Time | O(1) Space
// d is the number of digits in number
const countDigits = (num: number) => {
  let digits = 1;
  while (Math.floor(num / 10 ** digits) !== 0) digits += 1;
  return digits;
};

export default radix_sort;

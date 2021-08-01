// All cases: O(n log n) T | O(1) S

import store from "../store";

import {
  swap,
  animate_color_and_array,
  animate_color_and_array_finished,
} from "../SharedFunctions";

let default_colors: string[];

// O(nlogn) T | O(1) S
const heap_sort = async (array: number[]) => {
  default_colors = store.getState().colors.slice();

  await buildHeap(array);

  for (let divide = array.length - 1; divide >= 1; divide--) {
    /* animation of the bars start */
    await animate_color_and_array(
      default_colors.slice(),
      array.slice(),
      0,
      divide
    );
    /* animation of the bars end */
    swap(array, 0, divide);
    /* animation of the bars start */
    await animate_color_and_array(
      default_colors.slice(),
      array.slice(),
      0,
      divide
    );
    /* animation of the bars end */

    await siftdown(array, divide, 0);
  }
  /* animation finished start */
  animate_color_and_array_finished(default_colors.slice(), array.slice());
  /* animation finished end */

  return array;
};

// O(logn) T | O(1) S
const siftdown = async (array: number[], length: number, index: number) => {
  let left = 2 * index + 1;
  let right = 2 * index + 2;
  let bggr = right >= length || array[left] >= array[right] ? left : right;
  while (left < length && array[index] < array[bggr]) {
    /* animation of the bars start */
    await animate_color_and_array(
      default_colors.slice(),
      array.slice(),
      index,
      bggr
    );
    /* animation of the bars end */
    swap(array, index, bggr);
    /* animation of the bars start */
    await animate_color_and_array(
      default_colors.slice(),
      array.slice(),
      index,
      bggr
    );
    /* animation of the bars end */

    index = bggr;
    left = 2 * index + 1;
    right = 2 * index + 2;
    bggr = right >= length || array[left] >= array[right] ? left : right;
  }
};

// O(n) T | O(1) S
const buildHeap = async (array: number[]) => {
  let index = Math.floor((array.length - 2) / 2);
  for (; index >= 0; index--) await siftdown(array, array.length, index);
};

export default heap_sort;

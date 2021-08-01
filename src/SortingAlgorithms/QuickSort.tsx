// Worst O(n^2) T       | O(log n) S
// Average O(n log n) T | O(log n) S
// Best O(n log n) T    | O(log n) S
// n is length of input array

import store from "../store";

import {
  swap,
  copy_array,
  animate_color_and_array,
  animate_color_and_array_finished,
} from "../SharedFunctions";

let default_colors: string[];

const quick_sort = async (array: number[]) => {
  default_colors = copy_array(store.getState().colors);

  await quickSortHelper(array, 0, array.length - 1);

  /* animation finished start */
  animate_color_and_array_finished(
    copy_array(default_colors),
    copy_array(array)
  );
  /* animation finished end */

  return array;
};

const quickSortHelper = async (array: number[], strt: number, end: number) => {
  if (strt >= end) return;
  let pivot = strt;
  let lft = strt + 1;
  let rght = end;
  while (lft <= rght) {
    /* animation of the bars start */
    await animate_color_and_array(
      copy_array(default_colors),
      copy_array(array),
      lft,
      rght
    );
    /* animation of the bars end */
    if (array[lft] > array[pivot] && array[rght] < array[pivot]) {
      swap(array, lft, rght);
      // only display animation if the bars were actually swapped
      /* animation of the bars start */
      await animate_color_and_array(
        copy_array(default_colors),
        copy_array(array),
        lft,
        rght
      );
      /* animation of the bars end */
    }
    if (array[lft] <= array[pivot]) lft += 1;
    if (array[rght] >= array[pivot]) rght -= 1;
  }
  /* animation of the bars start */
  await animate_color_and_array(
    copy_array(default_colors),
    copy_array(array),
    pivot,
    rght
  );
  /* animation of the bars end */
  swap(array, pivot, rght);
  /* animation of the bars start */
  await animate_color_and_array(
    copy_array(default_colors),
    copy_array(array),
    pivot,
    rght
  );
  /* animation of the bars end */
  let lft_len = rght - strt;
  let rght_len = end - rght;
  if (lft_len > rght_len) {
    await quickSortHelper(array, rght + 1, end);
    await quickSortHelper(array, strt, rght - 1);
  } else {
    await quickSortHelper(array, strt, rght - 1);
    await quickSortHelper(array, rght + 1, end);
  }
};

export default quick_sort;

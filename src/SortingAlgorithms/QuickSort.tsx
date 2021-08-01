// Average O(n log n) T | O(log n) S
// Worst O(n^2) T       | O(log n) S
// Best O(n log n) T    | O(log n) S
// n is length of input array

import store from "../store";

import {
  swap,
  copy_array,
  animate_color_and_array,
  animate_color_and_array_finished,
} from "../SharedFunctions";

const quick_sort = (array: number[]) => {
  let default_colors: string[] = copy_array(store.getState().colors);

  quickSortHelper(array, 0, array.length - 1);

  /* animation finished start */
  animate_color_and_array_finished(
    copy_array(default_colors),
    copy_array(array)
  );
  /* animation finished end */

  return array;
};

const quickSortHelper = (array: number[], strt: number, end: number) => {
  if (strt >= end) return;
  let pivot = strt;
  let lft = strt + 1;
  let rght = end;
  while (lft <= rght) {
    if (array[lft] > array[pivot] && array[rght] < array[pivot])
      swap(array, lft, rght);
    if (array[lft] <= array[pivot]) lft += 1;
    if (array[rght] >= array[pivot]) rght -= 1;
  }
  swap(array, pivot, rght);
  let lft_len = rght - strt;
  let rght_len = end - rght;
  if (lft_len > rght_len) {
    quickSortHelper(array, rght + 1, end);
    quickSortHelper(array, strt, rght - 1);
  } else {
    quickSortHelper(array, strt, rght - 1);
    quickSortHelper(array, rght + 1, end);
  }
};

export default quick_sort;

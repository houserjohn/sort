// All cases: O(n log n) T | O(n) S

import store from "../store";
import {
  animate_color_and_array,
  animate_color_and_array_finished,
} from "../SharedFunctions";

let default_colors: string[];

const merge_sort = async (array: number[]) => {
  if (array.length === 0) return array;

  default_colors = store.getState().colors.slice();

  let auxiliary: number[] = array.slice();
  await mergeSortHelper(array, 0, array.length - 1, auxiliary);

  /* animation finished start */
  animate_color_and_array_finished(default_colors.slice(), array.slice());
  /* animation finished end */
  return array;
};

const mergeSortHelper = async (
  main: number[],
  start: number,
  end: number,
  auxiliary: number[]
) => {
  if (start === end) return;
  let middle = Math.floor((start + end) / 2);
  await mergeSortHelper(auxiliary, start, middle, main);
  await mergeSortHelper(auxiliary, middle + 1, end, main);
  await doMerge(main, start, middle, end, auxiliary);
};

const doMerge = async (
  main: number[],
  start: number,
  middle: number,
  end: number,
  auxiliary: number[]
) => {
  let [k, i] = [start, start];
  let j = middle + 1;
  for (; i <= middle && j <= end; k++) {
    if (auxiliary[i] <= auxiliary[j]) {
      /* animation of the bars start */
      await animate_color_and_array(default_colors.slice(), main.slice(), k, i);
      /* animation of the bars end */
      main[k] = auxiliary[i];
      i++;
    } else {
      /* animation of the bars start */
      await animate_color_and_array(default_colors.slice(), main.slice(), k, i);
      /* animation of the bars end */
      main[k] = auxiliary[j];
      j++;
    }
  }
  for (; i <= middle; i++, k++) main[k] = auxiliary[i];
  for (; j <= end; j++, k++) main[k] = auxiliary[j];
};

export default merge_sort;

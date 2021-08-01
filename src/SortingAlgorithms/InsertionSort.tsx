// Best case: O(n) T | O(1) S
// Avg and worst cases: O(n^2) T | O(1) S

import store from "../store";

import {
  swap,
  copy_array,
  animate_color_and_array,
  animate_color_and_array_finished,
} from "../SharedFunctions";

// put in project something about using asynchronous calls/synchronize
const insertion_sort = async (array: number[]) => {
  let default_colors: string[] = copy_array(store.getState().colors);
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j > 0; j--) {
      /* animation of the bars start */
      await animate_color_and_array(
        copy_array(default_colors),
        copy_array(array),
        j - 1,
        j
      );
      /* animation of the bars end */

      if (array[j - 1] > array[j]) {
        swap(array, j - 1, j);

        // only animate the swap if the first bar is bigger than the second (a swap occurred)
        /* animation of the bars start */
        await animate_color_and_array(
          copy_array(default_colors),
          copy_array(array),
          j - 1,
          j
        );
        /* animation of the bars end */
      }
    }
  }

  /* animation finished start */
  animate_color_and_array_finished(
    copy_array(default_colors),
    copy_array(array)
  );
  /* animation finished end */

  return array;
};

export default insertion_sort;

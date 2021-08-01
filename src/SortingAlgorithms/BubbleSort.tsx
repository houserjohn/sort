// Best: O(n) Time | O(1) Space
// Avg: O(n^2) Time | O(1) Space
// Worst: O(n^2) Time | O(1) Space

import store from "../store";
import {
  swap,
  copy_array,
  animate_color_and_array,
  animate_color_and_array_finished,
} from "../SharedFunctions";

const bubble_sort = async (array: number[]) => {
  let default_colors: string[] = copy_array(store.getState().colors);

  for (let i: number = 0; i < array.length; i++) {
    let did_swap: boolean = false;
    for (let j: number = 1; j < array.length - i; j++) {
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
        did_swap = true;

        // Only do the animation of the bars switching if the first is bigger than second
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
    if (!did_swap) break;
  }

  /* animation finished start */
  animate_color_and_array_finished(
    copy_array(default_colors),
    copy_array(array)
  );
  /* animation finished end */

  return array;
};

export default bubble_sort;

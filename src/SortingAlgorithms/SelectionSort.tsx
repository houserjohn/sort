// All cases: O(n^2) T | O(1) S
import store from "../store";

import {
  swap,
  copy_array,
  animate_color_and_array,
  animate_color_and_array_finished,
} from "../SharedFunctions";

const selection_sort = async (array: number[]) => {
  let default_colors: string[] = copy_array(store.getState().colors);

  for (let i = 0; i < array.length - 1; i++) {
    let min: number = i;
    for (let j = i + 1; j < array.length; j++) {
      /* animation of the bars start */
      await animate_color_and_array(
        copy_array(default_colors),
        copy_array(array),
        min,
        j
      );
      /* animation of the bars end */
      if (array[min] > array[j]) {
        min = j;

        // only do animation of swap if swap occured
        /* animation of the bars start */
        await animate_color_and_array(
          copy_array(default_colors),
          copy_array(array),
          min,
          j
        );
        /* animation of the bars end */
      }
    }
    /* animation of the bars start */
    await animate_color_and_array(
      copy_array(default_colors),
      copy_array(array),
      min,
      i
    );
    /* animation of the bars end */
    swap(array, min, i);
    /* animation of the bars start */
    await animate_color_and_array(
      copy_array(default_colors),
      copy_array(array),
      min,
      i
    );
    /* animation of the bars end */
  }

  /* animation finished start */
  animate_color_and_array_finished(
    copy_array(default_colors),
    copy_array(array)
  );
  /* animation finished end */

  return array;
};

export default selection_sort;

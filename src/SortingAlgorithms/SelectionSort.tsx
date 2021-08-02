// All cases: O(n^2) T | O(1) S
import store from "../store";

import {
  swap,
  animate_color_and_array,
  animate_color_and_array_finished,
} from "../SharedFunctions";

const selection_sort = async (array: number[]) => {
  let default_colors: string[] = store.getState().colors.slice().fill("blue");

  for (let i = 0; i < array.length - 1; i++) {
    let min: number = i;
    for (let j = i + 1; j < array.length; j++) {
      /* animation of the bars start */
      await animate_color_and_array(
        default_colors.slice(),
        array.slice(),
        min,
        j
      );
      /* animation of the bars end */
      let active: boolean = store.getState().active;
      if (!active) return;

      if (array[min] > array[j]) {
        min = j;

        // only do animation of swap if swap occured
        /* animation of the bars start */
        await animate_color_and_array(
          default_colors.slice(),
          array.slice(),
          min,
          j
        );
        /* animation of the bars end */
        active = store.getState().active;
        if (!active) return;
      }
    }
    /* animation of the bars start */
    await animate_color_and_array(
      default_colors.slice(),
      array.slice(),
      min,
      i
    );
    let active: boolean = store.getState().active;
    if (!active) return;
    /* animation of the bars end */
    swap(array, min, i);
    /* animation of the bars start */
    await animate_color_and_array(
      default_colors.slice(),
      array.slice(),
      min,
      i
    );
    active = store.getState().active;
    if (!active) return;
    /* animation of the bars end */
  }

  /* animation finished start */
  animate_color_and_array_finished(default_colors.slice(), array.slice());
  /* animation finished end */

  return array;
};

export default selection_sort;

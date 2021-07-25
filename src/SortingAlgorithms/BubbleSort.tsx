// Best: O(n) Time | O(1) Space
// Avg: O(n^2) Time | O(1) Space
// Worst: O(n^2) Time | O(1) Space

import store from '../store';
import { swap, copy_array } from "../SharedFunctions";

const bubble_sort = async (array: number[]) => {
	let default_colors: string[] = copy_array(store.getState().colors); 

	for (let i: number = 0; i < array.length; i++) {
		let did_swap: boolean = false
		for (let j: number = 1; j < array.length-i; j++) {
            /* animation of the bars start */
            let colors: string[] = copy_array(default_colors);
            colors[j-1] = "green";
            colors[j] = "green";
            store.dispatch({
                type: "sort/set_array",
                payload: {"array": copy_array(array), "colors": colors}
            });
            let speed_time: number = store.getState().speed;
            await new Promise(r => setTimeout(r, speed_time));
            /* animation of the bars end */
			if (array[j-1]>array[j]) {
				swap(array, j-1, j);
				did_swap = true
			}
            /* animation of the bars start */
            colors = copy_array(default_colors);
            colors[j-1] = "green";
            colors[j] = "green";
            store.dispatch({
                type: "sort/set_array",
                payload: {"array": copy_array(array), "colors": colors}
            });
            speed_time = store.getState().speed;
            await new Promise(r => setTimeout(r, speed_time));
            /* animation of the bars end */
		}
		if (!did_swap) break;
	}

    /* animation finished start */
    let colors = copy_array(default_colors);
    for (let i = 0; i < colors.length; i++) {
        colors[i] = "green"
    }
    store.dispatch({
        type: "sort/set_array",
        payload: {"array": copy_array(array), "colors": colors}
    });
    /* animation finished end */

  return array;
}

export default bubble_sort;
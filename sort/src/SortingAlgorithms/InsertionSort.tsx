// Best case: O(n) T | O(1) S
// Avg and worst cases: O(n^2) T | O(1) S

import store from '../store';

import { copy_array, swap } from '../SharedFunctions';


// put in project something about using asynchronous calls/synchronize
const insertion_sort = async (array: number[]) => {
	let default_colors: string[] = copy_array(store.getState().colors); 
	for (let i = 0; i < array.length-1; i++) {
		for (let j = i+1; j>0; j--) {
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
			if (array[j-1]>array[j]) swap(array,j-1,j);
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

export default insertion_sort


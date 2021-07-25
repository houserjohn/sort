// All cases: O(n^2) T | O(1) S
import store from '../store';
import { swap, copy_array } from "../SharedFunctions";

const selection_sort = async (array: number[]) => {
	let default_colors: string[] = copy_array(store.getState().colors); 
	
    for (let i = 0; i < array.length-1; i++) {
		let min: number = i;
		for (let j = i+1; j < array.length; j++) {
            /* animation of the bars start */
            let colors: string[] = copy_array(default_colors);
            colors[min] = "green";
            colors[j] = "green";
            store.dispatch({
                type: "sort/set_colors",
                payload: colors
            });
            let speed_time: number = store.getState().speed;
            await new Promise(r => setTimeout(r, speed_time));
            /* animation of the bars end */
			if (array[min] > array[j]) min = j
            /* animation of the bars start */
            colors = copy_array(default_colors);
            colors[min] = "green";
            colors[j] = "green";
            store.dispatch({
                type: "sort/set_colors",
                payload: colors
            });
            speed_time = store.getState().speed;
            await new Promise(r => setTimeout(r, speed_time));
            /* animation of the bars end */
		}
        /* animation of the bars start */
        let colors: string[] = copy_array(default_colors);
        colors[i] = "green";
        colors[min] = "green";
        store.dispatch({
            type: "sort/set_array",
            payload: {"array": copy_array(array), "colors": colors}
        });
        let speed_time: number = store.getState().speed;
        await new Promise(r => setTimeout(r, speed_time));
        /* animation of the bars end */
		swap(array, min, i);
        /* animation of the bars start */
        colors = copy_array(default_colors);
        colors[min] = "green";
        colors[i] = "green";
        store.dispatch({
            type: "sort/set_array",
            payload: {"array": copy_array(array), "colors": colors}
        });
        speed_time = store.getState().speed;
        await new Promise(r => setTimeout(r, speed_time));
        /* animation of the bars end */

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

export default selection_sort 
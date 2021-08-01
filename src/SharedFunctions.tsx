// A collection of commonly used functions that can be reused across modules
import store from "./store";

const swap = (array: number[], i: number, j: number) => {
  let temp: number = array[i];
  array[i] = array[j];
  array[j] = temp;
};

const animate_color_and_array = async (
  copied_default_colors: string[],
  copied_array: number[],
  i: number,
  j: number
) => {
  copied_default_colors[i] = "green";
  copied_default_colors[j] = "green";
  store.dispatch({
    type: "sort/set_array",
    payload: { array: copied_array, colors: copied_default_colors },
  });
  let speed_time = store.getState().speed;
  await new Promise((r) => setTimeout(r, speed_time));
};

const animate_color_and_array_finished = async (
  copied_default_colors: string[],
  copied_array: number[]
) => {
  for (let i = 0; i < copied_default_colors.length; i++) {
    copied_default_colors[i] = "green";
  }
  store.dispatch({
    type: "sort/set_array",
    payload: { array: copied_array, colors: copied_default_colors },
  });
};

export { swap, animate_color_and_array, animate_color_and_array_finished };

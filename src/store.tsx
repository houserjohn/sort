import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = (
  state: {
    array: number[];
    sorting_algorithm: string;
    colors: string[];
    speed: number;
  },
  action: { type: string; payload: string | any }
) => {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    case "sort/set_array": {
      // sets the array and colors of each bar
      return {
        ...state,
        array: action.payload.array,
        colors: action.payload.colors,
      };
    }

    case "sort/update_array": {
      // updates the array (the array is still the same size but values changed)
      return {
        ...state,
        array: action.payload,
      };
    }

    case "sort/set_sorting_algorithm": {
      return {
        ...state,
        sorting_algorithm: action.payload,
      };
    }

    case "sort/set_colors": {
      return {
        ...state,
        colors: action.payload,
      };
    }

    case "sort/set_speed": {
      return {
        ...state,
        speed: action.payload,
      };
    }

    case "path/set_grid": {
      return {
        ...state,
        grid: action.payload,
      };
    }

    case "path/set_alg": {
      return {
        ...state,
        alg: action.payload,
      };
    }

    case "txt/set_txt": {
      // We need to return a new state object
      return {
        // that has all the existing state data
        ...state,
        txt: action.payload,
      };
    }
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
};

const store = createStore(
  reducer as any,
  {
    array: [20, 30, 22, 10, 100, 20, 40, 50, 60],
    sorting_algorithm: "insertion_sort",
    colors: [
      "blue",
      "blue",
      "blue",
      "blue",
      "blue",
      "blue",
      "blue",
      "blue",
      "blue",
    ],
    speed: 1000,
  },
  composeWithDevTools()
);

export default store;

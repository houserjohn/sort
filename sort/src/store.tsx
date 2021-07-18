import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = (
  state: { array: number[]; sorting_algorithm: string },
  action: { type: string; payload: string }
) => {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    // Do something here based on the different types of actions
    case "sort/set_array": {
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
  { array: [20, 30, 22], sorting_algorithm: "insertion_sort" },
  composeWithDevTools()
);

export default store;
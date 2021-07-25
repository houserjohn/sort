import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import store from "../store";
import insertion_sort from "../SortingAlgorithms/InsertionSort";
import bubble_sort from "../SortingAlgorithms/BubbleSort";
import selection_sort from "../SortingAlgorithms/SelectionSort";
import { copy_array } from "../SharedFunctions";

// Gets random interval in range [min, max)
// From https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const getRandomArbitrary = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const create_new_array = (size: number) => {
  let array: number[] = [];
  for (let i = 0; i < size; i++) {
    array.push(getRandomArbitrary(5, 200));
  }

  let colors: string[] = [];
  for (let i = 0; i < size; i++) {
    colors.push("blue");
  }

  store.dispatch({
    type: "sort/set_array",
    payload: {"array": array, "colors": colors}
  });
};

const update_array_length = (e: any) => {
  //console.log(e.target.value);
  create_new_array(e.target.value);
};

const update_sorting_algorithm = (e: any) => {
  console.log(e.target.value);
  store.dispatch({
    type: "sort/set_sorting_algorithm",
    payload: e.target.value,
  });
};


const start_sorting = () => {
  let array: any = copy_array(store.getState().array);

  let sorting_algorithm: string = store.getState().sorting_algorithm;
  switch(sorting_algorithm) {
    case "insertion_sort":
      insertion_sort(array);
      break;
    case "bubble_sort": 
      bubble_sort(array);
      break;
    case "selection_sort":
      selection_sort(array);
      break;
  }


}

// Handles the Randomize button being clicked
const onClickRandomize = (e: any, length: number) => {
  e.preventDefault();

  create_new_array(length)
}

// Handles the Go button being clicked
const onClickGo = (e: any) => {
  e.preventDefault();

  start_sorting();
}

// Handles the speed range being adjusted
const onSpeedAdjust = (e: any) => {
  e.preventDefault();

  let adjusted_speed: number = 2000-e.target.value // update it so that the max value is stored in the store

  store.dispatch({
    type: "sort/set_speed",
    payload: adjusted_speed,
  });
  console.log(adjusted_speed);

}

interface REDUX_STORE {
  array: number[];
}

const TOOLBAR = styled.div`
  background-color: gray;
  text-align: center;
`;

const DESCRIPTOR = styled.p`
  display: inline-block;
  margin: 0px;
  padding: 0px;
`;

  //direction: rtl;dd
const SPEED_BAR = styled.input`
  
`;
//<input type="range" min="10" max="2000" step="1" onMouseUp={(e: any) => onSpeedAdjust(e)} />

const Toolbar = () => {
  const array: number[] = useSelector((state: REDUX_STORE) => state.array);

  return (
    <TOOLBAR>
      <button onClick={(e: any) => onClickRandomize(e, array.length)}>
        Randomize
      </button>
      <DESCRIPTOR>Few</DESCRIPTOR>
      <input type="range" onMouseUp={(e: any) => update_array_length(e)} />
      <DESCRIPTOR>Many</DESCRIPTOR>
      <select
        defaultValue="insertion sort"
        onChange={(e: any) => update_sorting_algorithm(e)}
      >
        <option value="insertion_sort">Insertion Sort</option>
        <option value="bubble_sort">Bubble Sort</option>
        <option value="selection_sort">Selection Sort</option>
        <option value=".">more coming soon...</option>
      </select>
      <DESCRIPTOR>Slow</DESCRIPTOR>
      <SPEED_BAR type="range" min="10" max="2000" step="1" onMouseUp={(e: any) => onSpeedAdjust(e)}/>
      <DESCRIPTOR>Fast</DESCRIPTOR>
      <button onClick={(e: any) => onClickGo(e)}>
        go
      </button>
    </TOOLBAR>
  );
};

export default Toolbar;

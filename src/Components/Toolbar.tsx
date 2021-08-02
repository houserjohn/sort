import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import store from "../store";

import insertion_sort from "../SortingAlgorithms/InsertionSort";
import bubble_sort from "../SortingAlgorithms/BubbleSort";
import selection_sort from "../SortingAlgorithms/SelectionSort";
import quick_sort from "../SortingAlgorithms/QuickSort";
import heap_sort from "../SortingAlgorithms/HeapSort";
import radix_sort from "../SortingAlgorithms/RadixSort";
import merge_sort from "../SortingAlgorithms/MergeSort";

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
    payload: { array: array, colors: colors },
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

const start_sorting = async () => {
  let array: number[] = store.getState().array.slice();
  let active: boolean = store.getState().active;

  store.dispatch({
    type: "sort/set_activity",
    payload: true,
  });

  let sorting_algorithm: string = store.getState().sorting_algorithm;
  switch (sorting_algorithm) {
    case "insertion_sort":
      await insertion_sort(array);
      break;
    case "bubble_sort":
      await bubble_sort(array);
      break;
    case "selection_sort":
      await selection_sort(array);
      break;
    case "quick_sort":
      await quick_sort(array);
      break;
    case "heap_sort":
      await heap_sort(array);
      break;
    case "radix_sort":
      await radix_sort(array);
      break;
    case "merge_sort":
      await merge_sort(array);
      break;
  }
  store.dispatch({
    type: "sort/set_activity",
    payload: false,
  });
};

const stop_sorting = () => {
  let active: boolean = store.getState().active;

  store.dispatch({
    type: "sort/set_activity",
    payload: false,
  });
};

// Handles the Randomize button being clicked
const onClickRandomize = (e: any, length: number) => {
  e.preventDefault();

  create_new_array(length);
};

// Handles the Go button being clicked
const onClickGo = (e: any) => {
  e.preventDefault();

  start_sorting();
};

const onClickStop = (e: any) => {
  e.preventDefault();

  stop_sorting();
};

// Handles the speed range being adjusted
const onSpeedAdjust = (e: any) => {
  e.preventDefault();

  let adjusted_speed: number = 2000 - e.target.value; // update it so that the max value is stored in the store

  store.dispatch({
    type: "sort/set_speed",
    payload: adjusted_speed,
  });
  console.log(adjusted_speed);
};

interface REDUX_STORE {
  array: number[];
  active: boolean;
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

interface BUTTON_Props {
  disabled: boolean;
}
const BUTTON = styled.button<BUTTON_Props>``;

//direction: rtl;dd
const SPEED_BAR = styled.input``;
//<input type="range" min="10" max="2000" step="1" onMouseUp={(e: any) => onSpeedAdjust(e)} />

const Toolbar = () => {
  const active: boolean = useSelector((state: REDUX_STORE) => state.active);
  const array: number[] = useSelector((state: REDUX_STORE) => state.array);

  return (
    <TOOLBAR>
      <BUTTON
        disabled={active}
        onClick={(e: any) => onClickRandomize(e, array.length)}
      >
        Randomize
      </BUTTON>
      <DESCRIPTOR>Few</DESCRIPTOR>
      <input
        type="range"
        disabled={active}
        defaultValue={array.length}
        onMouseUp={(e: any) => update_array_length(e)}
      />
      <DESCRIPTOR>Many</DESCRIPTOR>
      <select
        disabled={active}
        defaultValue="insertion sort"
        onChange={(e: any) => update_sorting_algorithm(e)}
      >
        <option value="insertion_sort">Insertion Sort</option>
        <option value="bubble_sort">Bubble Sort</option>
        <option value="selection_sort">Selection Sort</option>
        <option value="quick_sort">Quick Sort</option>
        <option value="heap_sort">Heap Sort</option>
        <option value="radix_sort">Radix Sort</option>
        <option value="merge_sort">Merge Sort</option>
      </select>
      <DESCRIPTOR>Slow</DESCRIPTOR>
      <SPEED_BAR
        type="range"
        min="10"
        max="2000"
        step="1"
        defaultValue={store.getState().speed}
        onMouseUp={(e: any) => onSpeedAdjust(e)}
      />
      <DESCRIPTOR>Fast</DESCRIPTOR>
      <BUTTON disabled={!active} onClick={(e: any) => onClickStop(e)}>
        Stop
      </BUTTON>
      <BUTTON disabled={active} onClick={(e: any) => onClickGo(e)}>
        Go
      </BUTTON>
    </TOOLBAR>
  );
};

export default Toolbar;

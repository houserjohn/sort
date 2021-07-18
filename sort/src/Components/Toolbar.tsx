import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import store from "../store";

// Gets random interval in range [min, max)
// From https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const create_new_array = (size: number) => {
  let array: number[] = [];
  for (let i = 0; i < size; i++) {
    array.push(getRandomArbitrary(5, 200));
  }

  store.dispatch({
    type: "sort/set_array",
    payload: array,
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

interface REDUX_STORE {
  array: number[];
}

const TOOLBAR = styled.div`
  background-color: gray;
  text-align: center;
`;

const Toolbar = () => {
  const array: number[] = useSelector((state: REDUX_STORE) => state.array);

  return (
    <TOOLBAR>
      <button onClick={() => create_new_array(array.length)}>
        generate random items
      </button>
      <input type="range" onMouseUp={(e: any) => update_array_length(e)} />
      <select
        defaultValue="insertion sort"
        onChange={(e: any) => update_sorting_algorithm(e)}
      >
        <option value="insertion_sort">Insertion Sort</option>
        <option value="bubble_sort">Bubble Sort</option>
        <option value=".">more coming soon...</option>
      </select>
    </TOOLBAR>
  );
};

export default Toolbar;

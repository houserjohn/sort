import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Bar from "./Bar";
//import store from "../store";

const VISUALIZER = styled.div`
  background-color: black;
  margin: auto;
  height: 100%;
  width: 90%;
  text-align: center;
`;

interface Visualizer_Props {}

interface REDUX_STORE {
  array: number[];
}

const Visualizer = (props: Visualizer_Props) => {
  const array: number[] = useSelector((state: REDUX_STORE) => state.array);
  return (
    <VISUALIZER>
      {array.map((value: number, index: number) => (
        <Bar key={index} value={value} />
      ))}
    </VISUALIZER>
  );
};

export default Visualizer;

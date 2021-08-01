import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Bar from "./Bar";
//import store from "../store";

const VISUALIZER = styled.div`
  background-color: gray;
  margin: auto;
  height: 100%;
  width: 90%;
  text-align: center;
  padding: 20px 0px 0px 0px;
`;

interface Visualizer_Props {}

interface REDUX_STORE {
  array: number[];
  colors: string[];
}

const Visualizer = (props: Visualizer_Props) => {
  const array: number[] = useSelector((state: REDUX_STORE) => state.array);
  const colors: string[] = useSelector((state: REDUX_STORE) => state.colors);
  return (
    <VISUALIZER>
      {array.map((value: number, index: number) => (
        <Bar key={index} value={value} color={colors[index]} />
      ))}
    </VISUALIZER>
  );
};

export default Visualizer;

import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

//import store from "../store";

interface BAR_Props {
  value: number;
  width: number;
}

const BAR = styled.div<BAR_Props>`
  margin: 0px;
  border: 0px solid white;
  padding: 0px;
  outline-style: none;
  background-color: blue;
  height: ${(props) => props.value}px;
  width: ${(props) => props.width}%;
  display: inline-block;
`;

interface bar_props {
  value: number;
}

interface REDUX_STORE {
  array: number[];
}

const Bar = (props: bar_props) => {
  const array: number[] = useSelector((state: REDUX_STORE) => state.array);
  return <BAR value={props.value} width={(1 / array.length) * 100} />;
};

export default Bar;

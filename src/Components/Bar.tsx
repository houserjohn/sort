import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

//import store from "../store";

interface BAR_Props {
  value: number;
  width: number;
  color: string;
}

const BAR = styled.div<BAR_Props>`
  margin: 0px;
  border: 0px solid white;
  padding: 0px;
  outline-style: none;
  background-color: ${(props) => props.color};
  height: ${(props) => props.value}px;
  width: ${(props) => props.width}%;
  display: inline-block;
`;

interface bar_props {
  value: number;
  color: string;
}

interface REDUX_STORE {
  array: number[];
}
// eventually add inner bar to the bar so that there is padding between bars
const Bar = (props: bar_props) => {
  const array: number[] = useSelector((state: REDUX_STORE) => state.array);
  return <BAR value={props.value} width={(1 / array.length) * 100} color={props.color} />;
  
};

export default Bar;

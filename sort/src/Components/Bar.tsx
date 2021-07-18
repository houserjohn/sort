import React from 'react'
import styled from "styled-components";


const BAR = styled.div`
  margin: 5px;
  border: 0px solid black;
  padding: 0px;
  outline-style: none;
  background-color: red;
  height: 50px;
    width: 10px;
    display: inline-block;
`;

interface bar_props {

}

const Bar = (props: bar_props) => {
    return (
        <BAR/>
    );
}

export default Bar

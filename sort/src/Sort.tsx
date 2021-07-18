import React from "react";

import Visualizer from "./Components/Visualizer";
import Toolbar from "./Components/Toolbar";
//import store from "./store";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px
}
`;

const Sort = () => {
  return (
    <div>
      <React.Fragment>
        <GlobalStyle />
      </React.Fragment>
      <Toolbar />
      <Visualizer />
    </div>
  );
};

export default Sort;

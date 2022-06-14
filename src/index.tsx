import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./theme";
import App from "./App";
//const root = ReactDOM.createRoot(document.getElementById("root")!);
ReactDOM.render(
  <>
    <RecoilRoot>
      <ThemeProvider theme={lightTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </>,
  document.getElementById("root")
);

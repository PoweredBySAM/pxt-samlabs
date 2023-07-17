import "./Config/persistConfig";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import App from "./App";


ReactDOM.render(
  //NOTE: adding suspense here to prevent the app from crashing when the store is not ready and lazyLoading is enabled
  <Suspense fallback={<div>Loading</div>}>
      <App />    ,
  </Suspense>,
  document.getElementById("beepboop-simulator")
);

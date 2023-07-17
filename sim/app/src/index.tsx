import "./Config/persistConfig";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import devicesStore from "./Store/DevicesStore";
import App from "./App";

const stores = {
  devicesStore: devicesStore,
};

ReactDOM.render(
  //NOTE: adding suspense here to prevent the app from crashing when the store is not ready and lazyLoading is enabled
  <Suspense fallback={<div>Loading</div>}>
    <Provider {...stores}>
      <App />
    </Provider>
    ,
  </Suspense>,
  document.getElementById("beepboop-simulator")
);

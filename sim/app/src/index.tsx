import './Config/persistConfig';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import devicesStore from './Store/DevicesStore';
import App from './App';

const stores = {
  devicesStore: devicesStore,
};

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('beepboop-simulator')
);

import './Config/persistConfig';
import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StoreContext } from './Store/storeContext';
import DevicesStore from './Store/DevicesStore';

ReactDOM.render(
    //NOTE: adding suspense here to prevent the app from crashing when the store is not ready and lazyLoading is enabled
    <StoreContext.Provider value={DevicesStore}>
        <Suspense fallback={<div>Loading</div>}>
            <App />
        </Suspense>
    </StoreContext.Provider>,
    document.getElementById('beepboop-simulator')
);

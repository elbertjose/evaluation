import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {persistor, store} from "./store";
import {PersistGate} from "redux-persist/integration/react";
import {PermissionProvider} from "./permisions";
import {TokenPermissionAdapter} from "./permisions/adapter";

const App = React.lazy(() => import("./pages/index"));

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <PermissionProvider PermissionAdapterClass={TokenPermissionAdapter} store={store}>
                <App/>
            </PermissionProvider>
        </PersistGate>
    </Provider>
);

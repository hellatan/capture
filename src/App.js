import React from 'react';
import { Provider } from 'react-redux';

import getStore from './store';
import Router from './containers/Router';

export default function App() {
    return (
        <Provider store={getStore()}>
            <Router />
        </Provider>
    );
}

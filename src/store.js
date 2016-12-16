import { createStore, combineReducers } from 'redux';

import reducers from './reducers';

export default function getStore() {
    const rootReducer = combineReducers(reducers);
    return createStore(rootReducer);
}

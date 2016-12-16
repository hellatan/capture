import { SET_ACTIVE_ITEM } from '../actions';

function activeItemReducer(state = null, { type, payload }) {
    switch (type) {
        case SET_ACTIVE_ITEM:
            return payload;
            break;
        default:
            return state;
    }
}

function itemsReducer(state = []) {
    return state;
}

export default reducers = {
    items: itemsReducer,
    activeItem: activeItemReducer
};

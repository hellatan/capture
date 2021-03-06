import { SET_ACTIVE_ITEM } from '../actions';

const defaultItems = [
    {
        title: 'Elizabeth Set, Sofa and Chair by Ib Kofod-Larsen',
        imageSource: require('../assets/furniture.png'),
        pdpImageSource: require('../assets/mock_furniture.png'),
        vertical: 'furniture'
    },
    {
        title: 'Abstract art photography - Fluidity in Color Series - Purple Reign -sold framed',
        imageSource: require('../assets/art.png'),
        pdpImageSource: require('../assets/mock_art.png'),
        vertical: 'art'
    },
    {
        title: 'Very Fine Santa Maria Aquamarine Diamond Gold Drop Necklace',
        listImageSource: require('../assets/jewelry_with_back.png'),
        imageSource: require('../assets/jewelry.png'),
        pdpImageSource: require('../assets/mock_jewelry.png'),
        vertical: 'jewelry'
    },
    {
        title: '80s Christian Lacroix 2 pcs silk brocade top and skirt',
        imageSource: require('../assets/fashion.png'),
        pdpImageSource: require('../assets/mock_fashion.png'),
        vertical: 'fashion'
    }
];

function activeItemReducer(state = null, { type, payload }) {
    switch (type) {
        case SET_ACTIVE_ITEM: {
            const item = payload ? {...payload} : null;
            return item;
        }
        default:
            return state;
    }
}

function itemsReducer(state = [ ...defaultItems ]) {
    return state;
}

export default reducers = {
    items: itemsReducer,
    activeItem: activeItemReducer
};

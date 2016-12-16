export const SET_ACTIVE_ITEM = 'choose_item';

export function setActiveItem(item = null) {
    return {
        type: SET_ACTIVE_ITEM,
        payload: item
    };
}

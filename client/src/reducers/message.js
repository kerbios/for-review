import { FETCH_MESSAGES, FETCH_MESSAGES_BULK } from '../actions/types';
import _ from 'lodash';

const initialState = [];

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGES:
            return [...state, action.payload];
        case FETCH_MESSAGES_BULK:
            return _.uniqBy([...state, ...action.payload], 'uid');
        default:
            return state;
    }
};

export default messageReducer;
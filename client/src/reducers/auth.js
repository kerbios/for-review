import { FETCH_PROFILE } from '../actions/types';

const initialState = {};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROFILE:
            return action.payload || false;
        default:
            return state;
    }
};

export default authReducer;
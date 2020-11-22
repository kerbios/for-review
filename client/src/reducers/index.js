import { combineReducers } from 'redux';
import authReducer from './auth';
import messageReduser from './message';

export default combineReducers({
    profile: authReducer,
    messages: messageReduser
});
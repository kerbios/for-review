import axios from 'axios';
import { 
    FETCH_PROFILE,
    FETCH_MESSAGES_BULK
} from './types';

export const fetchProfile = async (dispatch) => { 
    const profile = await axios.get('/auth/profile');
    dispatch({ type: FETCH_PROFILE , payload: profile.data });
}

// TODO: need to implement pagination to preload message history in chunks
// here by default we receive last 100 messages.
export const fetchMessages = async (dispatch) => {
    const messages = await axios.get('/api/messages');
    dispatch({ type: FETCH_MESSAGES_BULK, payload: messages.data });
}


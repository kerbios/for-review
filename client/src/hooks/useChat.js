import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FETCH_MESSAGES } from '../actions/types';

const NEW_CHAT_MESSAGE_EVENT = 'NEW_MESSAGE';

const useChat = () => {
  const socketRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {

    // TODO: need to implement reconnect logic 
    socketRef.current = new window.WebSocket('wss://' + window.location.host + '/channel') || {}
    
    socketRef.current.onopen = () => { // need to specify security checking and transfer your uid on open
        console.log('connection opened:');
    }

    socketRef.current.onclose = (e) => {
        console.log('connection closed:', e.code, e.reason);
    }

    socketRef.current.onmessage = (e) => {
        console.log('message:', e.data);
        const message = JSON.parse(e.data);
        dispatch({ type: FETCH_MESSAGES, payload: message });
    }
    
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    message = {
        type: NEW_CHAT_MESSAGE_EVENT,
        ...message
    };

    socketRef.current.send(JSON.stringify(message));
  };

  return { sendMessage };
};

export default useChat;
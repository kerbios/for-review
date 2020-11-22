import React from 'react';
import Message from './Message';
import Box from '@material-ui/core/Box';

const MessageList = ({ messages }) => {
    return (
        <Box>
            {
                messages.map((message, i) => {
                    return (<Message key={i} {...message} />)
                })
            }
        </Box>
    )
};

export default MessageList;
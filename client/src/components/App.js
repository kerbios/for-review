import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Header from './Header';
import { useEffect, useRef } from 'react';
import MessageList from './MessageList';
import { fetchProfile, fetchMessages } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import useChat from '../hooks/useChat';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function App() {
    const profile = useSelector(state => state.profile);
    const messages = useSelector(state => state.messages);
    const dispatch = useDispatch();
    console.log('profile:', profile);
    console.log('messages', messages);

    useEffect(() => {
        console.log('App render');
        fetchProfile(dispatch);
        fetchMessages(dispatch);
    }, [profile.id]);

    const textField = useRef();
    const { sendMessage } = useChat();
    const handleClick = () => {
        if (!profile.id) return;

        const preMessage = {
            from: profile.googleId, // here need to send uids but it's test task
            to: 'ALL', // technincal usage
            message: textField.current.value
        };

        textField.current.value = '';

        sendMessage(preMessage);
    };
    const onEnter = (e) => {
        if (e.keyCode === 13) {
            handleClick()
        }
    };

    return (
        <Box minWidth={300}>
            <CssBaseline />
            <Header profile={profile} />
            <Toolbar id="back-to-top-anchor" />
            <Container>
                <Box my={2}>
                    <MessageList messages={messages} />
                </Box>
                <Box>
                    <input type='text' ref={textField} onKeyDown={onEnter} />
                    <button onClick={handleClick}>SEND</button>
                </Box>
            </Container>
            <ScrollTop>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </Box>
    );
};

export default App;

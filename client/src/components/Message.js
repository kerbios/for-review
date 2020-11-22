import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    }
}));

const Message = (props) => {
    const { from, message, datetime } = props;
    const classes = useStyles();

    return (
        <Typography className={classes.root}>{from}: {message}</Typography>
    );
}

export default Message;
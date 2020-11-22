import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

const Header = ({ profile }) => {
    const classes = useStyles();

    const renderLoginButton = () => {
        /* proxy bug */
        switch (!!profile.id) {
            case false:
                return (<Button color="primary" variant="contained" className={classes.menuButton}>
                    <a href="/auth/google">Login</a>
                </Button>)
            default:
                return (<Button color="secondary" variant="contained" className={classes.menuButton}>
                    <a href="/auth/logout">Logout</a>
                </Button>)
        };
    };

    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>Test task chat application</Typography>
                    {renderLoginButton()}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
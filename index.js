const express = require('express');
const cookie = require('cookie-session');
const passport = require('passport');
const config = require('./config');
const path = require('path');
const app = express();

/* models creation */
require('./services/postgres');

/* auth handling */
require('./services/passport');

/* set cookies */
app.use(
    cookie({
        maxAge: 7 * 24 * 60 * 60 * 1000, // week
        keys: [config.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

/* assign routes */
require('./routes/auth')(app);
require('./routes/api')(app);
/* websockets */
require('./routes/ws')(app);
/* host frontend app */
app.use('/', express.static('public'));
/* default route for all requests */
/* app.get('*', (req, res) => {  
    res.redirect('/');
}); */
/* listen port */
const PORT = process.env.PORT || 5000;
app.listen(PORT);
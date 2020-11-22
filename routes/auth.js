const passport = require('passport');

module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope:  ['profile', 'email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/');
    });

    app.get('/auth/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/profile', (req, res) => {
        if (req.user) {
            res.status(200).send(req.user);
        } else {
            res.status(401).send({ error: 'authorization required.' });
        }
    });
};
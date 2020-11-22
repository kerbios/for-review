const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const credentials = require('../config');
const User = require('./postgres').User;

const saveUserData = async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({
        where: { googleId: profile.id }
    });

    if (existingUser) {
        return done(null, existingUser)
    } 

    const newUser = await User.create({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        googleId: profile.id
    });
    done(null, newUser);
};

passport.serializeUser((user, done) => {
    done(null, user.googleId);
});

passport.deserializeUser((id, done) => {
    User.findOne({ 
        where: { googleId: id } 
    }).then((user) => {
        if (user === null) {
            console.log('Not found!');
        } else {
            console.log(user instanceof User); // true
            console.log(user);
        }
        done(null, user);
    }).catch((err) => {
        done(err);
    })
});

passport.use(new GoogleStrategy({
    clientID: credentials.clientId,
    clientSecret: credentials.secret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, saveUserData));

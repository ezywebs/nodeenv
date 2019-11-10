const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then((user) => {
      done(null, user);  
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: 'http://fd951ce0879a41fbbb003d8894cc0952.vfs.cloud9.us-east-2.amazonaws.com/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id })
         .then((existingUser) => {
            if (existingUser) {
                done(null, existingUser);
            } else {
                new User({ googleId: profile.id })
                .save()
                .then(user => done(null, user));
            }
         })
    })
);
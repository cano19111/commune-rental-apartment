const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
const User = require('../models/user.model');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback',
        },
        async function (accessToken, refreshToken, profile, cb) {
            try {
                if (profile) {
                    const user = await User.findOne({
                        email: profile.emails[0]?.value,
                    });
                    if (user) return cb(null, user);
                    const newUser = await User.create({
                        email: profile.emails[0]?.value,
                        provider: 'Google',
                        firstname: profile.name.familyName,
                        lastname: profile.name.givenName,
                        avatar: profile?.photos[0]?.value,
                    });
                    return cb(null, newUser);
                }
            } catch (error) {
                return cb(null, false);
            }
        },
    ),
);
passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: '/api/auth/facebook/callback',
            profileFields: ['email', 'photos', 'id', 'displayName', 'name', 'gender'],
        },
        async function (accessToken, refreshToken, profile, cb) {
            try {
                if (profile) {
                    console.log(profile);
                    const user = await User.findOne({
                        email: profile.emails[0]?.value,
                    });
                    if (user) return cb(null, user);
                    const newUser = await User.create({
                        email: profile.emails[0]?.value,
                        provider: 'Facebook',
                        firstname: profile.name.familyName,
                        lastname: profile.name.givenName,
                        gender: profile.gender,
                        avatar: profile?.photos[0]?.value,
                    });
                    return cb(null, newUser);
                }
            } catch (error) {
                return cb(null, false);
            }
        },
    ),
);

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const Userdb = require('../model/user'); // Ensure correct path to your user model
require('dotenv').config();

const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;
const facebookID = process.env.facebookID;
const facebookSecret = process.env.facebookSecret;

passport.use('google-link', new GoogleStrategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: '/auth/google/callback/link',
  scope: ['profile', 'email'],
  passReqToCallback: true,  // Allows passing req to the callback
},
async (req, accessToken, refreshToken, profile, done) => {
  try {
    const userId = req.user._id;  // Extract the current user's _id from the session (assumes the user is already logged in)

    let user = await Userdb.findById(userId); // Find the user by their ID
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    // Update the existing user with the Google ID
    user.googleId = profile.id;
    
    // If there's no profile picture, update it
    if (user.profilePicture === "" || !user.profilePicture) {
      user.profilePicture = profile.photos[0].value;
    }
    
    await user.save();
    return done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

passport.use('facebook-link', new FacebookStrategy({
  clientID: facebookID,
  clientSecret: facebookSecret,
  callbackURL: '/auth/facebook/callback/link',
  profileFields: ['id', 'displayName', 'photos', 'email'],
  scope: ['email'],
  passReqToCallback: true,  // Allows passing req to the callback
},
async (req, accessToken, refreshToken, profile, done) => {
  try {
    const userId = req.user._id;  // Extract the current user's _id from the session (assumes the user is already logged in)

    let user = await Userdb.findById(userId);  // Find the user by their ID
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    // Update the existing user with the Facebook ID
    user.facebookID = profile.id;

    // If there's no profile picture, update it
    if (user.profilePicture === "" || !user.profilePicture) {
      user.profilePicture = profile.photos[0].value;
    }

    await user.save();
    return done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Userdb.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const Userdb = require('../model/user');
require('dotenv').config();
const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;
const facebookID =  process.env.facebookID;
const facebookSecret =  process.env.facebookSecret;

passport.use(new GoogleStrategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: '/auth/google/callback',
  scope: ['profile', 'email'],
},
async (accessToken, refreshToken, profile, done) => {
  try {
    console.log("profileid = "+ profile.id);
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
    console.log("email = "+ email);
    if (!email) {
      return done(null, false, { message: 'Email is required to sign up' });
    }
    let user = await Userdb.findOne({ googleId: profile.id });
    if (!user) {
      console.log("not users = ");
      // New user signing up
      user = new Userdb({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
        profilePicture: profile.photos[0].value
      });
      await user.save();
      console.log("save users in db = ");
      console.log(" users id  = "+user._id.toString());
      // return done(null, { userId: user._id.toString(), isNewUser: true });
      // return done(null, { user, isNewUser: true });
      return done(null, { userId: user._id.toString(), email: user.email, isNewUser: true });

    }
    // Existing user logging in
    return done(null, { userId: user._id.toString(), email: user.email, isNewUser: false });
    //return done(null, { user, isNewUser: false });
  } catch (err) {
    done(err, null);
  }
}));


passport.use(new FacebookStrategy({
  clientID: facebookID,
  clientSecret: facebookSecret,
  callbackURL: 'https://api.ru-novel.ru/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email'],  // Ensure 'email' is here
  scope: ['email']  // Request email scope
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

    if (!email) {
      return done(null, false, { message: 'Email is required to sign up' });
    }

    let user = await Userdb.findOne({ email: email });
    if (!user) {
      user = new Userdb({
        facebookID: profile.id,
        username: profile.displayName,
        email: email,
        profilePicture: profile.photos && profile.photos[0] ? profile.photos[0].value : null
      });
      await user.save();
      
      return done(null, { userId: user._id.toString(), email: user.email, isNewUser: true });

    }

    return done(null, { userId: user._id.toString(), email: user.email, isNewUser: false });

  } catch (err) {
    done(err, null);
  }
}));

  

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.userId); // Serialize only the userId
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
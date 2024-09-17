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
    passReqToCallback: true  // This allows us to access the request object and get state
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const state = JSON.parse(req.query.state);  // Extract the state
      const userId = state.userId;  // Get the userId passed from frontend
      console.log("userid ==="+userId);
      console.log("profileid ==="+profile.id);
      // Find the user by userId and update googleId
      let user = await Userdb.findById(userId);
      if (!user) {
        console.log("User not found");
        return done(new Error('User not found'));
      }
  
      // Update the user's Google ID and other information if necessary
      user.googleId = profile.id;
      if (user.profilePicture === "" || !user.profilePicture) {
        console.log("updated profile picture ");
        user.profilePicture = profile.photos[0].value;
      }
      await user.save();
      console.log("saved to db");
      console.log("User in strategy:", user._id);
      return done(null, user._id.toString());

    } catch (err) {
        console.log("error catch");
      return done(err, null);
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
    console.log("userid ==="+userId);
    console.log("profileid ==="+profile.id);
    let user = await Userdb.findById(userId);  // Find the user by their ID
    if (!user) {
        console.log("User not found");
      return done(null, false, { message: 'User not found' });
    }

    // Update the existing user with the Facebook ID
    user.facebookID = profile.id;
    console.log("updated id");
    // If there's no profile picture, update it
    if (user.profilePicture === "" || !user.profilePicture) {
        console.log("updated profile picture ");
      user.profilePicture = profile.photos[0].value;
    }

    await user.save();
    console.log("saved to db");
    return done(null, user);
  } catch (err) {
    console.log("error catch");
    done(err, null);
  }
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    console.log("User in serializeUser:", user);
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

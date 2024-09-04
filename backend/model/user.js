const mongoose = require('mongoose');
const userDatabase = mongoose.connection.useDb('user_data');

var UserSchema = new mongoose.Schema({
  username:  String,
  email: {type:String ,  default: ''},
  password: String,
  title:{type:String ,  default: ''},
  gender:{type:String ,  default: ''},
  birthday:  {type:String ,  default: ''},
  location: {type:String ,  default: ''},
  website: {type:String ,  default: ''},
  twitter:{type:String ,  default: ''},
  facebook:{type:String ,  default: ''},
  referrer:   {type:String ,  default: ''},
  bio:{type:String ,  default: ''},

  status: {
    type: String,
    default: 'active'
  },
  
  
  role: {
    type: String,
    default: 'author'
  },  
  facebookID:{type:String ,  default: ''},
  googleId: {type:String ,  default: ''},
  profilePicture: {type:String ,  default: ''}  ,
  resetPasswordToken: {type:String ,  default: ''},
  resetPasswordExpires: Date,
  follows: [String], // Array to store followed authors
  favorites: [String], // Array to store favorite books
  readLater: [String], // Array to store books to read later
  notInterested: [String], // Array to store books marked as not interested
  reading: [String],
  fictions: {
    type: [String],
    default: []
  },
  profilePictureBorder: {type:String ,  default: ''}
});

var Userdb = userDatabase.model('UserDB', UserSchema);


module.exports = Userdb;

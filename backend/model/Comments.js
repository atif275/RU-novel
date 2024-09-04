const mongoose = require('mongoose');
const suggestion = mongoose.connection.useDb('Suggestion');

const CommentSchema = new mongoose.Schema({
    title:String,
  content: {
    type: String,
    
  },
  username: {
    type: String,
   
  },
  email: {
    type: String,
    required: true,
  },
  profilePicture: String,
  category:String,
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Add pre-save hook to update `updatedAt` on update
CommentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Commentdb = suggestion.model('Comment', CommentSchema);

module.exports = Commentdb;

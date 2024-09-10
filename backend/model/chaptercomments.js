const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  author: { type: String },
  pfp: { type: String }, 
  text: { type: String },
  datetime: { type: Date },
  repcount: { type: Number, default: 0 },
  reppedBy: { type: [String], default: [] }, // Array to track users who repped the reply
});

const commentSchema = new mongoose.Schema({
  author: { type: String },
  pfp: { type: String }, 
  text: { type: String },
  book: { type: String },
  chapter: { type: String },
  datetime: { type: Date },
  repcount: { type: Number, default: 0 },
  reppedBy: { type: [String], default: [] }, // Array to track users who repped the comment
  replies: [replySchema],
});

const Comment = mongoose.model('Commentt', commentSchema);

module.exports = Comment;
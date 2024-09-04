const mongoose = require('mongoose');

const borderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    enum: ['level', 'premium'],
    required: true,
  },
}, { timestamps: true });

const Border = mongoose.model('Border', borderSchema);

module.exports = Border;

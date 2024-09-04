// models/UtmTag.js
const mongoose = require('mongoose');

const UtmTagSchema = new mongoose.Schema({
    utm_source: { type: String, required: true },
    utm_medium: { type: String, required: true },
    utm_campaign: { type: String, default: '' },
    utm_term: { type: String, default: '' },
    utm_content: { type: String , default: ''},
    utm_link: { type: String , default: ''},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UtmTag', UtmTagSchema);

const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: String,
  description: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Image', imageSchema);
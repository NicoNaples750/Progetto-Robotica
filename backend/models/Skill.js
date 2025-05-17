const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['Base', 'Intermedio', 'Avanzato'],
    default: 'Base',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Skill', skillSchema);
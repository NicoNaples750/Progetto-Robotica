const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  missionId: { type: String, required: true },
  type: { type: String, enum: ['report', 'update'], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Log', logSchema);
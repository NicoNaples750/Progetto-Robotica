const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descrizione: String,
  stato: {
    type: String,
    enum: ['in_attesa', 'in_corso', 'completata', 'fallita'],
    default: 'in_attesa',
  },
  priorita: { type: String, enum: ['Alta', 'Media', 'Bassa'], default: 'Media' },
  data_creazione: { type: Date, default: Date.now },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false
});

// ✅ Virtuale "id" con controllo di sicurezza
missionSchema.virtual('id').get(function () {
  return this._id ? this._id.toHexString() : null;
});

module.exports = mongoose.model('Mission', missionSchema);






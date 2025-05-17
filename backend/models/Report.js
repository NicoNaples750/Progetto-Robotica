import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  missionId: { type: String, required: true },
  status: {
    type: String,
    enum: ['completata', 'fallita', 'in corso'],
    required: true,
  },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Previene errori se il modello esiste già in fase di hot-reload
export default mongoose.models.Report || mongoose.model('Report', reportSchema);

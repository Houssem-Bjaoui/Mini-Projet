const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: String,
  proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  statut: { type: String, enum: ['en cours', 'terminé', 'en pause'], default: 'en cours' },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);

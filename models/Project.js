const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: String,
  proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  statut: String
}, { timestamps: true });
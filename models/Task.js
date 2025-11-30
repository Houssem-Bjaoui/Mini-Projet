const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: String,
  statut: { type: String, enum: ['todo','doing','done'], default: 'todo' },
  deadline: Date,
  projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  userAssign: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
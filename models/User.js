const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  nom: String,
  login: String,
  password: String,
  role: { type: String, enum: ['user','manager'], default: 'user' }
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
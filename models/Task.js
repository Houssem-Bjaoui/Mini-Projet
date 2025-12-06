// importation de mongoose

const mongoose = require('mongoose');

// schema mta3 task
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // titre obligatoire
  },

  description: {
    type: String,
    required: true, // description obligatoire
  },  

  statut:{
    type: String,
    enum:['todo','doing','done'], // liste mta3 l'etat de statuts
    default:'todo' // par defaut statut todo  
  },

  deadline : Date,

  projet:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projet' // reference l'objet projet
  },


  // user li bch ye5dem task
  // kn manager ynajem ya3ti tesk l user mo3ayen
    userAssigned:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // reference l'objet user 
  }
}, { timestamps: true }); // timestamps pour creation w modification automatique




// exportation du model task
module.exports = mongoose.model('Task', taskSchema);
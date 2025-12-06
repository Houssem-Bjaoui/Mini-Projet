const express = require('express');
const app = express();
require('dotenv').config();


// Middleware pour lire du JSON
app.use(express.json());


const userRoutes = require('./routes/userRoute.js');
app.use('/users', userRoutes);

const authRoutes = require('./routes/authRoute.js');
app.use('/auth', authRoutes);

const projectRoute = require('./routes/projectRoute');
app.use('/projects', projectRoute);


// test
app.get("/", (req, res) => {
  res.send("jawk behi");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});


const mongoose = require('mongoose');

// Connexion MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(" MongoDB connecté");
  } catch (err) {
    console.error(" Erreur MongoDB :", err);
    process.exit(1);
  }
};

connectDB();





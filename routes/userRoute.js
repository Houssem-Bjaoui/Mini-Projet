const express =require ('express');

// importer les methodes de userController.js
const{
    addUser,
    getAllUsers,
    deleteUser,
    getUserById,
    updateUser
} = require ('../controllers/userController');

// créer le routeur
const router = express.Router();

// définir les routes
router.post('/add', addUser);
router.get('/allusers', getAllUsers);
router.delete('/delete/:id', deleteUser);
router.get('/user/:id', getUserById);
router.put('/update/:id', updateUser);

module.exports = router;   


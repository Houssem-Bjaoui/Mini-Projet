const express = require('express');
const {
    login
} = require('../controllers/authController.js');


const verifyToken = require('../middlewares/authMiddleware.js');

const router = express.Router();
// login route
router.post('/login', login);

module.exports = router;
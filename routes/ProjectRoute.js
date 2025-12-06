const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');

// protection ll route par le fichier authMiddleware
router.use(authMiddleware);

// l path elli bsh tkhalina nsn3ou projet
router.post('/add', projectController.addProject);

// nchoufou l projeyet lkl
router.get('/getall', projectController.getProjects);

// nchoufou projet wehed brk
router.get('/getone/:id', projectController.getProjectById);

// modification ll projet
router.put('/update/:id', projectController.updateProject);

// chnfaskhou projet
router.delete('/delete/:id', projectController.deleteProject);

module.exports = router;

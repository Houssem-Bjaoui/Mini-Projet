const express = require("express");
const router = express.Router();


// importer les controllers
const { 
    createTask, 
    getTaskById, 
    updateTask, 
    deleteTask, 
    getAllTasks ,
    createTaskForProject,
    getAllTasksByProject

} = require("../controllers/taskController");
// importer les middlewares
const authMiddleware = require("../middlewares/authMiddleware");
const validateStatus = require("../middlewares/validationMiddleware");

// kol route test7a9 authentication ==> token
router.use(authMiddleware);

// POST : nzidou task jdida
router.post("/addtask", validateStatus, createTask);

// POST : nzidou task jdida l projet mo3ayen
router.post("/addtasktoproject/:projectId", validateStatus, createTaskForProject);

// GET : nraja3 les tasks mta3 projet mo3ayen
router.get("/:projectId", getAllTasksByProject);

// GET : nraja3 les tasks lkol
router.get("/", getAllTasks);

// GET : nraja3 task b ID
router.get("/:id", getTaskById);

// PUT : modifier task
router.put("/update/:id", validateStatus, updateTask);

// DELETE : nfasa5 task
router.delete("/delete/:id", deleteTask);


// exporter le router
module.exports = router;
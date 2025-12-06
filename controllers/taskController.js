const Task = require('./models/task');

// bch nzidou task jdida
const createTask = async (req, res) => {
    try{


        // verifier el user li 3amel request role mte3ou manager
        if(req.body.userAssigned && req.user.role !== 'manager'){
            return res.status(403).json({message: 'kn el manager ynajem ya3ti task l user mo3ayen'});

        // les données mte3 task
        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            statut: req.body.status || 'todo',
            deadline: req.body.deadline,
            projet: req.body.projet,
            userAssigned: req.body.userAssigned 
            });
        return res.status(201).json(task);
        
    }

}catch(error){
        return res.status(500).json({message: 'Erreur serveur', error: error.message});
    };


}

// recuperer task par id

const getTaskById = async (req, res) => {
    try{
// lawej 3la task par id
        const task = await Task.findById(req.params.id);


        // si task mahich mawjouda
        if(!task){
            return res.status(404).json({message: 'Task mouch mawjouda'});
            
        }

        // ken task mawjouda raja3heli
        return res.status(200).json(task);



    }catch(error){
        return res.status(500).json({message: 'Erreur serveur',
             error: error.message});
    }
}



// Update task

const updateTask = async (req, res) => {
    try{
        // nlawjou 3la task par id
        const task = await Task.findById(req.params.id);
        // ken task mahich mawjouda
        if(!task){
            return res.status(404).json({
                message: 'Task mouch mawjouda'});
      }

    // nbadlou les champs l 7abin nbadlouhom
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.deadline = req.body.deadline || task.deadline;
    task.projet = req.body.projet || task.projet;
    task.userAssigned = req.body.userAssigned || task.userAssigned;

    // nsajlou les modifications
    await task.save();
    // nraj3ou task b les  modifications
    return res.status(200).json(task);

}catch(error){
    return res.status(500).json({
        message: 'Erreur serveur', 
        error: error.message});

}
}


// DELETE TASK 
const deleteTask = async (req, res) => {
    try{
        // nlawjou 3la task par id  
        const task = await Task.findByIdAndDelete(req.params.id);

        // ken task mahich mawjouda
        if(!task){
            return res.status(404).json({message: 'Task mouch mawjouda'});
        }

        // nraj3ou message ta3 suppression
        return res.status(200).json({message: 'Task sipprimée'});

    }catch(error){
        return res.status(500).json({
        message: 'Erreur serveur',
        error: error.message});
    }
}


// Get all tasks
const getAllTasks = async (req, res) => {
    try{
        // njibou les tasks lkol
        const tasks = await Task.find();
        // nraj3ouhom
        return res.status(200).json(tasks);
    }catch(error){
        return res.status(500).json({
            message: 'Erreur serveur',
            error: error.message});
    }
}






// exporter les fonctions
module.exports = {
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    getAllTasks
}
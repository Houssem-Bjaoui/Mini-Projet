const Task = require('../models/Task');
const Project = require('../models/Project');

// bch nzidou task jdida
const createTask = async (req, res) => {
    try{


        // verifier el user li 3amel request role mte3ou manager
        if(req.body.userAssigned && req.user.role !== 'manager'){
            return res.status(403).json({message: 'kn el manager ynajem ya3ti task l user mo3ayen'});
        }
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
        
    

}catch(error){
        return res.status(500).json({message: 'Erreur serveur', error: error.message});
    };

}




// nasn3ou task ll projet mo3ayen

const createTaskForProject = async (req, res) => {
  try {
    // nchouf itha el projet mawjouda w ken el user 3andou droit 3lih
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: "Projet inexistant" });

    //  Vérifier les droits de l'utilisateur
    if (req.user.role !== "manager" && !project.proprietaire.equals(req.user._id)) {
      return res.status(403).json({ message: "Pas le droit sur ce projet" });
    }

    // nasn3ou task ll projet
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      statut: req.body.status || "todo",
      deadline: req.body.deadline,
      projet: req.params.projectId, 
      userAssigned: req.body.userAssigned
    });

    // nraj3ou task
    return res.status(201).json(task);

  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};



// recuperer toutes les tasks mta3 projet mo3ayen


const getAllTasksByProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;

        // vérifier kn projet mawjoud
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Projet mouch mawjouda" });
        }

        //  vérifier les droits
        // manager ynejjem ychouf les projets kol
        // user ychouf ken projets li 3andou
        if (req.user.role !== 'manager' && !project.proprietaire.equals(req.user._id)) {
            return res.status(403).json({ message: "Ma 3andekch droit tchouf les tâches ta3 projet hedha" });
        }

        //  récupérer toutes les tâches du projet
        const tasks = await Task.find({ projet: projectId });

        //  retourner les résultats
        return res.status(200).json(tasks);

    } catch (error) {
        return res.status(500).json({ 
            message: "Erreur serveur", 
            error: error.message 
        });
    }
};



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

        let filter = {};
        if (req.query.search) {
            filter.title = { $regex: req.query.search, $options: 'i' };
            //$regex chtlwjelna fi champs nom l kelma eli lawejna 3liha
            // $options tkhalih me yfar9ch bin el Maj wl Min w yjib les rt ezzouz

        }

        //lhnee bch na3mlou tri
        let sortOption = {};

        if (req.query.sort) {
            sortOption[req.query.sort] = 1; //tri par default ykoun croissant
            if (req.query.sort.startsWith("-")) {
                sortOption[req.query.sort.substring(1)] = -1; // ama ken nzidou "-"9bl l critére elli nlwjou 3lih l tri chywalli desc
            }
        }


        // njibou les tasks lkol
        const tasks = await Task.find(filter).sort(sortOption);
        ;
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
    getAllTasks,
    createTaskForProject,
    getAllTasksByProject
}
const Project = require('../models/Project');

// bch nasn3ou projet jdid
const addProject = async (req, res) => {
    try {
        const { nom, description } = req.body;

// manipulation mt3 l message d'error eli yokhrj ki ynsa l user ma yhtch esm ll projet
        if (!nom) {
            return res.status(400).json({ msg: "nsiit ma hatiitch esm ll projet " });
        }
//nlawjou ken fama projet mawjoud bnfs el esm nraj3ou message d'error
        const existingProject = await Project.findOne({ nom });
        if (existingProject) {
            return res.status(400).json({ msg: "hawel tbadel l esm l projet hedha mawjoud" });
        }

// Assignement auto lel propriétaire
        const newProject = new Project({
            nom,
            description,
            proprietaire: req.user.id
        });

        await newProject.save();

//hdhi réponse en cas de succès
        res.status(201).json({
            msg: "Projet ajouté avec succès",
            project: newProject
        });
    } catch (error) {
//w hdhi réponse en cas d'error
        console.error("Erreur création projet:", error);
        res.status(500).json({ msg: "Erreur serveur" });
    }
};

//getprojects traj3lna l projeyet lkl
const getProjects = async (req, res) => {
    try {

// Vérification mt3 rôle
        let filter = {};
// kenoumanager : ychouf les projets lkl
        if (req.user.role !== "manager") {
// kenou user : narj3oulou ken les projets mte3ou
            filter.proprietaire = req.user.id;
        }

        if (req.query.search) {
                // tekhou ml query search el mot elli ktebneha bch nlawjou 3liha
            const search = req.query.search;

            filter.$or = [
                { nom: { $regex: search, $options: "i" } }
                //$regex chtlwjelna fi champs nom l kelma eli lawejna 3liha
                // $options tkhalih me yfar9ch bin el Maj wl Min w yjib les rt ezzouz

            ];
        }

       //lhnee bch na3mlou tri
        let sortOption = {};

        if (req.query.sort) {
            sortOption[req.query.sort] = 1; //tri par default ykoun croissant
            if (req.query.sort.startsWith("-")) {
                sortOption[req.query.sort.substring(1)] = -1; // ama ken nzidou "-"9bl l critére elli nlwjou 3lih l tri chywalli desc
            }
        }

        // find tjiblna les projets l mawjoudin selon el filtre
        const projects = await Project.find(filter).sort(sortOption);

        res.json({
            msg: `Projets récupérés avec succès`,
            count: projects.length,   // nombre total (optionnel mais utile)
            projects
        });

    } catch (error) {
        console.error("Erreur récupération projets:", error);
        res.status(500).json({ msg: "Erreur serveur" });
    }
};


// getProjectById traj3lna l projet wehed
const getProjectById = async (req, res) => {
    try {
//hnee chnlawjou 3l projet mawjoud fl base wla le a travers l'id mte3ou
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ msg: "Projet non trouvé" });
//Vérification  de droit
        if (req.user.role !== "manager" && project.proprietaire.toString() !== req.user.id) {
            return res.status(403).json({ msg: "Accès refusé" });
        }

        res.json({ msg: "Projet récupéré avec succès", project });
    } catch (error) {
        console.error("Erreur récupération projet:", error);
        res.status(500).json({ msg: "Erreur serveur" });
    }
};

// update mt3 projet
const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ msg: "mal9ina hata projet " });
//nchoufou est ce que l user andou lha9 bsh y3ml msj wla lee(manager akhw ynjm yupdati)
        if (req.user.role !== "manager" && project.proprietaire.toString() !== req.user.id) {
            return res.status(403).json({ msg: "Accès refusé" });
        }
//findByIdAndUpdate hiya el funtion eli bsh t5alina n3mlou update
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json({ msg: "Projet mis à jour avec succès", project: updatedProject });
    } catch (error) {
        console.error("Erreur modification projet:", error);
        res.status(500).json({ msg: "Erreur serveur" });
    }
};

// chnfaskhou projet
const deleteProject = async (req, res) => {
    try {
        //hnee chnlawjou 3l projet mawjoud fl base wla le a travers l'id mte3ou

        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ msg: "Projet non trouvé" });

//nchoufou est ce que l user andou lha9 bsh yfasekh wla lee(manager akhw ynjm yfasekh)
        if (req.user.role !== "manager" && project.proprietaire.toString() !== req.user.id) {
            return res.status(403).json({ msg: "Accès refusé" });
        }
//hne chnfskhou l projet a travers la fonction deleteone()
        await project.deleteOne();

//hdhi réponse en cas de succès
        res.json({ msg: "Projet supprimé avec succès" });
    } catch (error) {

//w hdhi réponse en cas d'error
        console.error("Erreur suppression projet:", error);
        res.status(500).json({ msg: "Erreur serveur" });
    }
};

//lhnee bch n3mlou exportation ll functtions mt3na eli chnest7a9ouhm mb3d fi router
module.exports = {
    addProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
};

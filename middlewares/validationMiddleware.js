module.exports = (req, res, next) => {

    const allowed = ["todo", "doing", "done"];

    // ken ma baddalch statut, khalih ya3adé
    if (!req.body.statut) return next();

    // si statut ghalet → erreur
    if (!allowed.includes(req.body.statut)) {
        return res.status(400).json({
            message: "Statut ghalet. Lazim todo / doing / done"
        });
    }

    next(); 
};
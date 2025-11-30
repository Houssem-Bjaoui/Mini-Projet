const User = require('../models/User');
const bcrypt = require('bcrypt');

// bch nzidou user jdid 

const addUser =async (req, res) => {
    try{

        // njibou les donnees l bch nabathouha f body 
        const { nom , login , password, role } =req.body;

        // nverifiw les donnees 
        if( !nom || !login || !password || !role ){
            return res.status(400).json({ 
                msg: 'tous les champs sont obligatoires ' 
            });

        }

        // nverifiw user mawjoud deja wala la

        const existuser = await User.findOne({ login });
        if(existuser){
            return res.status(400).json({
                msg: 'user deja mawjoud '
            });
        }

        // ncryptiw password
        const cryptedPassword = await bcrypt.hash(password, 10);

        // na3mlou user jdid
        const newUser = new User({
            nom,
            login,
            password: cryptedPassword,
            role : role || 'user'
        });

        // nsaviw user f  base de donnees
        await newUser.save();

        res.status(201).json({
            msg: 'user ajoute avec succes ',
            user: { id : newUser._id, nom: newUser.nom, login: newUser.login, role: newUser.role }
        });
    }catch(error){
        console.error("fema mochkla ", error);
        res.status(500).json({
            msg: 'erreur serveur '
        });
    }
};

    module.exports = {
        addUser
    };


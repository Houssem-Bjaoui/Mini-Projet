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


// get all users

const getAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({
            success : true,
            data : users
        });

    }catch(error){
        res.status(500).json({
            msg: 'erreur '
        });
    }

}

// delete user

const deleteUser = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg: 'user tfasa5'
    });
}catch(error){
    res.status(500).json({
        msg: 'erreur'
    });
}
};


// Get user by ID 

const getUserById = async (req, res) => {
    try{

        const {id} = req.params;

        // verifier id

        if(!id){
            return res.status(400).json({
                msg: 'id manajmch yekoun vide'
            });
        }

        // nalwjou 3al user bil id
        const user = await User.findById(id);

        // nchoufou ken mawjoud

        // 1) user mahouch mawjoud
        if(!user){
            return res.status(404).json({
                msg: 'user mahouch mawjoud'
            });

            // 2) user mawjoud

            res.status(200).json({
                success : true,
                data : user
            }); 
        }
        
    
    } catch(error){
        res.status(500).json({
            msg: 'erreur serveur'
        });
    }
}



// Update user

const updateUser = async (req, res) => {
    try{

        // bch na3mlou update lil user bil id
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            // les donnees jdod 
            {...req.body},
            {new : true}
        );

        res.status(200).json({
            msg: 'user mis a jour avec succes',
            data : updatedUser
        });
    }catch(error){
        res.status(500).json({
            msg: 'erreur serveur'
        });
    }


}

// exporter les methodes
    module.exports = {
        addUser,
        getAllUsers,
        deleteUser,
        getUserById, 
        updateUser
    };


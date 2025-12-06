const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// login 

const login = async (req, res) => {
    const {login , password } = req.body;
    try {

        // 1 : recuperer les donnees de login 
        const {login, password } = req.body;

        //2: nchoufou user mawjoud f base 

        const user = await User.findOne({ login });


        //3: kn user mahouch mawjoud n3tiw error
        if (!user) {
            return res.status(404).json({ 
                message: 'mahouch mawjoud'
            });
        }

        // 4 : ncompariw password mte3 l user m3a li f base
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({
                message: 'password ghalet'
            });
        }
            // 5: nasn3ou token
            const token = jwt.sign(
                {
                id: user._id,
                role: user.role,
                nom: user.nom,
                login: user.login
            },
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
            
            );

            // 6 : nraj3ou token l user feha les infos mte3ou (mnghir mot de passe)
            res.status(200).json({
                token,
                user: {
                    id: user._id,
                    nom: user.nom,
                    login: user.login,
                    role: user.role
                },
            });

        }catch (error) {
            console.error('fema mochkla f login:', error);
            res.status(500).json({
                msg: 'fema mochkla f server'
            });

        }
    };

    module.exports = {
        login,
    };



const jwt = require ('jsonwebtoken');

// middleware bch nverifiw user authentifiée wela

const verifyToken = (req, res, next) => {
    
    // 1 : ne5dhou token m les cookies wela headers

    let token = req.cookies.token || req.headers['authorization'];

    if (!token) {
        return res.status(401).json({
            sucess: false,
            msg : 'mkch athentifié'
        });

    }

    // 2: nchoufou validité mte3 token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            //token expiré wela ghalet
            return res.status(403).json({
                success: false,
                msg: 'token expiré wela ghalet'
            });

    }
    //3: token valide 
        req.user = user; // n7otou les infos mte3 user fl request object
        next(); // n3tiw l control ll middleware wela controller jey
    });
}

// export middleware
module.exports = verifyToken;
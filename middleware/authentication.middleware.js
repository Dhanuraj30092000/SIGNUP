const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    console.log(`token received ${token}`) // Remove this later
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decodedUser = jwt.verify(token, 'iam a secret key');
        req.user = decodedUser;
        console.log("Decoded user=", decodedUser)
        if(req.user) {
            next();
        } else {
            res.status(401).json({ error: 'Invalid token' });
        }   
    } catch (error) {
        console.log("Error while with verifying" ,error)
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;

const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, 'iam a secret key');
        req.user = decoded;
        if(req.user) {
            next();
        } else {
            res.status(401).json({ error: 'Invalid token' });
        }   
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;
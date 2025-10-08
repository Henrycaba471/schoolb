const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Authorization  denied' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'UnaP4l4874_s3c74');
        req.user = decoded;
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
}

module.exports = { checkAuth };
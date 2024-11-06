const verifySession = (req, res, next) => {
    if (req.session && req.session.userId) {
        next(); // El usuario está autenticado
    } else {
        res.status(401).json({ error: 'No autorizado' });
    }
};

module.exports = verifySession;
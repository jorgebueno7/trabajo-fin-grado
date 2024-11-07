const verifySession = (req, res, next) => {
    console.log("Verificando sesión...");
    if (req.session && req.session.userId) {
        next();
    } else {
        res.status(401).json({ error: 'No autorizado' });
    }
};

module.exports = verifySession;
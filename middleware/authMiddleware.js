
const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const encabezado = req.headers.authorization;

    if (!encabezado || !encabezado.startsWith('Bearer ')) {
        return res.status(401).json({
            mensaje: 'Acceso denegado. Debés iniciar sesión.'
        });
    }

    const token = encabezado.split(' ')[1];

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = verificado;

        next();
    } catch (error) {
        return res.status(401).json({
            mensaje: 'Token inválido o vencido.'
        });
    }
}

module.exports = verificarToken;

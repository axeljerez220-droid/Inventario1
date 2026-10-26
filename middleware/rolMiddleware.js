
function verificarRol(...rolesPermitidos) {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({
                mensaje: 'Debés iniciar sesión.'
            });
        }

        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                mensaje: 'No tenés permisos para realizar esta acción.'
            });
        }

        next();
    };
}

module.exports = verificarRol;

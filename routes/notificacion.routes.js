
const { Router } = require('express');
const NotificacionController = require('../controllers/notificacion.controller');
const verificarToken = require('../middleware/authMiddleware');
const verificarRol = require('../middleware/rolMiddleware');

const router = Router();

// Consultar: cada usuario ve sus notificaciones.
router.get('/', verificarToken, NotificacionController.getAll);
router.get('/:id', verificarToken, NotificacionController.getById);

// Crear: Administrador o Docente.
// La notificación queda asociada al usuario autenticado.
router.post(
    '/',
    verificarToken,
    verificarRol('Administrador', 'Docente'),
    NotificacionController.create
);

// Actualizar estado: Administrador o propietario.
router.put(
    '/:id',
    verificarToken,
    verificarRol('Administrador', 'Docente'),
    NotificacionController.update
);

// Eliminar: solamente Administrador.
router.delete(
    '/:id',
    verificarToken,
    verificarRol('Administrador'),
    NotificacionController.delete
);

module.exports = router;

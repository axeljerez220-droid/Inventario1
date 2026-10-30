
const { Router } = require('express');
const SolicitudController = require('../controllers/solicitud.controller');
const verificarToken = require('../middleware/authMiddleware');
const verificarRol = require('../middleware/rolMiddleware');

const router = Router();

// Todas las operaciones requieren autenticación

// Consultar solicitudes:
// Administrador ve todas; Docente solamente las propias
router.get('/', verificarToken, SolicitudController.getAll);
router.get('/:id', verificarToken, SolicitudController.getById);

// Crear solicitudes: Administrador y Docente
router.post(
    '/',
    verificarToken,
    verificarRol('Administrador', 'Docente'),
    SolicitudController.create
);

// Modificar solicitudes: solamente Administrador
router.put(
    '/:id',
    verificarToken,
    verificarRol('Administrador'),
    SolicitudController.update
);

// Eliminar solicitudes: solamente Administrador
router.delete(
    '/:id',
    verificarToken,
    verificarRol('Administrador'),
    SolicitudController.delete
);

module.exports = router;

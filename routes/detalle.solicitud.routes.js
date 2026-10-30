
const { Router } = require('express');
const DetalleSolicitudController = require('../controllers/detalle.solicitud.controller');
const verificarToken = require('../middleware/authMiddleware');
const verificarRol = require('../middleware/rolMiddleware');

const router = Router();

// Consultas: requieren iniciar sesión.
router.get('/', verificarToken, DetalleSolicitudController.getAll);

router.get('/solicitud/:id_solicitud',
    verificarToken,
    DetalleSolicitudController.getBySolicitudId
);

// Agregar detalles: Administrador o Docente.
// El controlador verifica que la solicitud pertenezca al docente.
router.post(
    '/',
    verificarToken,
    verificarRol('Administrador', 'Docente'),
    DetalleSolicitudController.create
);

// Modificar y eliminar: solamente Administrador.
router.put(
    '/:id',
    verificarToken,
    verificarRol('Administrador'),
    DetalleSolicitudController.update
);

router.delete(
    '/:id',
    verificarToken,
    verificarRol('Administrador'),
    DetalleSolicitudController.delete
);

module.exports = router;

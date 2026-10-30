
const { Router } = require('express');
const UbicacionController = require('../controllers/ubicacion.controller');
const verificarToken = require('../middleware/authMiddleware');
const verificarRol = require('../middleware/rolMiddleware');

const router = Router();

// Consultar ubicaciones: requiere iniciar sesión
router.get('/', verificarToken, UbicacionController.getAll);
router.get('/:id', verificarToken, UbicacionController.getById);

// Administrar ubicaciones: solamente Administrador
router.post(
    '/',
    verificarToken,
    verificarRol('Administrador'),
    UbicacionController.create
);

router.put(
    '/:id',
    verificarToken,
    verificarRol('Administrador'),
    UbicacionController.update
);

router.delete(
    '/:id',
    verificarToken,
    verificarRol('Administrador'),
    UbicacionController.delete
);

module.exports = router;


const { Router } = require('express');
const MovimientoController = require('../controllers/movimiento.controller');
const verificarToken = require('../middleware/authMiddleware');
const verificarRol = require('../middleware/rolMiddleware');

const router = Router();

// Consultas: requieren autenticación.
router.get('/', verificarToken, MovimientoController.getAll);
router.get('/:id', verificarToken, MovimientoController.getById);

// Registrar: Administrador o Docente.
router.post(
    '/',
    verificarToken,
    verificarRol('Administrador', 'Docente'),
    MovimientoController.create
);

// Eliminar: solamente Administrador.
router.delete(
    '/:id',
    verificarToken,
    verificarRol('Administrador'),
    MovimientoController.delete
);

module.exports = router;

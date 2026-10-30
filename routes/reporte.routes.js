
const { Router } = require('express');
const ReporteController = require('../controllers/reporte.controller');
const verificarToken = require('../middleware/authMiddleware');
const verificarRol = require('../middleware/rolMiddleware');

const router = Router();

// Consultar reportes: cada usuario ve los propios.
router.get('/', verificarToken, ReporteController.getAll);
router.get('/:id', verificarToken, ReporteController.getById);

// Crear reportes: Administrador o Docente.
router.post(
    '/',
    verificarToken,
    verificarRol('Administrador', 'Docente'),
    ReporteController.create
);

// Modificar y eliminar: solamente Administrador.
router.put(
    '/:id',
    verificarToken,
    verificarRol('Administrador'),
    ReporteController.update
);

router.delete(
    '/:id',
    verificarToken,
    verificarRol('Administrador'),
    ReporteController.delete
);

module.exports = router;

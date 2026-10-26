
const { Router } = require('express');
const CategoriaController = require('../controllers/categoria.controller');
const verificarToken = require('../middleware/authMiddleware');
const verificarRol = require('../middleware/rolMiddleware');

const router = Router();

// Consultar categorías: requiere iniciar sesión
router.get('/', verificarToken, CategoriaController.getAll);
router.get('/:id', verificarToken, CategoriaController.getById);

// Administrar categorías: solamente Administrador
router.post(
    '/',
    verificarToken,
    verificarRol('Administrador'),
    CategoriaController.create
);

router.put(
    '/:id',
    verificarToken,
    verificarRol('Administrador'),
    CategoriaController.update
);

router.delete(
    '/:id',
    verificarToken,
    verificarRol('Administrador'),
    CategoriaController.delete
);

module.exports = router;

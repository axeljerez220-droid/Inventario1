
const { Router } = require('express');
const MaterialController = require('../controllers/material.controller');
const verificarToken = require('../middleware/authMiddleware');
const verificarRol = require('../middleware/rolMiddleware');

const router = Router();

// Consultar materiales: requiere iniciar sesión.
router.get('/', verificarToken, MaterialController.getAll);
router.get('/:id', verificarToken, MaterialController.getById);

// Registrar materiales: solo Administrador.
router.post(
    '/',
    verificarToken,
    verificarRol('Administrador'),
    MaterialController.create
);

// Editar materiales: solo Administrador.
router.put(
    '/:id',
    verificarToken,
    verificarRol('Administrador'),
    MaterialController.update
);

// Eliminar materiales: solo Administrador.
router.delete(
    '/:id',
    verificarToken,
    verificarRol('Administrador'),
    MaterialController.delete
);

module.exports = router;
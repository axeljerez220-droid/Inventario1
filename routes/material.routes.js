
const { Router } = require('express');
const MaterialController = require('../controllers/material.controller');
const verificarToken = require('../middleware/authMiddleware');
const verificarRol = require('../middleware/rolMiddleware');

const router = Router();

// Consultar materiales: requiere iniciar sesión
router.get('/', verificarToken, MaterialController.getAll);
router.get('/:id', verificarToken, MaterialController.getById);

// Registrar materiales: requiere iniciar sesión como Administrador
router.post(
    '/',
    verificarToken,
    verificarRol('Administrador'),
    MaterialController.create
);

module.exports = router;


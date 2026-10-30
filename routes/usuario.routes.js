const { Router } = require('express');
const UsuarioController = require('../controllers/usuario.controller');

const verificarToken = require('../middleware/authMiddleware');
const verificarRol = require('../middleware/rolMiddleware');

const router = Router();

// Todas las operaciones requieren autenticación y rol Administrador.
router.get('/', verificarToken, verificarRol('Administrador'), UsuarioController.getAll);

router.get('/:id', verificarToken, verificarRol('Administrador'), UsuarioController.getById);

router.post('/', verificarToken, verificarRol('Administrador'), UsuarioController.create);

router.put('/:id', verificarToken, verificarRol('Administrador'), UsuarioController.update);

router.delete('/:id', verificarToken, verificarRol('Administrador'), UsuarioController.delete);

module.exports = router;
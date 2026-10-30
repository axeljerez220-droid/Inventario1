const { Router } = require('express');

const RolController = require('../controllers/rol.controller');
const verificarToken = require('../middleware/authMiddleware');
const verificarRol = require('../middleware/rolMiddleware');

const router = Router();

// Todas las operaciones requieren ser Administrador.
router.get('/', verificarToken, verificarRol('Administrador'), RolController.getAll);

router.get('/:id', verificarToken, verificarRol('Administrador'), RolController.getById);

router.post('/', verificarToken, verificarRol('Administrador'), RolController.create);

router.put('/:id', verificarToken, verificarRol('Administrador'), RolController.update);

router.delete('/:id', verificarToken, verificarRol('Administrador'), RolController.delete);

module.exports = router;
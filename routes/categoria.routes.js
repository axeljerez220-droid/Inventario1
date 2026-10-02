const { Router } = require('express');
const CategoriaController = require('../controllers/categoria.controller');

const router = Router();

router.get('/', CategoriaController.getAll);
router.get('/:id', CategoriaController.getById);
router.post('/', CategoriaController.create);
router.put('/:id', CategoriaController.update);
router.delete('/:id', CategoriaController.delete);

module.exports = router;
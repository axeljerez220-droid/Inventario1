const { Router } = require('express');
const MovimientoController = require('../controllers/movimiento.controller');

const router = Router();

router.get('/', MovimientoController.getAll);
router.get('/:id', MovimientoController.getById);
router.post('/', MovimientoController.create);
router.delete('/:id', MovimientoController.delete);

module.exports = router;
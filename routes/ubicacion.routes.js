const { Router } = require('express');
const UbicacionController = require('../controllers/ubicacion.controller');

const router = Router();

router.get('/', UbicacionController.getAll);
router.get('/:id', UbicacionController.getById);
router.post('/', UbicacionController.create);
router.put('/:id', UbicacionController.update);
router.delete('/:id', UbicacionController.delete);

module.exports = router;
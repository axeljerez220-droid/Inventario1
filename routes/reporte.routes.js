const { Router } = require('express');
const ReporteController = require('../controllers/reporte.controller');

const router = Router();

router.get('/', ReporteController.getAll);
router.get('/:id', ReporteController.getById);
router.post('/', ReporteController.create);
router.put('/:id', ReporteController.update);
router.delete('/:id', ReporteController.delete);

module.exports = router;
const { Router } = require('express');
const SolicitudController = require('../controllers/solicitud.controller');

const router = Router();

router.get('/', SolicitudController.getAll);
router.get('/:id', SolicitudController.getById);
router.post('/', SolicitudController.create);
router.put('/:id', SolicitudController.update);
router.delete('/:id', SolicitudController.delete);

module.exports = router;
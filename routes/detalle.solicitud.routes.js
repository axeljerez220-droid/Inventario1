const { Router } = require('express');
const DetalleSolicitudController = require('../controllers/detalle_solicitud.controller');

const router = Router();

router.get('/', DetalleSolicitudController.getAll);
router.get('/solicitud/:id_solicitud', DetalleSolicitudController.getBySolicitudId);
router.post('/', DetalleSolicitudController.create);
router.put('/:id', DetalleSolicitudController.update);
router.delete('/:id', DetalleSolicitudController.delete);

module.exports = router;
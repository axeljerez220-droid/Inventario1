const { Router } = require('express');
const NotificacionController = require('../controllers/notificacion.controller');

const router = Router();

router.get('/', NotificacionController.getAll);
router.get('/:id', NotificacionController.getById);
router.post('/', NotificacionController.create);
router.put('/:id', NotificacionController.update);
router.delete('/:id', NotificacionController.delete);

module.exports = router;
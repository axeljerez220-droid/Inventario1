/*const { Router } = require('express');
const MaterialController = require('../controllers/material.controller');

const router = Router();

router.get('/', MaterialController.getAll);
router.get('/:id', MaterialController.getById);
router.post('/', MaterialController.create);
router.put('/:id', MaterialController.update);
router.delete('/:id', MaterialController.delete);

module.exports = router;*/
const { Router } = require('express');
const MaterialController = require('../controllers/material.controller');

const router = Router();

router.get('/', MaterialController.getAll);
router.get('/:id', MaterialController.getById);

module.exports = router;
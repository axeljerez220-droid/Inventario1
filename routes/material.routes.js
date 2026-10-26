

const { Router } = require('express');
const MaterialController = require('../controllers/material.controller');

const router = Router();

// Consultar materiales
router.get('/', MaterialController.getAll);
router.get('/:id', MaterialController.getById);

// Registrar un material
router.post('/', MaterialController.create);

module.exports = router;

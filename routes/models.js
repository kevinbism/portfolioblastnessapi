// routes/models.js
const express = require('express');
const router = express.Router();
const modelsController = require('../controllers/modelsController');

// GET /api/models - Recupera tutti i models
router.get('/', modelsController.getAllModels);

// GET /api/models/:id - Recupera un model specifico
router.get('/:id', modelsController.getModelById);

// POST /api/models - Crea un nuovo model
router.post('/', modelsController.createModel);

// PUT /api/models/:id - Aggiorna un model esistente
router.put('/:id', modelsController.updateModel);

// DELETE /api/models/:id - Elimina un model
router.delete('/:id', modelsController.deleteModel);

module.exports = router;

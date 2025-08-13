// routes/categories.js
const express = require('express');
const router = express.Router();
const demosController = require('../controllers/demosController');

// GET /api/demos - Recupera tutte le demo
router.get('/', demosController.getAllDemos);

// GET /api/demos/:id - Recupera una demo specifica
router.get('/:id', demosController.getDemoById);

// POST /api/demos - Crea una nuova demo
router.post('/', demosController.createDemo);

// PUT /api/demos/:id - Aggiorna una demo esistente
router.put('/:id', demosController.updateDemo);

// DELETE /api/demos/:id - Elimina una demo
router.delete('/:id', demosController.deleteDemo);

module.exports = router;

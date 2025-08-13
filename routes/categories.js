// routes/categories.js
const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// GET /api/categories - Recupera tutte le categorie
router.get('/', categoriesController.getAllCategories);

// GET /api/categories/:id - Recupera una categoria specifica
router.get('/:id', categoriesController.getCategoryById);

// POST /api/categories - Crea una nuova categoria
router.post('/', categoriesController.createCategory);

// PUT /api/categories/:id - Aggiorna una categoria esistente
router.put('/:id', categoriesController.updateCategory);

// DELETE /api/categories/:id - Elimina una categoria
router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;

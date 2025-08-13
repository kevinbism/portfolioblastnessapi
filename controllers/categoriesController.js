// controllers/categoriesController.js
const db = require('../config/database');

// GET - Recupera tutte le categorie
const getAllCategories = async (req, res) => {
  try {
    const [results] = await db.queryAsync('SELECT * FROM categories');
    res.json(results);
  } catch (err) {
    console.error('Errore query GET categories:', err);
    res.status(500).json({ errore: 'Errore durante il recupero delle categorie' });
  }
};

// GET - Recupera una categoria specifica per ID
const getCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const [results] = await db.queryAsync('SELECT * FROM categories WHERE id = ?', [categoryId]);
    if (results.length === 0) {
      return res.status(404).json({ errore: 'Categoria non trovata' });
    }
    res.json(results[0]);
  } catch (err) {
    console.error('Errore query GET category by ID:', err);
    res.status(500).json({ errore: 'Errore durante il recupero della categoria' });
  }
};

// POST - Crea una nuova categoria
const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ errore: 'Il campo name è obbligatorio' });
  }
  try {
    const [result] = await db.queryAsync('INSERT INTO categories (name) VALUES (?)', [name]);
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    console.error('Errore query POST category:', err);
    res.status(500).json({ errore: 'Errore durante la creazione della categoria' });
  }
};

// PUT - Aggiorna una categoria esistente
const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ errore: 'Il campo name è obbligatorio' });
  }
  try {
    const [result] = await db.queryAsync('UPDATE categories SET name = ? WHERE id = ?', [
      name,
      categoryId,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ errore: 'Categoria non trovata' });
    }
    res.status(200).json({ id: categoryId, name });
  } catch (err) {
    console.error('Errore query PUT category:', err);
    res.status(500).json({ errore: "Errore durante l'aggiornamento della categoria" });
  }
};

// DELETE - Elimina una categoria
const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const [result] = await db.queryAsync('DELETE FROM categories WHERE id = ?', [categoryId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ errore: 'Categoria non trovata' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Errore query DELETE category:', err);
    res.status(500).json({ errore: "Errore durante l'eliminazione della categoria" });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

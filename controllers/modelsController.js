const db = require('../config/database');

// GET - Recupera tutti i models
const getAllModels = async (req, res) => {
  try {
    const [results] = await db.queryAsync('SELECT * FROM models');
    res.json(results);
  } catch (err) {
    res.status(500).json({ errore: 'Errore durante il recupero dei models' });
  }
};

// GET - Recupera un model specifico per ID
const getModelById = async (req, res) => {
  const modelId = req.params.id;
  try {
    const [results] = await db.queryAsync('SELECT * FROM models WHERE id = ?', [modelId]);
    if (results.length === 0) {
      return res.status(404).json({ errore: 'Model non trovato' });
    }
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ errore: 'Errore durante il recupero del model' });
  }
};

// POST - Crea un nuovo model
const createModel = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ errore: 'Il campo name è obbligatorio' });
  }
  try {
    const [result] = await db.queryAsync('INSERT INTO models (name) VALUES (?)', [name]);
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    res.status(500).json({ errore: 'Errore durante la creazione del model' });
  }
};

// PUT - Aggiorna un model esistente
const updateModel = async (req, res) => {
  const modelId = req.params.id;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ errore: 'Il campo name è obbligatorio' });
  }
  try {
    const [result] = await db.queryAsync('UPDATE models SET name = ? WHERE id = ?', [
      name,
      modelId,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ errore: 'Model non trovato' });
    }
    res.status(200).json({ id: modelId, name });
  } catch (err) {
    res.status(500).json({ errore: "Errore durante l'aggiornamento del model" });
  }
};

// DELETE - Elimina un model
const deleteModel = async (req, res) => {
  const modelId = req.params.id;
  try {
    const [result] = await db.queryAsync('DELETE FROM models WHERE id = ?', [modelId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ errore: 'Model non trovato' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ errore: "Errore durante l'eliminazione del model" });
  }
};

module.exports = {
  getAllModels,
  getModelById,
  createModel,
  updateModel,
  deleteModel,
};

const db = require('../config/database');

// GET - Recupera tutte le demo
const getAllDemos = async (req, res) => {
  try {
    const [results] = await db.queryAsync('SELECT * FROM demos');
    res.json(results);
  } catch (err) {
    console.error('Errore query GET demos:', err);
    res.status(500).json({ errore: 'Errore durante il recupero delle demo' });
  }
};

// GET - Recupera una demo specifica per ID
const getDemoById = async (req, res) => {
  const demoId = req.params.id;
  try {
    const [results] = await db.queryAsync('SELECT * FROM demos WHERE id = ?', [demoId]);
    if (results.length === 0) {
      return res.status(404).json({ errore: 'Demo non trovata' });
    }
    res.json(results[0]);
  } catch (err) {
    console.error('Errore query GET demo by ID:', err);
    res.status(500).json({ errore: 'Errore durante il recupero della demo' });
  }
};

// POST - Crea una nuova demo
const createDemo = async (req, res) => {
  const { site_url, site_name } = req.body;
  if (!site_name) {
    return res.status(400).json({ errore: 'Il campo site_name è obbligatorio' });
  }
  try {
    const [result] = await db.queryAsync('INSERT INTO demos (site_url, site_name) VALUES (?, ?)', [
      site_url,
      site_name,
    ]);
    res.status(201).json({ id: result.insertId, site_url, site_name });
  } catch (err) {
    console.error('Errore query POST demo:', err);
    res.status(500).json({ errore: 'Errore durante la creazione della demo' });
  }
};

// PUT - Aggiorna una demo esistente
const updateDemo = async (req, res) => {
  const demoId = req.params.id;
  const { site_url, site_name } = req.body;
  if (!site_name) {
    return res.status(400).json({ errore: 'Il campo site_name è obbligatorio' });
  }
  try {
    const [result] = await db.queryAsync(
      'UPDATE demos SET site_url = ?, site_name = ? WHERE id = ?',
      [site_url, site_name, demoId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ errore: 'Demo non trovata' });
    }
    res.status(200).json({ id: demoId, site_url, site_name });
  } catch (err) {
    console.error('Errore query PUT demo:', err);
    res.status(500).json({ errore: "Errore durante l'aggiornamento della demo" });
  }
};

// DELETE - Elimina una demo
const deleteDemo = async (req, res) => {
  const demoId = req.params.id;
  try {
    const [result] = await db.queryAsync('DELETE FROM demos WHERE id = ?', [demoId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ errore: 'Demo non trovata' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Errore query DELETE demo:', err);
    res.status(500).json({ errore: "Errore durante l'eliminazione della demo" });
  }
};

module.exports = {
  getAllDemos,
  getDemoById,
  createDemo,
  updateDemo,
  deleteDemo,
};

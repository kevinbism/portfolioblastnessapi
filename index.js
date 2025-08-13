// index.js
const express = require('express');

const app = express();
const port = 3000;

// Middleware globali
app.use(express.json());

// Import routes
const categoriesRoutes = require('./routes/categories');
const modelsRoutes = require('./routes/models');
const demosRoutes = require('./routes/demos');

// Usa le routes con prefisso API
app.use('/api/categories', categoriesRoutes);
app.use('/api/models', modelsRoutes);
app.use('/api/demos', demosRoutes);

// Route di base (404)
app.get('/', (req, res) => {
  res.status(404).json({
    errore: 'Risorsa non trovata',
  });
});

// Gestione route non trovate
app.use((req, res) => {
  res.status(404).json({
    errore: 'Endpoint non trovato',
    richiesta: `${req.method} ${req.originalUrl}`,
  });
});

// Avvio server
app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});

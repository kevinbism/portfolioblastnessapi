const mysql = require('mysql2');

// Configurazione basata sull'ambiente
const isDevelopment = process.env.NODE_ENV !== 'production';
let db;

if (isDevelopment) {
  // SVILUPPO: Connection singola (semplice)
  db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'blastness_portfolio',
  });

  db.connect(err => {
    if (err) {
      console.error('❌ Errore connessione database:', err);
      process.exit(1);
    }
    console.log('✅ Database connesso (modalità sviluppo)');
  });

  // Per compatibilità con async/await
  db.queryAsync = (...args) => {
    return new Promise((resolve, reject) => {
      db.query(...args, (err, results) => {
        if (err) return reject(err);
        resolve([results]);
      });
    });
  };
} else {
  // PRODUZIONE: Connection Pool (performante)
  db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10, // Max 10 connessioni simultanee
    acquireTimeout: 60000, // 60s timeout per ottenere connessione
    timeout: 60000, // 60s timeout query
    reconnect: true, // Riconnessione automatica
    queueLimit: 0, // Coda illimitata
  });

  console.log('✅ Database pool inizializzato (modalità produzione)');

  // Per compatibilità con async/await
  db.queryAsync = (...args) => {
    return new Promise((resolve, reject) => {
      db.query(...args, (err, results) => {
        if (err) return reject(err);
        resolve([results]);
      });
    });
  };
}

module.exports = db;

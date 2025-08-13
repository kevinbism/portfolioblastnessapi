# Express + MySQL API

Questa è una semplice API Node.js con Express e supporto a MySQL.

## Avvio

1. Assicurati di avere un database MySQL in esecuzione e aggiorna le credenziali in `index.js`.
2. Installa le dipendenze (già fatto):

   ```bash
   npm install
   ```

3. Avvia il server:

   ```bash
   node index.js
   ```

## Endpoints

- `/` : Test API
- `/models` : Restituisce tutti i modelli dalla tabella `models` (deve esistere nel database)

## Note

- Modifica le credenziali MySQL in `index.js` secondo la tua configurazione.
- Crea la tabella `models` nel tuo database per testare l'endpoint `/models`.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db/sequelize');
const brewsRouter = require('./routes/brews');

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/brews', brewsRouter);

// 404 for anything else under /api
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Centralized error handler (catches JSON parse errors etc.)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

async function start() {
  try {
    await sequelize.authenticate();
    // sync() creates the table if it doesn't exist yet. For a bootcamp
    // assessment this is fine; a production app would use migrations.
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Coffee Brew Log API listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to start server:', err);
    process.exit(1);
  }
}

start();

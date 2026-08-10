// Single shared Sequelize instance backed by SQLite.
// The storage path comes from DATABASE_URL (e.g. "file:./dev.db") so it
// can be swapped per environment without touching code.
const path = require('path');
const { Sequelize } = require('sequelize');

const rawUrl = process.env.DATABASE_URL || 'file:./dev.db';
const storagePath = rawUrl.startsWith('file:')
  ? path.resolve(__dirname, '..', '..', rawUrl.replace('file:', ''))
  : rawUrl;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false,
});

module.exports = sequelize;

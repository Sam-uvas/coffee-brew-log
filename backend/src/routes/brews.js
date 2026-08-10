const express = require('express');
const Brew = require('../models/Brew');
const validateBrew = require('./validateBrew');

const router = express.Router();

// GET /api/brews?method=Aeropress
// Lists all brews, newest first. Optional ?method= filters by brew method.
router.get('/', async (req, res) => {
  try {
    const { method } = req.query;
    const brews = await Brew.findAll({
      where: method ? { method: String(method) } : undefined,
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(brews);
  } catch (err) {
    console.error('Failed to list brews:', err);
    res.status(500).json({ error: 'Failed to fetch brews' });
  }
});

// GET /api/brews/:id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid brew id' });
  }
  try {
    const brew = await Brew.findByPk(id);
    if (!brew) return res.status(404).json({ error: 'Brew not found' });
    res.status(200).json(brew);
  } catch (err) {
    console.error('Failed to fetch brew:', err);
    res.status(500).json({ error: 'Failed to fetch brew' });
  }
});

// POST /api/brews
router.post('/', validateBrew, async (req, res) => {
  try {
    const { beans, method, coffeeGrams, waterGrams, rating, tastingNotes } = req.body;
    const brew = await Brew.create({ beans, method, coffeeGrams, waterGrams, rating, tastingNotes });
    res.status(201).json(brew);
  } catch (err) {
    console.error('Failed to create brew:', err);
    res.status(500).json({ error: 'Failed to create brew' });
  }
});

// PUT /api/brews/:id
router.put('/:id', validateBrew, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid brew id' });
  }
  try {
    const brew = await Brew.findByPk(id);
    if (!brew) return res.status(404).json({ error: 'Brew not found' });

    const { beans, method, coffeeGrams, waterGrams, rating, tastingNotes } = req.body;
    await brew.update({ beans, method, coffeeGrams, waterGrams, rating, tastingNotes });
    res.status(200).json(brew);
  } catch (err) {
    console.error('Failed to update brew:', err);
    res.status(500).json({ error: 'Failed to update brew' });
  }
});

// DELETE /api/brews/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'Invalid brew id' });
  }
  try {
    const brew = await Brew.findByPk(id);
    if (!brew) return res.status(404).json({ error: 'Brew not found' });

    await brew.destroy();
    res.status(204).send();
  } catch (err) {
    console.error('Failed to delete brew:', err);
    res.status(500).json({ error: 'Failed to delete brew' });
  }
});

module.exports = router;

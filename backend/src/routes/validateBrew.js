// Validates the request body for POST/PUT /api/brews.
// All fields are required; numeric fields must be positive numbers.
const REQUIRED_FIELDS = [
  'beans',
  'method',
  'coffeeGrams',
  'waterGrams',
  'rating',
  'tastingNotes',
];

function validateBrew(req, res, next) {
  const body = req.body || {};
  const missing = REQUIRED_FIELDS.filter((field) => {
    const value = body[field];
    if (value === undefined || value === null) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    return false;
  });

  if (missing.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: `Missing or empty field(s): ${missing.join(', ')}`,
    });
  }

  const coffeeGrams = Number(body.coffeeGrams);
  const waterGrams = Number(body.waterGrams);
  const rating = Number(body.rating);

  if (!Number.isFinite(coffeeGrams) || coffeeGrams <= 0) {
    return res.status(400).json({ error: 'Validation failed', details: 'coffeeGrams must be a positive number' });
  }
  if (!Number.isFinite(waterGrams) || waterGrams <= 0) {
    return res.status(400).json({ error: 'Validation failed', details: 'waterGrams must be a positive number' });
  }
  if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
    return res.status(400).json({ error: 'Validation failed', details: 'rating must be a number between 0 and 5' });
  }

  // Normalize numeric fields onto the request so the route handler
  // doesn't need to re-parse them.
  req.body.coffeeGrams = coffeeGrams;
  req.body.waterGrams = waterGrams;
  req.body.rating = rating;

  next();
}

module.exports = validateBrew;

// Seeds a few sample brews (matching the wireframe) so the app has
// something to show right after setup. Run with `npm run seed`.
require('dotenv').config();
const sequelize = require('./db/sequelize');
const Brew = require('./models/Brew');

async function main() {
  await sequelize.sync();
  await Brew.bulkCreate([
    {
      beans: 'Zimbabwean highlands',
      method: 'Aeropress',
      coffeeGrams: 15,
      waterGrams: 200,
      rating: 3,
      tastingNotes: 'Heavy body, soft finish, nutty',
    },
    {
      beans: 'Nigerian dark roast',
      method: 'Drip coffee',
      coffeeGrams: 10,
      waterGrams: 120,
      rating: 5,
      tastingNotes: 'Bold, smoky, chocolatey',
    },
    {
      beans: 'Italian decaf',
      method: 'V60',
      coffeeGrams: 20,
      waterGrams: 180,
      rating: 1,
      tastingNotes: 'Flat, watery, bitter aftertaste',
    },
  ]);
  console.log('Seed complete.');
  await sequelize.close();
}

main().catch(async (err) => {
  console.error(err);
  await sequelize.close();
  process.exit(1);
});

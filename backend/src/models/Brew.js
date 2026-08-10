const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

// A single logged brew. Mirrors the fields shown in the Add/Edit
// wireframes: beans, method, coffee/water grams, rating, tasting notes.
const Brew = sequelize.define(
  'Brew',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    beans: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coffeeGrams: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    waterGrams: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tastingNotes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'brews',
    timestamps: true,
  }
);

module.exports = Brew;

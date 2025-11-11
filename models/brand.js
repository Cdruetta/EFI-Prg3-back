'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      this.hasMany(models.Car, { foreignKey: 'marcaId' });
    }

  }
  Brand.init({
    nombre: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Brand',
    freezeTableName: true,
    tableName: 'Brands',
  });
  return Brand;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    static associate(models) {
      this.belongsTo(models.Car, { foreignKey: 'carId' });
      this.belongsTo(models.Client, { foreignKey: 'clientId' });
    }

  }
  Rental.init({
    carId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER,
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    total: DataTypes.DECIMAL,
    estado: DataTypes.STRING,
    metodo_pago: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rental',
    freezeTableName: true,
    tableName: 'Rentals',
  });
  return Rental;
};
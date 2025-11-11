'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
      this.hasMany(models.Rental, { foreignKey: 'clientId' });
    }
  }
  Client.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    documento: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Client',
    freezeTableName: true,
    tableName: 'Clients',
  });
  return Client;
};
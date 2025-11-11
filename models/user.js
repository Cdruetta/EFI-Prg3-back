'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    password: DataTypes.STRING,
    rol: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true,
    tableName: 'Users',
  });
  return User;
};
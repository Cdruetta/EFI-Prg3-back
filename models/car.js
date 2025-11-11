'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      this.belongsTo(models.Brand, { foreignKey: 'marcaId' });
      this.hasMany(models.Rental, { foreignKey: 'carId' });
    }

}
  Car.init({
    marcaId: DataTypes.INTEGER,
    modelo: DataTypes.STRING,
    anio: DataTypes.INTEGER,
    precio_dia: DataTypes.DECIMAL,
    disponible: DataTypes.BOOLEAN,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Car',
    freezeTableName: true,
    tableName: 'Cars',
  });
  return Car;
};
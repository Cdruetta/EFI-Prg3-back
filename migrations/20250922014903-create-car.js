'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      marcaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'brands', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' 
      },
      modelo: {
        type: Sequelize.STRING
      },
      anio: {
        type: Sequelize.INTEGER
      },
      precio_dia: {
        type: Sequelize.DECIMAL
      },
      disponible: {
        type: Sequelize.BOOLEAN
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cars');
  }
};

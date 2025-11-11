'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rentals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      carId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cars',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      clientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clients',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      fecha_inicio: {
        type: Sequelize.DATE,
      },
      fecha_fin: {
        type: Sequelize.DATE,
      },
      total: {
        type: Sequelize.DECIMAL,
      },
      estado: {
        type: Sequelize.STRING
      },
      metodo_pago: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('rentals');
  }
};

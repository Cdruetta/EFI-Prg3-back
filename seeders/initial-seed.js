'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {

    // ---- BRANDS ----
    const brands = await queryInterface.bulkInsert('brands', [
      { nombre: 'Toyota', is_active: true, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Ford', is_active: true, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Chevrolet', is_active: true, createdAt: new Date(), updatedAt: new Date() }
    ], { returning: true });

    // ---- CARS ----
    const cars = await queryInterface.bulkInsert('cars', [
      { marcaId: 1, modelo: 'Hilux', anio: 2022, precio_dia: 35000, disponible: true, is_active: true, createdAt: new Date(), updatedAt: new Date() },
      { marcaId: 1, modelo: 'Corolla', anio: 2021, precio_dia: 25000, disponible: true, is_active: true, createdAt: new Date(), updatedAt: new Date() },
      { marcaId: 2, modelo: 'Ranger', anio: 2023, precio_dia: 42000, disponible: true, is_active: true, createdAt: new Date(), updatedAt: new Date() },
      { marcaId: 3, modelo: 'Onix', anio: 2020, precio_dia: 18000, disponible: true, is_active: true, createdAt: new Date(), updatedAt: new Date() }
    ], { returning: true });

    // ---- CLIENTS ----
    const clients = await queryInterface.bulkInsert('clients', [
      { nombre: 'Juan', apellido: 'Gómez', documento: '30123456', correo: 'juan@example.com', telefono: '3511234567', is_active: true, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Laura', apellido: 'Martínez', documento: '27888999', correo: 'laura@example.com', telefono: '3517654321', is_active: true, createdAt: new Date(), updatedAt: new Date() }
    ], { returning: true });

    // ---- USERS ----
    const hashedAdminPassword = await bcrypt.hash('admin', 10);
    const hashedEmpleadoPassword = await bcrypt.hash('usuario', 10);

    await queryInterface.bulkInsert('users', [
      { nombre: 'Administrador', correo: 'admin@rentacar.com', password: hashedAdminPassword, rol: 'admin', is_active: true, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Usuario', correo: 'usuario@rentacar.com', password: hashedEmpleadoPassword, rol: 'empleado', is_active: true, createdAt: new Date(), updatedAt: new Date() },
    ]);

    // ---- RENTALS ----
    await queryInterface.bulkInsert('rentals', [
      { carId: 1, clientId: 1, fecha_inicio: new Date('2025-01-05'), fecha_fin: new Date('2025-01-10'), total: 175000, estado: 'finalizado', metodo_pago: 'tarjeta', createdAt: new Date(), updatedAt: new Date() },
      { carId: 3, clientId: 2, fecha_inicio: new Date('2025-02-01'), fecha_fin: new Date('2025-02-04'), total: 126000, estado: 'en curso', metodo_pago: 'efectivo', createdAt: new Date(), updatedAt: new Date() }
    ]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rentals', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('clients', null, {});
    await queryInterface.bulkDelete('cars', null, {});
    await queryInterface.bulkDelete('brands', null, {});
  }
};

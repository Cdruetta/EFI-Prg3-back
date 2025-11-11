const express = require('express');
const router = express.Router();
const {
    addCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar
} = require('../controllers/car.controller');
const isAdmin = require('../middlewares/isAdmin');
const verifyToken = require('../middlewares/verifyToken');

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - modelo
 *         - año
 *         - precio_diario
 *         - disponible
 *         - brandId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del auto
 *           example: 1
 *         modelo:
 *           type: string
 *           description: Modelo del auto
 *           example: "Corolla"
 *         año:
 *           type: integer
 *           description: Año de fabricación del auto
 *           example: 2023
 *         color:
 *           type: string
 *           description: Color del auto
 *           example: "Blanco"
 *         precio_diario:
 *           type: number
 *           format: decimal
 *           description: Precio de alquiler por día
 *           example: 50.00
 *         disponible:
 *           type: boolean
 *           description: Si el auto está disponible para alquiler
 *           example: true
 *         brandId:
 *           type: integer
 *           description: ID de la marca del auto
 *           example: 1
 *         Brand:
 *           $ref: '#/components/schemas/Brand'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *           example: "2024-01-15T10:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *           example: "2024-01-15T10:30:00.000Z"
 */

/**
 * @swagger
 * /car:
 *   post:
 *     summary: Crear nuevo auto (solo administradores)
 *     tags: [Autos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CarCreate'
 *     responses:
 *       201:
 *         description: Auto creado exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Marca no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', verifyToken, isAdmin, addCar);

/**
 * @swagger
 * /car:
 *   get:
 *     summary: Obtener todos los autos (público)
 *     tags: [Autos]
 *     responses:
 *       200:
 *         description: Lista de autos obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', getAllCars); // ← pública ahora

/**
 * @swagger
 * /car/{id}:
 *   get:
 *     summary: Obtener auto por ID (público)
 *     tags: [Autos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del auto
 *     responses:
 *       200:
 *         description: Auto encontrado exitosamente
 *       404:
 *         description: Auto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', getCarById); // ← pública ahora

/**
 * @swagger
 * /car/{id}:
 *   put:
 *     summary: Actualizar auto por ID (solo administradores)
 *     tags: [Autos]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', verifyToken, isAdmin, updateCar);

/**
 * @swagger
 * /car/{id}:
 *   delete:
 *     summary: Eliminar auto por ID (solo administradores)
 *     tags: [Autos]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', verifyToken, isAdmin, deleteCar);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
    addRental,
    getAllRentals,
    getRentalById,
    updateRental,
    deleteRental
} = require('../controllers/rental.controller');
const verifyToken = require('../middlewares/verifyToken')
const isAdmin = require('../middlewares/isAdmin')

/**
 * @swagger
 * components:
 *   schemas:
 *     Rental:
 *       type: object
 *       required:
 *         - fecha_inicio
 *         - fecha_fin
 *         - precio_total
 *         - clientId
 *         - carId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del alquiler
 *           example: 1
 *         fecha_inicio:
 *           type: string
 *           format: date
 *           description: Fecha de inicio del alquiler
 *           example: "2024-01-15"
 *         fecha_fin:
 *           type: string
 *           format: date
 *           description: Fecha de fin del alquiler
 *           example: "2024-01-20"
 *         precio_total:
 *           type: number
 *           format: decimal
 *           description: Precio total del alquiler
 *           example: 250.00
 *         estado:
 *           type: string
 *           enum: [activo, finalizado, cancelado]
 *           description: Estado del alquiler
 *           example: "activo"
 *         clientId:
 *           type: integer
 *           description: ID del cliente
 *           example: 1
 *         carId:
 *           type: integer
 *           description: ID del auto
 *           example: 1
 *         Client:
 *           $ref: '#/components/schemas/Client'
 *         Car:
 *           $ref: '#/components/schemas/Car'
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
 *     RentalCreate:
 *       type: object
 *       required:
 *         - fecha_inicio
 *         - fecha_fin
 *         - clientId
 *         - carId
 *       properties:
 *         fecha_inicio:
 *           type: string
 *           format: date
 *           description: Fecha de inicio del alquiler
 *           example: "2024-01-15"
 *         fecha_fin:
 *           type: string
 *           format: date
 *           description: Fecha de fin del alquiler
 *           example: "2024-01-20"
 *         clientId:
 *           type: integer
 *           description: ID del cliente
 *           example: 1
 *         carId:
 *           type: integer
 *           description: ID del auto
 *           example: 1
 *     RentalUpdate:
 *       type: object
 *       properties:
 *         fecha_inicio:
 *           type: string
 *           format: date
 *           description: Fecha de inicio del alquiler
 *           example: "2024-01-16"
 *         fecha_fin:
 *           type: string
 *           format: date
 *           description: Fecha de fin del alquiler
 *           example: "2024-01-21"
 *         estado:
 *           type: string
 *           enum: [activo, finalizado, cancelado]
 *           description: Estado del alquiler
 *           example: "finalizado"
 *         clientId:
 *           type: integer
 *           description: ID del cliente
 *           example: 1
 *         carId:
 *           type: integer
 *           description: ID del auto
 *           example: 1
 */

/**
 * @swagger
 * /rentals:
 *   post:
 *     summary: Crear nuevo alquiler (usuarios registrados)
 *     tags: [Alquileres]
 *     security:
 *       -  bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RentalCreate'
 *     responses:
 *       201:
 *         description: Alquiler creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Cliente o auto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: El auto no está disponible en esas fechas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', verifyToken, addRental);

/**
 * @swagger
 * /rentals:
 *   get:
 *     summary: Obtener todos los alquileres (usuarios registrados)
 *     tags: [Alquileres]
 *     security:
 *       -  bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alquileres obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rental'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/',verifyToken ,getAllRentals);

/**
 * @swagger
 * /rentals/{id}:
 *   get:
 *     summary: Obtener alquiler por ID (usuarios registrados)
 *     tags: [Alquileres]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del alquiler
 *         example: 1
 *     responses:
 *       200:
 *         description: Alquiler encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       404:
 *         description: Alquiler no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id',verifyToken ,getRentalById);

/**
 * @swagger
 * /rentals/{id}:
 *   put:
 *     summary: Actualizar alquiler por ID (solo administradores)
 *     tags: [Alquileres]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del alquiler a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RentalUpdate'
 *     responses:
 *       200:
 *         description: Alquiler actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rental'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Alquiler no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', verifyToken, isAdmin, updateRental);

/**
 * @swagger
 * /rentals/{id}:
 *   delete:
 *     summary: Eliminar alquiler por ID (solo administradores)
 *     tags: [Alquileres]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del alquiler a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Alquiler eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Alquiler eliminado exitosamente"
 *       404:
 *         description: Alquiler no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', verifyToken, isAdmin ,deleteRental);

module.exports = router;

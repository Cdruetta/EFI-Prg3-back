const express = require('express');
const router = express.Router();
const {
    addClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient
} = require('../controllers/client.controller');
const verifyToken = require('../middlewares/verifyToken')
const isAdmin = require('../middlewares/isAdmin')

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido
 *         - email
 *         - telefono
 *         - direccion
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del cliente
 *           example: 1
 *         nombre:
 *           type: string
 *           description: Nombre del cliente
 *           example: "Juan"
 *         apellido:
 *           type: string
 *           description: Apellido del cliente
 *           example: "Pérez"
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del cliente
 *           example: "juan.perez@email.com"
 *         telefono:
 *           type: string
 *           description: Número de teléfono del cliente
 *           example: "+1234567890"
 *         direccion:
 *           type: string
 *           description: Dirección del cliente
 *           example: "Calle Principal 123, Ciudad"
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
 *     ClientCreate:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido
 *         - email
 *         - telefono
 *         - direccion
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del cliente
 *           example: "Juan"
 *         apellido:
 *           type: string
 *           description: Apellido del cliente
 *           example: "Pérez"
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del cliente
 *           example: "juan.perez@email.com"
 *         telefono:
 *           type: string
 *           description: Número de teléfono del cliente
 *           example: "+1234567890"
 *         direccion:
 *           type: string
 *           description: Dirección del cliente
 *           example: "Calle Principal 123, Ciudad"
 *     ClientUpdate:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del cliente
 *           example: "Juan Carlos"
 *         apellido:
 *           type: string
 *           description: Apellido del cliente
 *           example: "Pérez García"
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del cliente
 *           example: "juan.perez.garcia@email.com"
 *         telefono:
 *           type: string
 *           description: Número de teléfono del cliente
 *           example: "+1234567891"
 *         direccion:
 *           type: string
 *           description: Dirección del cliente
 *           example: "Avenida Nueva 456, Ciudad"
 */

/**
 * @swagger
 * /client:
 *   post:
 *     summary: Crear nuevo cliente (usuario registrado)
 *     tags: [Clientes]
 *     security:
 *       -  bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientCreate'
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: El email ya está registrado
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
router.post('/',verifyToken,addClient);

/**
 * @swagger
 * /client:
 *   get:
 *     summary: Obtener todos los clientes (usuario registrado)
 *     tags: [Clientes]
 *     security:
 *       -  bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/',verifyToken ,getAllClients);

/**
 * @swagger
 * /client/{id}:
 *   get:
 *     summary: Obtener cliente por ID (usuario registrado)
 *     tags: [Clientes]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *         example: 1
 *     responses:
 *       200:
 *         description: Cliente encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente no encontrado
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
router.get('/:id',verifyToken ,getClientById);

/**
 * @swagger
 * /client/{id}:
 *   put:
 *     summary: Actualizar cliente por ID (administradores)
 *     tags: [Clientes]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientUpdate'
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Cliente no encontrado
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
router.put('/:id', verifyToken,isAdmin, updateClient);

/**
 * @swagger
 * /client/{id}:
 *   delete:
 *     summary: Eliminar cliente por ID (administradores)
 *     tags: [Clientes]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cliente eliminado exitosamente"
 *       404:
 *         description: Cliente no encontrado
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
router.delete('/:id', verifyToken, isAdmin,deleteClient);

module.exports = router;

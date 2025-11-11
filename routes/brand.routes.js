const express = require('express');
const router = express.Router();
const {
    addBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand
} = require('../controllers/brand.controller');
const verifyToken = require('../middlewares/verifyToken')
const isAdmin = require('../middlewares/isAdmin')

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       required:
 *         - nombre
 *         - pais
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la marca
 *           example: 1
 *         nombre:
 *           type: string
 *           description: Nombre de la marca
 *           example: "Toyota"
 *         pais:
 *           type: string
 *           description: País de origen de la marca
 *           example: "Japón"
 *         descripcion:
 *           type: string
 *           description: Descripción de la marca
 *           example: "Marca japonesa de vehículos"
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
 *     BrandCreate:
 *       type: object
 *       required:
 *         - nombre
 *         - pais
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de la marca
 *           example: "Toyota"
 *         pais:
 *           type: string
 *           description: País de origen de la marca
 *           example: "Japón"
 *         descripcion:
 *           type: string
 *           description: Descripción de la marca
 *           example: "Marca japonesa de vehículos"
 *     BrandUpdate:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de la marca
 *           example: "Toyota Motor Corporation"
 *         pais:
 *           type: string
 *           description: País de origen de la marca
 *           example: "Japón"
 *         descripcion:
 *           type: string
 *           description: Descripción de la marca
 *           example: "Marca japonesa líder en vehículos híbridos"
 */

/**
 * @swagger
 * /brand:
 *   post:
 *     summary: Crear nueva marca (solo administradores)
 *     tags: [Marcas]
 *     security:
 *       -  bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BrandCreate'
 *     responses:
 *       201:
 *         description: Marca creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: La marca ya existe
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
router.post('/',verifyToken, isAdmin, addBrand);

/**
 * @swagger
 * /brand:
 *   get:
 *     summary: Obtener todas las marcas (usuarios registrados)
 *     tags: [Marcas]
 *     security:
 *       -  bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de marcas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', verifyToken,getAllBrands);

/**
 * @swagger
 * /brand/{id}:
 *   get:
 *     summary: Obtener marca por ID (usuarios registrados)
 *     tags: [Marcas]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la marca
 *         example: 1
 *     responses:
 *       200:
 *         description: Marca encontrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Marca no encontrada
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
router.get('/:id',verifyToken ,getBrandById);

/**
 * @swagger
 * /brand/{id}:
 *   put:
 *     summary: Actualizar marca por ID (solo administradores)
 *     tags: [Marcas]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la marca a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BrandUpdate'
 *     responses:
 *       200:
 *         description: Marca actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Marca no encontrada
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
router.put('/:id', verifyToken,isAdmin,updateBrand);

/**
 * @swagger
 * /brand/{id}:
 *   delete:
 *     summary: Eliminar marca por ID (solo administradores)
 *     tags: [Marcas]
 *     security:
 *       -  bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la marca a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Marca eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Marca eliminada exitosamente"
 *       404:
 *         description: Marca no encontrada
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
router.delete('/:id',verifyToken, isAdmin, deleteBrand);

module.exports = router;

// routes/user.routes.js
const express = require('express');
const router = express.Router();

const { getRoles } = require('../controllers/roles.controller');
const {
    register,
    updateUser,
    deleteUser,
    getUser,
    getUserById
} = require('../controllers/user.controller');

const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegister:
 *       type: object
 *       required:
 *         - nombre
 *         - correo
 *         - password
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre completo del usuario
 *           example: "Juan Pérez"
 *         correo:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *           example: "juan@ejemplo.com"
 *         password:
 *           type: string
 *           minLength: 6
 *           description: Contraseña del usuario
 *           example: "password123"
 *         rol:
 *           type: string
 *           enum: [admin, empleado]
 *           description: Rol del usuario (opcional, por defecto "empleado")
 *           example: "admin"
 *     UserUpdate:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *         correo:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 6
 *         rol:
 *           type: string
 *           enum: [admin, empleado]
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Juan Pérez"
 *         correo:
 *           type: string
 *           example: "juan@ejemplo.com"
 *         rol:
 *           type: string
 *           example: "admin"
 *         is_active:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Registrar nuevo usuario (requiere sesión; p.ej. sólo admin crea usuarios)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Datos inválidos o correo existente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
router.post('/register', verifyToken, register);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Obtener todos los usuarios (Solo administradores)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 *       500:
 *         description: Error interno
 */
router.get('/', verifyToken, getUser);

/**
 * @swagger
 * /user/roles:
 *   get:
 *     summary: Obtener roles disponibles
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de roles
 *       500:
 *         description: Error interno
 */

router.get('/roles', getRoles);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Obtener usuario por Id (Solo administradores)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario obtenido
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: No encontrado
 *       500:
 *         description: Error interno
 */
router.get('/:id', verifyToken, getUserById);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Actualizar usuario por ID (Solo administradores)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: No encontrado
 *       500:
 *         description: Error interno
 */
router.put('/:id', verifyToken, isAdmin, updateUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Eliminar usuario por ID (Solo administradores)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: No encontrado
 *       500:
 *         description: Error interno
 */
router.delete('/:id', verifyToken, isAdmin, deleteUser);

module.exports = router;


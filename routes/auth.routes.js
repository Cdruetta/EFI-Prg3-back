const express = require("express");
const router = express.Router();
const { login, me, forgotPassword, resetPassword } = require("../controllers/auth.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - correo
 *         - password
 *       properties:
 *         correo:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario
 *           example: "usuario@ejemplo.com"
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *           example: "password123"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Login exitoso"
 *         token:
 *           type: string
 *           description: JWT token para autenticación
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             nombre:
 *               type: string
 *               example: "Juan Pérez"
 *             correo:
 *               type: string
 *               example: "usuario@ejemplo.com"
 *             rol:
 *               type: string
 *               example: "admin"
 *     User:
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
 *           example: "usuario@ejemplo.com"
 *         rol:
 *           type: string
 *           example: "admin"
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Error message"
 *         error:
 *           type: string
 *           example: "Detailed error description"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               usuario_no_encontrado:
 *                 value:
 *                   message: "Usuario no encontrado"
 *               password_incorrecta:
 *                 value:
 *                   message: "Contraseña incorrecta"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtener información del usuario autenticado
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Token no proporcionado o inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               no_token:
 *                 value:
 *                   error: "No token provided"
 *               token_invalido:
 *                 value:
 *                   error: "Token inválido o expirado"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/me", me);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword)

module.exports = router;
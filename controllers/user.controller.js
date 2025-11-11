const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Registrar usuario
const register = async (req, res) => {
    const { nombre, correo, password, rol } = req.body;

    try {
        const userExist = await User.findOne({ where: { correo } });
        if (userExist) return res.status(400).json({ message: 'El usuario ya existe con ese Email' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            nombre,
            correo,
            password: hashedPassword,
            rol: rol || 'empleado',
            is_active: true
        });

        res.status(201).json({ message: 'Usuario registrado exitosamente', data: newUser });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al crear el usuario', error: error.message });
    }
};

// Editar usuario
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, password, rol } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        let hashedPassword = user.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        await user.update({
            nombre: nombre || user.nombre,
            correo: correo || user.correo,
            password: hashedPassword,
            rol: rol || user.rol
        });

        res.status(200).json({ message: 'Usuario actualizado exitosamente', data: user });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al actualizar el usuario', error: error.message });
    }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        await user.update({ is_active: false });

        res.status(200).json({ message: 'Usuario eliminado (inactivado) exitosamente' });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al eliminar el usuario', error: error.message });
    }
};


const getUser = async (req, res) => {
    try {
        const user = await User.findAll();
        res.json({ status: 200, data: user });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener usuarios', error: error.message });
    }
};


const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.status(200).json({ data: user });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener el usuario', error: error.message });
    }
};

module.exports = { register, updateUser, deleteUser, getUser, getUserById };

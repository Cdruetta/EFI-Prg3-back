const { Client } = require('../models');

const addClient = async (req, res) => {
    const { nombre, apellido, documento, correo, telefono } = req.body;

    try {
        const clientExist = await Client.findOne({ where: { documento } });
        if (clientExist) return res.status(400).json({ message: 'El cliente ya existe con ese DNI' });

        const newClient = await Client.create({
            nombre,
            apellido,
            documento,
            correo,
            telefono,
            is_active: true
        });

        res.status(201).json({ message: 'Cliente registrado exitosamente', data: newClient });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al crear el cliente', error: error.message });
    }
};

const getAllClients = async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.status(200).json({ data: clients });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener los clientes', error: error.message });
    }
};


const getClientById = async (req, res) => {
    const { id } = req.params;

    try {
        const client = await Client.findByPk(id);
        if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });

        res.status(200).json({ data: client });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener el cliente', error: error.message });
    }
};

const updateClient = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, documento, correo, telefono, is_active } = req.body;

    try {
        const client = await Client.findByPk(id);
        if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });

        await client.update({ nombre, apellido, documento, correo, telefono, is_active });

        res.status(200).json({ message: 'Cliente actualizado correctamente', data: client });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al actualizar el cliente', error: error.message });
    }
};

const deleteClient = async (req, res) => {
    const { id } = req.params;

    try {
        const client = await Client.findByPk(id);
        if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });

        await client.destroy();

        res.status(200).json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al eliminar el cliente', error: error.message });
    }
};

module.exports = {
    addClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient
};

const { Car, Brand } = require('../models');

const addCar = async (req, res) => {
    const { brandId, modelo, anio, precio_dia, disponible } = req.body;
    try {
        const brand = await Brand.findByPk(brandId);
        if (!brand) return res.status(404).json({ message: 'Marca no encontrada' });

        const newCar = await Car.create({ brandId, modelo, anio, precio_dia, disponible, is_active: true });
        res.status(201).json({ message: 'Auto registrado exitosamente', data: newCar });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al crear el auto', error: error.message });
    }
};

const getAllCars = async (req, res) => {
    try {
        const cars = await Car.findAll({ include: { model: Brand, attributes: ['nombre'] } });
        res.status(200).json({ data: cars });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener los autos', error: error.message });
    }
};

const getCarById = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.findByPk(id, { include: { model: Brand, attributes: ['nombre'] } });
        if (!car) return res.status(404).json({ message: 'Auto no encontrado' });

        res.status(200).json({ data: car });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener el auto', error: error.message });
    }
};

const updateCar = async (req, res) => {
    const { id } = req.params;
    const { brandId, modelo, anio, precio_dia, disponible, is_active } = req.body;
    try {
        const car = await Car.findByPk(id);
        if (!car) return res.status(404).json({ message: 'Auto no encontrado' });

        await car.update({ brandId, modelo, anio, precio_dia, disponible, is_active });
        res.status(200).json({ message: 'Auto actualizado correctamente', data: car });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al actualizar el auto', error: error.message });
    }
};

const deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.findByPk(id);
        if (!car) return res.status(404).json({ message: 'Auto no encontrado' });

        await car.destroy();
        res.status(200).json({ message: 'Auto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al eliminar el auto', error: error.message });
    }
};

module.exports = { addCar, getAllCars, getCarById, updateCar, deleteCar };

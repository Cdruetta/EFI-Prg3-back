const { Brand } = require('../models');

const addBrand = async (req, res) => {
    const { nombre } = req.body;
    try {
        const brandExist = await Brand.findOne({ where: { nombre } });
        if (brandExist) return res.status(400).json({ message: 'La marca ya existe' });

        const newBrand = await Brand.create({ nombre, is_active: true });
        res.status(201).json({ message: 'Marca registrada exitosamente', data: newBrand });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al crear la marca', error: error.message });
    }
};

const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.findAll();
        res.status(200).json({ data: brands });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener las marcas', error: error.message });
    }
};

const getBrandById = async (req, res) => {
    const { id } = req.params;
    try {
        const brand = await Brand.findByPk(id);
        if (!brand) return res.status(404).json({ message: 'Marca no encontrada' });

        res.status(200).json({ data: brand });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener la marca', error: error.message });
    }
};

const updateBrand = async (req, res) => {
    const { id } = req.params;
    const { nombre, is_active } = req.body;
    try {
        const brand = await Brand.findByPk(id);
        if (!brand) return res.status(404).json({ message: 'Marca no encontrada' });

        await brand.update({ nombre, is_active });
        res.status(200).json({ message: 'Marca actualizada correctamente', data: brand });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al actualizar la marca', error: error.message });
    }
};

const deleteBrand = async (req, res) => {
    const { id } = req.params;
    try {
        const brand = await Brand.findByPk(id);
        if (!brand) return res.status(404).json({ message: 'Marca no encontrada' });

        await brand.destroy();
        res.status(200).json({ message: 'Marca eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al eliminar la marca', error: error.message });
    }
};

module.exports = { addBrand, getAllBrands, getBrandById, updateBrand, deleteBrand };

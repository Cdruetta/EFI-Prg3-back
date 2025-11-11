const { Rental, Car, Client } = require('../models');

const addRental = async (req, res) => {
    const { carId, clientId, fecha_inicio, fecha_fin, total, estado, metodo_pago } = req.body;

    try {
        // Verificar que el auto exista
        const car = await Car.findByPk(carId);
        if (!car) return res.status(404).json({ message: 'Auto no encontrado' });

        // Verificar que el cliente exista
        const client = await Client.findByPk(clientId);
        if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });

        // ✅ Verificar que el auto esté disponible
        if (!car.disponible) {
            return res.status(400).json({ message: 'El vehículo no está disponible para alquiler' });
        }

        // Crear el nuevo alquiler
        const newRental = await Rental.create({
            carId,
            clientId,
            fecha_inicio,
            fecha_fin,
            total,
            estado,
            metodo_pago
        });

        // ✅ Marcar el vehículo como "no disponible"
        await car.update({ disponible: false });

        res.status(201).json({
            message: 'Alquiler registrado exitosamente. Vehículo marcado como no disponible.',
            data: newRental
        });

    } catch (error) {
        console.error("❌ Error al crear el alquiler:", error);
        res.status(500).json({
            status: 500,
            message: 'Error al crear el alquiler',
            error: error.message
        });
    }
};

const getAllRentals = async (req, res) => {
    try {
        const rentals = await Rental.findAll({
            include: [
                { model: Car, attributes: ['modelo'] },
                { model: Client, attributes: ['nombre', 'apellido'] }
            ]
        });
        res.status(200).json({ data: rentals });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener los alquileres', error: error.message });
    }
};

const getRentalById = async (req, res) => {
    const { id } = req.params;
    try {
        const rental = await Rental.findByPk(id, {
            include: [
                { model: Car, attributes: ['modelo'] },
                { model: Client, attributes: ['nombre', 'apellido'] }
            ]
        });
        if (!rental) return res.status(404).json({ message: 'Alquiler no encontrado' });

        res.status(200).json({ data: rental });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener el alquiler', error: error.message });
    }
};

const updateRental = async (req, res) => {
    const { id } = req.params;
    const { carId, clientId, fecha_inicio, fecha_fin, total, estado, metodo_pago } = req.body;
    try {
        const rental = await Rental.findByPk(id);
        if (!rental) return res.status(404).json({ message: 'Alquiler no encontrado' });

        await rental.update({ carId, clientId, fecha_inicio, fecha_fin, total, estado, metodo_pago });
        res.status(200).json({ message: 'Alquiler actualizado correctamente', data: rental });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al actualizar el alquiler', error: error.message });
    }
};

const deleteRental = async (req, res) => {
    const { id } = req.params;
    try {
        const rental = await Rental.findByPk(id);
        if (!rental) return res.status(404).json({ message: 'Alquiler no encontrado' });

        // ✅ Cuando se elimina el alquiler, volver a poner el auto disponible (opcional)
        const car = await Car.findByPk(rental.carId);
        if (car) await car.update({ disponible: true });

        await rental.destroy();
        res.status(200).json({ message: 'Alquiler eliminado correctamente. Vehículo disponible nuevamente.' });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al eliminar el alquiler', error: error.message });
    }
};

module.exports = { addRental, getAllRentals, getRentalById, updateRental, deleteRental };

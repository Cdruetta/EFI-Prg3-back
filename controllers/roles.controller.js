const  Roles  = require('../config/roles.json')
const getRoles = async (req, res) => {
    try {
        const roles = Roles;
        res.json({ status: 200, data: roles });
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error al obtener roles', error: error.message });
    }
};
module.exports = {
    getRoles
};
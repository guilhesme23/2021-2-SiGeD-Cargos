const { getUser } = require('../Services/Axios/clientService');
const validation = require('../Utils/validate');
const Role = require('../Models/RoleSchema');
const moment = require('moment-timezone');

const putRole = async(req, res) => {
    const { name, description } = req.body
    const validFields = validation.validateRole({ name, description })
    if (validFields.length) {
        return res.status(400).json({ status: validFields });
    }
    const newRole = await Role.create({
        name,
        description,
        createdAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
        updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    });
    return res.json(newRole);
};

const getRole = async(req, res) => {
    const roles = await Role.find();
    console.log(roles)
    return res.status(200).json(roles)
}

module.exports = {
    putRole,
    getRole
};
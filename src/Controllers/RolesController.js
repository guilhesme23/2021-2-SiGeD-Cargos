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
    const { id } = req.params
    const role = await Role.findOne({ _id: id });
    return res.status(200).json(role)
}

const queryRole = async(req, res) => {
    const { _id, name, description, createdAt, updatedAt } = req.body
    const requestObj = { _id, name, description, createdAt, updatedAt }

    /* Remove key:undefined */
    Object.keys(requestObj).forEach(key => requestObj[key] === undefined ? delete requestObj[key] : {});

    console.log(requestObj)
    const roles = await Role.find(requestObj)
    return res.status(200).json(roles)
}

const deleteRole = async(req, res) => {
    const { id } = req.params
    await Role.deleteOne({ _id: id });
    return res.status(200).json({ message: 'success' });
}

module.exports = {
    putRole,
    getRole,
    queryRole,
    deleteRole
};
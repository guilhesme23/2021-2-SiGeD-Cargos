const moment = require('moment-timezone');
const validation = require('../Utils/validate');
const Role = require('../Models/RoleSchema');


const apiRoles = {
  async putRole (req, res) {
    const { name, description } = req.body;
    const validFields = validation.validateRole({ name, description });
    if (validFields.length) {
      return res.status(400).json({ status: validFields });
    }
    const newRole = await Role.create({
      name,
      description,
      active: true,
      createdAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    });
    return res.json(newRole);
  },

  async getAll(req, res) {
    const role = await Role.find({ active: true });
    return res.status(200).json(role);
  },

  async getRole(req, res) {
    const { id } = req.params;
    const role = await Role.findOne({ _id: id });
    return res.status(200).json(role);
  },

  async queryRole(req, res) {
    const { _id, name, description, createdAt, updatedAt, } = req.body;
    const requestObj = { _id, name, description, createdAt, updatedAt };

    /* Remove key:undefined */
    Object.keys(requestObj).forEach((key) => (requestObj[key] === undefined ? delete requestObj[key] : {}));

    const roles = await Role.find(requestObj);
    return res.status(200).json(roles);
  },

  async deleteRole(req, res) {
    const { id } = req.params;
    await Role.deleteOne({ _id: id });
    return res.status(200).json({ message: 'success' });
  },

  async patchRole(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    const requestObj = { name, description };

    /* Remove key:undefined */
    Object.keys(requestObj).forEach((key) => (requestObj[key] === undefined ? delete requestObj[key] : {}));

    const updateStatus = await Role.findOneAndUpdate({ _id: id }, {
      ...requestObj,
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    });
    return res.status(200).json(updateStatus);
  },

  async deactivateRole (req, res) {
    const { id } = req.params;
    const updateStatus = await Role.findOneAndUpdate({ _id: id }, { active: false });
    return res.status(200).json(updateStatus);
  }
};

module.exports = apiRoles;

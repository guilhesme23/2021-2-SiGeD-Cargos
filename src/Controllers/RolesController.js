const moment = require("moment-timezone");
const validation = require("../Utils/validate");
const Role = require("../Models/RoleSchema");
const clientsService = require("../Services/clientsService")

const putRole = async (req, res) => {
  const { name, description } = req.body;
  const validFields = validation.validateRole({ name, description });
  if (validFields.length) {
    return res.status(400).json({ status: validFields });
  }
  const newRole = await Role.create({
    name,
    description,
    active: true,
    createdAt: moment
      .utc(moment.tz("America/Sao_Paulo").format("YYYY-MM-DDTHH:mm:ss"))
      .toDate(),
    updatedAt: moment
      .utc(moment.tz("America/Sao_Paulo").format("YYYY-MM-DDTHH:mm:ss"))
      .toDate(),
  });
  return res.json(newRole);
};

const getAll = async (req, res) => {
  const role = await Role.find({
    active: true
  });
  return res.status(200).json(role);
};

const getRole = async (req, res) => {
  const { id } = req.params;
  const role = await Role.findOne({ _id: id, active: true });
  return res.status(200).json(role);
};

const queryRole = async (req, res) => {
  const { _id, name, description, createdAt, updatedAt } = req.body;
  const requestObj = {
    _id,
    name,
    description,
    createdAt,
    updatedAt
  };

  /* Remove key:undefined */
  Object.keys(requestObj).forEach((key) =>
    requestObj[key] === undefined ? delete requestObj[key] : {}
  );

  console.log(requestObj);
  const roles = await Role.find(requestObj);
  return res.status(200).json(roles);
};

const deleteRole = async (req, res) => {
  // Get request data
  const { id } = req.params;
  const token = req.headers["x-access-token"];
  // Find role name
  const role = await Role.findOne({
    _id: id
  })

  // Check if exist user with role
  const clients = await clientsService.getUsersWithRole(role.name, token)

  if (Array.isArray(clients) && clients.length) {
    return res.status(409).json({
      message: `Role ${role.name} is being used`
    })

  } else {
    const updated = await Role.findOneAndUpdate(
      { _id: id, active: true },
      {
        updatedAt: moment
          .utc(moment.tz("America/Sao_Paulo").format("YYYY-MM-DDTHH:mm:ss"))
          .toDate(),
        active: false,
      }
    );

    console.log(updated);
    return res.status(200).json({ message: "success" });
  }
};

const patchRole = async (req, res) => {
  const { id } = req.params;
  const { name, description, active } = req.body;
  const requestObj = { name, description, active };

  /* Remove key:undefined */
  Object.keys(requestObj).forEach((key) =>
    requestObj[key] === undefined ? delete requestObj[key] : {}
  );

  const updateStatus = await Role.findOneAndUpdate(
    { _id: id },
    {
      ...requestObj,
      updatedAt: moment
        .utc(moment.tz("America/Sao_Paulo").format("YYYY-MM-DDTHH:mm:ss"))
        .toDate(),
    }
  );
  return res.status(200).json(updateStatus);
};

module.exports = {
  putRole,
  getRole,
  getAll,
  queryRole,
  deleteRole,
  patchRole,
};

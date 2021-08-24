const express = require('express');
const { verifyJWT } = require('./Utils/functionsJWT');

const routes = express.Router();
const RolesController = require('./Controllers/RolesController');

routes.post('/role', verifyJWT, RolesController.putRole);
routes.get('/role/:id', verifyJWT, RolesController.getRole);
routes.patch('/role/:id', verifyJWT, RolesController.patchRole);
routes.delete('/role/:id', verifyJWT, RolesController.deleteRole);
routes.post('/role/query', verifyJWT, RolesController.queryRole);

module.exports = routes;
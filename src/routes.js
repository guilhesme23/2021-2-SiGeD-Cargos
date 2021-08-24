const express = require('express');
const { verifyJWT } = require('./Utils/functionsJWT');

const routes = express.Router();
const RolesController = require('./Controllers/RolesController');

routes.post('/role', verifyJWT, RolesController.putRole);
routes.get('/role/:id', verifyJWT, RolesController.getRole);
routes.post('/role/query', verifyJWT, RolesController.queryRole);

module.exports = routes;
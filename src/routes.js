const express = require('express');
const { verifyJWT } = require('./Utils/functionsJWT');

const routes = express.Router();
const RolesController = require('./Controllers/RolesController');

routes.get('/sample', verifyJWT, RolesController.sampleGet);

module.exports = routes;
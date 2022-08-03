const express = require('express');

const routes = express.Router();
const ctrl = require('./Controllers/RolesController');

routes.post('/role', ctrl.putRole);
routes.get('/role', ctrl.getAll);
routes.get('/role/:id', ctrl.getRole);
routes.patch('/role/:id', ctrl.patchRole);
routes.patch('/role/:id/deactivate', ctrl.deactivateRole);
routes.delete('/role/:id', ctrl.deleteRole);
routes.post('/role/query', ctrl.queryRole);

module.exports = routes;

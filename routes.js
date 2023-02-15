const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const contactController = require('./src/controllers/contactController');
const loginController = require('./src/controllers/loginController');
const {loginRequired} = require('./src/middleware/middlewareGlob');

// Rotas home
route.get('/', homeController.index);

// route.get('/contact', contactController.pageContact);

// Rotas de login
route.get('/login', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/index', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de contato
route.get('/contact/index', loginRequired, contactController.index);
route.post('/contact/register', loginRequired, contactController.register);
route.get('/contact/index/:id', loginRequired, contactController.editIndex);
route.post('/contact/edit/:id', loginRequired, contactController.edit);
route.get('/contact/delete/:id', loginRequired, contactController.delete);

module.exports = route;
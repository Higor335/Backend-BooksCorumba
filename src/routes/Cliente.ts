import express from 'express';
import ClienteController from '../controllers/ClienteControllers';
const clienteRoutes = express.Router();

clienteRoutes.post('/cliente/new', ClienteController.create);
clienteRoutes.get('/cliente/list', ClienteController.index);
clienteRoutes.get('/cliente/list/:id', ClienteController.findOne);
clienteRoutes.get('/cliente/login/:email/:pass', ClienteController.login);

export default clienteRoutes;
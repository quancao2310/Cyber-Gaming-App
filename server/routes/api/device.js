import express from 'express';
import deviceController from '../../controllers/device.controller.js';
const deviceRoutes = express.Router();

deviceRoutes.get('/', deviceController.getAll);
deviceRoutes.get('/filter', deviceController.filter);
// deviceRoutes.delete('/', deviceController.delete);
deviceRoutes.delete('/:room_type/:room_order/:slot_order/:device_order', deviceController.delete);

export default deviceRoutes;
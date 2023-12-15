import express from 'express';
import RoomController from '../../controllers/room.controller.js';

const roomRoutes = express.Router();

roomRoutes.get('/', RoomController.showAll);
roomRoutes.get('/:room_type/:room_order', RoomController.show);

export default roomRoutes;

import express from 'express';
import roomController from '../../controllers/room.controller.js';
const roomRoutes = express.Router();

roomRoutes.get('/private-room', roomController.showAllPrivateRoom);
roomRoutes.get('/public-room', roomController.showAllPublicRoom);
roomRoutes.get('/:room_type/:room_order', roomController.show);
roomRoutes.get('/', roomController.showAll);


export default roomRoutes;

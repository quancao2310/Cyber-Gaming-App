import express from 'express';
import SlotController from '../../controllers/slot.controller.js';

const slotRoutes = express.Router();

slotRoutes.get('/', SlotController.showAll);
slotRoutes.get('/:room_type/:room_order', SlotController.showByRoom);

export default slotRoutes;

import express from 'express';
import DiscountEventController from '../../controllers/discount-event.controller.js';
const discountEventRoutes = express.Router();

discountEventRoutes.get('/', DiscountEventController.showAll);
discountEventRoutes.get('/:eventId', DiscountEventController.show)
discountEventRoutes.post('/add', DiscountEventController.create);
discountEventRoutes.put('/update/:eventId', DiscountEventController.update);
discountEventRoutes.delete('/delete/:eventId', DiscountEventController.delete);

export default discountEventRoutes;
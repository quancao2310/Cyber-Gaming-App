import express from 'express';
import customerController from '../../controllers/customer.controller';
const customerRoutes = express.Router();
customerRoutes.get('/', customerController.index);
// customerRoutes.get('/:id', customerController.findOne);

export default customerRoutes;

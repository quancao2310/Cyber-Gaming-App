import express from 'express';
import transactionController from '../../controllers/transaction.controller.js';
const transactionRoutes = express.Router();

transactionRoutes.get('/', transactionController.showAll);
transactionRoutes.get('/:transactionId', transactionController.show);
transactionRoutes.post('/', transactionController.create);

export default transactionRoutes;
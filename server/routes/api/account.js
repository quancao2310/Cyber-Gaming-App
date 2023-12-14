import express from 'express';
import accountController from '../../controllers/account.controller';

const accountRoutes = express.Router();

// Create a new account
accountRoutes.post('/login', accountController.login);

accountRoutes.post('/cash-in', accountController.cashIn);

accountRoutes.post('/', accountController.create);

accountRoutes.get('/', accountController.findAll);

export default accountRoutes;

import express from 'express';
import customerRoutes from './api/customer.js';

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('API is working');
});
routes.use('/customer', customerRoutes);

export default routes;
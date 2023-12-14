import express from 'express';
import customerRoutes from './api/customer.js';
import productRoutes from './api/product.js';
import discountEventRoutes from './api/discount-event.js';
import transactionRoutes from './api/transaction.js';
import accountRoutes from './api/account.js';
import invoiceRoutes from './api/invoice.js';
import deviceRoutes from './api/device.js';
const routes = express.Router();

routes.use('/customer', customerRoutes);
routes.use('/product', productRoutes);
routes.use('/event', discountEventRoutes);
routes.use('/transaction', transactionRoutes);
routes.use('/invoice', invoiceRoutes);
routes.use('/device', deviceRoutes);

routes.use('/accounts', accountRoutes);

routes.get('/', (req, res) => {
    res.send('API is working');
});

export default routes;
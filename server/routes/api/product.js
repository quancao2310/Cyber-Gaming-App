import express from 'express';
import productController from '../../controllers/product.controller.js';
const productRoutes = express.Router();

productRoutes.get('/', productController.showAll);
productRoutes.get('/:productId', productController.show);
productRoutes.get('/total-income/:start_date/:end_date', productController.calculateTotalIncome)
productRoutes.post('/add', productController.addProductWithImages);
productRoutes.put('/update/:productId', productController.updateProductWithImages);
productRoutes.delete('/delete/:productId', productController.deleteProductWithImages);

export default productRoutes;
import express from 'express';
import InvoiceController from '../../controllers/invoice.controller.js';
const invoiceRoutes = express.Router();

invoiceRoutes.get('/', InvoiceController.showAll);
invoiceRoutes.get('/:id', InvoiceController.showInvoice)
invoiceRoutes.post('/add', InvoiceController.createInvoice);
invoiceRoutes.put('/update/:id', InvoiceController.updateInvoice);
invoiceRoutes.delete('/delete/:id', InvoiceController.deleteInvoice);

invoiceRoutes.get('/room/show', InvoiceController.showAllRoomInvoice);
invoiceRoutes.get('/room/:id', InvoiceController.showRoomInvoice)
invoiceRoutes.post('/room/add', InvoiceController.createRoomInvoice);
invoiceRoutes.put('/room/update/:id', InvoiceController.updateRoomInvoice);
invoiceRoutes.delete('/room/delete/:id', InvoiceController.deleteRoomInvoice);

invoiceRoutes.get('/slot/show', InvoiceController.showAllSlotInvoice);
invoiceRoutes.get('/slot/:id', InvoiceController.showSlotInvoice)
invoiceRoutes.post('/slot/add', InvoiceController.createSlotInvoice);
invoiceRoutes.put('/slot/update/:id', InvoiceController.updateSlotInvoice);
invoiceRoutes.delete('/slot/delete/:id', InvoiceController.deleteSlotInvoice);

invoiceRoutes.get('/product/show', InvoiceController.showAllInvoiceProduct);
invoiceRoutes.get('/product/:id', InvoiceController.showInvoiceProduct)
invoiceRoutes.post('/product/add', InvoiceController.createInvoiceProduct);
invoiceRoutes.put('/product/update/:id', InvoiceController.updateInvoiceProduct);
invoiceRoutes.delete('/product/delete/:id', InvoiceController.deleteInvoiceProduct);

export default invoiceRoutes;
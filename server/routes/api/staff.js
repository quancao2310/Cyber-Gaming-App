import express from 'express';

import staffController from '../../controllers/staff.controller.js';

const staffRoutes = express.Router();

staffRoutes.get('/', staffController.showAll);
staffRoutes.get('/:id', staffController.showStaff);
staffRoutes.get('/:CCCD', staffController.showStaffByCCCD);
staffRoutes.post('/add', staffController.createStaff);

export default staffRoutes;
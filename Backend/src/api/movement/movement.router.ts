import express from 'express';
import {
    listMovementsWithBalanceController,
    listMovementsByCategoryController,
    listMovementsByDateRangeController,
    createPhoneMovementController,
    createTransferMovementController,
    exportMovementsCSV1,
    exportMovementsCSV2,
    exportMovementsCSV3
} from './movement.controller';
import { isAuthenticated } from '../../utils/auth/authenticated-middleware';


const router = express.Router();
router.use(isAuthenticated)
router.get('/:userId', listMovementsWithBalanceController);
router.get('/:categoryId/:userId', listMovementsByCategoryController);
router.get('/date-range/:userId', listMovementsByDateRangeController);
router.post('/phone/:userId', createPhoneMovementController);
router.post('/transfer/:userId', createTransferMovementController);
router.post('/export/movements', exportMovementsCSV1);
router.post('/export/movements/category/:categoryId', exportMovementsCSV2);
router.post('/export/movements/date-range', exportMovementsCSV3);

export default router;
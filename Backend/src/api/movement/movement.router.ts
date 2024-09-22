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
router.get('/', listMovementsWithBalanceController);
router.get('/category', listMovementsByCategoryController);
router.get('/date-range', listMovementsByDateRangeController);
router.post('/phone', createPhoneMovementController);
router.post('/transfer', createTransferMovementController);
router.post('/export', exportMovementsCSV1);
router.post('/export/category', exportMovementsCSV2);
router.post('/export/date-range', exportMovementsCSV3);

export default router;
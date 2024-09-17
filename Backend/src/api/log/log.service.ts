import { LogModel } from './log.model';
import { CreateLogDTO } from './log.dto';
import { Request } from 'express';

class LogService {
    async createLog(req: Request, operation: string, successful: boolean): Promise<void> {
        try {
            const ip = req.headers['x-forwarded-for'] as string || req.connection.remoteAddress || 'Unknown IP';
            const logData: CreateLogDTO = {
                ip,
                date: new Date(), 
                operation,
                succeful: successful
            };
            
            const log = new LogModel(logData);
            await log.save();
            console.log('Log created succefully:', log);
        } catch (error) {
            console.error('Errore during log creation:', error);
            throw new Error('Errore during log creation');
        }
    }
}

export const logService = new LogService();

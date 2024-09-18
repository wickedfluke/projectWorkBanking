import { MovementModel } from './../movement/movement.model';
import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import userService from "./account.service";
import { logService } from "../log/log.service";


interface PasswordRequestBody {
    newPassword: string;
}

export const me = async (req: TypedRequest, res: Response, next: NextFunction) => {
    try {
        const user = req.user!;
        let query: any = { bankAccount: user.id };

        const lastMovement = await MovementModel
            .findOne(query)
            .sort({ date: -1 });
        const finalBalance = lastMovement?.balance || 0;

        res.json({ user, finalBalance });
    } catch (err) {
        next(err);
    }
}

export const list = async (req: TypedRequest, res: Response, next: NextFunction) => {
    try {
        const user = req.user!;
        const items = await userService.list();
        res.json(items);
    } catch (err) {
        next(err);
    }
}

export const password = async (req: TypedRequest<PasswordRequestBody>, res: Response, next: NextFunction) => {
    try {
        const user = req.user!;
        const newPassword = req.body.newPassword;

        const success = await userService.changePassword(user.id!, newPassword);
        console.log(success);
        if (success!) {
            await logService.createLog(req, 'Password Change', true);
            res.status(200).json({ message: 'Password updated successfully' });
        } else {
            await logService.createLog(req, 'Password Change', false);
            res.status(400).json({ message: 'Failed to update password' });
        }
    } catch (err) {
        await logService.createLog(req, 'Password Change', false);
        next(err);
    }
};
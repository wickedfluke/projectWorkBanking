import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import userService from "./account.service";

interface PasswordRequestBody {
    newPassword: string;
}

export const me = async (req: TypedRequest, res: Response, next: NextFunction) => {
    try {
        res.json(req.user!);
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
        await userService.changePassword(user.id!, newPassword);
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        next(err);
    }
}
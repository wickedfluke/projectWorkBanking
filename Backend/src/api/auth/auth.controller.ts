import { NextFunction, Response, Request } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import userService from "../account/account.service";
import { AddUserDTO } from "./auth.dto";
import { omit, pick } from "lodash";
import { UserExistsError } from "../../errors/user-exist";
import passport from "passport";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../utils/auth/jwt/jwt-strategy";
import { v4 as uuidv4 } from 'uuid';
import { logService } from "../log/log.service";
import { emailService } from "../../utils/email.service";
import { movementService } from "../movement/movement.service";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const authMiddleware = passport.authenticate('local', async (err, user, info) => {
            if (err) {
                await logService.createLog(req, 'Login Attempt', false);
                next(err);
                return;
            }

            if (!user) {
                await logService.createLog(req, 'Login Attempt', false);
                res.status(400).json({
                    error: 'LoginError',
                    message: info.message
                });
                return;
            }

            const token = jwt.sign(JSON.parse(JSON.stringify(user)), JWT_SECRET, { expiresIn: '30 minutes' });

            await logService.createLog(req, 'Login Attempt', true);

            res.status(200).json({
                user,
                token
            });
        });

        authMiddleware(req, res, next);
    } catch (e) {

        await logService.createLog(req, 'Login Attempt', false);
        next(e);
    }
};

export const add = async (req: TypedRequest<AddUserDTO>, res: Response, next: NextFunction) => {
    try {
        const userData = omit(req.body, 'username', 'password', 'iban', 'openDate');
        const credentials = pick(req.body, 'username', 'password');
        const generatedIban = generateFakeIban();
        const currentOpenDate = new Date();
        const updatedUserData = {
            ...userData,
            iban: generatedIban,
            openDate: currentOpenDate,
            isActive: false
        };
        const newUser = await userService.add(updatedUserData, credentials);
        await emailService.sendConfirmationEmail(req.body.username, newUser.id!);
        res.status(201).json({
            message: 'User registered successfully. Please check your email to confirm registration.',
            userId: newUser.id
        });
    } catch (e) {
        if (e instanceof UserExistsError) {
            res.status(400);
            res.send(e.message);
        } else {
            next(e);
        }
    }
}

export const generateFakeIban = (): string => {
    const country = 'IT';
    const checkDigits = '60';
    const bankCode = '05428';
    const branchCode = '11101';
    const accountNumber = uuidv4().slice(0, 12).replace(/-/g, '').toUpperCase();
    return `${country}${checkDigits}${bankCode}${branchCode}${accountNumber}`;
};

export const confirmEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }
        
        let decoded;
        try {
            decoded = jwt.verify(token as string, JWT_SECRET);
        } catch (err) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const userId = decoded.userId;

        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isActive) {
            return res.status(400).json({ message: 'Account already activated' });
        }

        await userService.activateUser(userId);
        
        await movementService.createOpeningMovement(userId);

        res.status(200).json({ message: 'Email confirmed, account activated.' });
    } catch (error) {
        next(error); 
    }
}
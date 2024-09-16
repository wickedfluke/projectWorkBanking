import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import userService from "../account/account.service";
import { AddUserDTO } from "./auth.dto";
import { omit, pick } from "lodash";
import { UserExistsError } from "../../errors/user-exist";
import passport from "passport";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../../utils/auth/jwt/jwt-strategy";
import { v4 as uuidv4 } from 'uuid'; 
import { format } from 'date-fns'; 

export const login = async (req: TypedRequest, res: Response, next: NextFunction) => {
    try {
        const authMiddleware = passport.authenticate('local', (err, user, info) => {
            if (err) {
                next(err);
                return;
            }

            if (!user) {
                res.status(400);
                res.json({
                    error: 'LoginError',
                    message: info.message
                });
                return;
            }

            const token = jwt.sign(user, JWT_SECRET, { expiresIn: '30 minutes' });

            res.status(200);
            res.json({
                user,
                token
            });
        });

        authMiddleware(req, res, next);
    } catch (e) {
        next(e);
    }
}

export const add = async (req: TypedRequest<AddUserDTO>, res: Response, next: NextFunction) => {
    try {
        const userData = omit(req.body, 'username', 'password', 'iban', 'openDate');
        const credentials = pick(req.body, 'username', 'password');
        const generatedIban = generateFakeIban();
        const currentOpenDate = new Date();
        const updatedUserData = {
            ...userData,
            iban: generatedIban,
            openDate: currentOpenDate
        };
        const newUser = await userService.add(updatedUserData, credentials);
        res.status(201);
        res.json(newUser);
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
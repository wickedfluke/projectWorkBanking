import { NextFunction, Response, Request } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import userService from "../account/account.service";
import { AddUserDTO } from "./auth.dto";
import { omit, pick } from "lodash";
import { UserExistsError } from "../../errors/user-exist";
import passport from "passport";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../utils/auth/jwt/jwt-strategy";
import { v4 as uuidv4 } from "uuid";
import { logService } from "../log/log.service";
import { emailService } from "../../utils/email.service";
import { movementService } from "../movement/movement.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authMiddleware = passport.authenticate(
      "local",
      async (err, user, info) => {
        if (err) {
          await logService.createLog(req, "Login Attempt", false);
          next(err);
          return;
        }

        if (!user) {
          await logService.createLog(req, "Login Attempt", false);
          res.status(400).json({
            error: "LoginError",
            message: "Username o password non validi.",
          });
          return;
        }

        if (!user.isActive) {
          await logService.createLog(req, "Login Attempt", false);
          res.status(400).json({
            error: "LoginError",
            message:
              "Account non attivato. Controlla la tua casella mail per confermare la registrazione.",
          });
          return;
        }

        const token = jwt.sign(JSON.parse(JSON.stringify(user)), JWT_SECRET, {
          expiresIn: "30 minutes",
        });

        await logService.createLog(req, "Login Attempt", true);

        res.status(200).json({
          user,
          token,
        });
      }
    );

    authMiddleware(req, res, next);
  } catch (e) {
    await logService.createLog(req, "Login Attempt", false);
    next(e);
  }
};

export const add = async (
  req: TypedRequest<AddUserDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = omit(req.body, "username", "password", "iban", "openDate");
    const credentials = pick(req.body, "username", "password");
    const generatedIban = generateFakeIban();
    const currentOpenDate = new Date();
    const updatedUserData = {
      ...userData,
      iban: generatedIban,
      openDate: currentOpenDate,
      isActive: false,
    };
    const newUser = await userService.add(updatedUserData, credentials);
    await emailService.sendConfirmationEmail(
      req.body.username,
      newUser.id!,
      newUser.confirmationCode!
    );
    res.status(201).json({
      message:
        "Utente registrato correttamente. Controlla la tua casella mail per confermare la registrazione.",
      userId: newUser.id,
    });
  } catch (e) {
    if (e instanceof UserExistsError) {
      res.status(400);
      res.send(e.message);
    } else {
      next(e);
    }
  }
};

export const generateFakeIban = (): string => {
  const country = "IT";
  const checkDigits = "60";
  const bankCode = "05428";
  const branchCode = "11101";
  const accountNumber = uuidv4().slice(0, 15).replace(/-/g, "").toUpperCase();
  return `${country}${checkDigits}${bankCode}${branchCode}${accountNumber}`;
};

export const confirmEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, code } = req.query;

    const isConfirmed = await userService.verifyConfirmationCode(
      userId as string,
      code as string
    );

    if (isConfirmed) {
      await movementService.createOpeningMovement(userId as string); // Create opening movement

      res.redirect(
        "https://governing-nike-wickedlabel-b8b1618b.koyeb.app/confirm-email"
      );
      // res.status(200).json({ message: 'Mail confermata, account attivato.' });
    } else {
      res.redirect(
        "https://governing-nike-wickedlabel-b8b1618b.koyeb.app/confirm-email-failed"
      );
      //   res.status(400).json({ message: "Codice di conferma non valido." });
    }
  } catch (error) {
    next(error);
  }
};

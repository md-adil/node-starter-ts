import { Request, Response, NextFunction } from "express";
import { AuthError } from "../errors";
import jwt, { verify } from "jsonwebtoken";
import User from "../models/User";
import config from "../config/app";
export default () => async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    if (!token) {
        throw new AuthError(
            "Unauthorized request, Please provide authorization token"
        );
    }
    let payload;
    try {
        payload = verify(token, config.key as string) as any;
    } catch (err) {
        throw new AuthError("Authorization token is not valid");
    }
    const user = await User.query().findById(payload.sub);
    if (!user) {
        throw new AuthError("Invalid credential");
    }
    (req as any).user = user;
    next();
};

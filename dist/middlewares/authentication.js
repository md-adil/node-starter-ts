"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = __importDefault(require("../models/User"));
const app_1 = __importDefault(require("../config/app"));
exports.default = () => async (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        throw new errors_1.AuthError("Unauthorized request, Please provide authorization token");
    }
    let payload;
    try {
        payload = jsonwebtoken_1.verify(token, app_1.default.key);
    }
    catch (err) {
        throw new errors_1.AuthError("Authorization token is not valid");
    }
    const user = await User_1.default.query().findById(payload.sub);
    if (!user) {
        throw new errors_1.AuthError("Invalid credential");
    }
    req.user = user;
    next();
};

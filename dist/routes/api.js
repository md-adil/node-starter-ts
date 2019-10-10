"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = require("express");
const route = express_1.Router();
route.use(body_parser_1.default.json());
// route.post("/login", loginController.login);
// route.post('/register', registerController.register);
// route.use(authMiddleware());
// route.get("/users", userController.index);
exports.default = route;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const http = require("http"), Layer = require("express/lib/router/layer"), debug = debug_1.default("app:extensions:response-handler"), { ResponseError, MailError } = require("../errors");
Layer.prototype.handle_request = async function (req, res, next) {
    const fn = this.handle;
    if (fn.length > 3) {
        return next();
    }
    try {
        const newResponse = await fn(req, res, next);
        if (typeof newResponse !== "undefined" &&
            !(newResponse instanceof http.ServerResponse)) {
            res.send(newResponse);
        }
    }
    catch (err) {
        // When throws Response error.
        if (err instanceof ResponseError) {
            return err.handle(req, res);
        }
        if (req.headers.accept !== "application/json") {
            return next(err);
        }
        debug(err);
        return res
            .status(500)
            .send({ message: err.message, stack: err.stack.split("\n") });
    }
};

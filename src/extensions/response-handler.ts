import Debug from "debug";
import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../errors";
import { ServerResponse } from "http";
const Layer = require("express/lib/router/layer"),
    debug = Debug("app:extensions:response-handler");

Layer.prototype.handle_request = async function (req: Request, res: Response, next: NextFunction) {
    const fn = this.handle;
    if (fn.length > 3) {
        return next();
    }
    try {
        const newResponse = await fn(req, res, next);
        if (
            typeof newResponse !== "undefined" &&
            !(newResponse instanceof ServerResponse)
        ) {
            res.send(newResponse);
        }
    } catch (err) {
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const port = process.env.APP_PORT;
exports.default = {
    key: process.env.APP_KEY,
    port: port ? parseInt(port) : 3000,
    host: process.env.APP_HOST || "127.0.0.1"
};

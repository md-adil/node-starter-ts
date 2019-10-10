"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const mosca_1 = require("mosca");
const switchController_1 = __importDefault(require("../controllers/mqtt/switchController"));
const debug = debug_1.default("app:routes:mqtt");
const settings = {
    port: 1883
};
const server = new mosca_1.Server(settings);
server.on("switch:toggle", switchController_1.default.toggle);
server.on("ready", () => {
    debug("Service is ready at port %d", settings.port);
});

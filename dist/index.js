"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("./extensions/response-handler");
const express_1 = __importDefault(require("express"));
const config = __importStar(require("./config"));
const debug_1 = __importDefault(require("debug"));
const app = express_1.default();
const routes = __importStar(require("./routes"));
const debug = debug_1.default("app:server");
app.use(routes.web);
app.use("/api", routes.api);
app.listen(config.app.port, config.app.host, () => {
    debug("> Server started http://%s:%s", config.app.host, config.app.port);
});

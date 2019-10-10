import dotenv from "dotenv"
dotenv.config();
require("./extensions/response-handler");
import express from "express";
import * as config from "./config";
import Debug from "debug";
const app = express();
import * as routes from "./routes";
const debug = Debug("app:server");

app.use(routes.web);
app.use("/api", routes.api);

app.listen(config.app.port, config.app.host, () => {
    debug("> Server started http://%s:%s", config.app.host, config.app.port);
});

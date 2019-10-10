import Debug from "debug";
import { Server } from "mosca";
import switchController from "../controllers/mqtt/switchController";

const debug = Debug("app:routes:mqtt");
const settings = {
    port: 1883
}

const server = new Server(settings);

server.on("switch:toggle", switchController.toggle);

server.on("ready", () => {
    debug("Service is ready at port %d", settings.port)
});
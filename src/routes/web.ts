import { Router } from "express";
import homeController from "../controllers/homeController";

const app = Router();
app.get("/", homeController.index);
export default app;

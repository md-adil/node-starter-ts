import bodyParser from 'body-parser';
import { Router } from 'express';

const route = Router();
route.use(bodyParser.json());
// route.post("/login", loginController.login);
// route.post('/register', registerController.register);

// route.use(authMiddleware());
// route.get("/users", userController.index);

export default route;

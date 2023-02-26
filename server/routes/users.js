import express from "express";
import { checkAuth } from "../middleware/checkAuth.js";

import { userSignup, userLogin, userIsActive, userDelete } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/signup', userSignup);
userRouter.post('/login', userLogin);
userRouter.post('/active', userIsActive);
userRouter.delete('/delete', checkAuth, userDelete);

export default userRouter;


import { Router } from "express";
import { loginUser, registerNewUser } from "../controllers/authController.js";
import { emailVerification, userFieldsVerification } from "../middleweares/userValidation.js";

const authRouter = Router();

authRouter.post("/register", userFieldsVerification, emailVerification, registerNewUser);
authRouter.post("/login", loginUser);

export default authRouter; 

import { Router } from "express";
import { loginUser, registerNewUser, } from "../controllers/authController.js";
import { emailVerification, updateUserToAdmin, userFieldsVerification } from "../middleweares/userValidation.js";

const authRouter = Router();

authRouter.post("/register", userFieldsVerification, emailVerification, registerNewUser);
authRouter.post("/login", loginUser);
authRouter.put("/update/:id/admin", updateUserToAdmin);

export default authRouter; 

import { Router } from "express";
import { userFieldsVerification, emailVerification } from "../middleweares/userValidation.js";
import { createUser, deleteUserByID, getAllUsers, getUserById, updateUserByID } from "../controllers/userController.js";

const UserRouter = Router();
UserRouter.get("/users", getAllUsers);

UserRouter.post("/user", userFieldsVerification, emailVerification, createUser);

UserRouter.get("/user/:id", getUserById);

UserRouter.put("/user/:id", updateUserByID);

UserRouter.delete("/user/:id", deleteUserByID);

export default UserRouter;
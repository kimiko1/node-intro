import { Router } from "express";
import { assignOwner, createCar, deleteCarByID, getAllCars, getCarById, updateCarByID } from "../controllers/carController.js";
import { verifyToken } from "../middleweares/userValidation.js";

const CarRouter = Router();

CarRouter.get("/cars", verifyToken, getAllCars);

CarRouter.post("/cars", createCar);

CarRouter.get("/car/:id", getCarById);

CarRouter.put("/car/:id", updateCarByID);

CarRouter.delete("/car/:id", deleteCarByID);

CarRouter.put("/car/:id/assign-owner", assignOwner);

export default CarRouter;
import express from "express";
import { authenticateUser } from "./../middlewares/authenticateUser.js";
import { createOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", authenticateUser, createOrder);

export default router;

import express from "express";
import { authenticateUser } from "./../middlewares/authenticateUser.js";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", authenticateUser, createOrder);
router.get("/:userId", authenticateUser, getUserOrders);
router.get("/", authenticateUser, getAllOrders);

export default router;

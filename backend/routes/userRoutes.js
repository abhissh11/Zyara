import express from "express";
import {
  getUserDetails,
  registerUser,
  signInUser,
} from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/signin", signInUser);
router.get("/account", authenticateUser, getUserDetails);

export default router;

import express from "express";
import {
  createProduct,
  getProductbyCategory,
  getProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/", getProducts);
router.get("/:category", getProductbyCategory);

export default router;



// Cloud name : dhcbkylib 
// CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dhcbkylib
// API key : 835731659553317
// API Secret : j25bbfNo5YEGhLb-OfdhSMVKHB8
// Key Name : CloudKey

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

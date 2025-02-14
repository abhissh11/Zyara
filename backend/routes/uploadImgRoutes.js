import express from "express";
import multer from "multer";
import { uploadImg } from "../controllers/uploadImgController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), uploadImg);

export default router;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import uploadImgRoutes from "./routes/uploadImgRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

// middlewares
// app.use(cors());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Explicitly allow methods
    allowedHeaders: ["Content-Type", "Authorization"], // Explicitly allow headers
  })
);
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());

//routes
app.get("/", (req, res) => {
  res.send("Zyra server is running..");
});
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadImgRoutes);
app.use("/api/user", userRoutes);

const PORT = 3000;

//connect to Mongodb and start the server
const startServer = async () => {
  try {
    await connectDB();
    console.log("Mongodb connected succesfully!");

    app.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  } catch (error) {
    console.log("failed to connect to mongodb:", error);
    process.exit(1);
  }
};

startServer();

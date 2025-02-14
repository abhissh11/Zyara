import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import uploadImgRoutes from "./routes/uploadImgRoutes.js";

dotenv.config();
const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

// middlewares
// app.use(cors());
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Zyra server is running..");
});
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadImgRoutes);

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

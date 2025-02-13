import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Zyra server is running..");
});
app.use("/api/products", productRoutes);

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

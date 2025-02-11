import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Zyra server is running..");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}`);
});

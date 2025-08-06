import express from "express";
import dotenv from "dotenv";

import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

//Routes

import loginRoutes from "./routes/LoginRoutes.js";
import registerRoutes from "./routes/RegisterRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

//APIS

app.use("/login", loginRoutes);
app.use("/register", registerRoutes);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.get("/", (req, res) => {
  res.send("Welcome to the E-commerce API");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

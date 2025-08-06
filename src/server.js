import express from "express";
import dotenv from "dotenv";

import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

//Routes

import loginRoutes from "./routes/LoginRoutes.js";
import registerRoutes from "./routes/RegisterRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import cartRoutes from "./routes/CartRoutes.js";
import likeRoutes from "./routes/LikeRoutes.js";
import commentRoutes from "./routes/CommentRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import profileRoutes from "./routes/ProfileRoutes.js";
import ratingRoutes from "./routes/RatingRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use((err, req, res, next) => {
  console.error(err.stack || err.message);
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
});

//APIS

app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/likes", likeRoutes);
app.use("/comments", commentRoutes);
app.use("/orders", orderRoutes);
app.use("/profile", profileRoutes);
app.use("/ratings", ratingRoutes);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.get("/", (req, res) => {
  res.send("Welcome to the E-commerce Home Page!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

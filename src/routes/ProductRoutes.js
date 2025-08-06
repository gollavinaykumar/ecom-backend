import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
} from "../controllers/ProductController.js";

import { authorizeRole } from "../middlewares/authorizeRole.js";
import { verifyToken } from "../middlewares/authmiddleware.js";

const router = Router();

// Public routes
router.get("/", verifyToken, getProducts); // GET /products
router.get("/:id", verifyToken, getProduct); // GET /products/:id

// Protected route: Only authenticated users (e.g., admin) can create products
router.post("/", verifyToken, authorizeRole("ADMIN"), createProduct); // POST /products

export default router;

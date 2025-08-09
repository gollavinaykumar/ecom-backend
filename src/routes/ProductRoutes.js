import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
} from "../controllers/ProductController.js";

import { authorizeRole } from "../middlewares/authorizeRole.js";
import { verifyToken } from "../middlewares/authmiddleware.js";

const router = Router();

// Public routes
router.get("/", verifyToken, getProducts); // GET /products
router.get("/:id", verifyToken, getProduct); // GET /products/:id

// Protected route: Only authenticated users (e.g., admin) can create products
router.post("/", verifyToken, authorizeRole("ADMIN"), createProduct); // POST /products
router.put("/:id", verifyToken, authorizeRole("ADMIN"), updateProduct); // PUT /products/:id

export default router;

// routes/cartRoutes.js
import { Router } from "express";
import { addToCart, getCart } from "../controllers/CartController.js";
import { verifyToken } from "../middlewares/authmiddleware.js";

const router = Router();

// GET cart by user ID
router.get("/:userId", verifyToken, getCart);

// POST to add to cart
router.post("/", verifyToken, addToCart);

export default router;

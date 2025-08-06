import { Router } from "express";

import { verifyToken } from "../middlewares/authmiddleware.js";
import {
  createOrder,
  getOrdersByUser,
} from "../controllers/OrderController.js";

const router = Router();

router.post("/", verifyToken, createOrder);
router.get("/:userId", verifyToken, getOrdersByUser);
export default router;

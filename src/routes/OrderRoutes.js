import { Router } from "express";

import { verifyToken } from "../middlewares/authmiddleware.js";
import {
  createOrder,
  getOrdersByUser,
  updateOrderStatus,
} from "../controllers/OrderController.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";

const router = Router();

router.post("/", verifyToken, createOrder);
router.get("/:userId", verifyToken, getOrdersByUser);

router.put("/:id", verifyToken, authorizeRole("ADMIN"), updateOrderStatus);

export default router;

import { Router } from "express";

import { verifyToken } from "../middlewares/authmiddleware.js";
import { toggleLike } from "../controllers/LikeController.js";

const router = Router();

router.post("/", verifyToken, toggleLike);
export default router;

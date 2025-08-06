import { Router } from "express";

import { verifyToken } from "../middlewares/authmiddleware.js";
import { addRating } from "../controllers/RatingController.js";

const router = Router();

router.post("/", verifyToken, addRating);
export default router;

import { Router } from "express";

import { verifyToken } from "../middlewares/authmiddleware.js";
import { addAddress, updateProfile } from "../controllers/ProfileController.js";

const router = Router();

router.patch("/", verifyToken, updateProfile);
router.post("/address", verifyToken, addAddress);
export default router;

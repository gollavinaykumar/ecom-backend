import { Router } from "express";
import { addComment } from "../controllers/CommentController.js";
import { verifyToken } from "../middlewares/authmiddleware.js";

const router = Router();

router.post("/", verifyToken, addComment);
export default router;

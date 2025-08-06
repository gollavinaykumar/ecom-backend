import { Router } from "express";
import { signup } from "../controllers/RegisterController.js";

const router = Router();

router.post("/", signup);
export default router;

import { Router } from "express";
import { loginWithPassword } from "../controllers/LoginController.js";

const router = Router();

router.post("/", loginWithPassword);
export default router;

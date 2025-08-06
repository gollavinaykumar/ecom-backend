import { Router } from "express";
import { verifyToken } from "../middlewares/authmiddleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";
import {
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/UserController.js";

const router = Router();

router.get("/", verifyToken, authorizeRole("ADMIN"), getUsers);

router.get("/:id", verifyToken, getUser);

router.delete("/:id", verifyToken, authorizeRole("ADMIN"), deleteUser);

export default router;

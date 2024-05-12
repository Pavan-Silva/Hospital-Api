import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { checkRole } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", checkRole(["ADMIN"]), register);
router.post("/login", login);

export default router;

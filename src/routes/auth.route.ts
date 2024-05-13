import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { checkRequiredRole } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", checkRequiredRole(["ADMIN"]), register);
router.post("/login", login);

export default router;

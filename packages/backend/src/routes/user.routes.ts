import { Router } from "express";
import { getCurrentUser } from "../controllers/user.controller";
import { verifyAuth } from "../middlewares/auth.middleware";

const router: Router = Router();

router.get("/user", verifyAuth, getCurrentUser);

export default router;
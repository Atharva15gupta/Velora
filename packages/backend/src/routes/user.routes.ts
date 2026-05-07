import { Router } from "express";
import { getCurrentUser, updateCurrentUser } from "../controllers/user.controller";
import { verifyAuth } from "../middlewares/auth.middleware";

const router: Router = Router();

router.get("/user", verifyAuth, getCurrentUser);
router.patch("/user", verifyAuth, updateCurrentUser);

export default router;
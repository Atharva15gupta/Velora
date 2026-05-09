import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middleware";
import { createWorkspace, getWorkspace, updateWorkspace } from "../controllers/workspace.controller";
import { requireActiveSubscription } from "../middlewares/requireSubscription";

const router: Router = Router();

router.post("/create", verifyAuth, createWorkspace);
router.get("/get", verifyAuth, getWorkspace);
router.patch("/update", verifyAuth, updateWorkspace);

export default router;

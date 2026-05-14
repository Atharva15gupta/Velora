import { Router } from "express";
import multer from "multer";
import {
  createFileResource,
  createWebResource,
  deleteResource,
  getAllResources,
  recrawlWebResource,
  toggleResource,
} from "../controllers/resource.controller";
import { requireWorkspaceAccess } from "../middlewares/requireWorkspace";
import { requireActiveSubscription } from "../middlewares/requireSubscription";
import { verifyAuth } from "../middlewares/auth.middleware";
import fs from "fs";

const router: Router = Router();
const uploadDir = "uploads";

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.use(
  "/:workspaceId/resources",
  verifyAuth,
  requireWorkspaceAccess
);

// File Resource Routes
router.post("/:workspaceId/resources/file", requireActiveSubscription, upload.single("file"), createFileResource);

// Web Resource Routes
router.post("/:workspaceId/resources/web", requireActiveSubscription, createWebResource);
router.post("/:workspaceId/resources/:resourceId/recrawl", requireActiveSubscription, recrawlWebResource);

// Other Resource Routes
router.get("/:workspaceId/resources", getAllResources);
router.patch("/:workspaceId/resources/:resourceId/toggle", toggleResource);
router.delete("/:workspaceId/resources/:resourceId", deleteResource);

export default router;

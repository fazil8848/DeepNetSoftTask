import { Router, RequestHandler } from "express";
import {
  createMenu,
  getMenus,
  getMenuById,
  getMenuItems,
  editMenu,
} from "../controllers/menuController";

const router = Router();

router.post("/", createMenu as RequestHandler);
router.get("/", getMenus as RequestHandler);
router.get("/:id", getMenuById as RequestHandler);
router.put("/:id/items", editMenu as RequestHandler);
router.get("/:id/items", getMenuItems as RequestHandler);

export default router;

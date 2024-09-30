import { Router } from "express";
import { getUserInfo, register } from "../controllers/auth.controller";
import { auth } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", auth, register);
router.get("/:uuid/info", auth, getUserInfo);

export default router;

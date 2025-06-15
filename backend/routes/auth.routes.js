import e from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = e.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", authMiddleware, authController.getProfile);

export default router;

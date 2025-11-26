import { Router } from "express";
import { login, logout, session, signup } from "../controllers/auth.js";
import { loginSchema, signupSchema } from "../schemas/auth.js";
import validate from "../middlewares/validation.js";

const router = Router();

// sign up
router.post("/signup", validate(signupSchema), signup);

// login
router.post("/login", validate(loginSchema), login);

// session
router.get("/session", session);

// logout
router.get("/logout", logout);

export default router;

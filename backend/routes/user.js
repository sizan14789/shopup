import { Router } from "express";
import { validateBuyer } from "../middlewares/validateUser.js";
import { updateDP } from "../controllers/user.js";

const router = Router();

// todo upload part only
router.post("/changedp", validateBuyer, updateDP);

export default router;

import { Router } from "express";
import { validateBuyer } from "../middlewares/validateUser.js";
import {
  getCartOnly,
  getCartWithProductDetails,
  updateCart,
} from "../controllers/cart.js";

const router = Router();

// get cart only
router.get("/cart", validateBuyer, getCartOnly);

// get cart with product details
router.get("/cartDetails", validateBuyer, getCartWithProductDetails);

// update cart
router.post("/cart", validateBuyer, updateCart);

export default router;

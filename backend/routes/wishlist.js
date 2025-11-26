import { Router } from "express";
import { validateBuyer } from "../middlewares/validateUser.js";
import {
  addToWishlist,
  deleteFromWIshlist,
  getWishlist,
} from "../controllers/wishlist.js";

const router = Router();

// get wishlist for users
router.get("/wishlist", validateBuyer, getWishlist);

// add to wishlist for users
router.post("/wishlist/:id", validateBuyer, addToWishlist);

// delete from wishlist for users
router.delete("/wishlist/:id", validateBuyer, deleteFromWIshlist);

export default router;

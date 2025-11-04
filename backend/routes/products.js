import { Router } from "express";
import { getAllProducts, getProduct, getProductsBySeller } from "../controllers/Products.js";
import { validateSeller } from "../middlewares/validateUser.js";

const router = Router();

// all products
router.get("/api/products", getAllProducts);

// single product
router.get("/api/products/:id", getProduct);

// seller specific products
router.get("/api/seller/products", validateSeller, getProductsBySeller);

export default router;

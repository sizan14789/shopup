import { Router } from "express";
import { getAllProducts, getProduct } from "../controllers/Products.js";
// import { validateSeller } from "../middlewares/validateUser.js";

const router = Router();

// all products
router.get("/products", getAllProducts);

// single product
router.get("/products/:id", getProduct);

export default router;

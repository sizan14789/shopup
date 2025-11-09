import { Router } from "express";
import { validateBuyer } from "../middlewares/validateUser.js";
import { addOrders, archiveOrder, cancelOrder, getOrderById, getOrders } from "../controllers/orders.js";

const router = Router();

// get orders
router.get("/api/orders", validateBuyer, getOrders);

// get order by id
router.get("/api/orders/:id", validateBuyer, getOrderById);

// add orders
router.post("/api/orders", validateBuyer, addOrders);

// cancel order
router.post("/api/orders/cancel/:id", validateBuyer, cancelOrder);

// archive order
router.post("/api/orders/archive/:id", validateBuyer, archiveOrder);

export default router;

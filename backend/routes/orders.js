import { Router } from "express";
import { validateBuyer } from "../middlewares/validateUser.js";
import {
  addOrders,
  archiveOrder,
  cancelOrder,
  getArchived,
  getOrderById,
  getOrders,
} from "../controllers/orders.js";
import { session, verifySession } from "../controllers/auth.js";
import { payment } from "../controllers/purchase.js";

const router = Router();

// get orders
router.get("/orders", validateBuyer, getOrders);

// get order by id
router.get("/orders/:id", validateBuyer, getOrderById);

// add orders
router.post("/orders", validateBuyer, addOrders);

// cancel order
router.post("/orders/cancel/:id", validateBuyer, cancelOrder);

// archive order
router.post("/orders/archive/:id", validateBuyer, archiveOrder);

// get archived
router.get("/archived", validateBuyer, getArchived);

// Payment
router.post("/orders/payment-checkout", verifySession, payment);

export default router;

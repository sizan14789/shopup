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

export default router;

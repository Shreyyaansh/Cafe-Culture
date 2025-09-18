import express from "express";
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    getOrdersByTable,
    getOrderStats
} from "../controllers/orderController.js";

const router = express.Router();

// Create a new order
router.post("/create", createOrder);

// Get all orders (with optional filters)
router.get("/", getAllOrders);

// Get order statistics
router.get("/stats", getOrderStats);

// Get orders by table number
router.get("/table/:tableNumber", getOrdersByTable);

// Get order by ID
router.get("/:id", getOrderById);

// Update order status
router.put("/:id/status", updateOrderStatus);

// Delete order
router.delete("/:id", deleteOrder);

export default router;
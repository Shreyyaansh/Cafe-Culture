import Order from "../models/Order.js";
import mongoose from "mongoose";

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { tableNumber, customerName, items, totalAmount, orderType, specialInstructions } = req.body;

        // Validate required fields
        if (!tableNumber || !items || !totalAmount) {
            return res.status(400).json({
                success: false,
                message: "Table number, items, and total amount are required"
            });
        }

        // Validate items array
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Items array is required and cannot be empty"
            });
        }

        // Create new order
        const order = new Order({
            tableNumber,
            customerName: customerName || "Guest",
            items,
            totalAmount,
            orderType: orderType || "dine-in",
            specialInstructions: specialInstructions || ""
        });

        await order.save();

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order
        });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const { status, tableNumber } = req.query;
        
        let filter = {};
        
        if (status) {
            filter.status = status;
        }
        
        if (tableNumber) {
            filter.tableNumber = parseInt(tableNumber);
        }

        const orders = await Order.find(filter)
            .sort({ orderTime: -1 })
            .limit(50); // Limit to last 50 orders for performance

        res.status(200).json({
            success: true,
            orders,
            count: orders.length
        });

    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Get order by ID
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order ID"
            });
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order ID"
            });
        }

        const validStatuses = ['pending', 'preparing', 'ready', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status. Must be one of: " + validStatuses.join(", ")
            });
        }

        const updateData = { status };
        
        // If marking as completed, set completed time
        if (status === 'completed') {
            updateData.completedTime = new Date();
        }

        const order = await Order.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order
        });

    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Delete order
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order ID"
            });
        }

        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Get orders by table number
export const getOrdersByTable = async (req, res) => {
    try {
        const { tableNumber } = req.params;

        const orders = await Order.find({ tableNumber: parseInt(tableNumber) })
            .sort({ orderTime: -1 });

        res.status(200).json({
            success: true,
            orders,
            count: orders.length
        });

    } catch (error) {
        console.error("Error fetching orders by table:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Get order statistics
export const getOrderStats = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const stats = await Order.aggregate([
            {
                $match: {
                    orderTime: { $gte: today }
                }
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                    totalAmount: { $sum: "$totalAmount" }
                }
            }
        ]);

        const totalOrders = await Order.countDocuments({
            orderTime: { $gte: today }
        });

        const totalRevenue = await Order.aggregate([
            {
                $match: {
                    orderTime: { $gte: today },
                    status: { $in: ['completed', 'ready'] }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalAmount" }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalOrders,
                totalRevenue: totalRevenue[0]?.total || 0,
                statusBreakdown: stats
            }
        });

    } catch (error) {
        console.error("Error fetching order stats:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};
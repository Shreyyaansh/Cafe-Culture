import Order from "../models/Order.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { tableNumber, customerName, phone, address, items, totalAmount, orderType, specialInstructions } = req.body;

        // Validate required fields
        if (!customerName || !phone || !items || !totalAmount) {
            return res.status(400).json({
                success: false,
                message: "Customer name, phone, items, and total amount are required"
            });
        }

        // Validate address for takeaway orders
        if (orderType === 'takeaway' && !address) {
            return res.status(400).json({
                success: false,
                message: "Address is required for takeaway orders"
            });
        }

        // Validate table number for dine-in orders
        if (orderType === 'dine-in' && !tableNumber) {
            return res.status(400).json({
                success: false,
                message: "Table number is required for dine-in orders"
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
            customerName,
            phone,
            address,
            items,
            totalAmount,
            orderType: orderType || "dine-in",
            specialInstructions: specialInstructions || ""
        });

        await order.save();

        // Attempt to send notification email (non-blocking for order creation)
        try {
            if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
                order.emailSent = false;
                order.emailError = 'SMTP credentials missing';
                await order.save();
                throw new Error('SMTP credentials missing');
            }

            const resolvedHost = process.env.SMTP_HOST || 'smtp.gmail.com';
            const resolvedPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
            const resolvedSecure = process.env.SMTP_SECURE === 'true' ? true : false;
            const transporter = nodemailer.createTransport({
                host: resolvedHost,
                port: resolvedPort,
                secure: resolvedSecure,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });

            const toAddress = process.env.ORDER_NOTIFY_TO || process.env.SMTP_USER;
            const fromAddress = process.env.MAIL_FROM || process.env.SMTP_USER;

            const itemsHtml = order.items.map(i => `
                <tr>
                    <td style="padding:6px 8px;border:1px solid #eee;">${i.name}</td>
                    <td style="padding:6px 8px;border:1px solid #eee;">${i.quantity}</td>
                    <td style="padding:6px 8px;border:1px solid #eee;">₹${i.price}</td>
                    <td style="padding:6px 8px;border:1px solid #eee;">₹${i.price * i.quantity}</td>
                </tr>
            `).join('');

            const html = `
                <div style="font-family:Arial, sans-serif;color:#333;">
                  <h2>New Order Placed</h2>
                  <p><strong>Order ID:</strong> ${order._id}</p>
                  <p><strong>Time:</strong> ${new Date(order.orderTime).toLocaleString()}</p>
                  <p><strong>Customer:</strong> ${order.customerName}</p>
                  <p><strong>Phone:</strong> ${order.phone}</p>
                  <p><strong>Address:</strong> ${order.address}</p>
                  <p><strong>Table Number:</strong> ${order.tableNumber ?? 'N/A'}</p>
                  <p><strong>Order Type:</strong> ${order.orderType}</p>
                  <h3>Items</h3>
                  <table style="border-collapse:collapse;min-width:400px;">
                    <thead>
                      <tr>
                        <th style="text-align:left;padding:6px 8px;border:1px solid #eee;">Item</th>
                        <th style="text-align:left;padding:6px 8px;border:1px solid #eee;">Qty</th>
                        <th style="text-align:left;padding:6px 8px;border:1px solid #eee;">Price</th>
                        <th style="text-align:left;padding:6px 8px;border:1px solid #eee;">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsHtml}
                    </tbody>
                  </table>
                  <p style="margin-top:12px;"><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
                  ${order.specialInstructions ? `<p><strong>Special Instructions:</strong> ${order.specialInstructions}</p>` : ''}
                </div>
            `;

            await transporter.sendMail({
                from: fromAddress,
                to: toAddress,
                subject: `New Order #${order._id}`,
                html
            });
            // mark email as sent on the order
            order.emailSent = true;
            order.emailError = "";
            await order.save();
        } catch (mailErr) {
            // persist failure info but do not block response
            order.emailSent = false;
            order.emailError = mailErr?.message || String(mailErr);
            try { await order.save(); } catch (_) {}
        }

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
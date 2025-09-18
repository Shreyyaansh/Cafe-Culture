import Order from "../models/Order.js";
import Product from "../models/Product.js";
import razorpay from "../config/razorpay.js";

// Place Order COD :  /api/order/cod

export const placeOrderCOD = async (req, res) => {
    try {
        console.log('BODY:', req.body);
        const userId = req.user.id || req.user._id;
        const { item, address } = req.body;
        if (!Array.isArray(item) || item.length === 0 || !address) {
            return res.status(400).json({ success: false, message: "Items and address are required" });
        }

        // Calculate amount using items

        let amount = await item.reduce(async (acc,item) => {
            const product = await Product.findById(item.product);
            return (await acc) + (product.offerPrice * item.quantity);
        },0);

        // Add Tax 2%

        amount += Math.floor(amount * 0.02);

        // Create Order

        await Order.create({
            userId,
            items: item,
            amount,
            address,
            paymentType: "COD",
         
        });

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
        });
             


        
    } catch (error) {
        
        console.error("Error placing order:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Create Razorpay Order : /api/order/razorpay/create
export const createRazorpayOrder = async (req, res) => {
    try {
        if (!razorpay) {
            return res.status(500).json({ 
                success: false, 
                message: "Razorpay is not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env file" 
            });
        }

        if (!req.user || !(req.user.id || req.user._id)) {
            return res.status(401).json({ success: false, message: "User not authenticated. Please log in." });
        }
        const userId = req.user.id || req.user._id;
        const { item, address } = req.body;
        
        if (!Array.isArray(item) || item.length === 0) {
            return res.status(400).json({ success: false, message: "Items are required and must be a non-empty array." });
        }
        if (!address) {
            return res.status(400).json({ success: false, message: "Address is required." });
        }

        // Calculate amount using items
        let amount = 0;
        for (const orderItem of item) {
            const product = await Product.findById(orderItem.product);
            if (!product) {
                return res.status(404).json({ success: false, message: `Product not found: ${orderItem.product}` });
            }
            amount += product.offerPrice * orderItem.quantity;
        }

        // Add Tax 2%
        amount += Math.floor(amount * 0.02);

        // Create Razorpay order (do NOT create DB order yet)
        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency: "INR",
            receipt: `${userId}-${Date.now()}`,
            notes: {
                userId: userId,
                item: JSON.stringify(item),
                address: address,
                amount: amount,
            },
        };

        let razorpayOrder;
        try {
            razorpayOrder = await razorpay.orders.create(options);
        } catch (rzpErr) {
            console.error("Razorpay order creation error:", rzpErr);
            return res.status(500).json({ success: false, message: "Failed to create Razorpay order.", error: rzpErr.message });
        }

        res.status(200).json({
            success: true,
            order: razorpayOrder,
            // Pass order details to frontend for later verification
            orderDetails: {
                item,
                address,
                amount,
            },
            message: "Razorpay order created successfully",
        });

    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

// Verify Razorpay Payment : /api/order/razorpay/verify
export const verifyRazorpayPayment = async (req, res) => {
    try {
        if (!razorpay) {
            return res.status(500).json({ 
                success: false, 
                message: "Razorpay is not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env file" 
            });
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, item, address, amount } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !item || !address || !amount) {
            return res.status(400).json({ success: false, message: "All payment and order details are required" });
        }

        // Verify the payment signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const crypto = await import('crypto');
        const expectedSignature = crypto.default
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }

        // Create order in database only after payment is verified
        const userId = req.user.id || req.user._id;
        const order = await Order.create({
            userId,
            items: item,
            amount,
            address,
            paymentType: "Online",
            isPaid: true,
            status: "Payment Confirmed",
        });

        res.status(200).json({
            success: true,
            message: "Payment verified and order created successfully",
            order,
        });

    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get User Orders :  /api/order/user


export const getUserOrders = async (req, res) => {
    try {
        
        const userId = req.user.id;
        const orders = await Order.find({
             userId ,
              $or : [{paymentType:"COD"},{isPaid:true}]
            }).populate("items.product address").sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders,
            message: "Orders fetched successfully",
        });

    } catch (error) {
         
        console.error("Error fetching user orders:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Get All Orders (for Admin/Seller) :  /api/order/seller    


export const getAllOrders = async (req, res) => {
    try {
        
        const orders = await Order.find({
              $or : [{paymentType:"COD"},{isPaid:true}]
            }).populate("items.product address").sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders,
            message: "Orders fetched successfully",
        });

    } catch (error) {
         
        console.error("Error fetching user orders:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Seller Statistics Endpoint
export const getSellerStats = async (req, res) => {
    try {
        // Parse time span
        const { span } = req.query;
        let startDate;
        if (span === '7d') {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);
        } else if (span === '30d') {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);
        } else {
            startDate = null; // Lifetime
        }

        // Build match filter
        const match = {
            isPaid: true,
        };
        if (startDate) {
            match.createdAt = { $gte: startDate };
        }

        // Aggregate top selling products
        const topProducts = await Order.aggregate([
            { $match: match },
            { $unwind: "$items" },
            // Lookup product info and price
            { $lookup: {
                from: "products",
                let: { prodId: "$items.product" },
                pipeline: [
                  { $addFields: { prodIdStr: { $toString: "$_id" } } },
                  { $match: { $expr: { $eq: ["$prodIdStr", "$$prodId"] } } },
                ],
                as: "productInfo"
            }},
            { $unwind: "$productInfo" },
            { $group: {
                _id: "$productInfo._id",
                name: { $first: "$productInfo.name" },
                category: { $first: "$productInfo.category" },
                totalQuantity: { $sum: "$items.quantity" },
                totalRevenue: { $sum: { $multiply: ["$items.quantity", "$productInfo.offerPrice"] } },
            }},
            { $sort: { totalQuantity: -1 } },
            { $limit: 10 },
            { $project: {
                _id: 0,
                productId: "$_id",
                name: 1,
                category: 1,
                totalQuantity: 1,
                totalRevenue: 1,
            }}
        ]);

        // Aggregate sales by day
        const salesByDay = await Order.aggregate([
            { $match: match },
            { $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                totalRevenue: { $sum: "$amount" },
                orderCount: { $sum: 1 },
            }},
            { $sort: { _id: 1 } },
        ]);

        // Total revenue
        const totalStats = await Order.aggregate([
            { $match: match },
            { $group: {
                _id: null,
                totalRevenue: { $sum: "$amount" },
                totalOrders: { $sum: 1 },
            }}
        ]);

        res.json({
            success: true,
            stats: {
                topProducts,
                salesByDay,
                totalRevenue: totalStats[0]?.totalRevenue || 0,
                totalOrders: totalStats[0]?.totalOrders || 0,
            }
        });
    } catch (error) {
        console.error("Error fetching seller stats:", error);
        res.status(500).json({ success: false, message: "Failed to fetch statistics" });
    }
};

// Update payment status (isPaid) for an order
export const updateOrderPaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isPaid } = req.body;
        if (typeof isPaid !== 'boolean') {
            return res.status(400).json({ success: false, message: 'isPaid must be boolean' });
        }
        const order = await Order.findByIdAndUpdate(id, { isPaid }, { new: true });
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.json({ success: true, order });
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ success: false, message: 'Failed to update payment status' });
    }
};


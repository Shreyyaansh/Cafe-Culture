import mongoose from "mongoose";
import Order from "../models/Order.js";

// Connect to database
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://shrey08:shrey08@cluster0.5vkidji.mongodb.net/Cafe-Culture`);
        console.log("✅ Connected to MongoDB Atlas - Cafe Culture database");
        return true;
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        return false;
    }
};

// Check what's in the database
const checkDatabase = async () => {
    try {
        console.log("\n🔍 Checking database contents...");
        
        // Count total orders
        const totalOrders = await Order.countDocuments();
        console.log(`📊 Total orders in database: ${totalOrders}`);
        
        if (totalOrders === 0) {
            console.log("⚠️  No orders found in database!");
            return;
        }
        
        // Get all orders
        const orders = await Order.find({}).sort({ orderTime: -1 });
        
        console.log("\n📋 Orders in database:");
        console.log("=" * 50);
        
        orders.forEach((order, index) => {
            console.log(`${index + 1}. Order ID: ${order._id}`);
            console.log(`   Table: ${order.tableNumber}`);
            console.log(`   Customer: ${order.customerName}`);
            console.log(`   Status: ${order.status}`);
            console.log(`   Total: ₹${order.totalAmount}`);
            console.log(`   Items: ${order.items.length}`);
            console.log(`   Order Time: ${order.orderTime.toLocaleString()}`);
            console.log(`   Created: ${order.createdAt.toLocaleString()}`);
            console.log("---");
        });
        
        // Check database name and collections
        const db = mongoose.connection.db;
        console.log(`\n🗄️  Database name: ${db.databaseName}`);
        
        const collections = await db.listCollections().toArray();
        console.log("📁 Collections in database:");
        collections.forEach(col => {
            console.log(`   - ${col.name}`);
        });
        
    } catch (error) {
        console.error("❌ Error checking database:", error);
    }
};

// Test connection and check database
const main = async () => {
    const connected = await connectDB();
    
    if (connected) {
        await checkDatabase();
        
        // Close connection
        await mongoose.connection.close();
        console.log("\n🔌 Database connection closed");
    }
    
    process.exit(0);
};

// Run the script
main().catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
});

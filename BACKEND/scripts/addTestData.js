import mongoose from "mongoose";
import Order from "../models/Order.js";

// Connect to database
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://shrey08:shrey08@cluster0.5vkidji.mongodb.net/Cafe-Culture`);
        console.log("Connected to MongoDB Atlas - Cafe Culture database");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

// Test data for orders
const testOrders = [
    {
        tableNumber: 5,
        customerName: "John Doe",
        items: [
            {
                name: "Cappuccino",
                price: 120,
                quantity: 2,
                category: "hot-coffees",
                image: "☕"
            },
            {
                name: "Chocolate Croissant",
                price: 99,
                quantity: 1,
                category: "desserts",
                image: "🥐"
            }
        ],
        totalAmount: 339,
        status: "pending",
        orderType: "dine-in",
        specialInstructions: "Extra hot cappuccino",
        estimatedTime: 15
    },
    {
        tableNumber: 12,
        customerName: "Sarah Wilson",
        items: [
            {
                name: "Iced Latte",
                price: 140,
                quantity: 1,
                category: "cold-coffees",
                image: "🧊"
            },
            {
                name: "Veg Sandwich",
                price: 150,
                quantity: 1,
                category: "food",
                image: "🥪"
            },
            {
                name: "Chocolate Cake",
                price: 189,
                quantity: 1,
                category: "desserts",
                image: "🍰"
            }
        ],
        totalAmount: 479,
        status: "preparing",
        orderType: "dine-in",
        specialInstructions: "No ice in latte",
        estimatedTime: 20
    },
    {
        tableNumber: 3,
        customerName: "Mike Johnson",
        items: [
            {
                name: "Americano",
                price: 100,
                quantity: 1,
                category: "hot-coffees",
                image: "☕"
            },
            {
                name: "Chicken Burger",
                price: 199,
                quantity: 1,
                category: "food",
                image: "🍔"
            }
        ],
        totalAmount: 299,
        status: "ready",
        orderType: "dine-in",
        specialInstructions: "",
        estimatedTime: 12,
        completedTime: new Date()
    },
    {
        tableNumber: 8,
        customerName: "Emma Davis",
        items: [
            {
                name: "Frappe",
                price: 160,
                quantity: 2,
                category: "cold-coffees",
                image: "🧊"
            },
            {
                name: "Nachos with Dip",
                price: 129,
                quantity: 1,
                category: "snacks",
                image: "🍟"
            }
        ],
        totalAmount: 449,
        status: "completed",
        orderType: "takeaway",
        specialInstructions: "Extra cheese on nachos",
        estimatedTime: 18,
        completedTime: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
    },
    {
        tableNumber: 15,
        customerName: "Alex Brown",
        items: [
            {
                name: "Espresso",
                price: 80,
                quantity: 1,
                category: "hot-coffees",
                image: "☕"
            },
            {
                name: "Pizza Margherita",
                price: 220,
                quantity: 1,
                category: "food",
                image: "🍕"
            },
            {
                name: "Thick Shake",
                price: 150,
                quantity: 1,
                category: "desserts",
                image: "🥤"
            }
        ],
        totalAmount: 450,
        status: "pending",
        orderType: "dine-in",
        specialInstructions: "Extra spicy pizza",
        estimatedTime: 25
    }
];

// Function to add test data
const addTestData = async () => {
    try {
        // Clear existing orders (optional - remove this if you want to keep existing data)
        await Order.deleteMany({});
        console.log("Cleared existing orders");

        // Insert test orders
        const insertedOrders = await Order.insertMany(testOrders);
        console.log(`Successfully added ${insertedOrders.length} test orders`);

        // Display summary
        console.log("\n=== Test Orders Added ===");
        insertedOrders.forEach((order, index) => {
            console.log(`${index + 1}. Table ${order.tableNumber} - ${order.customerName}`);
            console.log(`   Status: ${order.status}`);
            console.log(`   Total: ₹${order.totalAmount}`);
            console.log(`   Items: ${order.items.length}`);
            console.log(`   Order Time: ${order.orderTime.toLocaleString()}`);
            console.log("---");
        });

        console.log("\n✅ Test data added successfully!");
        console.log("You can now test the admin panel with this data.");

    } catch (error) {
        console.error("Error adding test data:", error);
    }
};

// Main execution
const main = async () => {
    await connectDB();
    await addTestData();
    
    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
};

// Run the script
main().catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
});

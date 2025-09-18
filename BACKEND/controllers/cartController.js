import User from '../models/User.js';


// Update User cartData :  /api/cart/update

export const updateCart = async (req, res) => {
    try {
        
        const userId = req.user.id;
        const { cartItems } = req.body;
        await User.findByIdAndUpdate(userId, { cartItems }, { new: true });
        res.json({
            success: true,
            message: "Cart updated successfully",
        });
    } catch (error) {
        
        console.error("Error updating cart:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Test endpoint to check cart state
export const getCartState = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        
        console.log("=== CART STATE DEBUG ===");
        console.log("User ID:", userId);
        console.log("User found:", user ? "Yes" : "No");
        if (user) {
            console.log("User cartItems:", user.cartItems);
            console.log("CartItems type:", typeof user.cartItems);
            console.log("CartItems keys:", Object.keys(user.cartItems || {}));
        }
        console.log("========================");
        
        res.json({
            success: true,
            user: user,
            cartItems: user ? user.cartItems : null
        });
    } catch (error) {
        console.error("Error getting cart state:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
// Update User cartData :  /api/cart/update

export const updateCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.body;

        // If no authenticated user context, accept cart as a client-side state and no-op on server
        if (!userId) {
            return res.json({ success: true, message: "Cart updated (no user context)" });
        }

        // User model removed in simplified app; acknowledge but do not write to DB
        res.json({ success: true, message: "Cart update acknowledged" });
    } catch (error) {
        
        console.error("Error updating cart:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
import Address from "../models/Address.js";


// Add Address  : /api/address/add

export const addAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const userId = req.user.id; 
        await Address.create({...address, userId});
        res.status(201).json({
            success: true,
            message: "Address added successfully",
        });
    } catch (error) {
        console.error("Error adding address:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

}


// Get Address : /api/address/get

export const getAddress = async (req, res) => {
    try {
        
        const  userId  = req.user.id; 
        const addresses = await Address.find({ userId });
        res.status(200).json({
            success: true,
            addresses,
            message: "Addresses fetched successfully",
        });

    } catch (error) {
        console.error("Error fetching addresses:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });

    }

}   
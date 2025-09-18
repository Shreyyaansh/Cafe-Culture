import Product from "../models/Product.js";
import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config();


// Adding Products :  api/product/add

export const addProduct = async (req, res) => {
    try{
        let productData = JSON.parse(req.body.productData);
        const images = req.files;
        let imageUrls = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image",
                });
                return result.secure_url;
            })
        );

        await Product.create({...productData, images: imageUrls});

        res.status(201).json({
            success: true,
            message: "Product added successfully",
        });
    }
    catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }


}

// Get Products :  api/product/list

export const productList = async (req, res) => {

    try{
        const products = await Product.find({});

        res.json({
            success: true,
            products,
        });
    }

    catch (error) {
        console.error("Error fetching product list:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }

}


// Get Single Product :  api/products/id

export const productById = async (req, res) => {

    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({
            success: true,
            product,
        });
    }

    catch (error) {
        console.error("Error fetching product by ID:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }


}


// Change Product Stock :  api/product/stock

export const changeStock = async (req, res) => {

    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock }, { new: true });
        res.json({
            success: true,
            message: "Product stock updated successfully",
        });

    } catch (error) {
        console.error("Error updating product stock:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
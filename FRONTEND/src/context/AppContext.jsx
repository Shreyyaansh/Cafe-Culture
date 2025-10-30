import { Children, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { getMenuItemById, isMenuItem } from "../assets/menuItems";
import toast from "react-hot-toast";
export const AppContext = createContext();
import axios from "axios";



axios.defaults.withCredentials = true;

// Set base URL with proper fallback
const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
console.log('Backend URL:', backendURL); // Debug log
axios.defaults.baseURL = backendURL;

export const AppContextProvider = ({children})=>{
    const currency= import.meta.env.VITE_CURRENCY || '₹';
    const navigate = useNavigate();
    const[user,setUser]= useState(null)
    const[showUserLogin,setShowUserLogin]=useState(false)
    const[products,setProducts]=useState([])
    const[cartItems,setCartItems]=useState({})
    const[searchQuery,setSearchQuery]=useState({})



    // Simplified app: no auth API; default to guest
    const fetchUser = async ()=>{
        setUser(null);
        setCartItems({});
    }

    // Simplified app: no backend products; rely on local menu only
    const  fetchProducts = async ()=>{
        setProducts([]);
    }


    // Add Cart Item
    const addToCart = (itemId) =>{
        console.log('🛒 Adding to cart:', itemId);
        console.log('🛒 Current cartItems:', cartItems);
        
        let cartData = (typeof cartItems === 'object' && !Array.isArray(cartItems)) ? structuredClone(cartItems) : {};

        if (cartData[itemId])
        {
            cartData[itemId]+=1;
        }

        else{
            cartData[itemId]=1;
        }

        console.log('🛒 New cartData:', cartData);
        setCartItems(cartData);
        toast.success("Added to Cart");
    }

    // Update Cart Item Quantity
    const updateCartItem = (itemId, quantity) =>
    {
        let cartData = (typeof cartItems === 'object' && !Array.isArray(cartItems)) ? structuredClone(cartItems) : {};
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart Updated");
    }


    //Remove Cart Item
    const removeFromCart = (itemId) => {
        let cartData = (typeof cartItems === 'object' && !Array.isArray(cartItems)) ? structuredClone(cartItems) : {};
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success("Removed from Cart");
        setCartItems(cartData);
    }

    // Fetch Products on Initial Render
    useEffect(()=>{
        fetchUser();
        fetchProducts();
    },[])


    //Get Cart item count

    const getCartCount = () => {
        let totalcount = 0;
        for (const item in cartItems) {
            totalcount += cartItems[item];
        }
        return totalcount;
    }

    // Get Cart total amount

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if(cartItems[item] > 0) {
                // Check if it's a menu item
                if (isMenuItem(item)) {
                    const menuItem = getMenuItemById(item);
                    if (menuItem) {
                        totalAmount += menuItem.price * cartItems[item];
                    }
                } else {
                    // Handle database products
                    let itemInfo = products.find(product => product._id === item);
                    if(itemInfo) {
                        totalAmount += itemInfo.offerPrice * cartItems[item];
                    }
                }
            }
        } 
        return Math.floor(totalAmount * 100) / 100; 
    }



    const value = {navigate,user,setUser,products,currency,addToCart,updateCartItem,removeFromCart,cartItems,showUserLogin,setShowUserLogin,searchQuery,setSearchQuery,getCartAmount,getCartCount,axios,fetchProducts,setCartItems};

    return(
        <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
    );
    
}

export const UseAppContext = ()=>{
    return useContext(AppContext); 
}
import { Children, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
export const AppContext = createContext();
import axios from "axios";



axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContextProvider = ({children})=>{
    const currency= import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const[user,setUser]= useState(null)
    const[showUserLogin,setShowUserLogin]=useState(false)
    const[isSeller,setIsSeller]=useState(false)
    const[products,setProducts]=useState([])
    const[cartItems,setCartItems]=useState({})
    const[searchQuery,setSearchQuery]=useState({})

    // Fetch Seller Status

    const fetchSeller = async () => {
        try {
            const {data} = await axios.get('/api/seller/is-auth');
            if(data.success)
            {
                setIsSeller(true);
            }

            else{
                setIsSeller(false);
            }


        } catch (error) {
            setIsSeller(false); 
        }
    }


    // Fetch User Auth Status 
    const fetchUser = async ()=>{
        try {
            const {data} = await axios.get('/api/user/is-auth');
            if(data.success)
            {
                setUser(data.user);
                setCartItems((typeof data.user.cartItems === 'object' && !Array.isArray(data.user.cartItems)) ? data.user.cartItems : {});
            }

        } catch (error) {
            setUser(null);
        }
    }

    const  fetchProducts = async ()=>{
        try {

            const {data} = await axios.get('api/product/list');
            if(data.success)
            {
                setProducts(data.products);
            }
            else{
                toast.error(data.message);
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    }


    // Add Cart Item
    const addToCart = (itemId) =>{
        let cartData = (typeof cartItems === 'object' && !Array.isArray(cartItems)) ? structuredClone(cartItems) : {};

        if (cartData[itemId])
        {
            cartData[itemId]+=1;
        }

        else{
            cartData[itemId]=1;
        }

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
        fetchSeller();
        fetchProducts();

    },[])

    useEffect(()=>{
         const updateCart = async ()=>{
            try {
                const {data} = await axios.post('/api/cart/update',{cartItems});

                if(!data.success)
                {
                    toast.error(data.message);
                }


            } catch (error) {
                toast.error(error.message); 
            }
         }

         if(user)
         {
            updateCart();
         }
    },[cartItems]);

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
            let itemInfo = products.find(product => product._id === item);
            if(cartItems[item] > 0 && itemInfo) {
                totalAmount += itemInfo.offerPrice * cartItems[item];
            }
        } 
        return Math.floor(totalAmount * 100) / 100; 
    }



    const value = {navigate,user,setUser,isSeller,setIsSeller,products,currency,addToCart,updateCartItem,removeFromCart,cartItems,showUserLogin,setShowUserLogin,searchQuery,setSearchQuery,getCartAmount,getCartCount,axios,fetchProducts,setCartItems};

    return(
        <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
    );
    
}

export const UseAppContext = ()=>{
    return useContext(AppContext); 
}
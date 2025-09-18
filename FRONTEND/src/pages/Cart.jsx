import React, { useEffect, useState } from 'react';
import { UseAppContext } from '../context/AppContext';
import { assets, dummyAddress } from '../assets/assets';
import toast from 'react-hot-toast';

// Razorpay script loader
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      return resolve(true);
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Cart = () => {
    

    const[cartArray,setCartArray]=useState([]);
    const[address,setAddress]=useState([]);
    const [showAddress, setShowAddress] = useState(false);
    const[selectedAddress,setSelectedAddress]=useState(null);
    const[paymentOption,setPaymentOption]=useState("COD");
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const {products,currency,cartItems,removeFromCart,getCartCount,updateCartItem,navigate,getCartAmount,axios,user,setCartItems} = UseAppContext();
    const getCart = () => {
        let temp=[];
        for (const key in cartItems) {
            const product = products.find(item => item._id === key);
            if (product) {
                product.quantity = cartItems[key];
                temp.push(product);
            }
        }
        setCartArray(temp);
    }

    const getUserAddress = async () => {
        try {
            const {data} = await axios.get('/api/address/get');
            if(data.success){
                setAddress(data.addresses);
                if(data.addresses.length > 0){
                    setSelectedAddress(data.addresses[0]);
                }
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if(products.length > 0 && cartItems){
            getCart();
        }
    },[products,cartItems]);

    useEffect(()=>{
        if(user){
            getUserAddress();
        }
    },[user]);

    const handlePlaceOrder = () => {
        if (!selectedAddress) {
            toast.error("Please select an address");
            return;
        }

        if (paymentOption === "COD") {
            setShowConfirmDialog(true);
        } else if (paymentOption === "Online") {
            placeOnlineOrder();
        }
    };

    const placeOnlineOrder = async () => {
        try {
            // 1. Load Razorpay script
            const res = await loadRazorpayScript();
            if (!res) {
                toast.error("Razorpay SDK failed to load. Are you online?");
                return;
            }

            // 2. Create order on backend
            const { data } = await axios.post("/api/order/razorpay/create", {
                item: cartArray.map(item => ({
                    product: item._id,
                    quantity: item.quantity
                })),
                address: selectedAddress._id,
            });

            if (!data.success) {
                toast.error(data.message);
                return;
            }

            // Save order details for verification
            const orderDetails = data.orderDetails;

            // 3. Open Razorpay checkout
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: data.order.currency,
                name: "Salasar Enterprise",
                description: "Order Payment",
                order_id: data.order.id,
                handler: async function (response) {
                    // 4. Verify payment on backend and create order
                    const verifyRes = await axios.post("/api/order/razorpay/verify", {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        item: orderDetails.item,
                        address: orderDetails.address,
                        amount: orderDetails.amount,
                    });
                    if (verifyRes.data.success) {
                        toast.success("Payment successful!");
                        setCartItems({});
                        navigate("/my-orders");
                    } else {
                        toast.error("Payment verification failed");
                    }
                },
                prefill: {
                    name: user?.name,
                    email: user?.email,
                },
                theme: {
                    color: "#6366f1",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const confirmCODOrder = async () => {
        try {
            const {data} = await axios.post('/api/order/cod',{
                item: cartArray.map(item => ({
                    product: item._id,
                    quantity: item.quantity
                })),
                address: selectedAddress._id,
            });

            if(data.success){
                toast.success(data.message);
                setCartItems({});
                setShowConfirmDialog(false);
                navigate('/my-orders');
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const cancelOrder = () => {
        setShowConfirmDialog(false);
        navigate('/cart');
    };

    return (products.length > 0 && cartItems) ? (
        <>
            <div className="flex flex-col md:flex-row mt-12">
                <div className='flex-1 max-w-4xl'>
                    <h1 className="text-3xl font-medium mb-6">
                        Shopping Cart <span className="text-sm text-indigo-500">{getCartCount()}</span>
                    </h1>

                    <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                        <p className="text-left">Product Details</p>
                        <p className="text-center">Subtotal</p>
                        <p className="text-center">Action</p>
                    </div>

                    {cartArray.map((product, index) => (
                        <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                            <div className="flex items-center md:gap-6 gap-3">
                                <div onClick={( )=> {navigate(`/products/${product.category.toLowerCase()}/${product._id}`);scrollTo(0,0)}} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                                    <img className="max-w-full h-full object-cover" src={product.images[0]} alt={product.name} />
                                </div>
                                <div>
                                    <p className="hidden md:block font-semibold">{product.name}</p>
                                    <div className="font-normal text-gray-500/70">
                                        <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                        <div className='flex items-center'>
                                            <p>Qty:</p>
                                            <select onChange={(e)=> updateCartItem(product._id,Number(e.target.value))}
                                            value={cartItems[product._id]} className='outline-none'>
                                                {Array(cartItems[product._id] > 9 ? (cartItems[product._id]): 9).fill('').map((_, index) => (
                                                    <option key={index} value={index + 1}>{index + 1}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                            <button onClick={()=> removeFromCart(product._id)} className="cursor-pointer mx-auto">
                                <img src={assets.remove_icon } alt="remove" className='inline-block w-6 h-6' />
                            </button>
                        </div>)
                    )}

                    <button onClick={()=> {navigate("/products");scrollTo(0,0);}} className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium">
                        <img src={assets.arrow_right_icon_colored} alt="arrow" className='group-hover:translate-x-1 transition-all duration-300 ease-in-out'/> 
                        Continue Shopping
                    </button>

                </div>

                <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                    <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                    <hr className="border-gray-300 my-5" />

                    <div className="mb-6">
                        <p className="text-sm font-medium uppercase">Delivery Address</p>
                        <div className="relative flex justify-between items-start mt-2">
                            <p className="text-gray-500">{selectedAddress ? `${selectedAddress.street},${selectedAddress.city},${selectedAddress.state}` : "No address found"}</p>
                            <button onClick={() => setShowAddress(!showAddress)} className="text-indigo-500 hover:underline cursor-pointer">
                                Change
                            </button>
                            {showAddress && (
                                <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                                    {address.map((addr, idx) => (
                                        <p
                                            key={addr._id || idx}
                                            onClick={() => { setSelectedAddress(addr); setShowAddress(false); }}
                                            className={`text-gray-500 p-2 hover:bg-gray-100 cursor-pointer${selectedAddress && selectedAddress._id === addr._id ? ' bg-gray-200' : ''}`}
                                        >
                                            {addr.street}, {addr.city}, {addr.state}
                                        </p>
                                    ))}
                                    <p onClick={() => navigate("/add-address")} className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10">
                                        Add address
                                    </p>
                                </div>
                            )}
                        </div>

                        <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                        <select onChange={(e)=> setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                            <option value="COD">Cash On Delivery</option>
                            <option value="Online">Online Payment</option>
                        </select>
                    </div>

                    <hr className="border-gray-300" />

                    <div className="text-gray-500 mt-4 space-y-2">
                        <p className="flex justify-between">
                            <span>Price</span><span>{currency}{getCartAmount()}</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Shipping Fee</span><span className="text-green-600">Free</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Tax (2%)</span><span>{currency}{getCartAmount()*0.02} </span>
                        </p>
                        <p className="flex justify-between text-lg font-medium mt-3">
                            <span>Total Amount:</span><span>{currency}{getCartAmount()+ getCartAmount()*0.02}</span>
                        </p>
                    </div>

                    <button onClick={handlePlaceOrder} className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
                        {
                            paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"
                        }
                    </button>
                </div>
            </div>

            {/* Confirmation Dialog */}
            {showConfirmDialog && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Order</h3>
                        
                        <div className="mb-6">
                            <p className="text-gray-600 mb-3">Please review your order details:</p>
                            
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <div className="mb-3">
                                    <p className="text-sm font-medium text-gray-700">Delivery Address:</p>
                                    <p className="text-sm text-gray-600">
                                        {selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}` : "No address found"}
                                    </p>
                                </div>
                                
                                <div className="mb-3">
                                    <p className="text-sm font-medium text-gray-700">Payment Method:</p>
                                    <p className="text-sm text-gray-600">Cash on Delivery</p>
                                </div>
                                
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Total Amount:</p>
                                    <p className="text-lg font-bold text-indigo-600">
                                        {currency}{getCartAmount() + getCartAmount() * 0.02}
                                    </p>
                                </div>
                            </div>
                            
                            <p className="text-sm text-gray-600">
                                Are you sure you want to place this order? You will pay {currency}{getCartAmount() + getCartAmount() * 0.02} on delivery.
                            </p>
                        </div>
                        
                        <div className="flex gap-3">
                            <button
                                onClick={cancelOrder}
                                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmCODOrder}
                                className="flex-1 py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    ) : null;
}

export default Cart;
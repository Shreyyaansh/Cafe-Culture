import React, { useEffect, useState } from 'react';
import { UseAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { getMenuItemById, isMenuItem } from '../assets/menuItems';
import { menuImageMapping } from '../assets/cafeCultureImages';
import toast from 'react-hot-toast';


const Cart = () => {
    
    const[cartArray,setCartArray]=useState([]);

    // Helper function to get the correct image for cart items
    const getItemImage = (item) => {
        if (item.isMenuItem) {
            // For menu items, use the image mapping
            const imageKey = item.name;
            return menuImageMapping[imageKey] || '🍽️';
        } else {
            // For database products, use the original image
            return item.images[0] || '🍽️';
        }
    };
    const [tableNumber, setTableNumber] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [orderType, setOrderType] = useState('dine-in');
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const {products,currency,cartItems,removeFromCart,getCartCount,updateCartItem,navigate,getCartAmount,user,setCartItems,axios} = UseAppContext();
    
    const getCart = () => {
        let temp=[];
        for (const key in cartItems) {
            // Check if it's a menu item
            if (isMenuItem(key)) {
                const menuItem = getMenuItemById(key);
                if (menuItem) {
                    const cartItem = {
                        _id: key,
                        name: menuItem.name,
                        offerPrice: typeof menuItem.price === 'string' ? parseFloat(menuItem.price.replace('₹', '')) : menuItem.price,
                        images: [menuItem.image],
                        category: menuItem.category,
                        weight: 'N/A',
                        quantity: cartItems[key],
                        isMenuItem: true,
                        description: menuItem.description,
                        extra: menuItem.extra
                    };
                    temp.push(cartItem);
                } else {
                    // Fallback for menu items not in menuItemsData
                    const cartItem = {
                        _id: key,
                        name: key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        offerPrice: 100, // Default price
                        images: ['🍽️'],
                        category: 'menu',
                        weight: 'N/A',
                        quantity: cartItems[key],
                        isMenuItem: true,
                        description: 'Menu item'
                    };
                    temp.push(cartItem);
                }
            } else {
                // Handle database products
            const product = products.find(item => item._id === key);
            if (product) {
                product.quantity = cartItems[key];
                    product.isMenuItem = false;
                temp.push(product);
                }
            }
        }
        setCartArray(temp);
    }


    useEffect(() => {
        if(cartItems && Object.keys(cartItems).length > 0){
            getCart();
        }
    },[products,cartItems]);

    // Submit order to database
    const submitOrder = async () => {
        if (!customerName?.trim() || !phone?.trim() || !address?.trim()) {
            toast.error("Please fill customer name, phone number, and address");
            return;
        }

        if (cartArray.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        setIsSubmitting(true);

        try {
            const orderData = {
                ...(tableNumber ? { tableNumber: parseInt(tableNumber) } : {}),
                customerName: customerName,
                phone: phone,
                address: address,
                items: cartArray.map(item => ({
                    name: item.name,
                    price: item.offerPrice,
                    quantity: item.quantity,
                    category: item.category,
                    image: getItemImage(item)
                })),
                totalAmount: getCartAmount(),
                orderType: orderType,
                specialInstructions: specialInstructions
            };

            console.log('📤 Sending order data:', orderData);
            console.log('🌐 API URL:', axios.defaults.baseURL + '/api/order/create');

            const { data } = await axios.post('/api/order/create', orderData);

            if (data.success) {
                toast.success("Order placed successfully!");
                setCartItems({}); // Clear cart
                setTableNumber('');
                setCustomerName('');
                setPhone('');
                setAddress('');
                setSpecialInstructions('');
                setShowOrderModal(false);
                navigate('/'); // Redirect to home
            } else {
                toast.error(data.message || "Failed to place order");
            }

        } catch (error) {
            console.error("❌ Error submitting order:", error);
            console.error("❌ Error response:", error.response?.data);
            console.error("❌ Error status:", error.response?.status);
            console.error("❌ Error message:", error.message);
            
            const errorMessage = error.response?.data?.message || error.message || "Failed to place order. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle place order button click
    const handlePlaceOrder = () => {
        setShowOrderModal(true);
    };

    const handleEmptyCart = () => {
        if (!cartItems || Object.keys(cartItems).length === 0) return;
        const ok = window.confirm('Empty the cart?');
        if (!ok) return;
        setCartItems({});
        setCartArray([]);
        toast.success('Cart emptied');
    };


    // Simple loading state
    if (!cartItems) {
        return <div className="min-h-screen flex items-center justify-center mt-20 pt-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-[#7c3f00] mb-4">Loading Cart...</h1>
                <p className="text-[#7c3f00]/70">Please wait</p>
            </div>
        </div>;
    }

    return (cartItems && Object.keys(cartItems).length > 0) ? (
        <>
            <div className="flex flex-col lg:flex-row mt-20 pt-8 gap-8">
                <div className='flex-1 max-w-4xl'>
                    <h1 className="text-3xl font-bold text-[#7c3f00] mb-6">
                        Your Cart <span className="text-lg text-[#7c3f00]/70 ml-2">({getCartCount()} items)</span>
                    </h1>

                    <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-[#7c3f00] text-base font-semibold pb-3 bg-[#faf0e6] p-4 rounded-lg">
                        <p className="text-left">Item Details</p>
                        <p className="text-center">Subtotal</p>
                        <p className="text-center">Action</p>
                    </div>

                    {/* Scrollable items container */}
                    <div className="max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#7c3f00]/30 scrollbar-track-[#faf0e6] hover:scrollbar-thumb-[#7c3f00]/50">
                           <div className="space-y-3 pb-4">
                               {cartArray.map((product, index) => (
                                   <div key={index}>
                                       {/* Mobile Layout */}
                                       <div className="md:hidden bg-white rounded-lg p-4 shadow-sm border border-[#7c3f00]/10">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-16 h-16 flex items-center justify-center border border-[#7c3f00]/20 rounded-lg bg-[#faf0e6] flex-shrink-0">
                                        {(() => {
                                            const image = getItemImage(product);
                                            return typeof image === 'string' && image.startsWith('/') ? (
                                                <img 
                                                    className="max-w-full h-full object-cover rounded-lg" 
                                                    src={image} 
                                                    alt={product.name} 
                                                />
                                            ) : (
                                                <span className="text-2xl">{image}</span>
                                            );
                                        })()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-[#7c3f00] mb-1 text-sm">{product.name}</p>
                                        {product.description && (
                                            <p className="text-xs text-[#7c3f00]/70 mb-1 line-clamp-2">{product.description}</p>
                                        )}
                                        <p className="text-xs text-[#7c3f00]/60 mb-2">Category: <span className="capitalize">{product.category}</span></p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <div className='flex items-center gap-2'>
                                        <p className="text-sm text-[#7c3f00]/70">Qty:</p>
                                        <select 
                                            onChange={(e)=> updateCartItem(product._id,Number(e.target.value))}
                                            value={cartItems[product._id]} 
                                            className='outline-none border border-[#7c3f00]/20 rounded px-2 py-1 bg-white text-[#7c3f00] text-sm'
                                        >
                                            {Array(cartItems[product._id] > 9 ? (cartItems[product._id]): 9).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <p className="font-bold text-[#7c3f00] text-sm">{currency}{product.offerPrice * product.quantity}</p>
                                        <button 
                                            onClick={()=> removeFromCart(product._id)} 
                                            className="p-2 rounded-full hover:bg-[#7c3f00]/10 transition-colors"
                                        >
                                            <img src={assets.remove_icon } alt="remove" className='w-5 h-5' />
                                        </button>
                                    </div>
                                </div>
                            </div>

                                       {/* Desktop Layout */}
                                       <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-[#7c3f00] items-center text-sm md:text-base font-medium bg-white rounded-lg p-3 shadow-sm border border-[#7c3f00]/10 gap-4">
                                <div className="flex items-center md:gap-4 gap-3">
                                    <div className="cursor-pointer w-20 h-20 flex items-center justify-center border border-[#7c3f00]/20 rounded-lg bg-[#faf0e6]">
                                        {(() => {
                                            const image = getItemImage(product);
                                            return typeof image === 'string' && image.startsWith('/') ? (
                                                <img 
                                                    className="max-w-full h-full object-cover rounded-lg" 
                                                    src={image} 
                                                    alt={product.name} 
                                                />
                                            ) : (
                                                <span className="text-3xl">{image}</span>
                                            );
                                        })()}
                                    </div>
                                <div>
                                        <p className="font-semibold text-[#7c3f00] mb-1">{product.name}</p>
                                        {product.description && (
                                            <p className="text-xs text-[#7c3f00]/70 mb-2">{product.description}</p>
                                        )}
                                        {product.extra && (
                                            <p className="text-xs text-[#7c3f00]/60 italic mb-2">{product.extra}</p>
                                        )}
                                        <div className="font-normal text-[#7c3f00]/70">
                                            <p>Category: <span className="capitalize">{product.category}</span></p>
                                            <div className='flex items-center gap-2 mt-1'>
                                            <p>Qty:</p>
                                                <select 
                                                    onChange={(e)=> updateCartItem(product._id,Number(e.target.value))}
                                                    value={cartItems[product._id]} 
                                                    className='outline-none border border-[#7c3f00]/20 rounded px-2 py-1 bg-white text-[#7c3f00]'
                                                >
                                                {Array(cartItems[product._id] > 9 ? (cartItems[product._id]): 9).fill('').map((_, index) => (
                                                    <option key={index} value={index + 1}>{index + 1}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <p className="text-center font-bold text-[#7c3f00]">{currency}{product.offerPrice * product.quantity}</p>
                                <button 
                                    onClick={()=> removeFromCart(product._id)} 
                                    className="cursor-pointer mx-auto p-2 rounded-full hover:bg-[#7c3f00]/10 transition-colors"
                                >
                                <img src={assets.remove_icon } alt="remove" className='inline-block w-6 h-6' />
                                           </button>
                                       </div>
                                   </div>
                               ))}
                        </div>
                    </div>

                    <button onClick={()=> {navigate("/menu");scrollTo(0,0);}} className="group cursor-pointer flex items-center mt-6 gap-2 text-[#7c3f00] font-medium hover:text-[#a0522d] transition-colors">
                        <img src={assets.arrow_right_icon_colored} alt="arrow" className='group-hover:translate-x-1 transition-all duration-300 ease-in-out'/> 
                        Continue Shopping
                    </button>

                </div>

                {/* Simple Cart Summary */}
                <div className="max-w-[360px] w-full bg-[#faf0e6] p-6 max-md:mt-16 border border-[#7c3f00]/20 rounded-lg shadow-lg lg:sticky lg:top-24 lg:self-start">
                    <h2 className="text-xl md:text-xl font-bold text-[#7c3f00] mb-4">Cart Summary</h2>
                    <hr className="border-[#7c3f00]/20 my-5" />

                    <div className="text-[#7c3f00] mt-4 space-y-2">
                        <p className="flex justify-between">
                            <span>Total Items:</span><span>{getCartCount()}</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Subtotal:</span><span>{currency}{getCartAmount()}</span>
                        </p>
                        <p className="flex justify-between text-lg font-bold mt-3 pt-3 border-t border-[#7c3f00]/20">
                            <span>Total Amount:</span><span className="text-[#7c3f00]">{currency}{getCartAmount()}</span>
                        </p>
                    </div>

                    <button 
                        onClick={handlePlaceOrder}
                        className="w-full py-3 mt-6 bg-[#7c3f00] text-white font-semibold hover:bg-[#a0522d] transition-colors rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Placing Order...' : 'Place Order'}
                    </button>
                    <button
                        onClick={handleEmptyCart}
                        className="w-full py-2 mt-3 border border-[#7c3f00]/30 text-[#7c3f00] font-semibold hover:bg-[#7c3f00]/10 transition-colors rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting || !cartItems || Object.keys(cartItems).length === 0}
                    >
                        Empty Cart
                    </button>
                </div>
            </div>

            {/* Order Modal */}
            {showOrderModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold text-[#7c3f00] mb-4">Place Your Order</h3>
                        
                        <div className="space-y-4">
                            {/* Table Number (optional) */}
                            <div>
                                <label className="block text-sm font-semibold text-[#7c3f00] mb-2">
                                    Table Number
                                </label>
                                <input
                                    type="number"
                                    value={tableNumber}
                                    onChange={(e) => setTableNumber(e.target.value)}
                                    placeholder="Enter table number"
                                    className="w-full border border-[#7c3f00]/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c3f00]/20"
                                    min="1"
                                    max="50"
                                    
                                />
                            </div>

                            {/* Customer Name */}
                            <div>
                                <label className="block text-sm font-semibold text-[#7c3f00] mb-2">
                                    Customer Name *
                                </label>
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full border border-[#7c3f00]/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c3f00]/20"
                                    required
                                />
                                </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-semibold text-[#7c3f00] mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter your phone number"
                                    className="w-full border border-[#7c3f00]/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c3f00]/20"
                                    required
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-semibold text-[#7c3f00] mb-2">
                                    Address *
                                </label>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter your address"
                                    rows="2"
                                    className="w-full border border-[#7c3f00]/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c3f00]/20 resize-none"
                                    required
                                />
                            </div>

                                
                            {/* Order Type */}
                            <div>
                                <label className="block text-sm font-semibold text-[#7c3f00] mb-2">
                                    Order Type
                                </label>
                                <select
                                    value={orderType}
                                    onChange={(e) => setOrderType(e.target.value)}
                                    className="w-full border border-[#7c3f00]/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c3f00]/20"
                                >
                                    <option value="dine-in">Dine In</option>
                                    <option value="takeaway">Takeaway</option>
                                </select>
                                </div>
                                
                            {/* Special Instructions */}
                                <div>
                                <label className="block text-sm font-semibold text-[#7c3f00] mb-2">
                                    Special Instructions
                                </label>
                                <textarea
                                    value={specialInstructions}
                                    onChange={(e) => setSpecialInstructions(e.target.value)}
                                    placeholder="Any special requests or instructions..."
                                    rows="3"
                                    className="w-full border border-[#7c3f00]/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c3f00]/20 resize-none"
                                />
                            </div>

                            {/* Order Summary */}
                            <div className="bg-[#faf0e6] p-4 rounded-lg">
                                <h4 className="font-semibold text-[#7c3f00] mb-2">Order Summary</h4>
                                <div className="space-y-1 text-sm">
                                    <p>Items: {getCartCount()}</p>
                                    <p>Total: {currency}{getCartAmount()}</p>
                                    <p>Table: {tableNumber || 'Not specified'}</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Modal Buttons */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowOrderModal(false)}
                                className="flex-1 py-2 px-4 border border-[#7c3f00]/20 text-[#7c3f00] rounded-lg hover:bg-[#7c3f00]/10 transition-colors"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={submitOrder}
                                className="flex-1 py-2 px-4 bg-[#7c3f00] text-white rounded-lg hover:bg-[#a0522d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSubmitting || !customerName?.trim() || !phone?.trim() || !address?.trim()}
                            >
                                {isSubmitting ? 'Placing Order...' : 'Confirm Order'}
                            </button>


                        </div>
                    </div>
                </div>
            )}
        </>
    ) : (
        <div className="min-h-screen flex items-center justify-center mt-20 pt-8">
            <div className="text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h1 className="text-3xl font-bold text-[#7c3f00] mb-4">Your Cart is Empty</h1>
                <p className="text-[#7c3f00]/70 mb-6">Looks like you haven't added any items to your cart yet.</p>
                            <button
                    onClick={() => navigate("/menu")} 
                    className="px-6 py-3 bg-[#7c3f00] text-white rounded-lg font-semibold hover:bg-[#a0522d] transition-colors"
                >
                    Browse Menu
                            </button>
                        </div>
                    </div>
    );
}

export default Cart;
import React from 'react';
import { assets } from '../assets/assets';
import { UseAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {

    const { addToCart, removeFromCart, cartItems, navigate } = UseAppContext();

    const currencySymbol = import.meta.env.VITE_CURRENCY || '₹';

    if (!product) {
        return null;
    }

    const productQuantityInCart = cartItems[product._id] || 0;

    return (
        <div
            onClick={() =>{ navigate(`/products/${product.category.toLowerCase()}/${product._id}`); 
            scrollTo(0, 0)}}    
            className="
                border border-gray-200 rounded-xl overflow-hidden
                shadow-md hover:shadow-lg transition-all duration-300 ease-in-out
                bg-white p-2 xs:p-3 sm:p-4
                flex flex-col items-center
                w-full max-w-[95vw] xs:max-w-xs mx-auto md:max-w-[220px] lg:max-w-[260px]
                cursor-pointer
                min-h-[220px] xs:min-h-[260px] sm:min-h-[320px] md:min-h-[340px] lg:min-h-[360px]
            "
        >
            <div className="
                group flex items-center justify-center p-1 xs:p-2 mb-2 xs:mb-3 sm:mb-4
                overflow-hidden rounded-lg
                w-full h-16 xs:h-20 sm:h-28 md:h-32 lg:h-36
                bg-gray-50
            ">
                <img
                    className="
                        group-hover:scale-110 transform transition-transform duration-300 ease-in-out
                        max-w-full max-h-full object-contain
                    "
                    src={product.images[0]}
                    alt={product.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/E0E0E0/ADADAD?text=No+Image"; }}
                />
            </div>

            <div className="w-full text-left flex flex-col flex-grow">
                <p className="text-xs xs:text-sm text-gray-500 mb-0.5 xs:mb-1">{product.category}</p>

                <p className="text-base xs:text-lg font-semibold text-gray-800 truncate mb-0.5 xs:mb-1.5" title={product.name}>
                    {product.name}
                </p>

                <div className="flex items-center gap-1 mb-1 xs:mb-2">
                    {Array(5).fill('').map((_, i) => (
                        <img
                            key={i}
                            className='w-3.5 xs:w-4 h-3.5 xs:h-4'
                            src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                            alt={`Star rating ${i + 1}`}
                        />
                    ))}
                    <p className="text-xs xs:text-sm text-gray-600">(4)</p>
                </div>

                {/* Price and Add to Cart/Quantity Controls - Adjusted for mobile stacking */}
                <div className="
                    flex flex-col xs:flex-row items-center justify-between
                    mt-auto pt-1 xs:pt-2 border-t border-gray-100
                    w-full
                ">
                    {/* Price Display */}
                    <p className="
                        text-base xs:text-lg md:text-xl lg:text-2xl font-bold text-indigo-600
                        mb-1 xs:mb-0 md:mb-2 lg:mb-3
                    ">
                        {currencySymbol}{product.offerPrice}{" "}
                        <span className="text-xs xs:text-sm md:text-base text-gray-500 line-through font-normal ml-1">
                            {currencySymbol}{product.price}
                        </span>
                    </p>

                    {/* Add to Cart / Quantity Controls */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0"
                    >
                        {!productQuantityInCart ? (
                            // Add Button
                            <button
                                className="
                                    flex items-center justify-center gap-1
                                    bg-indigo-500 hover:bg-indigo-600
                                    text-white font-semibold rounded-md
                                    w-16 xs:w-20 md:w-24 h-7 xs:h-8 md:h-10 text-xs xs:text-sm md:text-base
                                    transition-all duration-200 ease-in-out
                                    shadow-sm hover:shadow-md
                                    mt-1 md:mt-0
                                "
                                onClick={() => addToCart(product._id)}
                            >
                                <img src={assets.cart_icon} alt="Add to cart" className="w-4 xs:w-5 md:w-6 h-4 xs:h-5 md:h-6"/>
                                Add
                            </button>
                        ) : (
                            // Quantity Controls
                            <div className="
                                flex items-center justify-between
                                w-16 xs:w-20 md:w-24 h-7 xs:h-8 md:h-10 bg-indigo-100 rounded-md
                                text-indigo-700 font-semibold select-none
                                shadow-inner text-xs xs:text-sm md:text-base
                                mt-1 md:mt-0
                            ">
                                <button
                                    onClick={() => removeFromCart(product._id)}
                                    className="cursor-pointer text-lg flex items-center justify-center w-1/3 h-full rounded-l-md hover:bg-indigo-200 transition"
                                >
                                    -
                                </button>
                                <span className="w-1/3 text-center">{productQuantityInCart}</span>
                                <button
                                    onClick={() => addToCart(product._id)}
                                    className="cursor-pointer text-lg flex items-center justify-center w-1/3 h-full rounded-r-md hover:bg-indigo-200 transition"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
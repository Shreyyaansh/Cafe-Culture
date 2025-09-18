import  { useEffect, useState } from 'react';
import { UseAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
const ProductDetails = () => {

    const {products,navigate,currency,addToCart} = UseAppContext();
    const {id} = useParams();

    const [relatedProduct, setRelatedProduct] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    const product = products.find(item => item._id === id);

    useEffect(() =>
         {
            if (product) {
                let productsCopy = products.slice();
                productsCopy = productsCopy.filter((item)=>product.category === item.category );
                setRelatedProduct(productsCopy.slice(0, 5));}
            },[products]);
        
    useEffect(() => {
        setThumbnail(product?.images[0] ? product.images[0] : null);
    },[product]);      
    
    
            return product && (
        <div className="mt-12">
            <p>
                <Link to={"/"}>Home</Link> /
                <Link to={"/products"}> Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
                <span className="text-indigo-500"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.images.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                            
                                    <img src={i<4 ? assets.star_icon : assets.star_dull_icon} className='md:w-4 w-3.5' />) 
                            
                        )}
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: {currency}{product.price}</p>
                        <p className="text-2xl font-medium">MRP: {currency}{product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div onClick={()=> addToCart(product._id)} className="flex items-center mt-10 gap-4 text-base">
                        <button className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={()=> {addToCart(product._id); 
                            navigate('/cart')}}
                             className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>

            <div className='
            mt-16 py-12 px-4 /* More vertical padding for separation */
            sm:px-6 lg:px-8 /* Responsive horizontal padding */
            max-w-7xl mx-auto /* Center content on wide screens */
            flex flex-col items-center /* Center main elements (title, grid, button) */
        '>
            {/* Title Section */}
            <div className='
                w-full /* Ensures title container takes full width */
                flex flex-col items-center /* Always center the title and underline for a consistent look */
                mb-10 /* More space below the title section */
            '>
            <p className='text-2xl font-medium uppercase'>Related Product</p>
            <div className='w-16 h-0.5 bg-indigo-500 rounded-full'></div> 
            </div>

            {/* Products Grid */}
            {relatedProduct.length > 0 ? (
                <div className='
                    grid grid-cols-2 
                    sm:grid-cols-3 
                    md:grid-cols-4
                    lg:grid-cols-5 
                    gap-x-4 gap-y-8 /
                    w-full 
                '>
                    {relatedProduct.filter((product) => product.inStock).map(
                        (product, index) => (
                            <ProductCard key={index} product={product} />
                        )
                    )}
                </div>
            ) : (
                <div className="text-center py-10 text-gray-500 text-lg">
                    No related products found.
                </div>
            )}


            {/* See More Button */}
            {/* Only show "See More" if there are related products, to avoid showing an empty button */}
            {relatedProduct.length > 0 && (
                <button
                    onClick={() => {
                        navigate('/products');
                        window.scrollTo(0, 0); // Use window.scrollTo instead of scrollTo
                    }}
                    className='
                        mx-auto cursor-pointer
                        px-12 py-3.5
                        my-16 
                        border-2 border-indigo-500 
                        rounded-full 
                        text-indigo-600 font-semibold 
                        hover:bg-indigo-600 hover:text-white 
                        transition-all duration-300
                        shadow-lg hover:shadow-xl 
                        transform hover:scale-105 active:scale-95
                    '
                >
                    See More Products
                </button>
            )}
        </div>
        </div>
    );
};

export default ProductDetails;
import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { UseAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'
import logo from '../assets/logo.jpg'

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const menuRef = useRef();
    const {user,setUser,navigate,showUserLogin,setShowUserLogin,searchQuery,setSearchQuery,getCartCount,axios}=UseAppContext();

    const logout = async() =>{
        try {
            const {data} = await axios.get('/api/user/logout');
            if(data.success)
            {
                toast.success(data.message);
                setUser(null);
                navigate('/');
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Close mobile menu on route change or link click
    useEffect(() => {
        if(searchQuery.length > 0) {
            navigate("/products");
            setOpen(false);
        }
    }, [searchQuery]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    // Close menu on navigation
    const handleNavClick = (to) => {
        setOpen(false);
        navigate(to);
    };

    // Scroll to section by ID
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Handle Contact click
    const handleContactClick = (e) => {
        e.preventDefault();
        if (window.location.pathname === "/") {
            scrollToSection("contact-section");
        } else {
            navigate("/", { replace: false });
            setTimeout(() => scrollToSection("contact-section"), 100);
        }
        setOpen(false);
    };

    return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
        <div onClick={()=> navigate('/')} className="flex items-center gap-2 cursor-pointer">
            <img src={logo} alt="Salasar Grocery Store Logo" className="h-10 w-10 object-contain" />
            <span className="font-bold text-xl text-indigo-700">SALASAR</span>
        </div>
        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">All Product</NavLink>
            <NavLink to="/" onClick={handleContactClick}>Contact</NavLink>
            <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                <input onChange={(e)=> setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                <svg width="16" height="16" viewBox="0 0  16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path clipRule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <div onClick={()=> navigate("/cart")} className="relative cursor-pointer">
                <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" strokeLinecap="round" strokeLinejoin="round"  />
                </svg>
                <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full" >{getCartCount()}</button>
            </div>
            {!user ? (
                <button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full" onClick={()=>setShowUserLogin(true)}>
                    Login
                </button>)
            :(
                <div className='relative group'>
                    <img src={assets.profile_icon} className='w-10' alt="Profile Icon" />
                    <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                        <li onClick={() => navigate("my-orders")} className='p-1.5 pl-3 hover:bg-indigo-500/10 cursor-pointer'>My Orders</li>
                        <li onClick={logout} className='p-1.5 pl-3 hover:bg-indigo-500/10 cursor-pointer'>Logout</li>
                    </ul>
                </div>
            )}
        </div>
        {/* Mobile Menu */}
        <div className='flex items-center gap-6 sm:hidden'>
            <div onClick={()=> navigate("/cart")} className="relative cursor-pointer">
                <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" strokeLinecap="round" strokeLinejoin="round"  />
                </svg>
                <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full" >{getCartCount()}</button>
            </div>
            <button
                onClick={() => setOpen(!open)}
                aria-label="Menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
                className=""
            >
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                </svg>
            </button>
        </div>
        {/* Mobile Menu Dropdown */}
        <div
            ref={menuRef}
            id="mobile-menu"
            className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-50 max-h-[80vh] overflow-y-auto`}
        >
            {/* Close button for mobile menu */}
            <button
                className="self-end mb-2 p-2 rounded hover:bg-gray-100 focus:outline-indigo-500"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
            >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            {/* Mobile search bar */}
            <div className="flex items-center w-full border border-gray-300 px-3 rounded-full mb-2">
                <input
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500 text-base"
                    type="text"
                    placeholder="Search products"
                />
                <svg width="16" height="16" viewBox="0 0  16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path clipRule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <button className="w-full text-left py-2 px-2 rounded hover:bg-gray-100 focus:outline-indigo-500" onClick={() => handleNavClick("/")}>Home</button>
            <button className="w-full text-left py-2 px-2 rounded hover:bg-gray-100 focus:outline-indigo-500" onClick={() => handleNavClick("/products")}>All Product</button>
            {user && <button className="w-full text-left py-2 px-2 rounded hover:bg-gray-100 focus:outline-indigo-500" onClick={() => handleNavClick("/my-orders")}>My Orders</button>}
            <button className="w-full text-left py-2 px-2 rounded hover:bg-gray-100 focus:outline-indigo-500" onClick={handleContactClick}>Contact</button>
            {!user ? 
                (<button className="w-full cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm focus:outline-indigo-500" onClick={()=>{setShowUserLogin(true); setOpen(false);}}>
                    Login
                </button>) : 
                (<button className="w-full cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm focus:outline-indigo-500" onClick={logout}>
                    Logout
                </button>) } 
        </div>
    </nav>
    )
}

export default Navbar

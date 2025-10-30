import React, { useEffect, useRef, useState } from 'react'
import woodBg from '../assets/wood.webp'
import { NavLink } from 'react-router-dom'
import { UseAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
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

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    // Handle Our Story click
    const handleOurStoryClick = (e) => {
        e.preventDefault();
        if (window.location.pathname === "/") {
            scrollToSection("our-story-section");
        } else {
            navigate("/", { replace: false });
            setTimeout(() => scrollToSection("our-story-section"), 100);
        }
        setOpen(false);
    };

    // Handle Our Menu click
    const handleOurMenuClick = (e) => {
        e.preventDefault();
        if (window.location.pathname === "/") {
            scrollToSection("categories-section");
        } else {
            navigate("/", { replace: false });
            setTimeout(() => scrollToSection("categories-section"), 100);
        }
        setOpen(false);
    };

    // Handle What's New click
    const handleWhatsNewClick = (e) => {
        e.preventDefault();
        if (window.location.pathname === "/") {
            scrollToSection("whats-new-section");
        } else {
            navigate("/", { replace: false });
            setTimeout(() => scrollToSection("whats-new-section"), 100);
        }
        setOpen(false);
    };

    return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 transition-all duration-300 ${
        isScrolled 
            ? 'bg-[#FBF9F4]/95 backdrop-blur-md shadow-lg border-b border-[#6F4E37]/10' 
            : 'bg-[#FBF9F4] shadow-sm'
    }`} style={{
        backgroundImage: `url(${woodBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }}>
        {/* Light overlay for readability over wood texture */}
        <div className="absolute inset-0 bg-[#FBF9F4]/50 pointer-events-none" />
        {/* Content wrapper above overlay */}
        <div className="relative z-10 w-full flex items-center justify-between">
        <div onClick={()=> navigate('/')} className="flex items-center gap-2 cursor-pointer group">
            <div className={`w-10 h-10 flex items-center justify-center transition-transform duration-300 ${
                isScrolled ? 'scale-90' : 'scale-100'
            } group-hover:scale-105`}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Continuous line coffee cup with heart handle */}
                    <path d="M10 15c0-2 2-4 4-4h12c2 0 4 2 4 4v6c0 2-2 4-4 4H14c-2 0-4-2-4-4v-6z" stroke="#6F4E37" strokeWidth="2" fill="white"/>
                    {/* Handle with integrated heart */}
                    <path d="M26 17c1.5 0 3 1.5 3 3s-1.5 3-3 3c-0.5 0-1-0.2-1.4-0.6" stroke="#6F4E37" strokeWidth="2" fill="none"/>
                    <path d="M24.6 19.4c0.4-0.4 0.9-0.4 1.4 0 0.4 0.4 0.4 0.9 0 1.4" stroke="#6F4E37" strokeWidth="1.5" fill="none"/>
                    {/* Steam lines */}
                    <path d="M12 11c0.5-1 1.5-1.5 2.5-1" stroke="#6F4E37" strokeWidth="1.5" fill="none"/>
                    <path d="M16 9c0.5-1 1.5-1.5 2.5-1" stroke="#6F4E37" strokeWidth="1.5" fill="none"/>
                    <path d="M20 11c0.5-1 1.5-1.5 2.5-1" stroke="#6F4E37" strokeWidth="1.5" fill="none"/>
                    {/* Saucer */}
                    <ellipse cx="20" cy="29" rx="10" ry="2" fill="#6F4E37"/>
                    <ellipse cx="20" cy="29" rx="10" ry="2" stroke="#6F4E37" strokeWidth="1"/>
                </svg>
            </div>
            <span className={`font-bold text-xl text-[#4A2C2A] transition-all duration-300 ${
                isScrolled ? 'text-lg' : 'text-xl'
            }`}>Cafe Culture</span>
        </div>
        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
            <NavLink to="/" onClick={handleOurStoryClick} className={`text-[#4A2C2A] hover:text-[#C67D4A] transition-all duration-300 font-medium hover:scale-105 ${
                isScrolled ? 'text-sm' : 'text-base'
            }`}>Our Story</NavLink>
            <span onClick={handleOurMenuClick} className={`text-[#4A2C2A] hover:text-[#C67D4A] transition-all duration-300 font-medium hover:scale-105 cursor-pointer ${
                isScrolled ? 'text-sm' : 'text-base'
            }`}>Our Menu</span>
            <NavLink to="/" onClick={handleWhatsNewClick} className={`text-[#4A2C2A] hover:text-[#C67D4A] transition-all duration-300 font-medium hover:scale-105 ${
                isScrolled ? 'text-sm' : 'text-base'
            }`}>What's New</NavLink>
            <NavLink to="/" onClick={handleContactClick} className={`text-[#4A2C2A] hover:text-[#C67D4A] transition-all duration-300 font-medium hover:scale-105 ${
                isScrolled ? 'text-sm' : 'text-base'
            }`}>Contact Us</NavLink>
            <div onClick={()=> navigate("/cart")} className="relative cursor-pointer">
                <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#6F4E37" strokeLinecap="round" strokeLinejoin="round"  />
                </svg>
                <button className="absolute -top-2 -right-3 text-xs text-white bg-[#6F4E37] w-[18px] h-[18px] rounded-full" >{getCartCount()}</button>
            </div>
            {user && (
                <div className='relative group'>
                    <img src={assets.profile_icon} className='w-10' alt="Profile Icon" />
                    <ul className='hidden group-hover:block absolute top-10 right-0 bg-[#FBF9F4] shadow border border-[#6F4E37]/20 py-2.5 w-30 rounded-md text-sm z-40'>
                        <li onClick={logout} className='p-1.5 pl-3 hover:bg-[#C67D4A]/10 cursor-pointer text-[#4A2C2A]'>Logout</li>
                    </ul>
                </div>
            )}
        </div>
        {/* Mobile Menu */}
        <div className='flex items-center gap-6 sm:hidden'>
            <div onClick={()=> navigate("/cart")} className="relative cursor-pointer">
                <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#6F4E37" strokeLinecap="round" strokeLinejoin="round"  />
                </svg>
                <button className="absolute -top-2 -right-3 text-xs text-white bg-[#6F4E37] w-[18px] h-[18px] rounded-full" >{getCartCount()}</button>
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
            className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-[#FBF9F4] shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-50 max-h-[80vh] overflow-y-auto`}
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
                   <button className="w-full text-left py-2 px-2 rounded hover:bg-[#C67D4A]/10 focus:outline-[#6F4E37] text-[#4A2C2A]" onClick={handleOurStoryClick}>Our Story</button>
                   <span className="w-full text-left py-2 px-2 text-[#4A2C2A]">Our Menu</span>
                   <button className="w-full text-left py-2 px-2 rounded hover:bg-[#C67D4A]/10 focus:outline-[#6F4E37] text-[#4A2C2A]" onClick={handleWhatsNewClick}>What's New</button>
                   <button className="w-full text-left py-2 px-2 rounded hover:bg-[#C67D4A]/10 focus:outline-[#6F4E37] text-[#4A2C2A]" onClick={handleContactClick}>Contact Us</button>
                   {user && <button className="w-full cursor-pointer px-6 py-2 mt-2 bg-[#6F4E37] hover:bg-[#C67D4A] transition text-white rounded-full text-sm focus:outline-[#6F4E37]" onClick={logout}>
                       Logout
                   </button>}
        </div>
        </div>
    </nav>
    )
}

export default Navbar

const Footer = () => {
    // Function to scroll to section
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Function to handle link clicks
    const handleLinkClick = (linkText) => {
        switch(linkText) {
            case "Food & Snacks":
                // Navigate to menu page and filter by food category
                window.location.href = '/menu';
                break;
            case "Hot Beverages":
                // Navigate to menu page and filter by hot drinks category
                window.location.href = '/menu';
                break;
            case "Cold Beverages":
                // Navigate to menu page and filter by cold drinks category
                window.location.href = '/menu';
                break;
            case "Desserts & Pastries":
                // Navigate to menu page and filter by desserts category
                window.location.href = '/menu';
                break;
            case "Combos & Specials":
                // Navigate to menu page and filter by combos category
                window.location.href = '/menu';
                break;
            case "Our Story":
                scrollToSection("our-story-section");
                break;
            case "Contact Us":
            case "Location":
                scrollToSection("contact-section");
                break;
            default:
                // For other links, you can add more cases or keep them as placeholders
                break;
        }
    };

    const linkSections = [
        {
            title: "Our Menu",
            links: ["Food & Snacks", "Hot Beverages", "Cold Beverages", "Desserts & Pastries", "Combos & Specials"]
        },
        {
            title: "About Us",
            links: ["Our Story", "Contact Us", "Location"]
        },
        {
            title: "Customer Service",
            links: ["Help & Support", "FAQs", "Feedback", "Careers"]
        }
    ];

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-[#faf0e6] text-[#7c3f00]">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-white/20">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Continuous line coffee cup with heart handle */}
                                <path d="M10 15c0-2 2-4 4-4h12c2 0 4 2 4 4v6c0 2-2 4-4 4H14c-2 0-4-2-4-4v-6z" stroke="#7c3f00" strokeWidth="2" fill="white"/>
                                {/* Handle with integrated heart */}
                                <path d="M26 17c1.5 0 3 1.5 3 3s-1.5 3-3 3c-0.5 0-1-0.2-1.4-0.6" stroke="#7c3f00" strokeWidth="2" fill="none"/>
                                <path d="M24.6 19.4c0.4-0.4 0.9-0.4 0.4 0 0.4 0.4 0.4 0.9 0 1.4" stroke="#7c3f00" strokeWidth="1.5" fill="none"/>
                                {/* Steam lines */}
                                <path d="M12 11c0.5-1 1.5-1.5 2.5-1" stroke="#7c3f00" strokeWidth="1.5" fill="none"/>
                                <path d="M16 9c0.5-1 1.5-1.5 2.5-1" stroke="#7c3f00" strokeWidth="1.5" fill="none"/>
                                <path d="M20 11c0.5-1 1.5-1.5 2.5-1" stroke="#7c3f00" strokeWidth="1.5" fill="none"/>
                                {/* Saucer */}
                                <ellipse cx="20" cy="29" rx="10" ry="2" fill="#7c3f00"/>
                                <ellipse cx="20" cy="29" rx="10" ry="2" stroke="#7c3f00" strokeWidth="1"/>
                            </svg>
                        </div>
                        <span className="font-bold text-xl text-[#7c3f00]">Cafe Culture</span>
                    </div>
                    <p className="max-w-[410px] mt-6 text-[#7c3f00]/90">Our iconic Signature Blends are slow roasted for the perfect balance of rich flavour and smooth taste. We guarantee you the freshest taste and finest ingredients, every time.</p>
                    
                    {/* Opening Hours */}
                    <div className="mt-6">
                        <h4 className="font-semibold text-[#7c3f00] mb-2">Opening Hours</h4>
                        <p className="text-[#7c3f00]/90 text-sm">11 AM to 1 AM</p>
                        <p className="text-[#7c3f00]/90 text-sm">Monday to Sunday</p>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {linkSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-[#7c3f00] md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <button 
                                            onClick={() => handleLinkClick(link)}
                                            className="hover:underline transition text-[#7c3f00]/80 hover:text-[#7c3f00] text-left cursor-pointer"
                                        >
                                            {link}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Social Media Links */}
            <div className="py-6 border-b border-white/20">
                <div className="flex justify-center">
                    <a 
                        href="https://www.instagram.com/cafe_culture_ahmedabad/#" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#7c3f00]/80 hover:text-[#7c3f00] transition flex items-center gap-2"
                    >
                        <span className="sr-only">Instagram</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <span className="text-sm font-medium">@cafe_culture_ahmedabad</span>
                    </a>
                </div>
            </div>
            
            <p className="py-4 text-center text-sm md:text-base text-[#7c3f00]/80">
                © {new Date().getFullYear()} Cafe Culture. All rights reserved.
            </p>
        </div>
    );
};

export default Footer;
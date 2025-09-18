import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UseAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useState } from "react";

const SellerLayout = () => {
  const { isSeller, setIsSeller, axios, navigate } = UseAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/seller/logout');
      if (data.success) {
        toast.success(data.message);
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Top bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-8 border-b border-gray-300 py-3 bg-white sticky top-0 z-40">
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <img src={assets.menu_icon} alt="Menu" className="w-6 h-6" />
          </button>
          
          <Link to="/" onClick={closeSidebar}>
            <img
              src={assets.logo || "/fallback-logo.png"}
              alt="Salasar Enterprise"
              className="w-24 sm:w-32 md:w-40 cursor-pointer"
            />
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-5 text-gray-500">
          <p className="hidden sm:block text-sm md:text-base">Hi! Admin</p>
          <button
            onClick={logout}
            className="border rounded-full text-xs sm:text-sm px-2 sm:px-4 py-1 hover:bg-gray-50 transition whitespace-nowrap"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar + main content */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 lg:w-64 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          border-r border-gray-300 bg-white flex flex-col
        `}>
          {/* Mobile sidebar header */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-300">
            <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sidebar links */}
          <div className="flex-1 pt-4 lg:pt-4">
            {sidebarLinks.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                end={item.path === "/seller"}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center py-3 px-4 gap-3 transition-colors duration-200
                  ${
                    isActive
                      ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                      : "hover:bg-gray-100/90 border-white text-gray-700"
                  }`
                }
              >
                <img src={item.icon} alt="" className="w-6 h-6 lg:w-7 lg:h-7 flex-shrink-0" />
                <span className="text-sm lg:text-base font-medium">{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile sidebar footer */}
          <div className="lg:hidden p-4 border-t border-gray-300">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-semibold">A</span>
              </div>
              <div>
                <p className="font-medium">Admin</p>
                <p className="text-xs text-gray-500">Seller Account</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main outlet */}
        <div className="flex-1 p-3 sm:p-4 lg:p-6 min-w-0">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SellerLayout;

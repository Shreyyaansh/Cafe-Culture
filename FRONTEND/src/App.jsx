import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import FullMenu from './pages/FullMenu';
import AdminPanel from './pages/AdminPanel';
import AdminShortcut from './components/AdminShortcut';

function App() {
  const location = useLocation();
  
  // Routes where footer should not be shown
  const noFooterRoutes = ['/cart', '/admin'];

  return (
      <div className='text-default min-h-screen text-[#4A2C2A] bg-[#FBF9F4]'>
      <Navbar />
      <Toaster />
      <AdminShortcut />
      
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <Routes>
          <Route path='/' element={<Home />} />
                 <Route path='/cart' element={<Cart />} />
          <Route path='/menu' element={<FullMenu />} />
          <Route path='/admin' element={<AdminPanel />} />
        </Routes>
      </div>

      {!noFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;

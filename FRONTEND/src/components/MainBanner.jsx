import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainBanner = () => {
  const navigate = useNavigate();
  
  // Scroll to section by ID
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className='relative w-screen h-[200px] xs:h-[220px] sm:h-[280px] md:h-[320px] lg:h-[380px] bg-[#f5e6d3] -ml-6 md:-ml-16 lg:-ml-24 xl:-ml-32 mt-30 shadow-2xl border-b-4 border-[#7c3f00]/20 border-t-4 border-[#7c3f00]/20'>
      {/* Coffee pattern overlay */}
      <div className='absolute inset-0 opacity-10'>
        <div className='w-full h-full bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]'></div>
      </div>

      {/* Text container */}
      <div className='absolute inset-0 flex items-center justify-center p-4 sm:p-6'>
        <div className='text-center max-w-4xl mx-auto px-4'>
          <h1 className='text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#7c3f00] leading-tight mb-3 sm:mb-4 drop-shadow-lg'>
            Cafe Culture
          </h1>
          
          <p className='text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-[#7c3f00]/90 mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed font-medium animate-pulse'>
            Essence of Elegance
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4'>
            <button
              className='px-4 py-2 sm:px-6 md:px-8 sm:py-3 rounded-full bg-[#f5e6d3] text-[#7c3f00] font-semibold hover:bg-white transition-all text-sm sm:text-base md:text-lg shadow-xl focus:outline-none focus:ring-2 focus:ring-[#7c3f00]/20 transform hover:scale-110 hover:shadow-2xl border-2 border-[#7c3f00]/30'
              onClick={() => navigate('/menu')}
            >
              Explore the full menu
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MainBanner;

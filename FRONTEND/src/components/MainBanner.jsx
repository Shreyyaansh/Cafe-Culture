import React from 'react';
import { useNavigate } from 'react-router-dom';
import homeBanner from '../assets/homebanner.png';

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
    <div className='relative w-screen h-[220px] sm:h-[280px] md:h-[340px] lg:h-[420px] -mx-6 md:-mx-16 lg:-mx-24 xl:-mx-32 mt-[90px] shadow-2xl border-b-4 border-[#6F4E37]/20 border-t-4 border-[#6F4E37]/20 overflow-hidden'>
      {/* Responsive image: contain on small screens, cover on md+ */}
      <img
        src={homeBanner}
        alt="Cafe Culture banner"
        className='absolute inset-0 w-full h-full object-cover object-center select-none'
        draggable={false}
      />
      {/* Soft overlay for text readability on bright images */}
      <div className='absolute inset-0 bg-white/10 md:bg-white/0 pointer-events-none' />

      {/* Text container */}
      <div className='absolute inset-0 flex items-center justify-center p-4 sm:p-6'>
        <div className='text-center max-w-4xl px-4 -translate-x-8 sm:-translate-x-16 md:-translate-x-24 lg:-translate-x-32'>
          <h1 className='text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#4A2C2A] leading-tight mb-3 sm:mb-4 drop-shadow-lg'>
            Cafe Culture
          </h1>
          
          <p className='text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-[#4A2C2A]/90 mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed font-medium animate-pulse'>
            Essence of Elegance
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4'>
            <button
              className='px-5 py-2 rounded-lg border border-[#6F4E37] text-[#6F4E37] bg-transparent font-medium transition-colors duration-200 text-sm sm:text-base md:text-lg shadow-none focus:outline-none focus:ring-2 focus:ring-[#6F4E37]/30 hover:bg-[#6F4E37] hover:text-white hover:border-[#6F4E37] active:bg-[#6F4E37]/90'
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

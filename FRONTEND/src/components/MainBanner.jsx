import React from 'react';
import Banner from "../assets/banner-5.png";

const MainBanner = () => {
  // Scroll to section by ID
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className='relative w-full h-[220px] xs:h-[260px] sm:h-[320px] md:h-[400px] lg:h-[450px]'>
      {/* Banner image always visible */}
      <img
        src={Banner}
        alt="grocery banner"
        className='w-full h-full object-cover'
      />
      {/* Overlay for text readability */}
      <div className='absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent' />

      {/* Text container (always visible) */}
      <div className='absolute inset-0 flex items-center justify-center sm:justify-end p-2 xs:p-4 sm:p-8'>
        <div className='text-center sm:text-right max-w-[98%] xs:max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl sm:mr-8 md:mr-16 lg:mr-24'>
          <h1 className='text-lg xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white uppercase leading-tight mb-4 xs:mb-6 sm:mb-8 drop-shadow-lg tracking-wide'>
            Welcome to,<br className="hidden xs:block" /> SALASAR <br className="hidden xs:block" /> ENTERPRISE
          </h1>

          <div className='flex flex-row flex-wrap items-center justify-center sm:justify-end gap-2 xs:gap-3 sm:gap-4'>
            <button
              className='px-6 py-2 xs:px-7 xs:py-2.5 sm:px-8 sm:py-3 rounded-full bg-[#CC9150] text-white font-semibold hover:bg-[#b88040] transition text-base xs:text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#CC9150]/50'
              onClick={() => scrollToSection('categories-section')}
            >
              Shop Now
            </button>
            <button
              className='px-6 py-2.5 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition text-base xs:text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50'
              onClick={() => scrollToSection('bestseller-section')}
            >
              Explore Deals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;

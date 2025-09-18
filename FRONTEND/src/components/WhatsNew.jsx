import React from 'react';

const WhatsNew = () => {
  return (
    <div className='py-16 sm:py-20 bg-[#faf0e6]'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7c3f00] leading-tight mb-6'>
            What's New
          </h2>
          <p className='text-lg text-[#7c3f00] leading-relaxed max-w-3xl mx-auto'>
            Stay updated with Cafe Culture's latest coffee innovations, seasonal blends, and exciting new additions to our menu.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* MYOC Chips */}
          <div className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow'>
            <div className='w-16 h-16 bg-gradient-to-br from-[#faf0e6] to-white rounded-full flex items-center justify-center mb-4'>
              <span className='text-2xl text-[#7c3f00]'>🍟</span>
            </div>
            <h3 className='text-xl font-bold text-[#7c3f00] mb-3'>MYOC Chips</h3>
            <p className='text-[#7c3f00] leading-relaxed'>
              Make Your Own Chips! Create your perfect snack with our customizable chip options. Choose your base, seasonings, and flavors for a unique experience.
            </p>
          </div>

          {/* MYOC Cans */}
          <div className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow'>
            <div className='w-16 h-16 bg-gradient-to-br from-[#4169E1] to-[#87CEEB] rounded-full flex items-center justify-center mb-4'>
              <span className='text-2xl text-[#7c3f00]'>🥤</span>
            </div>
            <h3 className='text-xl font-bold text-[#7c3f00] mb-3'>MYOC Cans</h3>
            <p className='text-[#7c3f00] leading-relaxed'>
              Make Your Own Cans! Design your perfect beverage with our customizable can options. Mix and match flavors, add-ins, and sizes for your ideal drink.
            </p>
          </div>

          {/* New Seasonal Blend */}
          <div className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow'>
            <div className='w-16 h-16 bg-gradient-to-br from-[#90EE90] to-[#98FB98] rounded-full flex items-center justify-center mb-4'>
              <span className='text-2xl text-[#7c3f00]'>☕</span>
            </div>
            <h3 className='text-xl font-bold text-[#7c3f00] mb-3'>New Seasonal Blend</h3>
            <p className='text-[#7c3f00] leading-relaxed'>
              Discover our latest seasonal coffee blend, carefully crafted with premium beans from our partner farms.
            </p>
          </div>
        </div>

        <div className='text-center mt-12'>
          <p className='text-gray-600 italic'>
            More exciting updates coming soon! Stay tuned for the latest news and announcements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatsNew;

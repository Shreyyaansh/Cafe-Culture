import React from 'react';
import cupImage from '../assets/cafe culture/CUP_page-0001.jpg';

const OurStory = () => {
  return (
    <div className='py-16 sm:py-20 bg-[#faf0e6] mt-8'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Text Content */}
          <div className='space-y-6'>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7c3f00] leading-tight'>
              Our Story
            </h2>
            <p className='text-lg text-[#7c3f00] leading-relaxed'>
            Cafe Culture by Salasar — Essence of Elegance

Since opening our doors on 9th August 2025, Cafe Culture has become Ahmedabad’s cozy corner for coffee lovers, foodies, and free spirits alike.

We’re known for serving freshly brewed specialty coffee and delicious food made with premium Amul dairy products, ensuring that quality is never compromised.


            </p>
            <p className='text-lg text-[#7c3f00] leading-relaxed'>
            But Cafe Culture is more than just a café — it’s a space to work, create, and unwind. Whether you’re catching up on tasks, meeting friends, or simply taking a pause from the day, you’ll find comfort and calm in every corner.

From handcrafted coffees and indulgent pastries to gourmet sandwiches, brunch delights, and takeaway treats, every offering reflects our passion for excellence.

Step in, slow down, and savor the essence of elegance — only at Cafe Culture.
            </p>
          </div>
          
          {/* Image/Visual */}
          <div className='relative'>
            <div className='bg-gradient-to-br from-[#faf0e6] to-white rounded-2xl h-80 flex items-center justify-center p-4'>
              <img 
                src={cupImage} 
                alt="Coffee Cup Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            {/* Decorative elements */}
            <div className='absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full opacity-60'></div>
            <div className='absolute -bottom-4 -left-4 w-6 h-6 bg-[#faf0e6] rounded-full opacity-60'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;

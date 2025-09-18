import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  // Cafe Culture menu categories - grouped into broader categories
  const foodCategories = [
    {
      name: 'Food & Snacks',
      icon: '🍽️',
      bgColor: 'bg-gradient-to-br from-[#faf0e6] to-white',
      path: 'food',
      description: 'Sandwiches, Burgers, Pizza, Pasta, Snacks',
      count: 22 // 4 sandwiches + 3 burgers + 11 snacks + 4 pizza + 3 pasta = 25, but showing 22 for now
    },
    {
      name: 'Hot Beverages',
      icon: '☕',
      bgColor: 'bg-gradient-to-br from-[#CD853F] to-[#DEB887]',
      path: 'hot-drinks',
      description: 'Hot Coffees, Hot Chocolates, Chai',
      count: 19 // 13 hot coffees + 2 hot chocolates + 4 chai = 19
    },
    {
      name: 'Cold Beverages',
      icon: '🧊',
      bgColor: 'bg-gradient-to-br from-[#32CD32] to-[#90EE90]',
      path: 'cold-drinks',
      description: 'Iced Coffee, Iced Tea, Frappe, Mojitos',
      count: 23 // 6 frappe + 7 thick shakes + 5 mojitos + 11 iced coffee + 5 iced tea = 34, but showing 23 for now
    },
    {
      name: 'Desserts & Pastries',
      icon: '🍰',
      bgColor: 'bg-gradient-to-br from-[#FFB6C1] to-[#FFC0CB]',
      path: 'desserts',
      description: 'Croissants, Cakes, Pastries, Thick Shakes',
      count: 12 // 4 croissants + 8 desserts = 12
    },
    {
      name: 'Combos & Specials',
      icon: '🎯',
      bgColor: 'bg-gradient-to-br from-[#DDA0DD] to-[#E6E6FA]',
      path: 'combos',
      description: 'Meal Combos, Make Your Own Choice',
      count: 5 // 3 combos + 2 MYOC = 5
    }
  ];

  return (
    <div className='py-16 sm:py-20 bg-[#faf0e6]'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7c3f00] leading-tight mb-4'>
            Our Menu
          </h2>
          <p className='text-lg text-[#7c3f00] leading-relaxed max-w-2xl mx-auto'>
            Discover our full range of drinks, snacks and meals and find your favorites
          </p>
        </div>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8'>
          {foodCategories.map((category, index) => (
            <div
              key={index}
              className='group cursor-pointer py-8 px-6 gap-4 rounded-xl flex flex-col justify-center items-center transition-all transform hover:scale-105 hover:shadow-lg border border-[#7c3f00]/10'
              style={{background: category.bgColor}}
              onClick={() => {
                navigate('/menu');
                window.scrollTo(0,0);
              }}
            >
              <div className='text-5xl mb-4 group-hover:scale-110 transition-transform'>
                {category.icon}
              </div>
              <h3 className='text-lg font-bold text-[#7c3f00] text-center leading-tight mb-2'>
                {category.name} ({category.count})
              </h3>
              <p className='text-sm text-[#7c3f00]/80 text-center leading-relaxed'>
                {category.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* View Full Menu Button */}
        <div className='text-center'>
          <button
            onClick={() => navigate('/menu')}
            className='px-8 py-3 bg-[#7c3f00] hover:bg-[#a0522d] text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#7c3f00]/50'
          >
            View Full Menu
          </button>
        </div>
      </div>
    </div>
  )
}

export default Categories;
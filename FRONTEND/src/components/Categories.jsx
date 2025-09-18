import React, { useContext } from 'react'
import {assets,categories} from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  return (
    // Added px-4 (16px padding on left/right) for general spacing
    // You can adjust this value (e.g., px-6, px-8, or responsive px-4 md:px-8)
    <div className='mt-16 px-4 md:px-8 lg:px-12'> {/* MODIFICATION HERE */}
      <p className='text-2xl md:text-3xl font-medium'>Categories</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6'>
        {categories.map((category, index) => (
          <div
            key={index}
            className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center'
            style={{backgroundColor: category.bgColor}}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo(0,0);
            }}
          >
            <img src={category.image} alt={category.text} className='group-hover:scale-108 transition max-w-28'/>
            <p className='text-sm font-medium'>{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories;
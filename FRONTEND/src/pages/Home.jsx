import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import ContactInfo from '../components/ContactInfo'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div className='mt-10'> 
      <MainBanner/>
      <div id="categories-section">
        <Categories/>
      </div>
      <div id="bestseller-section">
        <BestSeller/>
      </div>
      <div id="contact-section">
        <ContactInfo/>
      </div>
      <Newsletter/>
    </div>
  )
}

export default Home

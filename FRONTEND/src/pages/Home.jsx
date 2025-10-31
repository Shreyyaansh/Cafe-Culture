import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import OurStory from '../components/OurStory'
import WhatsNew from '../components/WhatsNew'
import ContactInfo from '../components/ContactInfo'
import Reviews from '../components/Reviews'

const Home = () => {
  return (
    <div className='mt-0'> 
      <MainBanner/>
      <div id="our-story-section">
        <OurStory/>
      </div>
      <div id="categories-section">
        <Categories/>
      </div>
      <div id="whats-new-section">
        <WhatsNew/>
      </div>
      <div id="contact-section">
        <ContactInfo/>
        <Reviews/>
      </div>
    </div>
  )
}

export default Home

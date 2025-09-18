import React, { useState } from 'react';
import { getMenuImage, menuImageMapping } from '../assets/cafeCultureImages';
import { UseAppContext } from '../context/AppContext';

const FullMenu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { addToCart, removeFromCart, cartItems } = UseAppContext();

  const menuItems = {
    sandwiches: [
      { id: 'mumbai-masala-sandwich', name: 'Mumbai Masala Chatpata Sandwich (4 pcs)', price: '₹120', image: '🥪' },
      { id: 'tandoori-paneer-sandwich', name: 'Tandoori Paneer Tikka (4 pcs)', price: '₹140', image: '🥪' },
      { id: 'spinach-corn-sandwich', name: 'Spinach & Corn (4 pcs)', price: '₹180', image: '🥪' },
      { id: 'amdavadi-masala-toast', name: 'Amdavadi Masala Cheese Toast (4 pcs)', price: '₹179', image: '🥪', extra: 'Extra Cheese: ₹30' }
    ],
    burgers: [
      { id: 'aloo-tikki-burger', name: 'Aloo Tikki Burger (with chips)', price: '₹110', image: '🍔' },
      { id: 'gourmet-burger', name: 'Gourmet Burger', price: '₹120', image: '🍔' },
      { id: 'paneer-double-decker', name: 'Paneer Double Decker', price: '₹170', image: '🍔' }
    ],
    snacks: [
      { id: 'zigzag-fries', name: 'Zigzag Fries', price: '₹99', image: '🍟' },
      { id: 'nachos-with-dip', name: 'Nachos with Dip', price: '₹129', image: '🍟' },
      { id: 'truffled-parmesan-fries', name: 'Truffled Parmesan Fries', price: '₹139', image: '🍟' },
      { id: 'peri-peri-fries', name: 'Peri Peri Fries', price: '₹139', image: '🍟' },
      { id: 'jalapeno-cheese-poppers', name: 'Jalapeno Cheese Poppers', price: '₹149', image: '🍟' },
      { id: 'classic-garlic-bread', name: 'Classic Garlic Bread', price: '₹110', image: '🍞' },
      { id: 'classic-maggie', name: 'Classic Maggie', price: '₹110', image: '🍜' },
      { id: 'veg-cheese-maggie', name: 'Veg Cheese Maggie', price: '₹130', image: '🍜' },
      { id: 'aloo-puff', name: 'Aloo Puff', price: '₹69', image: '🥟' },
      { id: 'paneer-chilli-puff', name: 'Paneer Chilli Puff', price: '₹69', image: '🥟' },
      { id: 'maska-bun', name: 'Maska Bun', price: '₹49', image: '🥖' }
    ],
    croissants: [
      { id: 'chili-paneer-croissant', name: 'Chili Paneer Croissant', price: '₹179', image: '🥐' },
      { id: 'spinach-corn-croissant', name: 'Spinach Corn Croissant', price: '₹169', image: '🥐' },
      { id: 'mix-veg-croissant', name: 'Mix Veg Croissant', price: '₹169', image: '🥐' },
      { id: 'paneer-tikka-croissant', name: 'Paneer Tikka Croissant', price: '₹179', image: '🥐' }
    ],
    desserts: [
      { id: 'butter-croissant', name: 'Butter Croissant', price: '₹99', image: '🥐' },
      { id: 'pain-au-chocolate', name: 'Pain Au Chocolate', price: '₹129', image: '🍫' },
      { id: 'chocolate-walnut-brownie', name: 'Chocolate Walnut Brownie', price: '₹189', image: '🍰' },
      { id: 'biscoff-cheese-cake', name: 'Biscoff Cheese Cake', price: '₹220', image: '🍰' },
      { id: 'black-forest-breeze', name: 'Black Forest Breeze', price: '₹179', image: '🍰' },
      { id: 'rainbow-pastry', name: 'Rainbow Pastry', price: '₹170', image: '🌈' },
      { id: 'nutella-cheese-cake', name: 'Nutella Cheese Cake', price: '₹210', image: '🍰' },
      { id: 'red-velvet-pastry', name: 'Red Velvet Pastry', price: '₹210', image: '🍰' }
    ],
    'hot-coffees': [
      { name: 'Espresso Shot (36 ML)', price: '₹120', image: '☕' },
      { name: 'Cortado (72 ML)', price: '₹120', image: '☕' },
      { name: 'Classic Americano (250 ML)', price: '₹160', image: '☕' },
      { name: 'Cappuccino (250 ML)', price: '₹180', image: '☕' },
      { name: 'Café Latte (250 ML)', price: '₹180', image: '☕' },
      { name: 'Flat White (250 ML)', price: '₹180', image: '☕' },
      { name: 'Spanish Latte (250 ML)', price: '₹170', image: '☕' },
      { name: 'Biscoff Latte (250 ML)', price: '₹170', image: '☕' },
      { name: 'Classic Café Mocha (250 ML)', price: '₹180', image: '☕' },
      { name: 'Caramel Mocha (250 ML)', price: '₹180', image: '☕' },
      { name: 'Afagato (180 ML)', price: '₹180', image: '☕' },
      { name: 'Con Panna (180 ML)', price: '₹170', image: '☕' },
      { name: 'Irish Coffee (150 ML)', price: '₹210', image: '☕' }
    ],
    'hot-chocolates': [
      { name: 'Signature Callebaut Hot Chocolate (250 ML)', price: '₹199', image: '🍫' },
      { name: 'Hazelnut Hot Chocolate (250 ML)', price: '₹199', image: '🍫', extra: 'Add On Whipped Cream 40 ML: ₹40' }
    ],
    frappe: [
      { name: 'Classic Cold Frappe (300 ML)', price: '₹159', image: '🥤' },
      { name: 'Belgian Mocha Java (300 ML)', price: '₹199', image: '🥤' },
      { name: 'Caramel Cheesecake (300 ML)', price: '₹210', image: '🥤' },
      { name: 'Biscoff Cold Frappe (300 ML)', price: '₹210', image: '🥤' },
      { name: 'Coffee Going Nuts (300 ML)', price: '₹230', image: '🥤' },
      { name: 'Frappachino (300 ML)', price: '₹149', image: '🥤' }
    ],
    'thick-shakes': [
      { name: 'Chocolate Thickshake (300 ML)', price: '₹169', image: '🥤' },
      { name: 'Classic Vanilla (300 ML)', price: '₹129', image: '🥤' },
      { name: 'Brownie Thick Shake (300 ML)', price: '₹189', image: '🥤' },
      { name: 'Oreo Cookie & Cream (300 ML)', price: '₹189', image: '🥤' },
      { name: 'Healthy Smoothies (300 ML)', price: '₹179', image: '🥤' },
      { name: 'Banana Shake (300 ML)', price: '₹139', image: '🥤' },
      { name: 'KitKat Shake (300 ML)', price: '₹179', image: '🥤' }
    ],
    mojitos: [
      { name: 'Virgin Mojito (300 ML)', price: '₹149', image: '🍹' },
      { name: 'Crushed Pomegranate Mojito (300 ML)', price: '₹149', image: '🍹' },
      { name: 'Cranberry Orange Mojito (300 ML)', price: '₹149', image: '🍹' },
      { name: 'Strawberry Mint Mojito (300 ML)', price: '₹149', image: '🍹' },
      { name: 'Watermelon (300 ML)', price: '₹149', image: '🍹' }
    ],
    chai: [
      { name: 'Adrak Chai (180 ML)', price: '₹69', image: '🍵' },
      { name: 'Masala Chai (180 ML)', price: '₹69', image: '🍵' },
      { name: 'Pure Milk Plain (180 ML)', price: '₹69', image: '🍵' },
      { name: 'Elachi Chai (180 ML)', price: '₹69', image: '🍵' }
    ],
    'iced-coffee': [
      { name: 'Iced Latte (250 ML)', price: '₹170', image: '🧊' },
      { name: 'Iced Mocha (250 ML)', price: '₹170', image: '🧊' },
      { name: 'Belgian Mocha Java (250 ML)', price: '₹170', image: '🧊' },
      { name: 'Ice Vanilla Coffee (250 ML)', price: '₹170', image: '🧊' },
      { name: 'Freddo Espresso (250 ML)', price: '₹170', image: '🧊' },
      { name: 'Iced Cappuccino (250 ML)', price: '₹170', image: '🧊' },
      { name: 'Iced Americano (250 ML)', price: '₹170', image: '🧊' },
      { name: 'Iced Caramel Macchiato (250 ML)', price: '₹170', image: '🧊' },
      { name: 'Black Iced Coffee (250 ML)', price: '₹170', image: '🧊' },
      { name: 'Iced Caramel Latte (250 ML)', price: '₹170', image: '🧊' },
      { name: 'Espresso Tonic (250 ML)', price: '₹170', image: '🧊' }
    ],
    'iced-tea': [
      { name: 'Classic Lemon Mint (300 ML)', price: '₹149', image: '🍋' },
      { name: 'Cucumber Lime (300 ML)', price: '₹149', image: '🍋' },
      { name: 'Peach Iced Tea (300 ML)', price: '₹149', image: '🍋' },
      { name: 'Elder Flower Iced Tea (300 ML)', price: '₹149', image: '🍋' },
      { name: 'Lavender Iced Tea (300 ML)', price: '₹149', image: '🍋' }
    ],
    combos: [
      { name: 'Coffee & Snack Combos', price: '₹199', image: '🍽️', description: 'Any One: Cappuccino + Black Forest Breeze, Classic Americano + Butter Croissant/Cookies, Aloo Tikki Burger / Jalapeno Cheese Poppers (6 pcs), Masala Chai or Virgin Mojito' },
      { name: 'Combos', price: '₹299', image: '🍽️', description: 'Any One: Café Latte / Spanish Latte, Jalapeno Cheese Poppers / Truffled Parmesan Fries, Veg Tikki Burger + Zigzag Fries + Virgin Mojito, Paneer Double Decker Burger + French Fries, Any Pastry (Rainbow / Red Velvet / Black Forest), Any Iced Coffee (Mocha / Latte / Vanilla)' },
      { name: 'Toast & Tea Combo', price: '₹399', image: '🍽️', description: 'Any One: Amdavadi Masala Cheese Toast (4 pcs), Rainbow Cake, Peach Iced Tea / Hot Signature Callebaut Chocolate' }
    ],
    pizza: [
      { name: 'Full Cheese Bliss', price: '₹299', image: '🍕' },
      { name: 'Garden Carnival (Veggie Pizza)', price: '₹299', image: '🍕' },
      { name: 'Paneer Tikka Delight', price: '₹299', image: '🍕' },
      { name: 'Spicy Firecracker Pizza', price: '₹299', image: '🍕' }
    ],
    pasta: [
      { name: 'Snowy Alfredo (White Sauce Pasta)', price: '₹199', image: '🍝' },
      { name: 'Crimson Heat (Red Sauce Pasta)', price: '₹199', image: '🍝' },
      { name: 'Blush Romance (Pink Sauce Pasta)', price: '₹249', image: '🍝' }
    ],
    'myoc': [
      { name: 'Chips', price: 'On MRP', image: '🍟' },
      { name: 'Cans', price: 'On MRP', image: '🥤' }
    ]
  };

  const categories = [
    { key: 'all', name: 'All Items', icon: '🍽️', count: 81 },
    { key: 'food', name: 'Food & Snacks', icon: '🍽️', count: 22 },
    { key: 'hot-drinks', name: 'Hot Beverages', icon: '☕', count: 19 },
    { key: 'cold-drinks', name: 'Cold Beverages', icon: '🧊', count: 23 },
    { key: 'desserts', name: 'Desserts & Pastries', icon: '🍰', count: 12 },
    { key: 'combos', name: 'Combos & Specials', icon: '🎯', count: 5 }
  ];

  const getFilteredItems = () => {
    if (activeCategory === 'all') {
      return Object.values(menuItems).flat();
    }
    
    // Group items by broader categories
    const categoryGroups = {
      'food': [...menuItems.sandwiches, ...menuItems.burgers, ...menuItems.snacks, ...menuItems.pizza, ...menuItems.pasta],
      'hot-drinks': [...menuItems['hot-coffees'], ...menuItems['hot-chocolates'], ...menuItems.chai],
      'cold-drinks': [...menuItems.frappe, ...menuItems['thick-shakes'], ...menuItems.mojitos, ...menuItems['iced-coffee'], ...menuItems['iced-tea']],
      'desserts': [...menuItems.desserts, ...menuItems.croissants],
      'combos': [...menuItems.combos, ...menuItems.myoc]
    };
    
    return categoryGroups[activeCategory] || [];
  };

  const MenuItemCard = ({ item }) => {
    const itemId = item.id || item.name.toLowerCase().replace(/\s+/g, '-');
    const quantityInCart = cartItems[itemId] || 0;
    
    console.log('🍽️ MenuItemCard - item:', item);
    console.log('🍽️ MenuItemCard - itemId:', itemId);
    console.log('🍽️ MenuItemCard - quantityInCart:', quantityInCart);

    return (
      <div className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-[#7c3f00]/10'>
        <div className='flex items-start gap-4'>
          <div className='w-20 h-20 bg-gradient-to-br from-[#faf0e6] to-white rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden'>
            {menuImageMapping[item.name] ? (
              <img 
                src={getMenuImage(item.name)} 
                alt={item.name}
                className='w-full h-full object-cover rounded-xl'
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" fill="%23faf0e6"/><text x="40" y="45" text-anchor="middle" font-size="24" fill="%237c3f00">${item.image}</text></svg>`;
                }}
              />
            ) : (
              <span className='text-3xl'>{item.image}</span>
            )}
          </div>
          <div className='flex-1'>
            <h3 className='text-lg font-bold text-[#7c3f00] mb-2 leading-tight'>{item.name}</h3>
            {item.description && (
              <p className='text-sm text-[#7c3f00]/80 mb-2 leading-relaxed'>{item.description}</p>
            )}
            {item.extra && (
              <p className='text-xs text-[#7c3f00]/70 mb-2 italic'>{item.extra}</p>
            )}
            <div className='flex items-center justify-between mt-3'>
              <p className='text-xl font-bold text-[#7c3f00]'>{item.price}</p>
              
              {/* Cart Controls */}
              <div className='flex items-center gap-2'>
                {quantityInCart > 0 ? (
                  <div className='flex items-center gap-2 bg-[#faf0e6] rounded-lg px-3 py-1'>
                    <button
                      onClick={() => removeFromCart(itemId)}
                      className='w-6 h-6 rounded-full bg-[#7c3f00] text-white flex items-center justify-center text-sm hover:bg-[#a0522d] transition-colors'
                    >
                      -
                    </button>
                    <span className='text-[#7c3f00] font-semibold min-w-[20px] text-center'>{quantityInCart}</span>
                    <button
                      onClick={() => {
                        console.log('➕ Add button clicked for itemId:', itemId);
                        addToCart(itemId);
                      }}
                      className='w-6 h-6 rounded-full bg-[#7c3f00] text-white flex items-center justify-center text-sm hover:bg-[#a0522d] transition-colors'
                    >
                      +
                    </button>
              </div>
                ) : (
                  <button
                    onClick={() => {
                      console.log('➕ Add button clicked for itemId:', itemId);
                      addToCart(itemId);
                    }}
                    className='px-4 py-2 bg-[#7c3f00] text-white rounded-lg font-semibold hover:bg-[#a0522d] transition-colors text-sm'
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
              </div>
    );
  };

  return (
    <div className='min-h-screen bg-white pt-20'>
      {/* Header Section */}
      <div className='bg-[#faf0e6] py-16 shadow-lg'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-[#7c3f00] mb-6'>
            Our Menu
          </h1>
          <p className='text-lg sm:text-xl text-[#7c3f00]/90 max-w-3xl mx-auto leading-relaxed'>
            Discover our full range of drinks, snacks and meals and find your favorites
              </p>
            </div>
            </div>

      {/* Category Filter */}
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8'>
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-3 py-2 sm:px-4 rounded-full font-semibold transition-all flex items-center gap-1 sm:gap-2 text-sm sm:text-base ${
                activeCategory === category.key
                  ? 'bg-[#7c3f00] text-white shadow-lg'
                  : 'bg-[#faf0e6] text-[#7c3f00] hover:bg-[#7c3f00]/10'
              }`}
            >
              <span>{category.icon}</span>
              <span className='text-xs sm:text-sm'>{category.name} ({category.count})</span>
          </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {getFilteredItems().map((item, index) => (
            <MenuItemCard key={index} item={item} />
          ))}
        </div>

        {/* Add Ons Section */}
        {activeCategory === 'hot-coffees' && (
          <div className='mt-12 bg-[#faf0e6] rounded-xl p-6'>
            <h3 className='text-xl font-bold text-[#7c3f00] mb-4'>Add Ons</h3>
            <p className='text-[#7c3f00]'>Add On (Hazelnut/Vanilla 20 ML): ₹40</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullMenu;
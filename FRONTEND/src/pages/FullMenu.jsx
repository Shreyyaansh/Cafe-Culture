import React, { useState, useEffect, useRef } from 'react';
import { getMenuImage, menuImageMapping } from '../assets/cafeCultureImages';
import { UseAppContext } from '../context/AppContext';

const FullMenu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, removeFromCart, cartItems } = UseAppContext();
  const scrollContainerRef = useRef(null);
  const autoScrollRef = useRef(null);
  const isPausedRef = useRef(false);

  const menuItems = {
    'hot-coffees': [
      { name: 'Espresso Shot', price: '₹89', image: '☕', description: 'Strong & bold single espresso shot. 36 ML' },
      { name: 'Classic Americano', price: '₹159', image: '☕', description: 'Smooth black espresso with hot water. 250 ML' },
      { name: 'Flat White', price: '₹159', image: '☕', description: 'Stronger, velvety latte-style coffee. 250 ML' },
      { name: 'Macchiato', price: '₹159', image: '☕', description: 'Espresso with a small mark of milk. 180 ML' },
      { name: 'Cappuccino', price: '₹169', image: '☕', description: 'Coffee topped with rich foamy milk. 250 ML' },
      { name: 'Café Latte', price: '₹169', image: '☕', description: 'Creamy espresso with steamed milk. 250 ML' },
      { name: 'Café Mocha', price: '₹179', image: '☕', description: 'Chocolate blended with espresso. 250 ML' },
      { name: 'Caramel Mocha', price: '₹179', image: '☕', description: 'Mocha with smooth caramel notes. 250 ML' },
      { name: 'Spanish Latte', price: '₹189', image: '☕', description: 'Sweetened silky latte, rich & creamy. 250 ML' },
      { name: 'Biscoff Latte', price: '₹199', image: '☕', description: 'Infused with warm biscoff cookie flavor. 250 ML' },
      { name: 'Nutella Latte', price: '₹199', image: '☕', description: 'Nutty chocolate latte with nutella. 250 ML' },
      { name: 'Irish Coffee', price: '₹209', image: '☕', description: 'Bold flavour coffee with creamy finish. 150 ML' },
      { name: 'Tiramisu Latte', price: '₹209', image: '☕', description: 'Dessert-style tiramisu flavour coffee. 250 ML' },
      { name: 'Affogato', price: '₹229', image: '☕', description: 'Hot espresso poured over ice-cream. 180 ML' }
    ],
    'hot-chocolates': [
      { name: 'Hot Chocolate', price: '₹189', image: '🍫', description: 'Premium cocoa rich hot chocolate. 250 ML' },
      { name: 'Hazelnut / Vanilla Add-On', price: '₹19', image: '🍫', description: 'Flavour enhancement shot. 20 ML For Hot chocolate' }
    ],
    'iced-coffee': [
      { name: 'Iced Americano', price: '₹159', image: '🧊', description: 'Iced black americano. 250 ML' },
      { name: 'Iced Latte', price: '₹169', image: '🧊', description: 'Cold milk based latte. 250 ML' },
      { name: 'Iced Vanilla Coffee', price: '₹169', image: '🧊', description: 'Vanilla flavoured cold coffee. 250 ML' },
      { name: 'Iced Mocha', price: '₹179', image: '🧊', description: 'Choco espresso cold drink. 250 ML' },
      { name: 'Iced Spanish Latte', price: '₹179', image: '🧊', description: 'Sweet Spanish latte iced. 180 ML' },
      { name: 'Iced Cappuccino', price: '₹179', image: '🧊', description: 'Foamy cold cappuccino. 250 ML' },
      { name: 'Iced Caramel Macchiato', price: '₹179', image: '🧊', description: 'Caramel layered espresso. 250 ML' },
      { name: 'Iced Caramel Latte', price: '₹179', image: '🧊', description: 'Caramel sweet cold latte. 250 ML' },
      { name: 'Cranberry Iced Coffee', price: '₹199', image: '🧊', description: 'Tart cranberry cold coffee. 250 ML' }
    ],
    chai: [
      { name: 'Adrak Chai', price: '₹59', image: '🍵', description: 'Ginger flavoured kadak chai. 180 ML' },
      { name: 'Masala Chai', price: '₹59', image: '🍵', description: 'Indian spiced tea. 180 ML' },
      { name: 'Elaichi Chai', price: '₹59', image: '🍵', description: 'Cardamom aromatic chai. 180 ML' },
      { name: 'Honey Lemon Tea', price: '₹79', image: '🍵', description: 'Light soothing hot tea. 180 ML' },
      { name: 'Café Special Chai', price: '₹79', image: '🍵', description: 'Signature blend special chai. 180 ML' }
    ],
    'iced-tea': [
      { name: 'Classic Lemon Mint Iced Tea', price: '₹149', image: '🍋', description: 'Lemon + mint refreshing brew. 300 ML' },
      { name: 'Peach Iced Tea', price: '₹149', image: '🍋', description: 'Sweet peach cold tea. 300 ML' },
      { name: 'Elder Flower Iced Tea', price: '₹149', image: '🍋', description: 'Light floral iced tea. 300 ML' },
      { name: 'Lavender Iced Tea', price: '₹149', image: '🍋', description: 'Calming lavender infused tea. 300 ML' }
    ],
    mojitos: [
      { name: 'Virgin Mojito', price: '₹149', image: '🍹', description: 'Mint & lime refreshing cooler. 300 ML' },
      { name: 'Cranberry Mojito', price: '₹149', image: '🍹', description: 'Sweet & sour cranberry mojito. 300 ML' },
      { name: 'Strawberry Mint Mojito', price: '₹149', image: '🍹', description: 'Juicy strawberry & mint mix. 300 ML' },
      { name: 'Watermelon Mojito', price: '₹149', image: '🍹', description: 'Cool refreshing watermelon mojito. 300 ML' },
      { name: 'Curacao Blue', price: '₹149', image: '🍹', description: 'Blue tropical citrus mojito. 300 ML' },
      { name: 'Red Bull Mojito', price: '₹199', image: '🍹', description: 'Energy infused mocktail. 300 ML' },
      { name: 'Beer Mojito', price: '₹229', image: '🍹', description: 'Beer styled mojito flavour. 300 ML' }
    ],
    frappe: [
      { name: 'Classic Cold Coffee', price: '₹159', image: '🥤', description: 'Strong & bold single espresso shot. 300 ML' },
      { name: 'Caramel Cheesecake Frappe', price: '₹209', image: '🥤', description: 'Caramel rich ice blended frappe. 300 ML' },
      { name: 'Irish Cold Coffee', price: '₹209', image: '🥤', description: 'Smooth Irish flavour iced coffee. 300 ML' },
      { name: 'Biscoff Frappe', price: '₹219', image: '🥤', description: 'Cold coffee with biscuit flavour. 300 ML' },
      { name: 'Mocha Java Chip', price: '₹219', image: '🥤', description: 'Coffee + choco chip crunch. 300 ML' },
      { name: 'Tiramisu Frappe', price: '₹239', image: '🥤', description: 'Tiramisu inspired cold frappe. 300 ML' },
      { name: 'Nutella Frappe', price: '₹239', image: '🥤', description: 'Nutty rich nutella frappe. 300 ML' },
      { name: 'Brownie Frappe', price: '₹249', image: '🥤', description: 'Thick chocolate brownie blended frappe. 300 ML' }
    ],
    'tonic-bar': [
      { name: 'Espresso Diet Coke', price: '₹129', image: '🥤', description: 'Smooth espresso paired with chilled Diet Coke for a light, fizzy kick. 300 ML' },
      { name: 'Espresso Tonic', price: '₹169', image: '🥤', description: 'A crisp blend of bold espresso and refreshing tonic water. 300 ML' },
      { name: 'Espresso Red Bull', price: '₹199', image: '🥤', description: 'Strong espresso fused with Red Bull for an instant energy boost. 300 ML' }
    ],
    smoothies: [
      { name: 'Banana Shake', price: '₹169', image: '🥤', description: 'Fresh banana blend shake. 300 ML' },
      { name: 'Anjeer Shake', price: '₹179', image: '🥤', description: 'Rich fig flavoured milkshake. 300 ML' },
      { name: 'Peanut Butter Smoothie', price: '₹199', image: '🥤', description: 'Protein rich smoothie. 300 ML' },
      { name: 'Dry Fruit Shake', price: '₹219', image: '🥤', description: 'Mixed nuts energy shake. 300 ML' },
      { name: 'Full Power Smoothie', price: '₹229', image: '🥤', description: 'Heavy fruit & nut mixture. 300 ML' }
    ],
    'thick-shakes': [
      { name: 'Classic Vanilla', price: '₹139', image: '🥤', description: 'Smooth vanilla thickshake. 300 ML' },
      { name: 'Cold Cocoa', price: '₹159', image: '🥤', description: 'Dark thick liquid chocolate drink. 300 ML' },
      { name: 'Chocolate Thickshake', price: '₹169', image: '🥤', description: 'Classic creamy chocolate shake. 300 ML' },
      { name: 'Strawberry Shake', price: '₹179', image: '🥤', description: 'Refreshing & fruity shake. 300 ML' },
      { name: 'KitKat Shake', price: '₹179', image: '🥤', description: 'Crunchy kitkat milkshake. 300 ML' },
      { name: 'Bournvita Shake', price: '₹179', image: '🥤', description: 'Malted chocolate flavour. 300 ML' },
      { name: 'Brownie Shake', price: '₹189', image: '🥤', description: 'Brownie blended thick shake. 300 ML' },
      { name: 'Oreo Cookies & Cream', price: '₹189', image: '🥤', description: 'Cookies + creamy milkshake. 300 ML' },
      { name: 'Nutella Shake', price: '₹219', image: '🥤', description: 'Nutty chocolate heavy shake. 300 ML' }
    ],
    panini: [
      { name: 'Indian Panini', price: '₹129', image: '🥪', description: 'Desi spice panini.' },
      { name: 'Mexican Panini', price: '₹129', image: '🥪', description: 'Mexican sauce flavour.' },
      { name: 'Tandoori Panini', price: '₹139', image: '🥪', description: 'Tandoori grilled filling.' },
      { name: 'Coslo Panini', price: '₹139', image: '🥪', description: 'Creamy cheesy mix.' }
    ],
    sandwiches: [
      { name: 'Butter Sandwich', price: '₹59', image: '🥪', description: 'Soft buttery taste.' },
      { name: 'Butter Jam Sandwich', price: '₹69', image: '🥪', description: 'Sweet jam & butter.' },
      { name: 'Veg Sandwich', price: '₹69', image: '🥪', description: 'Fresh layered vegetables.' },
      { name: 'Cheese Chutney', price: '₹79', image: '🥪', description: 'Cheese with tangy chutney.' },
      { name: 'Veg Cheese', price: '₹89', image: '🥪', description: 'Veggies with melted cheese.' },
      { name: 'Alloo Mutter', price: '₹89', image: '🥪', description: 'Spiced aloo mutter filling.' }
    ],
    'double-sandwiches': [
      { name: 'Mumbai Masala Chatpata', price: '₹119', image: '🥪', description: 'Tangy spiced veggies with a bold Mumbai flavour.' },
      { name: 'Tandoori Paneer Tikka', price: '₹139', image: '🥪', description: 'Char-grilled paneer with rich tandoori notes.' },
      { name: 'Cheese Corn', price: '₹149', image: '🥪', description: 'Sweet corn with melted cheese.' },
      { name: 'Peri Peri Paneer Sandwich', price: '₹169', image: '🥪', description: 'Spicy peri-peri paneer & veggies.' },
      { name: 'Spinach & Corn', price: '₹179', image: '🥪', description: 'Creamy spinach with sweet corn.' },
      { name: 'Club Sandwich', price: '₹199', image: '🥪', description: 'Classic triple-layer delight.' },
      { name: 'Pineapple Sandwich (3layers)', price: '₹199', image: '🥪', description: 'Sweet tropical pineapple layers.' },
      { name: 'Chocolate Sandwich (3layers)', price: '₹209', image: '🥪', description: 'Rich triple chocolate spread.' },
      { name: 'Café Culture Special Sandwich', price: '₹209', image: '🥪', description: 'Our chef\'s signature creation.' },
      { name: 'Pineapple Ice Cream (3layers)', price: '₹229', image: '🥪', description: 'Creamy ice-cream with pineapple.' }
    ],
    croissants: [
      { name: 'Mix Veg Croissant', price: '₹169', image: '🥐', description: 'Veg loaded layers.' },
      { name: 'Spinach Corn Croissant', price: '₹169', image: '🥐', description: 'Creamy spinach corn.' },
      { name: 'Chilli Paneer Croissant', price: '₹179', image: '🥐', description: 'Stuffed paneer.' },
      { name: 'Paneer Tikka Croissant', price: '₹179', image: '🥐', description: 'Tandoori paneer fold.' }
    ],
    burgers: [
      { name: 'Alloo Tikki Burger', price: '₹109', image: '🍔', description: 'Crispy potato patty.' },
      { name: 'Gourmet Burger', price: '₹139', image: '🍔', description: 'Premium patty & sauces.' },
      { name: 'Paneer Deckar Burger', price: '₹149', image: '🍔', description: 'Double layer paneer.' },
      { name: 'Paneer Tikka Burger', price: '₹159', image: '🍔', description: 'Tandoori paneer patty.' }
    ],
    'garlic-bread': [
      { name: 'Classic', price: '₹139', image: '🍞', description: 'Garlic buttery toast.' },
      { name: 'Chilli Cheese', price: '₹149', image: '🍞', description: 'Cheesy & spicy.' },
      { name: 'Cheese Corn', price: '₹159', image: '🍞', description: 'Corn & cheese loaded.' }
    ],
    pizza: [
      { name: 'Full Cheese Bliss', price: '₹219', image: '🍕', description: 'Loaded mozzarella.' },
      { name: 'Garden Carnival', price: '₹249', image: '🍕', description: 'Fresh vegetable toppings.' },
      { name: 'Spicy Firecracker Pizza', price: '₹259', image: '🍕', description: 'Bold spicy flavour.' },
      { name: 'Paneer Tikka Delight', price: '₹269', image: '🍕', description: 'Tandoori paneer flavour.' },
      { name: 'Café Culture Signature Pizza', price: '₹299', image: '🍕', description: 'Nachos/olives/fries loaded.' }
    ],
    pasta: [
      { name: 'Snowy Alferedo', price: '₹199', image: '🍝', description: 'Creamy white sauce.' },
      { name: 'Crimson Heat', price: '₹199', image: '🍝', description: 'Red spicy pasta.' },
      { name: 'Blush Romance', price: '₹249', image: '🍝', description: 'Pink fusion sauce.' }
    ],
    maggie: [
      { name: 'Classic Maggie', price: '₹99', image: '🍜', description: 'Nostalgic flavours.' },
      { name: 'Veg Maggie', price: '₹119', image: '🍜', description: 'Loaded with vegetables.' },
      { name: 'Butter Maggie', price: '₹119', image: '🍜', description: 'Creamy butter taste.' },
      { name: 'Italian Fusion Maggie', price: '₹139', image: '🍜', description: 'Italian herbs blend.' },
      { name: 'Veg Cheese Maggie', price: '₹149', image: '🍜', description: 'Cheesy maggie delight.' }
    ],
    puff: [
      { name: 'Alloo Puff', price: '₹49', image: '🥟', description: 'Potato puff snack.' },
      { name: 'Veg Alloo Puff', price: '₹59', image: '🥟', description: 'Classic aloo puff.' },
      { name: 'Paneer Chilli Puff', price: '₹64', image: '🥟', description: 'Paneer spicy puff.' },
      { name: 'Café Culture Special Puff', price: '₹99', image: '🥟', description: 'Chef signature puff.' }
    ],
    toast: [
      { name: 'Cheese Chilli Toast', price: '₹139', image: '🍞', description: 'Melted chilli cheese.' },
      { name: 'Cheese Chilli Garlic Toast', price: '₹149', image: '🍞', description: 'Garlic spice toast.' },
      { name: 'Amdavadi Masala Cheese Toast', price: '₹179', image: '🍞', description: 'Desi spicy toast.', extra: 'extra 30/- for grill' }
    ],
    'snack-bars': [
      { name: 'Maska Bun', price: '₹49', image: '🥖', description: 'Soft butter bun.' },
      { name: 'Butter Jam Maska Bun', price: '₹69', image: '🥖', description: 'Sweet jam + butter.' },
      { name: 'Chocolate Maska Bun', price: '₹69', image: '🥖', description: 'Chocolate stuffed bun.' },
      { name: 'Monaco Topping', price: '₹79', image: '🍟', description: 'Seasoned monaco bites.' },
      { name: 'Salted fries', price: '₹99', image: '🍟', description: 'Crispy fries.' },
      { name: 'Custom flavoured chips', price: '₹99', image: '🍟', description: 'Custom flavoured chips.' },
      { name: 'Bhel', price: '₹109', image: '🍟', description: 'Crunchy tangy bhel.' },
      { name: 'Jalapeno Cheese Poppers', price: '₹129', image: '🍟', description: 'Spicy cheesy poppers.' },
      { name: 'Peri Peri Fries', price: '₹139', image: '🍟', description: 'Spicy fries.' },
      { name: 'Nachos With Dip', price: '₹139', image: '🍟', description: 'Nachos & dip.' },
      { name: 'Cheese Fries', price: '₹159', image: '🍟', description: 'Cheese topped fries.' }
    ],
    bowls: [
      { name: 'Salad Bowl', price: '₹149', image: '🥗', description: 'Healthy greens mix.' },
      { name: 'Tropical Fruit Bowl', price: '₹239', image: '🥗', description: 'Fresh fruit bowl.' },
      { name: 'Choco Divine Bowl', price: '₹249', image: '🥗', description: 'Chocolate dessert bowl.' }
    ],
    desserts: [
      { name: 'Butter Croissant', price: '₹99', image: '🥐', description: 'Light, buttery, perfectly crisp.' },
      { name: 'Nutella Croissant', price: '₹159', image: '🥐', description: 'Flaky layers filled with Nutella.' },
      { name: 'Black Forest Breeze', price: '₹179', image: '🍰', description: 'Chocolate with whipped cherry lightness.' },
      { name: 'Brownie', price: '₹179', image: '🍰', description: 'Dense, fudgy, chocolate-rich.' },
      { name: 'Chocolate Chips', price: '₹199', image: '🍰', description: 'Soft, velvety & mildly cocoa-sweet.' },
      { name: 'New York Cheesecake', price: '₹209', image: '🍰', description: 'Classic, creamy & rich.' },
      { name: 'Nutella Cheesecake', price: '₹219', image: '🍰', description: 'Silky cheesecake with Nutella swirl.' },
      { name: 'Kitkat Cheesecake', price: '₹224', image: '🍰', description: 'Crunchy KitKat meets smooth cream.' },
      { name: 'Biscoff Cheesecake', price: '₹229', image: '🍰', description: 'Caramel-spiced biscoff indulgence.' }
    ]
  };

  // Define all specific categories with their icons and counts
  const specificCategories = [
    { key: 'all', name: 'All Items', icon: '🍽️', count: Object.values(menuItems).flat().length },
    { key: 'hot-coffees', name: 'Hot Coffees', icon: '☕', count: menuItems['hot-coffees'].length },
    { key: 'hot-chocolates', name: 'Hot Chocolates', icon: '🍫', count: menuItems['hot-chocolates'].length },
    { key: 'iced-coffee', name: 'Iced Coffee', icon: '🧊', count: menuItems['iced-coffee'].length },
    { key: 'chai', name: 'Chai', icon: '🍵', count: menuItems.chai.length },
    { key: 'iced-tea', name: 'Iced Tea', icon: '🍋', count: menuItems['iced-tea'].length },
    { key: 'mojitos', name: 'Mojitos', icon: '🍹', count: menuItems.mojitos.length },
    { key: 'frappe', name: 'Frappe', icon: '🥤', count: menuItems.frappe.length },
    { key: 'tonic-bar', name: 'Tonic Bar', icon: '🥤', count: menuItems['tonic-bar'].length },
    { key: 'smoothies', name: 'Smoothies', icon: '🥤', count: menuItems.smoothies.length },
    { key: 'thick-shakes', name: 'Thick Shakes', icon: '🥤', count: menuItems['thick-shakes'].length },
    { key: 'panini', name: 'Panini', icon: '🥪', count: menuItems.panini.length },
    { key: 'sandwiches', name: 'Sandwiches', icon: '🥪', count: menuItems.sandwiches.length },
    { key: 'double-sandwiches', name: 'Double Sandwiches', icon: '🥪', count: menuItems['double-sandwiches'].length },
    { key: 'croissants', name: 'Croissants', icon: '🥐', count: menuItems.croissants.length },
    { key: 'burgers', name: 'Burgers', icon: '🍔', count: menuItems.burgers.length },
    { key: 'garlic-bread', name: 'Garlic Bread', icon: '🍞', count: menuItems['garlic-bread'].length },
    { key: 'pizza', name: 'Pizza', icon: '🍕', count: menuItems.pizza.length },
    { key: 'pasta', name: 'Pasta', icon: '🍝', count: menuItems.pasta.length },
    { key: 'maggie', name: 'Maggie', icon: '🍜', count: menuItems.maggie.length },
    { key: 'puff', name: 'Puff', icon: '🥟', count: menuItems.puff.length },
    { key: 'toast', name: 'Toast', icon: '🍞', count: menuItems.toast.length },
    { key: 'snack-bars', name: 'Snack Bars', icon: '🍟', count: menuItems['snack-bars'].length },
    { key: 'bowls', name: 'Bowls', icon: '🥗', count: menuItems.bowls.length },
    { key: 'desserts', name: 'Desserts', icon: '🍰', count: menuItems.desserts.length }
  ];

  // Function to stop auto-scroll permanently
  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
    isPausedRef.current = true;
  };

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scroll = () => {
      if (isPausedRef.current) return;
      
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return; // No need to scroll if content fits
      
      if (container.scrollLeft >= maxScroll - 1) {
        // Reset to start when reaching the end
        container.scrollLeft = 0;
      } else {
        // Slowly scroll to the left
        container.scrollLeft += 0.5;
      }
    };

    autoScrollRef.current = setInterval(scroll, 20); // Update every 20ms for smooth scroll

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, []);

  const getFilteredItems = () => {
    let items = [];
    
    // Get items based on category
    if (activeCategory === 'all') {
      items = Object.values(menuItems).flat();
    } else {
      items = menuItems[activeCategory] || [];
    }
    
    // Filter by search query if present
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query))
      );
    }
    
    return items;
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
        {/* Search Bar */}
        <div className='mb-6 sm:mb-8'>
          <div className='relative max-w-md mx-auto'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <svg 
                className='w-5 h-5 text-[#7c3f00]/60' 
                fill='none' 
                stroke='currentColor' 
                viewBox='0 0 24 24'
              >
                <path 
                  strokeLinecap='round' 
                  strokeLinejoin='round' 
                  strokeWidth={2} 
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' 
                />
              </svg>
            </div>
            <input
              type='text'
              placeholder='Search menu items...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-12 pr-4 py-3 rounded-full border-2 border-[#7c3f00]/20 bg-white text-[#7c3f00] placeholder-[#7c3f00]/50 focus:outline-none focus:border-[#7c3f00] focus:ring-2 focus:ring-[#7c3f00]/20 transition-all'
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className='absolute inset-y-0 right-0 pr-4 flex items-center text-[#7c3f00]/60 hover:text-[#7c3f00] transition-colors'
              >
                <svg 
                  className='w-5 h-5' 
                  fill='none' 
                  stroke='currentColor' 
                  viewBox='0 0 24 24'
                >
                  <path 
                    strokeLinecap='round' 
                    strokeLinejoin='round' 
                    strokeWidth={2} 
                    d='M6 18L18 6M6 6l12 12' 
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        {/* Scrollable Category Bar */}
        <div className='mb-6 sm:mb-8'>
          <div 
            ref={scrollContainerRef}
            className='flex overflow-x-auto gap-2 sm:gap-3 pb-4 category-scrollbar'
            onWheel={(e) => {
              // Enable horizontal scrolling with mouse wheel
              if (e.deltaY !== 0) {
                e.preventDefault();
                e.currentTarget.scrollLeft += e.deltaY;
              }
            }}
            onMouseEnter={() => {
              // Pause auto-scroll on hover
              isPausedRef.current = true;
            }}
            onMouseLeave={() => {
              // Resume auto-scroll when not hovering
              isPausedRef.current = false;
            }}
            onTouchStart={() => {
              // Pause auto-scroll on touch (mobile)
              isPausedRef.current = true;
            }}
            onTouchEnd={() => {
              // Resume after a delay on mobile
              setTimeout(() => {
                isPausedRef.current = false;
              }, 2000);
            }}
          >
            {specificCategories.map((category) => (
              <button
                key={category.key}
                onClick={() => {
                  stopAutoScroll(); // Stop auto-scroll when any category button is clicked
                  setActiveCategory(category.key);
                }}
                className={`px-3 py-2 sm:px-4 rounded-full font-semibold transition-all flex items-center gap-1 sm:gap-2 text-sm sm:text-base whitespace-nowrap flex-shrink-0 ${
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
        </div>

        {/* Menu Items Grid */}
        {getFilteredItems().length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {getFilteredItems().map((item, index) => (
              <MenuItemCard key={index} item={item} />
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#faf0e6] mb-4'>
              <svg 
                className='w-8 h-8 text-[#7c3f00]/60' 
                fill='none' 
                stroke='currentColor' 
                viewBox='0 0 24 24'
              >
                <path 
                  strokeLinecap='round' 
                  strokeLinejoin='round' 
                  strokeWidth={2} 
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' 
                />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-[#7c3f00] mb-2'>No items found</h3>
            <p className='text-[#7c3f00]/70 mb-4'>
              {searchQuery 
                ? `No menu items match "${searchQuery}". Try a different search term.`
                : 'No items in this category.'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className='px-4 py-2 bg-[#7c3f00] text-white rounded-lg font-semibold hover:bg-[#a0522d] transition-colors'
              >
                Clear Search
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default FullMenu;
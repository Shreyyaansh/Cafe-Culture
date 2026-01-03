// Menu items data structure for cart functionality
// This file contains all menu items with their prices for cart calculations

// Helper function to generate ID from name (matches FullMenu.jsx logic)
// FullMenu.jsx uses: item.id || item.name.toLowerCase().replace(/\s+/g, '-')
const generateId = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

// Helper function to extract price from price string
const extractPrice = (priceString) => {
  if (typeof priceString === 'number') return priceString;
  if (typeof priceString === 'string') {
    // Remove ₹, /-, and any non-numeric characters except decimal point
    const cleaned = priceString.replace(/[₹/-]/g, '').replace(/\s+/g, '').trim();
    const price = parseFloat(cleaned);
    return isNaN(price) ? 0 : price;
  }
  return 0;
};

// Menu items from FullMenu.jsx - all items with their prices
const menuItemsFromFullMenu = {
  'hot-coffees': [
    { name: 'Espresso Shot', price: '₹89', description: 'Strong & bold single espresso shot. 36 ML' },
    { name: 'Classic Americano', price: '₹159', description: 'Smooth black espresso with hot water. 250 ML' },
    { name: 'Flat White', price: '₹159', description: 'Stronger, velvety latte-style coffee. 250 ML' },
    { name: 'Macchiato', price: '₹159', description: 'Espresso with a small mark of milk. 180 ML' },
    { name: 'Cappuccino', price: '₹169', description: 'Coffee topped with rich foamy milk. 250 ML' },
    { name: 'Café Latte', price: '₹169', description: 'Creamy espresso with steamed milk. 250 ML' },
    { name: 'Café Mocha', price: '₹179', description: 'Chocolate blended with espresso. 250 ML' },
    { name: 'Caramel Mocha', price: '₹179', description: 'Mocha with smooth caramel notes. 250 ML' },
    { name: 'Spanish Latte', price: '₹189', description: 'Sweetened silky latte, rich & creamy. 250 ML' },
    { name: 'Biscoff Latte', price: '₹199', description: 'Infused with warm biscoff cookie flavor. 250 ML' },
    { name: 'Nutella Latte', price: '₹199', description: 'Nutty chocolate latte with nutella. 250 ML' },
    { name: 'Irish Coffee', price: '₹209', description: 'Bold flavour coffee with creamy finish. 150 ML' },
    { name: 'Tiramisu Latte', price: '₹209', description: 'Dessert-style tiramisu flavour coffee. 250 ML' },
    { name: 'Affogato', price: '₹229', description: 'Hot espresso poured over ice-cream. 180 ML' }
  ],
  'hot-chocolates': [
    { name: 'Hot Chocolate', price: '₹189', description: 'Premium cocoa rich hot chocolate. 250 ML' },
    { name: 'Hazelnut / Vanilla Add-On', price: '₹19', description: 'Flavour enhancement shot. 20 ML' }
  ],
  'iced-coffee': [
    { name: 'Iced Americano', price: '₹159', description: 'Iced black americano. 250 ML' },
    { name: 'Iced Latte', price: '₹169', description: 'Cold milk based latte. 250 ML' },
    { name: 'Iced Vanilla Coffee', price: '₹169', description: 'Vanilla flavoured cold coffee. 250 ML' },
    { name: 'Iced Mocha', price: '₹179', description: 'Choco espresso cold drink. 250 ML' },
    { name: 'Iced Spanish Latte', price: '₹179', description: 'Sweet Spanish latte iced. 180 ML' },
    { name: 'Iced Cappuccino', price: '₹179', description: 'Foamy cold cappuccino. 250 ML' },
    { name: 'Iced Caramel Macchiato', price: '₹179', description: 'Caramel layered espresso. 250 ML' },
    { name: 'Iced Caramel Latte', price: '₹179', description: 'Caramel sweet cold latte. 250 ML' },
    { name: 'Cranberry Iced Coffee', price: '₹199', description: 'Tart cranberry cold coffee. 250 ML' }
  ],
  chai: [
    { name: 'Adrak Chai', price: '₹59', description: 'Ginger flavoured kadak chai. 180 ML' },
    { name: 'Masala Chai', price: '₹59', description: 'Indian spiced tea. 180 ML' },
    { name: 'Elaichi Chai', price: '₹59', description: 'Cardamom aromatic chai. 180 ML' },
    { name: 'Honey Lemon Tea', price: '₹79', description: 'Light soothing hot tea. 180 ML' },
    { name: 'Café Special Chai', price: '₹79', description: 'Signature blend special chai. 180 ML' }
  ],
  'iced-tea': [
    { name: 'Classic Lemon Mint Iced Tea', price: '₹149', description: 'Lemon + mint refreshing brew. 300 ML' },
    { name: 'Peach Iced Tea', price: '₹149', description: 'Sweet peach cold tea. 300 ML' },
    { name: 'Elder Flower Iced Tea', price: '₹149', description: 'Light floral iced tea. 300 ML' },
    { name: 'Lavender Iced Tea', price: '₹149', description: 'Calming lavender infused tea. 300 ML' }
  ],
  mojitos: [
    { name: 'Virgin Mojito', price: '₹149', description: 'Mint & lime refreshing cooler. 300 ML' },
    { name: 'Cranberry Mojito', price: '₹149', description: 'Sweet & sour cranberry mojito. 300 ML' },
    { name: 'Strawberry Mint Mojito', price: '₹149', description: 'Juicy strawberry & mint mix. 300 ML' },
    { name: 'Watermelon Mojito', price: '₹149', description: 'Cool refreshing watermelon mojito. 300 ML' },
    { name: 'Curacao Blue', price: '₹149', description: 'Blue tropical citrus mojito. 300 ML' },
    { name: 'Red Bull Mojito', price: '₹199', description: 'Energy infused mocktail. 300 ML' },
    { name: 'Beer Mojito', price: '₹229', description: 'Beer styled mojito flavour. 300 ML' }
  ],
  frappe: [
    { name: 'Classic Cold Coffee', price: '₹159', description: 'Strong & bold single espresso shot. 300 ML' },
    { name: 'Caramel Cheesecake Frappe', price: '₹209', description: 'Caramel rich ice blended frappe. 300 ML' },
    { name: 'Irish Cold Coffee', price: '₹209', description: 'Smooth Irish flavour iced coffee. 300 ML' },
    { name: 'Biscoff Frappe', price: '₹219', description: 'Cold coffee with biscuit flavour. 300 ML' },
    { name: 'Mocha Java Chip', price: '₹219', description: 'Coffee + choco chip crunch. 300 ML' },
    { name: 'Tiramisu Frappe', price: '₹239', description: 'Tiramisu inspired cold frappe. 300 ML' },
    { name: 'Nutella Frappe', price: '₹239', description: 'Nutty rich nutella frappe. 300 ML' },
    { name: 'Brownie Frappe', price: '₹249', description: 'Thick chocolate brownie blended frappe. 300 ML' }
  ],
  'tonic-bar': [
    { name: 'Espresso Diet Coke', price: '₹129', description: 'Smooth espresso paired with chilled Diet Coke for a light, fizzy kick. 300 ML' },
    { name: 'Espresso Tonic', price: '₹169', description: 'A crisp blend of bold espresso and refreshing tonic water. 300 ML' },
    { name: 'Espresso Red Bull', price: '₹199', description: 'Strong espresso fused with Red Bull for an instant energy boost. 300 ML' }
  ],
  smoothies: [
    { name: 'Banana Shake', price: '₹169', description: 'Fresh banana blend shake. 300 ML' },
    { name: 'Anjeer Shake', price: '₹179', description: 'Rich fig flavoured milkshake. 300 ML' },
    { name: 'Peanut Butter Smoothie', price: '₹199', description: 'Protein rich smoothie. 300 ML' },
    { name: 'Dry Fruit Shake', price: '₹219', description: 'Mixed nuts energy shake. 300 ML' },
    { name: 'Full Power Smoothie', price: '₹229', description: 'Heavy fruit & nut mixture. 300 ML' }
  ],
  'thick-shakes': [
    { name: 'Classic Vanilla', price: '₹139', description: 'Smooth vanilla thickshake. 300 ML' },
    { name: 'Cold Cocoa', price: '₹159', description: 'Dark thick liquid chocolate drink. 300 ML' },
    { name: 'Chocolate Thickshake', price: '₹169', description: 'Classic creamy chocolate shake. 300 ML' },
    { name: 'Strawberry Shake', price: '₹179', description: 'Refreshing & fruity shake. 300 ML' },
    { name: 'KitKat Shake', price: '₹179', description: 'Crunchy kitkat milkshake. 300 ML' },
    { name: 'Bournvita Shake', price: '₹179', description: 'Malted chocolate flavour. 300 ML' },
    { name: 'Brownie Shake', price: '₹189', description: 'Brownie blended thick shake. 300 ML' },
    { name: 'Oreo Cookies & Cream', price: '₹189', description: 'Cookies + creamy milkshake. 300 ML' },
    { name: 'Nutella Shake', price: '₹219', description: 'Nutty chocolate heavy shake. 300 ML' }
  ],
  panini: [
    { name: 'Indian Panini', price: '₹129', description: 'Desi spice panini.' },
    { name: 'Mexican Panini', price: '₹129', description: 'Mexican sauce flavour.' },
    { name: 'Tandoori Panini', price: '₹139', description: 'Tandoori grilled filling.' },
    { name: 'Coslo Panini', price: '₹139', description: 'Creamy cheesy mix.' }
  ],
  sandwiches: [
    { name: 'Butter Sandwich', price: '₹59', description: 'Soft buttery taste.' },
    { name: 'Butter Jam Sandwich', price: '₹69', description: 'Sweet jam & butter.' },
    { name: 'Veg Sandwich', price: '₹69', description: 'Fresh layered vegetables.' },
    { name: 'Cheese Chutney', price: '₹79', description: 'Cheese with tangy chutney.' },
    { name: 'Veg Cheese', price: '₹89', description: 'Veggies with melted cheese.' },
    { name: 'Alloo Mutter', price: '₹89', description: 'Spiced aloo mutter filling.' }
  ],
  'double-sandwiches': [
    { name: 'Mumbai Masala Chatpata', price: '₹119', description: 'Tangy spiced veggies with a bold Mumbai flavour.' },
    { name: 'Tandoori Paneer Tikka', price: '₹139', description: 'Char-grilled paneer with rich tandoori notes.' },
    { name: 'Cheese Corn', price: '₹149', description: 'Sweet corn with melted cheese.' },
    { name: 'Peri Peri Paneer Sandwich', price: '₹169', description: 'Spicy peri-peri paneer & veggies.' },
    { name: 'Spinach & Corn', price: '₹179', description: 'Creamy spinach with sweet corn.' },
    { name: 'Club Sandwich', price: '₹199', description: 'Classic triple-layer delight.' },
    { name: 'Pineapple Sandwich (3layers)', price: '₹199', description: 'Sweet tropical pineapple layers.' },
    { name: 'Chocolate Sandwich (3layers)', price: '₹209', description: 'Rich triple chocolate spread.' },
    { name: 'Café Culture Special Sandwich', price: '₹209', description: 'Our chef\'s signature creation.' },
    { name: 'Pineapple Ice Cream (3layers)', price: '₹229', description: 'Creamy ice-cream with pineapple.' }
  ],
  croissants: [
    { name: 'Mix Veg Croissant', price: '₹169', description: 'Veg loaded layers.' },
    { name: 'Spinach Corn Croissant', price: '₹169', description: 'Creamy spinach corn.' },
    { name: 'Chilli Paneer Croissant', price: '₹179', description: 'Stuffed paneer.' },
    { name: 'Paneer Tikka Croissant', price: '₹179', description: 'Tandoori paneer fold.' }
  ],
  burgers: [
    { name: 'Alloo Tikki Burger', price: '₹109', description: 'Crispy potato patty.' },
    { name: 'Gourmet Burger', price: '₹139', description: 'Premium patty & sauces.' },
    { name: 'Paneer Deckar Burger', price: '₹149', description: 'Double layer paneer.' },
    { name: 'Paneer Tikka Burger', price: '₹159', description: 'Tandoori paneer patty.' }
  ],
  'garlic-bread': [
    { name: 'Classic', price: '₹139', description: 'Garlic buttery toast.' },
    { name: 'Chilli Cheese', price: '₹149', description: 'Cheesy & spicy.' },
    { name: 'Cheese Corn', price: '₹159', description: 'Corn & cheese loaded.' }
  ],
  pizza: [
    { name: 'Full Cheese Bliss', price: '₹219', description: 'Loaded mozzarella.' },
    { name: 'Garden Carnival', price: '₹249', description: 'Fresh vegetable toppings.' },
    { name: 'Spicy Firecracker Pizza', price: '₹259', description: 'Bold spicy flavour.' },
    { name: 'Paneer Tikka Delight', price: '₹269', description: 'Tandoori paneer flavour.' },
    { name: 'Café Culture Signature Pizza', price: '₹299', description: 'Nachos/olives/fries loaded.' }
  ],
  pasta: [
    { name: 'Snowy Alferedo', price: '₹199', description: 'Creamy white sauce.' },
    { name: 'Crimson Heat', price: '₹199', description: 'Red spicy pasta.' },
    { name: 'Blush Romance', price: '₹249', description: 'Pink fusion sauce.' }
  ],
  maggie: [
    { name: 'Classic Maggie', price: '₹99', description: 'Nostalgic flavours.' },
    { name: 'Veg Maggie', price: '₹119', description: 'Loaded with vegetables.' },
    { name: 'Butter Maggie', price: '₹119', description: 'Creamy butter taste.' },
    { name: 'Italian Fusion Maggie', price: '₹139', description: 'Italian herbs blend.' },
    { name: 'Veg Cheese Maggie', price: '₹149', description: 'Cheesy maggie delight.' }
  ],
  puff: [
    { name: 'Alloo Puff', price: '₹49', description: 'Potato puff snack.' },
    { name: 'Veg Alloo Puff', price: '₹59', description: 'Classic aloo puff.' },
    { name: 'Paneer Chilli Puff', price: '₹64', description: 'Paneer spicy puff.' },
    { name: 'Café Culture Special Puff', price: '₹99', description: 'Chef signature puff.' }
  ],
  toast: [
    { name: 'Cheese Chilli Toast', price: '₹139', description: 'Melted chilli cheese.' },
    { name: 'Cheese Chilli Garlic Toast', price: '₹149', description: 'Garlic spice toast.' },
    { name: 'Amdavadi Masala Cheese Toast', price: '₹179', description: 'Desi spicy toast.', extra: 'extra 30/- for grill' }
  ],
  'snack-bars': [
    { name: 'Maska Bun', price: '₹49', description: 'Soft butter bun.' },
    { name: 'Butter Jam Maska Bun', price: '₹69', description: 'Sweet jam + butter.' },
    { name: 'Chocolate Maska Bun', price: '₹69', description: 'Chocolate stuffed bun.' },
    { name: 'Monaco Topping', price: '₹79', description: 'Seasoned monaco bites.' },
    { name: 'Salted fries', price: '₹99', description: 'Crispy fries.' },
    { name: 'Custom flavoured chips', price: '₹99', description: 'Custom flavoured chips.' },
    { name: 'Bhel', price: '₹109', description: 'Crunchy tangy bhel.' },
    { name: 'Jalapeno Cheese Poppers', price: '₹129', description: 'Spicy cheesy poppers.' },
    { name: 'Peri Peri Fries', price: '₹139', description: 'Spicy fries.' },
    { name: 'Nachos With Dip', price: '₹139', description: 'Nachos & dip.' },
    { name: 'Cheese Fries', price: '₹159', description: 'Cheese topped fries.' }
  ],
  bowls: [
    { name: 'Salad Bowl', price: '₹149', description: 'Healthy greens mix.' },
    { name: 'Tropical Fruit Bowl', price: '₹239', description: 'Fresh fruit bowl.' },
    { name: 'Choco Divine Bowl', price: '₹249', description: 'Chocolate dessert bowl.' }
  ],
  desserts: [
    { name: 'Butter Croissant', price: '₹99', description: 'Light, buttery, perfectly crisp.' },
    { name: 'Nutella Croissant', price: '₹159', description: 'Flaky layers filled with Nutella.' },
    { name: 'Black Forest Breeze', price: '₹179', description: 'Chocolate with whipped cherry lightness.' },
    { name: 'Brownie', price: '₹179', description: 'Dense, fudgy, chocolate-rich.' },
    { name: 'Chocolate Chips', price: '₹199', description: 'Soft, velvety & mildly cocoa-sweet.' },
    { name: 'New York Cheesecake', price: '₹209', description: 'Classic, creamy & rich.' },
    { name: 'Nutella Cheesecake', price: '₹219', description: 'Silky cheesecake with Nutella swirl.' },
    { name: 'Kitkat Cheesecake', price: '₹224', description: 'Crunchy KitKat meets smooth cream.' },
    { name: 'Biscoff Cheesecake', price: '₹229', description: 'Caramel-spiced biscoff indulgence.' }
  ]
};

// Generate menuItemsData object from menuItemsFromFullMenu
export const menuItemsData = {};

Object.keys(menuItemsFromFullMenu).forEach(category => {
  menuItemsFromFullMenu[category].forEach(item => {
    const id = generateId(item.name);
    menuItemsData[id] = {
      id: id,
      name: item.name,
      price: extractPrice(item.price),
      category: category,
      image: item.image || '🍽️',
      description: item.description || '',
      extra: item.extra || undefined
    };
  });
});

// Helper function to get menu item by ID
export const getMenuItemById = (id) => {
  return menuItemsData[id] || null;
};

// Helper function to check if an item is a menu item
export const isMenuItem = (itemId) => {
  // Check if it exists in menuItemsData
  if (menuItemsData.hasOwnProperty(itemId)) {
    return true;
  }
  // Also check if it looks like a menu item ID (contains hyphens, lowercase, etc.)
  // This helps catch items that might have slightly different ID formats
  return itemId && typeof itemId === 'string' && itemId.includes('-') && itemId === itemId.toLowerCase();
};

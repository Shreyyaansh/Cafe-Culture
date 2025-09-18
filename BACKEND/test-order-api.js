import axios from 'axios';

const testOrderAPI = async () => {
    try {
        console.log('🧪 Testing Order API...');
        
        const testOrder = {
            tableNumber: 1,
            customerName: "Test Customer",
            items: [
                {
                    name: "Test Coffee",
                    price: 100,
                    quantity: 1,
                    category: "hot-coffees",
                    image: "☕"
                }
            ],
            totalAmount: 100,
            orderType: "dine-in",
            specialInstructions: "Test order"
        };

        console.log('📤 Sending test order:', testOrder);
        
        const response = await axios.post('http://localhost:4000/api/order/create', testOrder);
        
        console.log('✅ Order API Response:', response.data);
        
    } catch (error) {
        console.error('❌ Order API Error:', error.response?.data || error.message);
    }
};

testOrderAPI();

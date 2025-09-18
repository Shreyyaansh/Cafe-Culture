import React, { useState, useEffect } from 'react';
import { UseAppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminPanel = () => {
    const { axios } = UseAppContext();
    const location = useLocation();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, preparing, ready, completed
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        statusBreakdown: []
    });
    const [showSecretMessage, setShowSecretMessage] = useState(false);

    // Fetch orders from API
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/order');
            if (data.success) {
                setOrders(data.orders);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    // Fetch order statistics
    const fetchStats = async () => {
        try {
            const { data } = await axios.get('/api/order/stats');
            if (data.success) {
                setStats(data.stats);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    // Update order status
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const { data } = await axios.put(`/api/order/${orderId}/status`, {
                status: newStatus
            });
            
            if (data.success) {
                toast.success(`Order status updated to ${newStatus}`);
                fetchOrders(); // Refresh orders
                fetchStats(); // Refresh stats
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Failed to update order status');
        }
    };

    // Delete order
    const deleteOrder = async (orderId) => {
        if (!window.confirm('Are you sure you want to delete this order?')) {
            return;
        }

        try {
            const { data } = await axios.delete(`/api/order/${orderId}`);
            
            if (data.success) {
                toast.success('Order deleted successfully');
                fetchOrders(); // Refresh orders
                fetchStats(); // Refresh stats
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error('Failed to delete order');
        }
    };

    // Filter orders based on selected filter
    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true;
        return order.status === filter;
    });

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'preparing': return 'bg-blue-100 text-blue-800';
            case 'ready': return 'bg-green-100 text-green-800';
            case 'completed': return 'bg-gray-100 text-gray-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Format time
    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    useEffect(() => {
        fetchOrders();
        fetchStats();
        
        // Check if accessed via secret shortcut (check for state or referrer)
        if (location.state?.fromShortcut || document.referrer === '') {
            setShowSecretMessage(true);
            setTimeout(() => setShowSecretMessage(false), 3000);
        }
        
        // Refresh data every 30 seconds
        const interval = setInterval(() => {
            fetchOrders();
            fetchStats();
        }, 30000);

        return () => clearInterval(interval);
    }, [location]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7c3f00] mx-auto mb-4"></div>
                    <p className="text-[#7c3f00]">Loading orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Secret Access Message */}
                {showSecretMessage && (
                    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🔐</span>
                            <span className="font-semibold">Secret Admin Access Granted!</span>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#7c3f00] mb-2">Admin Panel</h1>
                    <p className="text-[#7c3f00]/70">Manage orders and track cafe operations</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-[#faf0e6] p-6 rounded-lg border border-[#7c3f00]/10">
                        <h3 className="text-lg font-semibold text-[#7c3f00] mb-2">Total Orders</h3>
                        <p className="text-3xl font-bold text-[#7c3f00]">{stats.totalOrders}</p>
                    </div>
                    <div className="bg-[#faf0e6] p-6 rounded-lg border border-[#7c3f00]/10">
                        <h3 className="text-lg font-semibold text-[#7c3f00] mb-2">Today's Revenue</h3>
                        <p className="text-3xl font-bold text-[#7c3f00]">₹{stats.totalRevenue}</p>
                    </div>
                    <div className="bg-[#faf0e6] p-6 rounded-lg border border-[#7c3f00]/10">
                        <h3 className="text-lg font-semibold text-[#7c3f00] mb-2">Pending Orders</h3>
                        <p className="text-3xl font-bold text-[#7c3f00]">
                            {stats.statusBreakdown.find(s => s._id === 'pending')?.count || 0}
                        </p>
                    </div>
                    <div className="bg-[#faf0e6] p-6 rounded-lg border border-[#7c3f00]/10">
                        <h3 className="text-lg font-semibold text-[#7c3f00] mb-2">Ready Orders</h3>
                        <p className="text-3xl font-bold text-[#7c3f00]">
                            {stats.statusBreakdown.find(s => s._id === 'ready')?.count || 0}
                        </p>
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                    {['all', 'pending', 'preparing', 'ready', 'completed'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-full font-semibold transition-all ${
                                filter === status
                                    ? 'bg-[#7c3f00] text-white'
                                    : 'bg-[#faf0e6] text-[#7c3f00] hover:bg-[#7c3f00]/10'
                            }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)} 
                            ({status === 'all' ? orders.length : orders.filter(o => o.status === status).length})
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                <div className="space-y-6">
                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-xl font-semibold text-[#7c3f00] mb-2">No orders found</h3>
                            <p className="text-[#7c3f00]/70">
                                {filter === 'all' 
                                    ? 'No orders have been placed yet.' 
                                    : `No orders with status "${filter}" found.`
                                }
                            </p>
                        </div>
                    ) : (
                        filteredOrders.map((order) => (
                            <div key={order._id} className="bg-white border border-[#7c3f00]/10 rounded-lg p-6 shadow-sm">
                                {/* Order Header */}
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-[#7c3f00]">
                                            Table {order.tableNumber} - Order #{order._id.slice(-6)}
                                        </h3>
                                        <p className="text-[#7c3f00]/70">
                                            Customer: {order.customerName} | 
                                            Type: {order.orderType} | 
                                            Time: {formatTime(order.orderTime)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-2 md:mt-0">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                        <span className="text-lg font-bold text-[#7c3f00]">
                                            ₹{order.totalAmount}
                                        </span>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="mb-4">
                                    <h4 className="font-semibold text-[#7c3f00] mb-2">Items:</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between bg-[#faf0e6] p-3 rounded">
                                                <div>
                                                    <p className="font-medium text-[#7c3f00]">{item.name}</p>
                                                    <p className="text-sm text-[#7c3f00]/70">Qty: {item.quantity} | Price: ₹{item.price}</p>
                                                </div>
                                                <p className="font-semibold text-[#7c3f00]">₹{item.price * item.quantity}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Special Instructions */}
                                {order.specialInstructions && (
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-[#7c3f00] mb-1">Special Instructions:</h4>
                                        <p className="text-[#7c3f00]/80 bg-[#faf0e6] p-3 rounded italic">
                                            "{order.specialInstructions}"
                                        </p>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    {order.status === 'pending' && (
                                        <button
                                            onClick={() => updateOrderStatus(order._id, 'preparing')}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                        >
                                            Start Preparing
                                        </button>
                                    )}
                                    {order.status === 'preparing' && (
                                        <button
                                            onClick={() => updateOrderStatus(order._id, 'ready')}
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            Mark as Ready
                                        </button>
                                    )}
                                    {order.status === 'ready' && (
                                        <button
                                            onClick={() => updateOrderStatus(order._id, 'completed')}
                                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                        >
                                            Mark as Completed
                                        </button>
                                    )}
                                    {order.status === 'pending' && (
                                        <button
                                            onClick={() => updateOrderStatus(order._id, 'cancelled')}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            Cancel Order
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteOrder(order._id)}
                                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;

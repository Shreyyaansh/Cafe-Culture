import { assets, dummyOrders } from '../../assets/assets';
import { UseAppContext } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line
} from 'recharts';
import { Switch } from '@headlessui/react';

const Orders = () => {
    const boxIcon = "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg"

    const { currency, axios, user } = UseAppContext();
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState(null);
    const [span, setSpan] = useState('7d');
    const [loadingStats, setLoadingStats] = useState(false);

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/order/seller');
        if (data.success) {
          setOrders(data.orders);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    const fetchStats = async (spanVal = span) => {
      setLoadingStats(true);
      try {
        const { data } = await axios.get(`/api/order/seller/stats?span=${spanVal}`);
        if (data.success) {
          setStats(data.stats);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
      setLoadingStats(false);
    }

    const handleTogglePaid = async (orderId, currentStatus) => {
      try {
        const { data } = await axios.patch(`/api/order/seller/${orderId}/payment-status`, { isPaid: !currentStatus });
        if (data.success) {
          toast.success('Payment status updated');
          // Update orders list
          setOrders(orders => orders.map(o => o._id === orderId ? { ...o, isPaid: !currentStatus } : o));
          // Refresh stats
          fetchStats(span);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    // Custom tooltip for better mobile experience
    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
            <p className="font-medium text-gray-800">{label}</p>
            {payload.map((entry, index) => (
              <p key={index} style={{ color: entry.color }} className="text-sm">
                {entry.name}: {entry.value}
              </p>
            ))}
          </div>
        );
      }
      return null;
    };

    useEffect(() => {
      fetchOrders();
      fetchStats(span);
      // eslint-disable-next-line
    }, []);

    useEffect(() => {
      fetchStats(span);
      // eslint-disable-next-line
    }, [span]);

    return (
      <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
        <div className="p-3 sm:p-4 md:p-6 lg:p-10 space-y-4">
          <h2 className="text-lg sm:text-xl font-medium">Seller Statistics</h2>
          
          {/* Responsive time period buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-4 items-center mb-6">
            <button 
              onClick={() => setSpan('7d')} 
              className={`px-3 py-2 text-sm sm:text-base rounded transition-colors ${
                span === '7d' 
                  ? 'bg-indigo-500 text-white shadow-md' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Last 7 Days
            </button>
            <button 
              onClick={() => setSpan('30d')} 
              className={`px-3 py-2 text-sm sm:text-base rounded transition-colors ${
                span === '30d' 
                  ? 'bg-indigo-500 text-white shadow-md' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Last 30 Days
            </button>
            <button 
              onClick={() => setSpan('lifetime')} 
              className={`px-3 py-2 text-sm sm:text-base rounded transition-colors ${
                span === 'lifetime' 
                  ? 'bg-indigo-500 text-white shadow-md' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Lifetime
            </button>
          </div>

          {loadingStats ? (
            <div className="text-gray-500 text-center py-8">Loading statistics...</div>
          ) : stats && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-10">
              {/* Revenue and Orders Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col gap-4">
                <h3 className="text-lg font-semibold mb-2">Summary</h3>
                
                {/* Responsive summary cards */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm sm:text-base">Total Revenue</p>
                    <p className="text-xl sm:text-2xl font-bold text-indigo-600">{currency}{stats.totalRevenue}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm sm:text-base">Total Orders</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.totalOrders}</p>
                  </div>
                </div>

                <h4 className="font-medium mb-2 text-sm sm:text-base">Sales by Day</h4>
                
                {/* Responsive chart container */}
                <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                      data={stats.salesByDay} 
                      margin={{ 
                        top: 10, 
                        right: 10, 
                        left: 0, 
                        bottom: 10 
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="_id" 
                        tick={{ fontSize: 10, fill: '#6b7280' }}
                        axisLine={false}
                        tickLine={false}
                        padding={{ left: 10, right: 10 }}
                      />
                      <YAxis 
                        tick={{ fontSize: 10, fill: '#6b7280' }}
                        axisLine={false}
                        tickLine={false}
                        width={40}
                      />
                      <Tooltip 
                        content={<CustomTooltip />}
                        cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                      />
                      <Legend 
                        wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                        iconType="circle"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="totalRevenue" 
                        stroke="#6366f1" 
                        strokeWidth={2}
                        name="Revenue" 
                        dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#6366f1', strokeWidth: 2 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="orderCount" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        name="Orders" 
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Products - Responsive table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="text-left border-b border-gray-200">
                        <th className="py-2 pr-2 sm:pr-4 font-medium text-gray-700">Product</th>
                        <th className="py-2 pr-2 sm:pr-4 font-medium text-gray-700 hidden sm:table-cell">Category</th>
                        <th className="py-2 pr-2 sm:pr-4 font-medium text-gray-700">Qty</th>
                        <th className="py-2 pr-2 sm:pr-4 font-medium text-gray-700">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.topProducts.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-8 text-gray-400 text-center">
                            No sales data available
                          </td>
                        </tr>
                      )}
                      {stats.topProducts.map((prod, idx) => (
                        <tr key={prod.productId} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 pr-2 sm:pr-4">
                            <div className="max-w-24 sm:max-w-32">
                              <p className="font-medium text-gray-900 truncate">{prod.name}</p>
                              <p className="text-xs text-gray-500 sm:hidden">{prod.category}</p>
                            </div>
                          </td>
                          <td className="py-3 pr-2 sm:pr-4 hidden sm:table-cell text-gray-600">
                            {prod.category}
                          </td>
                          <td className="py-3 pr-2 sm:pr-4 font-medium text-gray-900">
                            {prod.totalQuantity}
                          </td>
                          <td className="py-3 pr-2 sm:pr-4 font-medium text-indigo-600">
                            {currency}{prod.totalRevenue}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders List */}
          <h2 className="text-lg sm:text-xl font-medium mt-10">Orders List</h2>
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div key={index} className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between p-4 sm:p-5 max-w-4xl rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-4 max-w-80">
                  <img className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded" src={assets.box_icon} alt="boxIcon" />
                  <div className="flex-1 min-w-0">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex flex-col">
                        <p className="font-medium text-sm sm:text-base truncate">
                          {item.product.name}{" "} 
                          <span className="text-indigo-500">x {item.quantity}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-gray-600 lg:text-center">
                  <p className='text-gray-800 font-medium'>{order.address.firstName} {order.address.lastName}</p>
                  <p className="truncate">{order.address.street}, {order.address.city}</p>
                  <p className="truncate">{order.address.state}, {order.address.zipcode}</p>
                  <p className="truncate">{order.address.phone}</p>
                </div>

                <div className="flex flex-col lg:items-end gap-2">
                  <p className="font-bold text-lg text-indigo-600">{currency}{order.amount}</p>
                  
                  <div className="flex flex-col text-xs sm:text-sm text-gray-600">
                    <p>Method: {order.paymentType}</p>
                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-medium ${order.isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                        {order.isPaid ? 'Paid' : 'Pending'}
                      </span>
                      <Switch
                        checked={order.isPaid}
                        onChange={() => handleTogglePaid(order._id, order.isPaid)}
                        className={`${order.isPaid ? 'bg-green-500' : 'bg-gray-300'} relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors focus:outline-none`}
                      >
                        <span
                          className={`${order.isPaid ? 'translate-x-4 sm:translate-x-6' : 'translate-x-1'} inline-block h-3 w-3 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform`}
                        />
                      </Switch>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default Orders;
import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle, 
  Search,
  TrendingUp,
  Star,
  RefreshCw
} from 'lucide-react';
import { orderAPI, apiUtils } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const OrderHistory = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completedOrders, setCompletedOrders] = useState([]);

  // Fetch completed orders from API
  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await orderAPI.getAll({
          restaurantId: user?.restaurantId,
          status: 'completed',
          chefId: user?.id
        });
        setCompletedOrders(response.data.orders || []);
      } catch (error) {
        setError(apiUtils.handleError(error));
      } finally {
        setLoading(false);
      }
    };

    if (user?.restaurantId) {
      fetchCompletedOrders();
    }
  }, [user?.restaurantId, user?.id]);

  const getFilteredOrders = () => {
    let filtered = completedOrders;

    // Apply date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      switch (dateFilter) {
        case 'today':
          filtered = filtered.filter(order => 
            new Date(order.completedAt) >= startOfDay
          );
          break;
        case 'week':
          const startOfWeek = new Date(startOfDay);
          startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
          filtered = filtered.filter(order => 
            new Date(order.completedAt) >= startOfWeek
          );
          break;
        case 'month':
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          filtered = filtered.filter(order => 
            new Date(order.completedAt) >= startOfMonth
          );
          break;
        default:
          break;
      }
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.tableNumber?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const calculateStats = (orders) => {
    if (orders.length === 0) {
      return {
        totalOrders: 0,
        avgRating: 0,
        avgPrepTime: 0,
        totalRevenue: 0
      };
    }

    const totalOrders = orders.length;
    const avgRating = orders.reduce((sum, order) => sum + (order.rating || 0), 0) / totalOrders;
    const avgPrepTime = orders.reduce((sum, order) => {
      const prepTime = order.completedAt && order.createdAt 
        ? Math.round((new Date(order.completedAt) - new Date(order.createdAt)) / 60000)
        : 0;
      return sum + prepTime;
    }, 0) / totalOrders;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    return {
      totalOrders,
      avgRating: avgRating.toFixed(1),
      avgPrepTime: Math.round(avgPrepTime),
      totalRevenue
    };
  };

  const getPreparationTime = (order) => {
    if (!order.completedAt || !order.createdAt) return 0;
    return Math.round((new Date(order.completedAt) - new Date(order.createdAt)) / 60000);
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const filteredOrders = getFilteredOrders();
  const stats = calculateStats(filteredOrders);

  const statsCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      color: 'bg-blue-500',
      icon: Clock
    },
    {
      title: 'Avg Rating',
      value: stats.avgRating,
      color: 'bg-yellow-500',
      icon: Star
    },
    {
      title: 'Avg Prep Time',
      value: stats.avgPrepTime + ' min',
      color: 'bg-green-500',
      icon: TrendingUp
    },
    {
      title: 'Total Revenue',
      value: '₹' + stats.totalRevenue.toLocaleString(),
      color: 'bg-purple-500',
      icon: CheckCircle
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-2">Error loading order history</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600">View completed orders and performance metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No completed orders</h3>
            <p className="text-gray-600">Completed orders will appear here once you finish preparing them.</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
          <div 
            key={order.id} 
            className="bg-white rounded-lg shadow-lg border-2 hover:shadow-xl transition-shadow"
          >
            {/* Order Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">#{order.id}</h3>
                  <p className="text-sm text-gray-600">Table {order.tableNumber || 'N/A'}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {order.rating && (
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">{order.rating}</span>
                      <Star className="w-4 h-4 text-yellow-400 ml-1" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{order.customerName || 'Anonymous'}</span>
                <span className="text-green-600 font-medium">₹{order.totalAmount?.toLocaleString() || 'N/A'}</span>
              </div>
            </div>

            {/* Order Content */}
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Order Time:</span>
                  <span className="text-sm text-gray-900">{formatTime(order.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completion:</span>
                  <span className="text-sm text-gray-900">{formatTime(order.completedAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Prep Time:</span>
                  <span className="text-sm text-gray-900">{getPreparationTime(order)} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Items:</span>
                  <span className="text-sm text-gray-900">{order.items?.length || 0}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Items:</h4>
                <div className="space-y-1">
                  {order.items?.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} x{item.quantity}</span>
                      <span className="text-gray-900">₹{item.price * item.quantity}</span>
                    </div>
                  )) || (
                    <div className="text-sm text-gray-500">No items available</div>
                  )}
                  {order.items && order.items.length > 3 && (
                    <div className="text-sm text-gray-500">+{order.items.length - 3} more items</div>
                  )}
                </div>
              </div>

              {/* Feedback */}
              {order.feedback && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 italic">"{order.feedback}"</p>
                </div>
              )}

              {/* Rating */}
              {order.rating && (
                <div className="mt-3 flex items-center justify-center">
                  {renderStars(order.rating)}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        )))}
      </div>

      {/* Performance Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.avgPrepTime}
            </div>
            <div className="text-sm text-gray-600">Average Prep Time (min)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.avgRating}
            </div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.totalOrders}
            </div>
            <div className="text-sm text-gray-600">Orders Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory; 
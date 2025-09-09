import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Settings, 
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { cartAPI } from '../../services/api';

const CartOwnerDashboard = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCarts: 0,
    totalRevenue: 0,
    totalOrders: 0,
    activeWorkers: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [selectedCart, setSelectedCart] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch carts
      const cartsResponse = await cartAPI.getOwnerCarts();
      setCarts(cartsResponse.data || []);
      
      // Calculate stats
      const totalRevenue = cartsResponse.data?.reduce((sum, cart) => sum + (cart.totalRevenue || 0), 0) || 0;
      const totalOrders = cartsResponse.data?.reduce((sum, cart) => sum + (cart.totalOrders || 0), 0) || 0;
      const activeWorkers = cartsResponse.data?.reduce((sum, cart) => sum + (cart.activeWorkers || 0), 0) || 0;
      
      setStats({
        totalCarts: cartsResponse.data?.length || 0,
        totalRevenue,
        totalOrders,
        activeWorkers
      });

      // Fetch recent orders for the first cart
      if (cartsResponse.data?.length > 0) {
        setSelectedCart(cartsResponse.data[0]);
        await fetchRecentOrders(cartsResponse.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentOrders = async (cartId) => {
    try {
      const response = await cartAPI.getCartOrders(cartId);
      setRecentOrders(response.data?.slice(0, 5) || []);
    } catch (error) {
      console.error('Error fetching recent orders:', error);
    }
  };

  const handleCreateCart = () => {
    // Navigate to create cart page
    window.location.href = '/cart-owner/carts/create';
  };

  const handleManageCart = (cartId) => {
    // Navigate to cart management page
    window.location.href = `/cart-owner/carts/${cartId}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cart Owner Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your food carts and track performance</p>
            </div>
            <button
              onClick={handleCreateCart}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Cart
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ShoppingCart className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Carts</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalCarts}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                    <dd className="text-lg font-medium text-gray-900">₹{stats.totalRevenue.toLocaleString()}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalOrders}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Workers</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.activeWorkers}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Carts List */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Your Carts</h3>
              <div className="space-y-4">
                {carts.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No carts yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating your first cart.</p>
                    <div className="mt-6">
                      <button
                        onClick={handleCreateCart}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create Cart
                      </button>
                    </div>
                  </div>
                ) : (
                  carts.map((cart) => (
                    <div key={cart.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-gray-900">{cart.name}</h4>
                          <p className="text-sm text-gray-500">{cart.location}</p>
                          <div className="mt-2 flex items-center space-x-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(cart.status)}`}>
                              {cart.status}
                            </span>
                            <span className="text-sm text-gray-500">
                              {cart.totalOrders || 0} orders
                            </span>
                            <span className="text-sm text-gray-500">
                              ₹{cart.totalRevenue || 0}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleManageCart(cart.id)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </button>
                          <button
                            onClick={() => window.location.href = `/cart-owner/carts/${cart.id}/edit`}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Orders</h3>
              {selectedCart ? (
                <div className="space-y-3">
                  {recentOrders.length === 0 ? (
                    <div className="text-center py-4">
                      <Clock className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">No recent orders</p>
                    </div>
                  ) : (
                    recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Order #{order.orderNumber}</p>
                          <p className="text-sm text-gray-500">{order.customerName || 'Walk-in Customer'}</p>
                          <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <span className="text-sm font-medium text-gray-900">₹{order.finalAmount}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <AlertCircle className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Select a cart to view orders</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={handleCreateCart}
                className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-colors group"
              >
                <Plus className="h-5 w-5 text-orange-600 mr-2 group-hover:text-orange-700" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">Add New Cart</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/cart-owner/menu'}
                className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors group"
              >
                <Settings className="h-5 w-5 text-blue-600 mr-2 group-hover:text-blue-700" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Manage Menu</span>
              </button>
              
              <button
                onClick={() => window.location.href = '/cart-owner/analytics'}
                className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors group"
              >
                <BarChart3 className="h-5 w-5 text-green-600 mr-2 group-hover:text-green-700" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">View Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartOwnerDashboard;

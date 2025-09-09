import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  RefreshCw,
  Bell,
  Users,
  ShoppingCart,
  TrendingUp,
  Filter,
  Search
} from 'lucide-react';
import { cartAPI } from '../../services/api';

const CartWorkerDashboard = () => {
  const [carts, setCarts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCart, setSelectedCart] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchWorkerData();
    // Set up real-time updates
    const interval = setInterval(fetchWorkerData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchWorkerData = async () => {
    try {
      setLoading(true);
      
      // Fetch assigned carts
      const cartsResponse = await cartAPI.getWorkerCarts();
      setCarts(cartsResponse.data || []);
      
      // If we have carts, fetch orders for the first one
      if (cartsResponse.data?.length > 0) {
        const firstCart = cartsResponse.data[0];
        setSelectedCart(firstCart);
        await fetchCartOrders(firstCart.id);
      }
    } catch (error) {
      console.error('Error fetching worker data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartOrders = async (cartId) => {
    try {
      const response = await cartAPI.getCartOrders(cartId);
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching cart orders:', error);
    }
  };

  const handleCartSelect = (cart) => {
    setSelectedCart(cart);
    fetchCartOrders(cart.id);
  };

  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      await cartAPI.updateOrderStatus(orderId, { status: newStatus });
      // Refresh orders
      if (selectedCart) {
        await fetchCartOrders(selectedCart.id);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'in_progress': return 'text-orange-600 bg-orange-100';
      case 'ready': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <RefreshCw className="h-4 w-4" />;
      case 'ready': return <AlertCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'pending': return 'confirmed';
      case 'confirmed': return 'in_progress';
      case 'in_progress': return 'ready';
      case 'ready': return 'completed';
      default: return null;
    }
  };

  const getFilteredOrders = () => {
    let filtered = orders;
    
    if (filter !== 'all') {
      filtered = filtered.filter(order => order.status === filter);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.customerName && order.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return filtered;
  };

  const getOrderStats = () => {
    const total = orders.length;
    const pending = orders.filter(o => o.status === 'pending').length;
    const inProgress = orders.filter(o => o.status === 'in_progress').length;
    const ready = orders.filter(o => o.status === 'ready').length;
    const completed = orders.filter(o => o.status === 'completed').length;
    
    return { total, pending, inProgress, ready, completed };
  };

  const stats = getOrderStats();

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
              <h1 className="text-3xl font-bold text-gray-900">Cart Worker Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">Manage orders and track cart operations</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchWorkerData}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-400" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {stats.pending + stats.ready}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cart Selection */}
        {carts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select Cart</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {carts.map((cart) => (
                <div
                  key={cart.id}
                  onClick={() => handleCartSelect(cart)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedCart?.id === cart.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-medium text-gray-900">{cart.name}</h4>
                  <p className="text-sm text-gray-500">{cart.location}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-500">{cart.totalOrders || 0} orders</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      cart.status === 'active' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                    }`}>
                      {cart.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedCart && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <ShoppingCart className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                        <dd className="text-lg font-medium text-gray-900">{stats.total}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Clock className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                        <dd className="text-lg font-medium text-gray-900">{stats.pending}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <RefreshCw className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                        <dd className="text-lg font-medium text-gray-900">{stats.inProgress}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Ready</dt>
                        <dd className="text-lg font-medium text-gray-900">{stats.ready}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                        <dd className="text-lg font-medium text-gray-900">{stats.completed}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orders Section */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Orders for {selectedCart.name}</h3>
                  <div className="flex items-center space-x-4">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    
                    {/* Filter */}
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="border border-gray-300 rounded-md text-sm focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="all">All Orders</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="in_progress">In Progress</option>
                      <option value="ready">Ready</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {getFilteredOrders().length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {filter === 'all' ? 'No orders for this cart yet.' : `No ${filter} orders found.`}
                      </p>
                    </div>
                  ) : (
                    getFilteredOrders().map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4">
                              <h4 className="text-lg font-medium text-gray-900">Order #{order.orderNumber}</h4>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {getStatusIcon(order.status)}
                                <span className="ml-1">{order.status.replace('_', ' ')}</span>
                              </span>
                            </div>
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                              <div>
                                <span className="font-medium">Customer:</span> {order.customerName || 'Walk-in Customer'}
                              </div>
                              <div>
                                <span className="font-medium">Time:</span> {new Date(order.createdAt).toLocaleString()}
                              </div>
                              <div>
                                <span className="font-medium">Amount:</span> ₹{order.finalAmount}
                              </div>
                            </div>
                            {order.specialInstructions && (
                              <div className="mt-2 text-sm text-gray-600">
                                <span className="font-medium">Special Instructions:</span> {order.specialInstructions}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => window.location.href = `/cart-worker/orders/${order.id}`}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </button>
                            {getNextStatus(order.status) && (
                              <button
                                onClick={() => handleOrderStatusUpdate(order.id, getNextStatus(order.status))}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-orange-600 hover:bg-orange-700"
                              >
                                {getNextStatus(order.status) === 'confirmed' && 'Confirm'}
                                {getNextStatus(order.status) === 'in_progress' && 'Start Cooking'}
                                {getNextStatus(order.status) === 'ready' && 'Mark Ready'}
                                {getNextStatus(order.status) === 'completed' && 'Complete'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {carts.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No assigned carts</h3>
            <p className="mt-1 text-sm text-gray-500">You haven't been assigned to any carts yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartWorkerDashboard;

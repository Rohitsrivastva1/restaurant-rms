import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle, 
  Play,
  Timer,
  Users,
  ChefHat,
  RefreshCw
} from 'lucide-react';
import { orderAPI, apiUtils } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const LiveOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await orderAPI.getAll({
          restaurantId: user?.restaurantId,
          status: ['received', 'in_progress', 'ready']
        });
        setOrders(response.data);
      } catch (error) {
        setError(apiUtils.handleError(error));
      } finally {
        setLoading(false);
      }
    };

    if (user?.restaurantId) {
      fetchOrders();
      
      // Set up real-time updates every 30 seconds
      const interval = setInterval(fetchOrders, 30000);
      return () => clearInterval(interval);
    }
  }, [user?.restaurantId]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setLoading(true);
      await orderAPI.updateStatus(orderId, newStatus);
      
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      setError(apiUtils.handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'received': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return 'N/A';
    const now = new Date();
    const orderTime = new Date(timestamp);
    const diff = Math.floor((now - orderTime) / 60000); // minutes
    return `${diff} min ago`;
  };

  const getEstimatedTime = (order) => {
    // Calculate estimated time based on items and complexity
    const totalItems = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    const baseTime = 10; // Base 10 minutes
    const itemTime = totalItems * 2; // 2 minutes per item
    return Math.min(baseTime + itemTime, 30); // Max 30 minutes
  };

  if (loading && orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-2">Error loading orders</div>
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
          <h1 className="text-2xl font-bold text-gray-900">Live Order Queue</h1>
          <p className="text-gray-600">Manage incoming kitchen orders</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button>
          <div className="flex items-center space-x-2">
            <ChefHat className="w-6 h-6 text-orange-500" />
            <span className="text-lg font-semibold text-gray-900">
              {orders.filter(o => o.status === 'in_progress').length} Active
            </span>
          </div>
        </div>
      </div>

      {/* Order Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">New Orders</p>
              <p className="text-2xl font-bold text-blue-900">
                {orders.filter(o => o.status === 'received').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">In Progress</p>
              <p className="text-2xl font-bold text-yellow-900">
                {orders.filter(o => o.status === 'in_progress').length}
              </p>
            </div>
            <Timer className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Ready</p>
              <p className="text-2xl font-bold text-green-900">
                {orders.filter(o => o.status === 'ready').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders</h3>
            <p className="text-gray-600">No orders in the queue at the moment.</p>
          </div>
        ) : (
          orders.map((order) => (
          <div 
            key={order.id} 
            className={`bg-white rounded-lg shadow-lg border-2 ${
              order.status === 'received' ? 'border-blue-200' :
              order.status === 'in_progress' ? 'border-yellow-200' :
              'border-green-200'
            }`}
          >
            {/* Order Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span className="text-lg font-bold text-gray-900">
                    Table {order.tableNumber || 'N/A'}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{getTimeAgo(order.createdAt)}</span>
                <span>₹{order.totalAmount?.toLocaleString() || 'N/A'}</span>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-4">
              <div className="space-y-2 mb-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                      {item.notes && (
                        <p className="text-xs text-gray-500 italic">Note: {item.notes}</p>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">x{item.quantity}</span>
                  </div>
                )) || (
                  <div className="text-gray-500 text-sm">No items available</div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {order.status === 'received' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'in_progress')}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start Order</span>
                  </button>
                )}
                
                {order.status === 'in_progress' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'ready')}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark Ready</span>
                  </button>
                )}
                
                {order.status === 'ready' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'completed')}
                    className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Complete</span>
                  </button>
                )}
              </div>

              {/* Order Details */}
              <div className="mt-3 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Order ID: #{order.id}</span>
                  <span>Est. Time: {getEstimatedTime(order)} min</span>
                </div>
                {order.customerName && (
                  <div className="mt-1">
                    <span>Customer: {order.customerName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )))}
      </div>

      {/* Loading indicator for updates */}
      {loading && orders.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Updating orders...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveOrders; 
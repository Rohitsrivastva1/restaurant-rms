import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle, 
  Play,
  Timer,
  Users,
  ChefHat
} from 'lucide-react';

// Mock data
const mockOrders = [
  {
    id: 1,
    tableNumber: 3,
    items: [
      { name: 'Butter Chicken', quantity: 2, notes: 'Extra spicy' },
      { name: 'Naan', quantity: 3 },
      { name: 'Paneer Tikka', quantity: 1, notes: 'Less spicy' }
    ],
    status: 'received',
    timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    totalAmount: 1250,
    estimatedTime: 15,
  },
  {
    id: 2,
    tableNumber: 5,
    items: [
      { name: 'Biryani', quantity: 1 },
      { name: 'Raita', quantity: 1 }
    ],
    status: 'in_progress',
    timestamp: new Date(Date.now() - 8 * 60000), // 8 minutes ago
    totalAmount: 450,
    estimatedTime: 12,
  },
  {
    id: 3,
    tableNumber: 2,
    items: [
      { name: 'Chicken Tikka', quantity: 2 },
      { name: 'Dal Makhani', quantity: 1 },
      { name: 'Roti', quantity: 4 }
    ],
    status: 'ready',
    timestamp: new Date(Date.now() - 12 * 60000), // 12 minutes ago
    totalAmount: 890,
    estimatedTime: 10,
  },
];

const LiveOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(mockOrders);
    
    // Simulate new orders coming in
    const interval = setInterval(() => {
      // Add random new order every 30 seconds
      if (Math.random() > 0.7) {
        const newOrder = {
          id: Date.now(),
          tableNumber: Math.floor(Math.random() * 10) + 1,
          items: [
            { name: 'Butter Chicken', quantity: Math.floor(Math.random() * 3) + 1 },
            { name: 'Naan', quantity: Math.floor(Math.random() * 3) + 1 }
          ],
          status: 'received',
          timestamp: new Date(),
          totalAmount: Math.floor(Math.random() * 1000) + 200,
          estimatedTime: Math.floor(Math.random() * 20) + 10,
        };
        setOrders(prev => [newOrder, ...prev]);
        
        // Play notification sound (in real app)
        console.log('New order received!');
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'received': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };



  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 60000); // minutes
    return `${diff} min ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Order Queue</h1>
          <p className="text-gray-600">Manage incoming kitchen orders</p>
        </div>
        <div className="flex items-center space-x-4">
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
        {orders.map((order) => (
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
                    Table {order.tableNumber}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{getTimeAgo(order.timestamp)}</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-4">
              <div className="space-y-2 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                      {item.notes && (
                        <p className="text-xs text-gray-500 italic">Note: {item.notes}</p>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">x{item.quantity}</span>
                  </div>
                ))}
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
                    onClick={() => setOrders(prev => prev.filter(o => o.id !== order.id))}
                    className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Complete</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="text-center py-12">
          <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders</h3>
          <p className="text-gray-600">No orders in the queue at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default LiveOrders; 
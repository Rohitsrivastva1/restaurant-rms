import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  Search,
  TrendingUp,
  Star
} from 'lucide-react';

const OrderHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  // Mock data
  const completedOrders = [
    {
      id: 'ORD-001',
      tableNumber: 'T1',
      customerName: 'John Smith',
      items: [
        { name: 'Butter Chicken', quantity: 2, price: 450 },
        { name: 'Naan', quantity: 3, price: 30 },
        { name: 'Paneer Tikka', quantity: 1, price: 280 }
      ],
      totalAmount: 1250,
      orderTime: '19:30',
      completionTime: '20:15',
      preparationTime: 45,
      rating: 5,
      feedback: 'Excellent food quality and taste!'
    },
    {
      id: 'ORD-002',
      tableNumber: 'T3',
      customerName: 'Sarah Johnson',
      items: [
        { name: 'Biryani', quantity: 1, price: 350 },
        { name: 'Raita', quantity: 1, price: 50 }
      ],
      totalAmount: 400,
      orderTime: '20:00',
      completionTime: '20:25',
      preparationTime: 25,
      rating: 4,
      feedback: 'Good biryani, could be spicier'
    },
    {
      id: 'ORD-003',
      tableNumber: 'T2',
      customerName: 'Mike Wilson',
      items: [
        { name: 'Chicken Tikka', quantity: 2, price: 320 },
        { name: 'Dal Makhani', quantity: 1, price: 180 },
        { name: 'Roti', quantity: 4, price: 20 }
      ],
      totalAmount: 560,
      orderTime: '20:15',
      completionTime: '20:40',
      preparationTime: 25,
      rating: 5,
      feedback: 'Perfect! Will definitely come back'
    },
    {
      id: 'ORD-004',
      tableNumber: 'T4',
      customerName: 'Lisa Brown',
      items: [
        { name: 'Pizza Margherita', quantity: 1, price: 450 },
        { name: 'French Fries', quantity: 1, price: 120 },
        { name: 'Coke', quantity: 2, price: 60 }
      ],
      totalAmount: 690,
      orderTime: '19:45',
      completionTime: '20:10',
      preparationTime: 25,
      rating: 4,
      feedback: 'Nice pizza, good service'
    },
    {
      id: 'ORD-005',
      tableNumber: 'T5',
      customerName: 'David Lee',
      items: [
        { name: 'Pasta Carbonara', quantity: 1, price: 380 },
        { name: 'Garlic Bread', quantity: 1, price: 80 },
        { name: 'Tiramisu', quantity: 1, price: 150 }
      ],
      totalAmount: 610,
      orderTime: '18:30',
      completionTime: '19:10',
      preparationTime: 40,
      rating: 5,
      feedback: 'Amazing pasta! Best I\'ve had'
    }
  ];

  const stats = [
    {
      title: 'Total Orders',
      value: completedOrders.length,
      color: 'bg-blue-500',
      icon: Clock
    },
    {
      title: 'Avg Rating',
      value: (completedOrders.reduce((sum, order) => sum + order.rating, 0) / completedOrders.length).toFixed(1),
      color: 'bg-yellow-500',
      icon: Star
    },
    {
      title: 'Avg Prep Time',
      value: Math.round(completedOrders.reduce((sum, order) => sum + order.preparationTime, 0) / completedOrders.length) + ' min',
      color: 'bg-green-500',
      icon: TrendingUp
    },
    {
      title: 'Total Revenue',
      value: '₹' + completedOrders.reduce((sum, order) => sum + order.totalAmount, 0).toLocaleString(),
      color: 'bg-purple-500',
      icon: CheckCircle
    }
  ];

  const filteredOrders = completedOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.tableNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600">View completed orders and performance metrics</p>
        </div>
        <div className="flex items-center space-x-4">
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
        {stats.map((stat, index) => {
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
        {filteredOrders.map((order) => (
          <div 
            key={order.id} 
            className="bg-white rounded-lg shadow-lg border-2 hover:shadow-xl transition-shadow"
          >
            {/* Order Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                  <p className="text-sm text-gray-600">Table {order.tableNumber}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900">{order.rating}</span>
                    <Star className="w-4 h-4 text-yellow-400 ml-1" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{order.customerName}</span>
                <span className="text-green-600 font-medium">₹{order.totalAmount}</span>
              </div>
            </div>

            {/* Order Content */}
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Order Time:</span>
                  <span className="text-sm text-gray-900">{order.orderTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completion:</span>
                  <span className="text-sm text-gray-900">{order.completionTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Prep Time:</span>
                  <span className="text-sm text-gray-900">{order.preparationTime} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Items:</span>
                  <span className="text-sm text-gray-900">{order.items.length}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Items:</h4>
                <div className="space-y-1">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} x{item.quantity}</span>
                      <span className="text-gray-900">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
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

              {/* Action Buttons */}
              <div className="mt-4">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(completedOrders.reduce((sum, order) => sum + order.preparationTime, 0) / completedOrders.length)}
            </div>
            <div className="text-sm text-gray-600">Average Prep Time (min)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {(completedOrders.reduce((sum, order) => sum + order.rating, 0) / completedOrders.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {completedOrders.length}
            </div>
            <div className="text-sm text-gray-600">Orders Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory; 
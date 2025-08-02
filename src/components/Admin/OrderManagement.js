
import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search,
  Filter,
  Eye,
  Edit,
  Printer,
  Phone
} from 'lucide-react';

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock data
  const orders = [
    {
      id: 'ORD-001',
      tableNumber: 'T1',
      customerName: 'John Smith',
      items: [
        { name: 'Butter Chicken', quantity: 2, price: 450 },
        { name: 'Naan', quantity: 3, price: 30 },
        { name: 'Paneer Tikka', quantity: 1, price: 280 }
      ],
      status: 'completed',
      totalAmount: 1250,
      orderTime: '19:30',
      completionTime: '20:15',
      paymentMethod: 'Card',
      phone: '+91 98765 43210',
      notes: 'Extra spicy butter chicken'
    },
    {
      id: 'ORD-002',
      tableNumber: 'T3',
      customerName: 'Sarah Johnson',
      items: [
        { name: 'Biryani', quantity: 1, price: 350 },
        { name: 'Raita', quantity: 1, price: 50 }
      ],
      status: 'in_progress',
      totalAmount: 400,
      orderTime: '20:00',
      completionTime: null,
      paymentMethod: 'Cash',
      phone: '+91 98765 43211',
      notes: null
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
      status: 'pending',
      totalAmount: 560,
      orderTime: '20:15',
      completionTime: null,
      paymentMethod: 'Card',
      phone: '+91 98765 43212',
      notes: 'Less spicy chicken tikka'
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
      status: 'cancelled',
      totalAmount: 690,
      orderTime: '19:45',
      completionTime: null,
      paymentMethod: 'Card',
      phone: '+91 98765 43213',
      notes: 'Customer cancelled'
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
      status: 'completed',
      totalAmount: 610,
      orderTime: '18:30',
      completionTime: '19:10',
      paymentMethod: 'Cash',
      phone: '+91 98765 43214',
      notes: null
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <ShoppingCart className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.tableNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      title: 'Total Orders',
      value: orders.length,
      color: 'bg-blue-500',
      icon: ShoppingCart
    },
    {
      title: 'Pending',
      value: orders.filter(o => o.status === 'pending').length,
      color: 'bg-yellow-500',
      icon: Clock
    },
    {
      title: 'In Progress',
      value: orders.filter(o => o.status === 'in_progress').length,
      color: 'bg-blue-500',
      icon: ShoppingCart
    },
    {
      title: 'Completed',
      value: orders.filter(o => o.status === 'completed').length,
      color: 'bg-green-500',
      icon: CheckCircle
    }
  ];

  const calculateTotalRevenue = () => {
    return orders
      .filter(order => order.status === 'completed')
      .reduce((total, order) => total + order.totalAmount, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">Track and manage restaurant orders</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Total Revenue: <span className="font-bold text-green-600">₹{calculateTotalRevenue().toLocaleString()}</span>
          </span>
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

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
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
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Table
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {order.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.tableNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.items.length} items
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items.slice(0, 2).map(item => item.name).join(', ')}
                      {order.items.length > 2 && '...'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">₹{order.totalAmount}</div>
                    <div className="text-sm text-gray-500">{order.paymentMethod}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`p-1 rounded-lg ${getStatusColor(order.status)} mr-2`}>
                        {getStatusIcon(order.status)}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{order.orderTime}</div>
                    {order.completionTime && (
                      <div className="text-xs text-gray-400">Completed: {order.completionTime}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
              <div className="mt-2 px-7 py-3">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Order ID:</span>
                    <span className="text-sm text-gray-900">{selectedOrder.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Customer:</span>
                    <span className="text-sm text-gray-900">{selectedOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Table:</span>
                    <span className="text-sm text-gray-900">{selectedOrder.tableNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Total Amount:</span>
                    <span className="text-sm font-bold text-gray-900">₹{selectedOrder.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Payment:</span>
                    <span className="text-sm text-gray-900">{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Order Time:</span>
                    <span className="text-sm text-gray-900">{selectedOrder.orderTime}</span>
                  </div>
                  {selectedOrder.completionTime && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Completion:</span>
                      <span className="text-sm text-gray-900">{selectedOrder.completionTime}</span>
                    </div>
                  )}
                  {selectedOrder.notes && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Notes:</span>
                      <span className="text-sm text-gray-900">{selectedOrder.notes}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Order Items:</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.name} x{item.quantity}</span>
                        <span className="text-gray-900">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement; 
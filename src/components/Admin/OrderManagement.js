
import React, { useState, useEffect } from 'react';
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
import { orderAPI, apiUtils } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const OrderManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError('');

        const params = {
          page: pagination.page,
          limit: pagination.limit,
          search: searchTerm || undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined,
          date: dateFilter || undefined,
          minAmount: amountFilter ? parseFloat(amountFilter) : undefined,
          restaurantId: user?.restaurantId
        };

        const response = await orderAPI.getAll(params);
        console.log('Orders response:', response.data);
        setOrders(response.data?.orders || response.data || []);
        setPagination(prev => ({
          ...prev,
          total: response.data?.total || response.data?.length || 0
        }));
      } catch (error) {
        setError(apiUtils.handleError(error));
      } finally {
        setLoading(false);
      }
    };

    if (user?.restaurantId) {
      fetchOrders();
    }
  }, [user, searchTerm, statusFilter, dateFilter, amountFilter, pagination.page, pagination.limit]);

  const handleStatusUpdate = async (orderId, newStatus) => {
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

  const handleAssignChef = async (orderId, chefId) => {
    try {
      setLoading(true);
      await orderAPI.assignChef(orderId, chefId);
      
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, assignedChefId: chefId } : order
      ));
    } catch (error) {
      setError(apiUtils.handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  // Real-time order tracking
  useEffect(() => {
    if (!user?.restaurantId) return;

    // Set up real-time updates every 30 seconds
    const interval = setInterval(() => {
      const fetchOrders = async () => {
        try {
          setLoading(true);
          setError('');

          const params = {
            page: pagination.page,
            limit: pagination.limit,
            search: searchTerm || undefined,
            status: statusFilter !== 'all' ? statusFilter : undefined,
            restaurantId: user?.restaurantId
          };

          const response = await orderAPI.getAll(params);
          console.log('Orders response:', response.data);
          setOrders(response.data?.orders || response.data || []);
          setPagination(prev => ({
            ...prev,
            total: response.data?.total || response.data?.length || 0
          }));
        } catch (error) {
          setError(apiUtils.handleError(error));
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }, 30000);

    return () => clearInterval(interval);
  }, [user?.restaurantId]);



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



  const stats = [
    {
      title: 'Total Orders',
      value: Array.isArray(orders) ? orders.length : 0,
      color: 'bg-blue-500',
      icon: ShoppingCart
    },
    {
      title: 'Pending',
      value: Array.isArray(orders) ? orders.filter(o => o.status === 'pending').length : 0,
      color: 'bg-yellow-500',
      icon: Clock
    },
    {
      title: 'In Progress',
      value: Array.isArray(orders) ? orders.filter(o => o.status === 'in_progress').length : 0,
      color: 'bg-blue-500',
      icon: ShoppingCart
    },
    {
      title: 'Completed',
      value: Array.isArray(orders) ? orders.filter(o => o.status === 'completed').length : 0,
      color: 'bg-green-500',
      icon: CheckCircle
    }
  ];

  const calculateTotalRevenue = () => {
    if (!Array.isArray(orders)) return 0;
    return orders
      .filter(order => order.status === 'completed')
      .reduce((total, order) => total + (order.totalAmount || 0), 0);
  };

  if (loading) {
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
                placeholder="Search orders by ID, customer name, or table number..."
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
              <option value="ready">Ready</option>
              <option value="served">Served</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button 
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Advanced</span>
            </button>
          </div>
        </div>
        
        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount (₹)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={amountFilter}
                  onChange={(e) => setAmountFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setDateFilter('');
                    setAmountFilter('');
                    setPagination(prev => ({ ...prev, page: 1 }));
                  }}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
          <p className="text-sm text-gray-600">Showing {orders.length} of {pagination.total} orders</p>
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
              {!Array.isArray(orders) || orders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    {loading ? 'Loading orders...' : 'No orders found'}
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.orderNumber || order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customerName || 'Walk-in Customer'}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {order.customerPhone || 'N/A'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.tableNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.items?.length || 0} items
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.items?.slice(0, 2).map(item => item.name || item.menuItemName).join(', ')}
                        {order.items?.length > 2 && '...'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₹{order.totalAmount}</div>
                      <div className="text-sm text-gray-500">{order.paymentMethod || 'Pending'}</div>
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
                      <div>{new Date(order.createdAt).toLocaleTimeString()}</div>
                      {order.completedAt && (
                        <div className="text-xs text-gray-400">Completed: {new Date(order.completedAt).toLocaleTimeString()}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(order.id, 'in_progress')}
                          className="text-green-600 hover:text-green-900"
                          title="Start Preparation"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900" title="Print Receipt">
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {pagination.total > pagination.limit && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm text-gray-700">
                  Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit)}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page >= Math.ceil(pagination.total / pagination.limit)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
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
                    <span className="text-sm text-gray-900">{selectedOrder.orderNumber || selectedOrder.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Customer:</span>
                    <span className="text-sm text-gray-900">{selectedOrder.customerName || 'Walk-in Customer'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Phone:</span>
                    <span className="text-sm text-gray-900">{selectedOrder.customerPhone || 'N/A'}</span>
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
                    <span className="text-sm text-gray-900">{selectedOrder.paymentMethod || 'Pending'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600">Order Time:</span>
                    <span className="text-sm text-gray-900">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                  </div>
                  {selectedOrder.completedAt && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Completion:</span>
                      <span className="text-sm text-gray-900">{new Date(selectedOrder.completedAt).toLocaleString()}</span>
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
                    {selectedOrder.items?.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name || item.menuItemName} x{item.quantity}
                        </span>
                        <span className="text-gray-900">₹{(item.price || item.unitPrice) * item.quantity}</span>
                      </div>
                    )) || <span className="text-gray-500 text-sm">No items found</span>}
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
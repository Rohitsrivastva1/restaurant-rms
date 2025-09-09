import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  Phone,
  Mail,
  X,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  QrCode,
  TrendingUp
} from 'lucide-react';
import { superAdminAPI, apiUtils } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const CartManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [carts, setCarts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCart, setSelectedCart] = useState(null);
  const [createForm, setCreateForm] = useState({
    name: '',
    description: '',
    location: '',
    theme: 'modern'
  });
  const [creating, setCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch carts from API
  const fetchCarts = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await superAdminAPI.getCarts({
        search: searchTerm,
        status: filterStatus !== 'all' ? filterStatus : undefined,
      });

      setCarts(response.data.carts || []);
    } catch (error) {
      setError(apiUtils.handleError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'super_admin') {
      fetchCarts();
    }
  }, [user?.role, searchTerm, filterStatus]);

  const handleCreateCart = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setCreating(true);
      setError('');

      const response = await superAdminAPI.createCart(createForm);
      
      if (response.data.success) {
        setCarts([response.data.cart, ...carts]);
        setShowCreateModal(false);
        setCreateForm({
          name: '',
          description: '',
          location: '',
          theme: 'modern'
        });
      }
    } catch (error) {
      setError(apiUtils.handleError(error));
    } finally {
      setCreating(false);
    }
  };

  const handleApproveCart = async (cartId) => {
    try {
      const response = await superAdminAPI.approveCart(cartId);
      console.log('Approve response:', response.data);
      
      // Update the cart status in the local state
      setCarts(carts.map(cart => 
        cart.id === cartId ? { ...cart, status: 'active' } : cart
      ));
      
      // Show success message
      setSuccessMessage('Cart approved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Refresh the carts list to ensure we have the latest data
      await fetchCarts();
      
    } catch (error) {
      console.error('Approve cart error:', error);
      setError(apiUtils.handleError(error));
    }
  };

  const handleSuspendCart = async (cartId) => {
    try {
      const response = await superAdminAPI.suspendCart(cartId);
      console.log('Suspend response:', response.data);
      
      // Update the cart status in the local state
      setCarts(carts.map(cart => 
        cart.id === cartId ? { ...cart, status: 'suspended' } : cart
      ));
      
      // Show success message
      setSuccessMessage('Cart suspended successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Refresh the carts list to ensure we have the latest data
      await fetchCarts();
      
    } catch (error) {
      console.error('Suspend cart error:', error);
      setError(apiUtils.handleError(error));
    }
  };

  const validateForm = () => {
    if (!createForm.name.trim()) {
      setError('Cart name is required');
      return false;
    }
    return true;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'suspended': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredCarts = carts.filter(cart => {
    const matchesSearch = cart.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cart.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cart.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || cart.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cart Management</h1>
          <p className="text-gray-600">Manage food carts and their owners</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Cart
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search carts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            {successMessage}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Carts List */}
      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredCarts.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No carts found</h3>
            <p className="text-gray-600">Get started by creating a new cart.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cart
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCarts.map((cart) => (
                  <tr key={cart.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <ShoppingCart className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {cart.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {cart.description || 'No description'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{cart.owner?.name || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{cart.owner?.email || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        {cart.location || 'Not specified'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(cart.status)}`}>
                        {getStatusIcon(cart.status)}
                        <span className="ml-1 capitalize">{cart.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(cart.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => {
                            setSelectedCart(cart);
                            setShowDetailsModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {cart.status === 'pending' && (
                          <button
                            onClick={() => handleApproveCart(cart.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        {cart.status === 'active' && (
                          <button
                            onClick={() => handleSuspendCart(cart.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Cart Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Create New Cart</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleCreateCart} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cart Name *
                  </label>
                  <input
                    type="text"
                    value={createForm.name}
                    onChange={(e) => setCreateForm({...createForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter cart name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={createForm.description}
                    onChange={(e) => setCreateForm({...createForm, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter cart description"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={createForm.location}
                    onChange={(e) => setCreateForm({...createForm, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter cart location"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Theme
                  </label>
                  <select
                    value={createForm.theme}
                    onChange={(e) => setCreateForm({...createForm, theme: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="modern">Modern</option>
                    <option value="classic">Classic</option>
                    <option value="minimal">Minimal</option>
                    <option value="colorful">Colorful</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {creating ? 'Creating...' : 'Create Cart'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Cart Details Modal */}
      {showDetailsModal && selectedCart && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Cart Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Cart Information</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Name:</span>
                      <span className="ml-2 text-sm text-gray-900">{selectedCart.name}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Description:</span>
                      <span className="ml-2 text-sm text-gray-900">{selectedCart.description || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Location:</span>
                      <span className="ml-2 text-sm text-gray-900">{selectedCart.location || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Theme:</span>
                      <span className="ml-2 text-sm text-gray-900 capitalize">{selectedCart.theme}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Status:</span>
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedCart.status)}`}>
                        {getStatusIcon(selectedCart.status)}
                        <span className="ml-1 capitalize">{selectedCart.status}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Owner Information</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Name:</span>
                      <span className="ml-2 text-sm text-gray-900">{selectedCart.owner?.name || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Email:</span>
                      <span className="ml-2 text-sm text-gray-900">{selectedCart.owner?.email || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Phone:</span>
                      <span className="ml-2 text-sm text-gray-900">{selectedCart.owner?.phone || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-900 mb-3">QR Code</h4>
                <div className="flex items-center space-x-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <QrCode className="h-16 w-16 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">QR Code will be generated automatically</p>
                    <p className="text-xs text-gray-500 mt-1">Customers can scan this to access the cart menu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartManagement;

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  QrCode, 
  Users, 
  Settings, 
  BarChart3,
  Plus,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Copy
} from 'lucide-react';
import { cartAPI } from '../../services/api';

const CartManagement = ({ cartId }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showQRModal, setShowQRModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (cartId) {
      fetchCartDetails();
    }
  }, [cartId]);

  const fetchCartDetails = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getOwnerCartById(cartId);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCart = async (updatedData) => {
    try {
      await cartAPI.updateOwnerCart(cartId, updatedData);
      await fetchCartDetails();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleDeleteCart = async () => {
    try {
      // Implement delete functionality
      console.log('Delete cart:', cartId);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  };

  const copyQRCode = () => {
    navigator.clipboard.writeText(cart?.qrCode);
    // Show success message
  };

  const downloadQRCode = () => {
    // Implement QR code download
    console.log('Download QR code');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'suspended': return 'text-red-600 bg-red-100';
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

  if (!cart) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Cart not found</h3>
          <p className="mt-1 text-sm text-gray-500">The cart you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button
                onClick={() => window.history.back()}
                className="mr-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{cart.name}</h1>
                <p className="mt-1 text-sm text-gray-500">{cart.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(cart.status)}`}>
                {cart.status}
              </span>
              <button
                onClick={() => setShowQRModal(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <QrCode className="h-4 w-4 mr-2" />
                QR Code
              </button>
              <button
                onClick={() => window.location.href = `/cart-owner/carts/${cartId}/edit`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: Eye },
              { id: 'menu', name: 'Menu', icon: Settings },
              { id: 'workers', name: 'Workers', icon: Users },
              { id: 'analytics', name: 'Analytics', icon: BarChart3 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Cart Info */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Cart Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cart Name</label>
                  <p className="mt-1 text-sm text-gray-900">{cart.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <p className="mt-1 text-sm text-gray-900">{cart.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-1 text-sm text-gray-900">{cart.description || 'No description'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Theme</label>
                  <p className="mt-1 text-sm text-gray-900 capitalize">{cart.theme}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">QR Code</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <code className="text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded">{cart.qrCode}</code>
                    <button
                      onClick={copyQRCode}
                      className="p-1 text-gray-400 hover:text-gray-500"
                      title="Copy QR Code"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subscription</label>
                  <div className="mt-1 flex items-center">
                    {cart.subscriptionActive ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${cart.subscriptionActive ? 'text-green-600' : 'text-red-600'}`}>
                      {cart.subscriptionActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-medium">₹</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                        <dd className="text-lg font-medium text-gray-900">₹{cart.totalRevenue || 0}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-medium">#</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                        <dd className="text-lg font-medium text-gray-900">{cart.totalOrders || 0}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Workers</dt>
                        <dd className="text-lg font-medium text-gray-900">{cart.activeWorkers || 0}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-medium">★</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Rating</dt>
                        <dd className="text-lg font-medium text-gray-900">{cart.averageRating || 'N/A'}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Menu Management</h3>
                <button
                  onClick={() => window.location.href = `/cart-owner/carts/${cartId}/menu`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Manage Menu
                </button>
              </div>
              <p className="text-sm text-gray-500">Manage your cart's menu categories and items.</p>
            </div>
          </div>
        )}

        {activeTab === 'workers' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Worker Management</h3>
                <button
                  onClick={() => window.location.href = `/cart-owner/carts/${cartId}/workers`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Worker
                </button>
              </div>
              <p className="text-sm text-gray-500">Manage workers assigned to this cart.</p>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
                <button
                  onClick={() => window.location.href = `/cart-owner/carts/${cartId}/analytics`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Detailed Analytics
                </button>
              </div>
              <p className="text-sm text-gray-500">View detailed analytics and reports for this cart.</p>
            </div>
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">QR Code</h3>
                <button
                  onClick={() => setShowQRModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              <div className="text-center">
                <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  {/* QR Code would be rendered here */}
                  <QrCode className="h-32 w-32 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 mb-4">Scan this QR code to access the cart menu</p>
                <div className="flex space-x-2">
                  <button
                    onClick={copyQRCode}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </button>
                  <button
                    onClick={downloadQRCode}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
                <h3 className="text-lg font-medium text-gray-900">Delete Cart</h3>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this cart? This action cannot be undone.
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCart}
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartManagement;

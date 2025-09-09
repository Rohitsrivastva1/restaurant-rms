import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  RefreshCw,
  User,
  Phone,
  MapPin,
  CreditCard,
  MessageSquare,
  Package,
  Timer
} from 'lucide-react';
import { cartAPI } from '../../services/api';

const OrderDetail = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      // This would fetch order details from API
      // For now, using mock data
      setOrder({
        id: orderId,
        orderNumber: 'ORD-001',
        status: 'pending',
        customerName: 'John Doe',
        customerPhone: '+91 98765 43210',
        customerEmail: 'john@example.com',
        carNumber: 'KA-01-AB-1234',
        seatNumber: 'A12',
        totalAmount: 350,
        taxAmount: 35,
        discountAmount: 0,
        finalAmount: 385,
        paymentMethod: 'upi',
        paymentStatus: 'completed',
        specialInstructions: 'Extra spicy, no onions',
        estimatedTime: 20,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: [
          {
            id: 1,
            name: 'Chicken Biryani',
            quantity: 2,
            unitPrice: 150,
            totalPrice: 300,
            specialInstructions: 'Extra spicy'
          },
          {
            id: 2,
            name: 'Mango Lassi',
            quantity: 1,
            unitPrice: 50,
            totalPrice: 50,
            specialInstructions: ''
          }
        ]
      });
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      await cartAPI.updateOrderStatus(orderId, { status: newStatus });
      setOrder(prev => ({ ...prev, status: newStatus, updatedAt: new Date().toISOString() }));
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      setUpdating(false);
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

  const getStatusActions = (currentStatus) => {
    switch (currentStatus) {
      case 'pending':
        return [
          { status: 'confirmed', label: 'Confirm Order', color: 'bg-blue-600 hover:bg-blue-700' },
          { status: 'cancelled', label: 'Cancel Order', color: 'bg-red-600 hover:bg-red-700' }
        ];
      case 'confirmed':
        return [
          { status: 'in_progress', label: 'Start Cooking', color: 'bg-orange-600 hover:bg-orange-700' }
        ];
      case 'in_progress':
        return [
          { status: 'ready', label: 'Mark Ready', color: 'bg-green-600 hover:bg-green-700' }
        ];
      case 'ready':
        return [
          { status: 'completed', label: 'Complete Order', color: 'bg-green-600 hover:bg-green-700' }
        ];
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Order not found</h3>
          <p className="mt-1 text-sm text-gray-500">The order you're looking for doesn't exist.</p>
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
                <h1 className="text-3xl font-bold text-gray-900">Order #{order.orderNumber}</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Placed on {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                <span className="ml-2">{order.status.replace('_', ' ')}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-sm text-gray-500">Customer Name</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.customerPhone}</p>
                    <p className="text-sm text-gray-500">Phone Number</p>
                  </div>
                </div>
                {order.customerEmail && (
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.customerEmail}</p>
                      <p className="text-sm text-gray-500">Email</p>
                    </div>
                  </div>
                )}
                {order.carNumber && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.carNumber}</p>
                      <p className="text-sm text-gray-500">Car Number</p>
                    </div>
                  </div>
                )}
                {order.seatNumber && (
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.seatNumber}</p>
                      <p className="text-sm text-gray-500">Seat Number</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      {item.specialInstructions && (
                        <p className="text-sm text-orange-600 mt-1">
                          <strong>Special:</strong> {item.specialInstructions}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">₹{item.totalPrice}</p>
                      <p className="text-sm text-gray-500">₹{item.unitPrice} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            {order.specialInstructions && (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Special Instructions</h3>
                <p className="text-sm text-gray-700">{order.specialInstructions}</p>
              </div>
            )}
          </div>

          {/* Order Actions & Summary */}
          <div className="space-y-6">
            {/* Order Actions */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Actions</h3>
              <div className="space-y-3">
                {getStatusActions(order.status).map((action) => (
                  <button
                    key={action.status}
                    onClick={() => handleStatusUpdate(action.status)}
                    disabled={updating}
                    className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${action.color} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {updating ? (
                      <>
                        <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                        Updating...
                      </>
                    ) : (
                      action.label
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="text-sm font-medium text-gray-900">₹{order.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Tax</span>
                  <span className="text-sm font-medium text-gray-900">₹{order.taxAmount}</span>
                </div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Discount</span>
                    <span className="text-sm font-medium text-green-600">-₹{order.discountAmount}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-900">Total</span>
                    <span className="text-base font-medium text-gray-900">₹{order.finalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 capitalize">{order.paymentMethod}</p>
                    <p className="text-sm text-gray-500">Payment Method</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 capitalize">{order.paymentStatus}</p>
                    <p className="text-sm text-gray-500">Payment Status</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Estimated Time */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Preparation Time</h3>
              <div className="flex items-center">
                <Timer className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.estimatedTime} minutes</p>
                  <p className="text-sm text-gray-500">Estimated preparation time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

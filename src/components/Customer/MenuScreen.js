import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import GeofenceCheck from './GeofenceCheck';
import ImageWithFallback from '../Admin/ImageWithFallback';

// Debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const MenuScreen = () => {
  const [searchParams] = useSearchParams();
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [tableInfo, setTableInfo] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [geofenceData, setGeofenceData] = useState(null);
  const [isWithinGeofence, setIsWithinGeofence] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  const abortControllerRef = useRef(null);
  const orderStatusIntervalRef = useRef(null);

  // Memoize table and restaurant info
  const table = useMemo(() => searchParams.get('table'), [searchParams]);
  const restaurantId = useMemo(() => searchParams.get('restaurantId'), [searchParams]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchMenuData = useCallback(async (restaurantId) => {
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);
      setError('');
      console.log('Fetching menu for restaurant:', restaurantId);
      const response = await axios.get(`http://localhost:3000/menu?restaurantId=${restaurantId}`, {
        signal: abortControllerRef.current.signal,
        timeout: 30000 // 30 second timeout
      });
      console.log('Menu response:', response.data);
      if (response.data && response.data.items) {
        setMenuItems(response.data.items);
      } else {
        setMenuItems([]);
      }
    } catch (error) {
      console.error('Menu fetch error:', error);
      if (error.name === 'CanceledError' || error.name === 'AbortError') {
        console.log('Request was cancelled');
        return; // Don't set error for cancelled requests
      }
      if (error.name !== 'AbortError') {
        setError('Failed to load menu. Please try again.');
        setMenuItems([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchGeofenceData = useCallback(async (tableNumber, restaurantId) => {
    try {
      // Skip geofence check for now to avoid 401 errors
      console.log('Skipping geofence check for table:', tableNumber);
      // TODO: Implement geofence check when authentication is properly set up
      // const response = await axios.get(`http://localhost:3000/tables/qr/${tableNumber}`);
      // if (response.data && response.data.qrData) {
      //   setGeofenceData(response.data.qrData.geofence);
      // }
    } catch (error) {
      console.error('Failed to fetch geofence data:', error);
      // Don't set error state for geofence failures
    }
  }, []);

  useEffect(() => {
    if (table && restaurantId) {
      setTableInfo({ table, restaurantId });
      fetchMenuData(restaurantId);
      fetchGeofenceData(table, restaurantId);
    }
  }, [table, restaurantId]); // Remove fetchMenuData and fetchGeofenceData from dependencies

  const handleLocationCheck = useCallback((withinGeofence, distance) => {
    setIsWithinGeofence(withinGeofence);
  }, []);

  const addToCart = useCallback((item) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(prev => prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  }, [removeFromCart]);

  const getTotalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const fetchOrderStatus = useCallback(async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:3000/orders/customer/${orderId}/status`);
      setOrderStatus(response.data);
    } catch (error) {
      console.error('Failed to fetch order status:', error);
    }
  }, []);

  const startOrderStatusPolling = useCallback((orderId) => {
    // Clear any existing interval
    if (orderStatusIntervalRef.current) {
      clearInterval(orderStatusIntervalRef.current);
    }

    // Fetch initial status
    fetchOrderStatus(orderId);

    // Set up polling every 10 seconds
    orderStatusIntervalRef.current = setInterval(() => {
      fetchOrderStatus(orderId);
    }, 10000);
  }, [fetchOrderStatus]);

  const stopOrderStatusPolling = useCallback(() => {
    if (orderStatusIntervalRef.current) {
      clearInterval(orderStatusIntervalRef.current);
      orderStatusIntervalRef.current = null;
    }
  }, []);

  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'pending_payment':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending_cash_payment':
        return 'bg-orange-100 text-orange-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'served':
        return 'bg-gray-100 text-gray-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }, []);

  const getStatusIcon = useCallback((status) => {
    switch (status) {
      case 'pending_payment':
        return '💳';
      case 'pending_cash_payment':
        return '💰';
      case 'confirmed':
        return '✅';
      case 'in_progress':
        return '👨‍🍳';
      case 'ready':
        return '🍽️';
      case 'served':
        return '🎉';
      case 'completed':
        return '✅';
      default:
        return '📋';
    }
  }, []);

  const placeOrder = useCallback(async (paymentMethod = 'razorpay') => {
    if (cart.length === 0) return;

    try {
      const orderData = {
        tableNumber: tableInfo.table,
        restaurantId: parseInt(tableInfo.restaurantId),
        items: cart.map(item => ({
          menuItemId: item.id,
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity
        })),
        totalAmount: getTotalPrice,
        paymentMethod: paymentMethod
      };

      let response;
      if (paymentMethod === 'razorpay') {
        const { loadRazorpay } = await import('../../utils/loadRazorpay');
        const RazorpayCtor = await loadRazorpay();
        // Create Razorpay order
        response = await axios.post('http://localhost:3000/payments/create-order', orderData);
        
        // Initialize Razorpay payment
        const options = {
          key: response.data.payment.keyId,
          amount: response.data.payment.amount,
          currency: response.data.payment.currency,
          order_id: response.data.payment.orderId,
          name: 'Restaurant Order',
          description: `Order for Table ${tableInfo.table}`,
          handler: async function (paymentResponse) {
            try {
              // Verify payment
              await axios.post('http://localhost:3000/payments/verify-payment', {
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                orderId: response.data.order.id
              });
              
              // Set current order and start polling
              setCurrentOrder(response.data.order);
              setShowOrderStatus(true);
              startOrderStatusPolling(response.data.order.id);
              setCart([]);
              setShowCart(false);
            } catch (error) {
              alert('Payment verification failed. Please try again.');
              console.error('Payment verification error:', error);
            }
          },
          prefill: {
            name: 'Customer',
            email: 'customer@example.com',
            contact: '9999999999'
          },
          theme: {
            color: '#3B82F6'
          }
        };

        const rzp = new RazorpayCtor(options);
        rzp.open();
      } else {
        // Cash payment
        response = await axios.post('http://localhost:3000/payments/cash-payment', orderData);
        
        // Set current order and start polling
        setCurrentOrder(response.data.order);
        setShowOrderStatus(true);
        startOrderStatusPolling(response.data.order.id);
        setCart([]);
        setShowCart(false);
      }
    } catch (error) {
      alert('Failed to place order. Please try again.');
      console.error('Order error:', error);
    }
  }, [cart, tableInfo, getTotalPrice, startOrderStatusPolling]);

  // Memoize cart item lookup for better performance
  const cartItemMap = useMemo(() => {
    const map = new Map();
    cart.forEach(item => map.set(item.id, item));
    return map;
  }, [cart]);

  // Filter menu items based on search term
  const filteredMenuItems = useMemo(() => {
    if (!debouncedSearchTerm) return menuItems;
    return menuItems.filter(item => 
      item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [menuItems, debouncedSearchTerm]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      stopOrderStatusPolling();
    };
  }, [stopOrderStatusPolling]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => {
              setError('');
              if (restaurantId) {
                fetchMenuData(restaurantId);
              }
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry Loading Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Restaurant Menu</h1>
              {tableInfo && (
                <p className="text-gray-600">Table {tableInfo.table}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {currentOrder && (
                <button
                  onClick={() => setShowOrderStatus(!showOrderStatus)}
                  className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm"
                >
                  {showOrderStatus ? 'Hide' : 'Show'} Order Status
                </button>
              )}
              <button
                onClick={() => setShowCart(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 relative"
              >
                Cart ({cart.length})
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Status Section - Mobile Bottom Sheet */}
      {currentOrder && showOrderStatus && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Order Status</h3>
              <button
                onClick={() => setShowOrderStatus(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Order #{currentOrder.orderNumber}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(orderStatus?.status || currentOrder.status)}`}>
                  {getStatusIcon(orderStatus?.status || currentOrder.status)} {orderStatus?.status || currentOrder.status}
                </span>
              </div>
              
              {orderStatus && (
                <div className="text-sm text-gray-600">
                  <p>Estimated Time: {orderStatus.estimatedTime || 15} minutes</p>
                  <p>Total: ₹{currentOrder.totalAmount}</p>
                </div>
              )}
              
              <div className="text-xs text-gray-500">
                {orderStatus?.status === 'ready' && "Your order is ready! Please collect from the counter."}
                {orderStatus?.status === 'served' && "Order completed! Enjoy your meal!"}
                {orderStatus?.status === 'in_progress' && "Chef is preparing your order..."}
                {orderStatus?.status === 'confirmed' && "Order confirmed! Payment received."}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Status Section - Desktop Sidebar */}
      {currentOrder && showOrderStatus && (
        <div className="hidden md:block fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg z-40">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Order Status</h3>
              <button
                onClick={() => setShowOrderStatus(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Order #{currentOrder.orderNumber}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orderStatus?.status || currentOrder.status)}`}>
                    {getStatusIcon(orderStatus?.status || currentOrder.status)} {orderStatus?.status || currentOrder.status}
                  </span>
                </div>
                
                {orderStatus && (
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Estimated Time: {orderStatus.estimatedTime || 15} minutes</p>
                    <p>Total: ₹{currentOrder.totalAmount}</p>
                    <p>Payment: {currentOrder.paymentMethod}</p>
                  </div>
                )}
              </div>
              
              <div className="text-sm text-gray-600">
                {orderStatus?.status === 'ready' && "Your order is ready! Please collect from the counter."}
                {orderStatus?.status === 'served' && "Order completed! Enjoy your meal!"}
                {orderStatus?.status === 'in_progress' && "Chef is preparing your order..."}
                {orderStatus?.status === 'confirmed' && "Order confirmed! Payment received."}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${currentOrder && showOrderStatus ? 'md:pr-96' : ''}`}>
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Geofencing Check */}
        {geofenceData && (
          <div className="mb-6">
            <GeofenceCheck 
              geofenceData={geofenceData} 
              onLocationCheck={handleLocationCheck}
            />
          </div>
        )}

        {/* Menu Items */}
        {filteredMenuItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm ? 'No menu items match your search.' : 'No menu items available.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenuItems.map((item) => {
              const cartItem = cartItemMap.get(item.id);
              return (
                <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <ImageWithFallback 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <span className="text-lg font-bold text-blue-600">₹{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {item.category}
                      </span>
                      
                      {/* Quantity Controls */}
                      {cartItem ? (
                        <div className="flex items-center justify-between bg-blue-50 rounded-lg px-3 py-2">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 text-sm font-bold"
                            >
                              -
                            </button>
                            <span className="text-blue-600 font-semibold min-w-[20px] text-center">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 text-sm font-bold"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs text-blue-600 font-medium">
                            ₹{item.price} × {cartItem.quantity}
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          disabled={false} // Temporarily disable geofencing
                          className="px-3 py-1 rounded text-sm bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Your Cart</h3>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg">₹{getTotalPrice}</span>
                  </div>
                  
                  <button
                    onClick={() => placeOrder('razorpay')}
                    disabled={false} // Temporarily disable geofencing
                    className="w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Pay with Razorpay
                  </button>
                  <button
                    onClick={() => placeOrder('cash')}
                    disabled={false} // Temporarily disable geofencing
                    className="w-full py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 mt-2"
                  >
                    Pay with Cash
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bottom padding for mobile order status */}
      {currentOrder && showOrderStatus && (
        <div className="h-32 md:hidden"></div>
      )}
    </div>
  );
};

export default React.memo(MenuScreen);
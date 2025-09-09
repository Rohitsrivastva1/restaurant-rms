import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Clock, 
  Star, 
  MapPin, 
  Phone,
  CreditCard,
  CheckCircle,
  AlertCircle,
  X,
  Search,
  Filter,
  Heart,
  Share2
} from 'lucide-react';
import { cartAPI } from '../../services/api';

const CartMenu = ({ qrCode }) => {
  const [cart, setCart] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    carNumber: '',
    seatNumber: '',
    specialInstructions: ''
  });

  useEffect(() => {
    if (qrCode) {
      fetchCartData();
    }
  }, [qrCode]);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getCartByQR(qrCode);
      const cartData = response.data;
      setCart(cartData);
      
      // Mock data for categories and menu items
      setCategories([
        { id: 1, name: 'Main Course', description: 'Hearty main dishes', itemCount: 5 },
        { id: 2, name: 'Beverages', description: 'Refreshing drinks', itemCount: 3 },
        { id: 3, name: 'Snacks', description: 'Quick bites', itemCount: 4 }
      ]);
      
      setMenuItems([
        { id: 1, name: 'Chicken Biryani', description: 'Fragrant rice with tender chicken', price: 250, categoryId: 1, imageUrl: '', isAvailable: true, isVegetarian: false, isSpicy: true, preparationTime: 20, rating: 4.5 },
        { id: 2, name: 'Mango Lassi', description: 'Creamy yogurt drink with mango', price: 80, categoryId: 2, imageUrl: '', isAvailable: true, isVegetarian: true, isSpicy: false, preparationTime: 5, rating: 4.2 },
        { id: 3, name: 'Samosa', description: 'Crispy pastry with spiced filling', price: 30, categoryId: 3, imageUrl: '', isAvailable: true, isVegetarian: true, isSpicy: true, preparationTime: 10, rating: 4.0 },
        { id: 4, name: 'Butter Chicken', description: 'Creamy tomato curry with tender chicken', price: 280, categoryId: 1, imageUrl: '', isAvailable: true, isVegetarian: false, isSpicy: false, preparationTime: 25, rating: 4.7 },
        { id: 5, name: 'Masala Chai', description: 'Spiced Indian tea', price: 25, categoryId: 2, imageUrl: '', isAvailable: true, isVegetarian: true, isSpicy: false, preparationTime: 5, rating: 4.1 }
      ]);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTaxAmount = () => {
    return getTotalAmount() * 0.18; // 18% tax
  };

  const getFinalAmount = () => {
    return getTotalAmount() + getTaxAmount();
  };

  const handleCheckout = async () => {
    try {
      const orderData = {
        cartId: cart.id,
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        customerEmail: customerInfo.email,
        carNumber: customerInfo.carNumber,
        seatNumber: customerInfo.seatNumber,
        specialInstructions: customerInfo.specialInstructions,
        items: cartItems.map(item => ({
          menuItemId: item.id,
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity
        })),
        totalAmount: getTotalAmount(),
        taxAmount: getTaxAmount(),
        finalAmount: getFinalAmount(),
        paymentMethod: 'upi'
      };

      const response = await cartAPI.createOrder(orderData);
      console.log('Order created:', response.data);
      
      // Reset cart and show success
      setCartItems([]);
      setShowCheckout(false);
      setShowCart(false);
      alert('Order placed successfully! Order number: ' + response.data.orderNumber);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const getFilteredItems = () => {
    let filtered = menuItems;
    
    if (selectedCategory) {
      filtered = filtered.filter(item => item.categoryId === selectedCategory.id);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (!cart) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Cart not found</h3>
          <p className="mt-1 text-sm text-gray-500">The QR code is invalid or the cart is not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{cart.name}</h1>
              <p className="text-sm text-gray-500 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {cart.location}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCart(true)}
                className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({cartItems.length})
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  !selectedCategory ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                All Items
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    selectedCategory?.id === category.id ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredItems().map((item) => (
            <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-semibold text-gray-900">₹{item.price}</span>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{item.preparationTime} min</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  {item.isVegetarian && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Vegetarian
                    </span>
                  )}
                  {item.isSpicy && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Spicy
                    </span>
                  )}
                  {!item.isAvailable && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Unavailable
                    </span>
                  )}
                </div>
                
                <button
                  onClick={() => addToCart(item)}
                  disabled={!item.isAvailable}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-0 right-0 h-full w-full md:w-96 bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">Your Cart</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                    <p className="mt-1 text-sm text-gray-500">Add some items to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">₹{item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-400 hover:text-gray-500"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-sm font-medium text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-400 hover:text-gray-500"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cartItems.length > 0 && (
                <div className="border-t p-4">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="text-gray-900">₹{getTotalAmount()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tax (18%)</span>
                      <span className="text-gray-900">₹{getTaxAmount().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-medium">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">₹{getFinalAmount().toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Checkout</h3>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name *</label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone *</label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Car Number</label>
                    <input
                      type="text"
                      value={customerInfo.carNumber}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, carNumber: e.target.value }))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Seat Number</label>
                    <input
                      type="text"
                      value={customerInfo.seatNumber}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, seatNumber: e.target.value }))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Special Instructions</label>
                  <textarea
                    value={customerInfo.specialInstructions}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, specialInstructions: e.target.value }))}
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between text-lg font-medium">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">₹{getFinalAmount().toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartMenu;

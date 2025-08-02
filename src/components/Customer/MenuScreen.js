import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  X,
  MapPin,
  Clock,
  Users
} from 'lucide-react';
import InvalidTable from './InvalidTable';

const MenuScreen = () => {
  const [searchParams] = useSearchParams();
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [tableInfo, setTableInfo] = useState(null);

  // Get table info from URL parameters (QR code data)
  useEffect(() => {
    const table = searchParams.get('table');
    const restaurantId = searchParams.get('restaurantId');
    
    if (table && restaurantId) {
      setTableInfo({
        table: table,
        restaurantId: restaurantId,
        restaurantName: 'Demo Restaurant',
        area: 'Main Hall'
      });
    }
  }, [searchParams]);

  // Mock menu data
  const menuItems = [
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Fresh mozzarella, tomato sauce, basil',
      price: 12.99,
      category: 'Pizza',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Chicken Burger',
      description: 'Grilled chicken with lettuce, tomato, mayo',
      price: 9.99,
      category: 'Burgers',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Caesar Salad',
      description: 'Romaine lettuce, parmesan, croutons, caesar dressing',
      price: 8.99,
      category: 'Salads',
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Pasta Carbonara',
      description: 'Spaghetti with eggs, cheese, pancetta, black pepper',
      price: 14.99,
      category: 'Pasta',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop'
    },
    {
      id: 5,
      name: 'Chocolate Cake',
      description: 'Rich chocolate cake with ganache',
      price: 6.99,
      category: 'Desserts',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop'
    },
    {
      id: 6,
      name: 'Iced Coffee',
      description: 'Cold brew with cream and sugar',
      price: 4.99,
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop'
    }
  ];

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemId);
      if (existingItem.quantity === 1) {
        return prevCart.filter(item => item.id !== itemId);
      } else {
        return prevCart.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    alert('Order placed successfully! Your order will be prepared shortly.');
    setCart([]);
    setShowCart(false);
  };

  // Show InvalidTable if no table parameters
  if (!tableInfo) {
    return <InvalidTable />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {tableInfo ? tableInfo.restaurantName : 'Restaurant Menu'}
              </h1>
              {tableInfo && (
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>Table {tableInfo.table}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>{tableInfo.area}</span>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowCart(true)}
              className="relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-gray-900">${item.price}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Your Order</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">${item.price} x {item.quantity}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total:</span>
                      <span className="text-lg font-bold">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 mt-4"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuScreen; 
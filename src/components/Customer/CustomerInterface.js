import React, { useState } from 'react';
import { 
  QrCode, 
  ArrowLeft, 
  ShoppingCart,
  MapPin,
  Clock,
  Star,
  AlertCircle
} from 'lucide-react';
import QRScanner from './QRScanner';
import CartMenu from './CartMenu';

const CustomerInterface = () => {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'scanner', 'menu'
  const [scannedQRCode, setScannedQRCode] = useState(null);

  const handleQRScan = (qrCode) => {
    setScannedQRCode(qrCode);
    setCurrentView('menu');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setScannedQRCode(null);
  };

  const handleBackToScanner = () => {
    setCurrentView('scanner');
  };

  if (currentView === 'scanner') {
    return <QRScanner onScanSuccess={handleQRScan} onBack={handleBackToHome} />;
  }

  if (currentView === 'menu' && scannedQRCode) {
    return <CartMenu qrCode={scannedQRCode} onBack={handleBackToScanner} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order from your table</h1>
              <p className="mt-1 text-sm text-gray-500">Scan the QR code to open the menu and place your order</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">No login required</p>
                <p className="text-xs text-gray-400">Quick & easy ordering</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content */}
        <div className="text-center">
          <div className="mb-8">
            <div className="mx-auto w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <QrCode className="h-16 w-16 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Order?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Scan the QR code on your table or at the food cart to view the menu, 
              browse items, and place your order instantly.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <QrCode className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quick Scan</h3>
              <p className="text-sm text-gray-500">
                Simply scan the QR code to instantly access the cart's menu
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Easy Ordering</h3>
              <p className="text-sm text-gray-500">
                Browse menu, add items to cart, and checkout in minutes
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Real-time Updates</h3>
              <p className="text-sm text-gray-500">
                Track your order status and get notified when it's ready
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => setCurrentView('scanner')}
              className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-lg"
            >
              <QrCode className="h-5 w-5 mr-2" />
              Scan QR Code
            </button>
            
            <div className="text-sm text-gray-500">
              Don't have a QR code? Ask the staff for assistance
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-orange-600">1</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Scan QR Code</h4>
              <p className="text-sm text-gray-500">
                Point your camera at the QR code on your table or at the cart
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-orange-600">2</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Browse Menu</h4>
              <p className="text-sm text-gray-500">
                View the cart's menu, prices, and item descriptions
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-orange-600">3</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Add to Cart</h4>
              <p className="text-sm text-gray-500">
                Select items, specify quantities, and add special instructions
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-orange-600">4</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Place Order</h4>
              <p className="text-sm text-gray-500">
                Enter your details, pay securely, and track your order
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              Why Use QR Ordering?
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                No need to download apps or create accounts
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Contactless ordering for safety
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Faster service and reduced wait times
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Easy to customize orders and add special requests
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 text-blue-500 mr-2" />
              Perfect for Events
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Weddings and parties
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Corporate events and conferences
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Food festivals and markets
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Street food vendors and food trucks
              </li>
            </ul>
          </div>
        </div>

        {/* Support */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-lg p-6">
            <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Need Help?</h4>
            <p className="text-sm text-gray-500 mb-4">
              If you're having trouble scanning the QR code or placing an order, 
              please ask the staff for assistance.
            </p>
            <button
              onClick={() => setCurrentView('scanner')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Try Scanning Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInterface;

import React from 'react';
import { QrCode, AlertTriangle } from 'lucide-react';

const InvalidTable = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Table</h1>
          <p className="text-gray-600 mb-6">Please scan the QR code at your table.</p>
          
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <QrCode className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-sm text-gray-600">
              Look for the QR code on your table or ask a staff member for assistance.
            </p>
          </div>
          
          <div className="text-xs text-gray-500">
            <p>Demo QR Code URLs:</p>
            <div className="mt-2 space-y-1 text-left">
              <p>• <code className="bg-gray-200 px-1 rounded">/customer?table=1&restaurantId=abc123</code></p>
              <p>• <code className="bg-gray-200 px-1 rounded">/customer?table=VIP001&restaurantId=abc123</code></p>
              <p>• <code className="bg-gray-200 px-1 rounded">/customer?table=T002&restaurantId=abc123</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvalidTable; 
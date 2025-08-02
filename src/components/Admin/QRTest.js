import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRTest = () => {
  const testUrl = 'https://restaurant.com/order?table=T001&restaurantId=abc123';
  
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">QR Code Test</h2>
      <div className="bg-white p-4 rounded-lg border">
        <QRCodeSVG 
          value={testUrl}
          size={200}
          level="M"
          includeMargin={true}
        />
        <p className="mt-2 text-sm text-gray-600">{testUrl}</p>
      </div>
    </div>
  );
};

export default QRTest; 
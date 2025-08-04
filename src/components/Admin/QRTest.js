import React, { useState } from 'react';
import QRCode from 'qrcode';

const QRTest = () => {
  const [qrDataURL, setQrDataURL] = useState('');
  const [testURL, setTestURL] = useState('http://localhost:3001/menu?table=T1&restaurantId=1');

  const generateTestQR = async () => {
    try {
      const canvas = document.createElement('canvas');
      await QRCode.toCanvas(canvas, testURL, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      const dataURL = canvas.toDataURL();
      setQrDataURL(dataURL);
    } catch (error) {
      console.error('QR generation error:', error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">QR Code Test</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Test URL:</label>
        <input
          type="text"
          value={testURL}
          onChange={(e) => setTestURL(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <button
        onClick={generateTestQR}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        Generate Test QR Code
      </button>
      
      {qrDataURL && (
        <div className="text-center">
          <h3 className="font-bold mb-2">Generated QR Code:</h3>
          <img src={qrDataURL} alt="Test QR Code" className="mx-auto border" />
          <p className="text-sm text-gray-600 mt-2">
            Scan this QR code with your phone camera to test
          </p>
        </div>
      )}
    </div>
  );
};

export default QRTest; 
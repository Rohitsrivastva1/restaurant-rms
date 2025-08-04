import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = ({ value, size = 200, tableName = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }, function (error) {
        if (error) {
          console.error('QR Code generation error:', error);
        }
      });
    }
  }, [value, size]);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
        <canvas ref={canvasRef} />
      </div>
      {tableName && (
        <p className="text-sm text-gray-600 mt-2 text-center">{tableName}</p>
      )}
    </div>
  );
};

export default QRCodeGenerator; 
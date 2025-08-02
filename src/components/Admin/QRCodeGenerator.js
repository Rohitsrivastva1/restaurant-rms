import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeGenerator = ({ value, size = 200, tableName = '' }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
        <QRCodeSVG 
          value={value}
          size={size}
          level="M"
          includeMargin={true}
        />
      </div>
      {tableName && (
        <p className="text-sm text-gray-600 mt-2 text-center">{tableName}</p>
      )}
    </div>
  );
};

export default QRCodeGenerator; 
import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  Camera, 
  AlertCircle, 
  CheckCircle,
  ArrowLeft,
  Flashlight,
  FlashlightOff
} from 'lucide-react';

const QRScanner = ({ onScanSuccess, onBack }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCameraPermission();
  }, []);

  const getCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment' // Use back camera
        } 
      });
      setHasPermission(true);
      setError(null);
      
      // Stop the stream as we'll handle it in the video element
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      console.error('Camera permission error:', err);
      setHasPermission(false);
      setError('Camera access denied. Please allow camera access to scan QR codes.');
    }
  };

  const handleScan = (result) => {
    if (result && !scanned) {
      setScanned(true);
      onScanSuccess(result);
    }
  };

  const handleError = (err) => {
    console.error('QR Scanner error:', err);
    setError('Failed to scan QR code. Please try again.');
  };

  const toggleFlash = () => {
    setFlashOn(!flashOn);
    // Flash toggle would be implemented with camera controls
  };

  if (hasPermission === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Requesting camera permission...</p>
        </div>
      </div>
    );
  }

  if (hasPermission === false) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Camera Access Required</h3>
          <p className="text-sm text-gray-500 mb-6">
            {error || 'Please allow camera access to scan QR codes and access the cart menu.'}
          </p>
          <div className="space-y-3">
            <button
              onClick={getCameraPermission}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
            >
              <Camera className="h-4 w-4 mr-2" />
              Grant Camera Access
            </button>
            <button
              onClick={onBack}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black bg-opacity-50 text-white p-4">
        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-medium">Scan QR Code</h1>
          <button
            onClick={toggleFlash}
            className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
          >
            {flashOn ? <FlashlightOff className="h-6 w-6" /> : <Flashlight className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Camera View */}
      <div className="relative w-full h-screen">
        {/* This would be replaced with actual QR scanner implementation */}
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
          <div className="text-center text-white">
            <QrCode className="mx-auto h-32 w-32 text-gray-400 mb-4" />
            <p className="text-lg">QR Scanner Placeholder</p>
            <p className="text-sm text-gray-400 mt-2">
              Point your camera at the cart's QR code
            </p>
          </div>
        </div>

        {/* Scanning Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top overlay */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-black bg-opacity-50"></div>
          
          {/* Bottom overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-black bg-opacity-50"></div>
          
          {/* Left overlay */}
          <div className="absolute top-32 bottom-32 left-0 w-16 bg-black bg-opacity-50"></div>
          
          {/* Right overlay */}
          <div className="absolute top-32 bottom-32 right-0 w-16 bg-black bg-opacity-50"></div>
          
          {/* Scanning frame */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white rounded-lg">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-orange-500 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-orange-500 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-orange-500 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-orange-500 rounded-br-lg"></div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black bg-opacity-50 text-white p-4">
        <div className="text-center">
          <p className="text-sm">Position the QR code within the frame above</p>
          <p className="text-xs text-gray-300 mt-1">
            The code will be scanned automatically
          </p>
        </div>
      </div>

      {/* Manual QR Code Entry */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={() => {
            const qrCode = prompt('Enter QR code manually:');
            if (qrCode) {
              handleScan(qrCode);
            }
          }}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700"
        >
          Enter QR Code Manually
        </button>
      </div>
    </div>
  );
};

export default QRScanner;

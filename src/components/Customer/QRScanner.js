import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  Flashlight,
  FlashlightOff,
} from 'lucide-react';

const QRScanner = ({ onScanSuccess, onBack }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scannedRef = useRef(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [flashOn, setFlashOn] = useState(false);
  const [error, setError] = useState(null);
  const [manual, setManual] = useState('');
  const onScanRef = useRef(onScanSuccess);
  onScanRef.current = onScanSuccess;

  useEffect(() => {
    let stopped = false;
    let timer;

    const stopStream = () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };

    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
        });
        if (stopped) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setHasPermission(true);
        setError(null);

        if ('BarcodeDetector' in window) {
          const detector = new window.BarcodeDetector({ formats: ['qr_code'] });
          const tick = async () => {
            if (stopped || scannedRef.current || !videoRef.current) return;
            try {
              const codes = await detector.detect(videoRef.current);
              const value = codes[0]?.rawValue;
              if (value) {
                scannedRef.current = true;
                onScanRef.current(value);
                return;
              }
            } catch (scanError) {
              console.error('QR scan error:', scanError);
            }
            timer = window.setTimeout(tick, 300);
          };
          timer = window.setTimeout(tick, 300);
        }
      } catch (err) {
        console.error('Camera permission error:', err);
        setHasPermission(false);
        setError('Camera access denied. Allow camera access to scan a table QR code, or enter the code below.');
      }
    };

    start();
    return () => {
      stopped = true;
      window.clearTimeout(timer);
      stopStream();
    };
  }, []);

  const toggleFlash = async () => {
    const track = streamRef.current?.getVideoTracks?.()[0];
    const capabilities = track?.getCapabilities?.();
    if (!track || !capabilities?.torch) return;
    const next = !flashOn;
    await track.applyConstraints({ advanced: [{ torch: next }] });
    setFlashOn(next);
  };

  const submitManual = (event) => {
    event.preventDefault();
    const value = manual.trim();
    if (!value || scannedRef.current) return;
    scannedRef.current = true;
    onScanRef.current(value);
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">Camera access required</h3>
          <p className="text-sm text-gray-500 mb-6">{error}</p>
          <form onSubmit={submitManual} className="space-y-3">
            <input
              value={manual}
              onChange={(event) => setManual(event.target.value)}
              placeholder="Paste the table link or code"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <button
              type="submit"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
            >
              Open menu
            </button>
            <button
              type="button"
              onClick={onBack}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go back
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      <div className="absolute top-0 left-0 right-0 z-10 bg-black bg-opacity-50 text-white p-4">
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
            aria-label="Go back"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-medium">Scan QR code</h1>
          <button
            type="button"
            onClick={toggleFlash}
            className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
            aria-label="Toggle flashlight"
          >
            {flashOn ? <FlashlightOff className="h-6 w-6" /> : <Flashlight className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className="relative w-full h-screen">
        <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-32 bg-black bg-opacity-50"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-black bg-opacity-50"></div>
          <div className="absolute top-32 bottom-32 left-0 w-16 bg-black bg-opacity-50"></div>
          <div className="absolute top-32 bottom-32 right-0 w-16 bg-black bg-opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white rounded-lg">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-orange-500 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-orange-500 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-orange-500 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-orange-500 rounded-br-lg"></div>
          </div>
        </div>
      </div>

      <form onSubmit={submitManual} className="absolute bottom-24 left-0 right-0 z-10 px-4 flex gap-2">
        <input
          value={manual}
          onChange={(event) => setManual(event.target.value)}
          placeholder="Or paste the table link"
          className="flex-1 px-3 py-2 rounded-lg text-sm"
          aria-label="Table link"
        />
        <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">
          Open
        </button>
      </form>

      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black bg-opacity-50 text-white p-4">
        <div className="text-center">
          <p className="text-sm">Hold the table QR code inside the frame</p>
          <p className="text-xs text-gray-300 mt-1">
            {('BarcodeDetector' in window) ? 'It scans automatically.' : 'This browser can’t scan automatically. Paste the table link above.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;

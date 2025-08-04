import React, { useState, useEffect } from 'react';
import { MapPin, AlertCircle, CheckCircle } from 'lucide-react';

const GeofenceCheck = ({ geofenceData, onLocationCheck }) => {
  const [location, setLocation] = useState(null);
  const [isWithinGeofence, setIsWithinGeofence] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkLocation();
  }, [geofenceData]);

  const checkLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        setLocation({ lat: userLat, lng: userLng });
        
        // Calculate distance from restaurant
        const distance = calculateDistance(
          userLat,
          userLng,
          geofenceData.latitude,
          geofenceData.longitude
        );
        
        const withinRange = distance <= geofenceData.radius;
        setIsWithinGeofence(withinRange);
        
        if (onLocationCheck) {
          onLocationCheck(withinRange, distance);
        }
        
        setLoading(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setError('Unable to get your location. Please enable location services.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-blue-600">Checking location...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
        <span className="text-yellow-800">{error}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center p-4 rounded-lg ${
      isWithinGeofence 
        ? 'bg-green-50 border border-green-200' 
        : 'bg-red-50 border border-red-200'
    }`}>
      {isWithinGeofence ? (
        <>
          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
          <div>
            <span className="text-green-800 font-medium">You're at the restaurant!</span>
            <p className="text-green-600 text-sm">
              Distance: {Math.round(calculateDistance(
                location.lat,
                location.lng,
                geofenceData.latitude,
                geofenceData.longitude
              ))}m from restaurant
            </p>
          </div>
        </>
      ) : (
        <>
          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          <div>
            <span className="text-red-800 font-medium">You're not at the restaurant</span>
            <p className="text-red-600 text-sm">
              Please visit the restaurant to access the menu
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default GeofenceCheck; 
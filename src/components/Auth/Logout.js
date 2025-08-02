import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, CheckCircle } from 'lucide-react';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    
    // Show logout message briefly before redirecting
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mx-auto h-16 w-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Successfully Logged Out</h2>
          <p className="text-gray-600 mb-6">You have been logged out of your account.</p>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <LogOut className="h-4 w-4" />
            <span>Redirecting to login page...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout; 
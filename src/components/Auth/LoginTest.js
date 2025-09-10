import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const LoginTest = () => {
  const { user, token, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Login Test</h2>
        
        <div className="space-y-4">
          <div>
            <strong>User:</strong>
            <pre className="bg-gray-100 p-2 rounded text-sm">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
          
          <div>
            <strong>Token:</strong>
            <pre className="bg-gray-100 p-2 rounded text-sm break-all">
              {token ? token.substring(0, 50) + '...' : 'null'}
            </pre>
          </div>
          
          <div>
            <strong>Is Authenticated:</strong>
            <span className={`ml-2 px-2 py-1 rounded text-sm ${
              isAuthenticated() ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isAuthenticated() ? 'Yes' : 'No'}
            </span>
          </div>
          
          <div>
            <strong>User Role:</strong>
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
              {user?.role || 'No role'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTest;


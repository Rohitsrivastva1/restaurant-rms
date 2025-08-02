import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  User, 
  Lock, 
  Building2, 
  ChefHat, 
  Users,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin' // admin, chef, manager
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication logic
      const mockUsers = {
        admin: {
          email: 'admin@spicegarden.com',
          password: 'admin123',
          role: 'admin',
          name: 'Restaurant Owner',
          redirect: '/admin'
        },
        chef: {
          email: 'chef@spicegarden.com',
          password: 'chef123',
          role: 'chef',
          name: 'Kitchen Staff',
          redirect: '/chef'
        },
        manager: {
          email: 'manager@spicegarden.com',
          password: 'manager123',
          role: 'manager',
          name: 'Restaurant Manager',
          redirect: '/admin'
        }
      };

      const user = mockUsers[formData.role];
      
      if (formData.email === user.email && formData.password === user.password) {
        setSuccess(`Welcome back, ${user.name}!`);
        
        // Store user data in localStorage (in real app, store JWT token)
        localStorage.setItem('user', JSON.stringify({
          email: user.email,
          role: user.role,
          name: user.name
        }));
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate(user.redirect);
        }, 1000);
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    {
      value: 'admin',
      label: 'Restaurant Owner',
      icon: Building2,
      description: 'Full access to all restaurant operations'
    },
    {
      value: 'manager',
      label: 'Restaurant Manager',
      icon: Users,
      description: 'Manage staff, orders, and daily operations'
    },
    {
      value: 'chef',
      label: 'Kitchen Staff',
      icon: ChefHat,
      description: 'View and manage kitchen orders'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your restaurant management account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Your Role
              </label>
              <div className="grid grid-cols-1 gap-3">
                {roleOptions.map((role) => {
                  const Icon = role.icon;
                  return (
                    <label
                      key={role.value}
                      className={`relative flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.role === role.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={formData.role === role.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          formData.role === role.value ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`h-5 w-5 ${
                            formData.role === role.value ? 'text-blue-600' : 'text-gray-500'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{role.label}</div>
                          <div className="text-xs text-gray-500">{role.description}</div>
                        </div>
                        {formData.role === role.value && (
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-700">{success}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Demo Credentials</h4>
            <div className="space-y-2 text-xs text-gray-600">
              <div>
                <strong>Restaurant Owner:</strong> admin@spicegarden.com / admin123
              </div>
              <div>
                <strong>Restaurant Manager:</strong> manager@spicegarden.com / manager123
              </div>
              <div>
                <strong>Kitchen Staff:</strong> chef@spicegarden.com / chef123
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <button className="text-blue-600 hover:text-blue-500 font-medium">
              Contact your administrator
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 
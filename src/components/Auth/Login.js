import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  User, 
  Lock, 
  Building2,
  AlertCircle,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, user, error: authError, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // Removed useEffect redirect logic - using direct redirect instead

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
    clearError();

    try {
      // Try to login without role - let backend determine the role
      const result = await login({
        email: formData.email,
        password: formData.password
      });
      
      console.log('Login result:', result); // Debug log
      console.log('User from result:', result.user); // Debug log
      console.log('User role:', result.user?.role); // Debug log
      
      if (result.success) {
        setSuccess(`Welcome back, ${result.user.name}!`);
        
        // Direct redirect instead of relying on useEffect
        const redirectMap = {
          'admin': '/admin',
          'manager': '/admin',
          'chef': '/chef',
          'super_admin': '/superadmin',
          'cart_owner': '/cart-owner',
          'cart_worker': '/cart-worker'
        };
        
        const redirectPath = redirectMap[result.user.role] || '/admin';
        console.log('Direct redirect to:', redirectPath);
        console.log('About to navigate in 1 second...');
        
        // Use a small delay to ensure state is updated
        setTimeout(() => {
          console.log('Navigating now to:', redirectPath);
          navigate(redirectPath);
        }, 1000);
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error); // Debug log
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 hover:bg-blue-700 transition-colors">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your Servya account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

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
                <div className="flex items-center space-x-2">
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Demo Credentials</h4>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span><strong>Super Admin:</strong></span>
                <span>test@superadmin.com / admin123</span>
              </div>
              <div className="flex justify-between">
                <span><strong>Restaurant Owner:</strong></span>
                <span>admin@spicegarden.com / admin123</span>
              </div>
              <div className="flex justify-between">
                <span><strong>Restaurant Manager:</strong></span>
                <span>manager@spicegarden.com / manager123</span>
              </div>
              <div className="flex justify-between">
                <span><strong>Kitchen Staff:</strong></span>
                <span>chef@spicegarden.com / chef123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <button 
              onClick={() => navigate('/superadmin-signup')}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Create SuperAdmin Account
            </button>
          </p>
          <p className="text-sm text-gray-500">
            Want to manage your food cart?{' '}
            <button 
              onClick={() => navigate('/cart-owner-signup')}
              className="text-orange-600 hover:text-orange-500 font-medium"
            >
              Create Cart Owner Account
            </button>
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <Link to="/" className="text-gray-500 hover:text-blue-600">Home</Link>
            <Link to="/about" className="text-gray-500 hover:text-blue-600">About</Link>
            <Link to="/contact" className="text-gray-500 hover:text-blue-600">Contact</Link>
            <Link to="/login-test" className="text-gray-500 hover:text-blue-600">Login Test</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 
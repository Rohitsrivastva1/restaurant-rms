import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  X, 
  Upload, 
  MapPin, 
  Palette,
  QrCode,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { cartAPI } from '../../services/api';

const CartForm = ({ cartId, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    theme: 'modern',
    qrCode: '',
    qrData: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && cartId) {
      fetchCartData();
    } else {
      generateQRCode();
    }
  }, [cartId, isEdit]);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getOwnerCartById(cartId);
      const cart = response.data;
      setFormData({
        name: cart.name || '',
        description: cart.description || '',
        location: cart.location || '',
        theme: cart.theme || 'modern',
        qrCode: cart.qrCode || '',
        qrData: cart.qrData || ''
      });
    } catch (error) {
      console.error('Error fetching cart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateQRCode = () => {
    const qrCode = `CART_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const qrData = JSON.stringify({ cartId: cartId || 'new', timestamp: Date.now() });
    setFormData(prev => ({
      ...prev,
      qrCode,
      qrData
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Cart name is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.qrCode.trim()) {
      newErrors.qrCode = 'QR Code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isEdit) {
        await cartAPI.updateOwnerCart(cartId, formData);
      } else {
        await cartAPI.createOwnerCart(formData);
      }
      
      // Redirect to cart management or dashboard
      window.location.href = isEdit ? `/cart-owner/carts/${cartId}` : '/cart-owner/dashboard';
    } catch (error) {
      console.error('Error saving cart:', error);
      setErrors({ submit: 'Failed to save cart. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const themes = [
    { id: 'modern', name: 'Modern', description: 'Clean and contemporary design' },
    { id: 'classic', name: 'Classic', description: 'Traditional and elegant' },
    { id: 'colorful', name: 'Colorful', description: 'Bright and vibrant colors' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and clean' },
    { id: 'vintage', name: 'Vintage', description: 'Retro and nostalgic' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button
                onClick={() => window.history.back()}
                className="mr-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {isEdit ? 'Edit Cart' : 'Create New Cart'}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {isEdit ? 'Update your cart information' : 'Set up your new food cart'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Basic Information</h3>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Cart Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${
                    errors.name ? 'border-red-300' : ''
                  }`}
                  placeholder="Enter cart name (e.g., Street Food Corner)"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="Describe your cart and what you offer..."
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location *
                </label>
                <div className="mt-1 relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${
                      errors.location ? 'border-red-300' : ''
                    }`}
                    placeholder="Enter cart location (e.g., Main Street, Downtown)"
                  />
                </div>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.location}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Theme Selection */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Theme Selection</h3>
            <p className="text-sm text-gray-500 mb-6">Choose a theme for your cart's menu display</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={`relative border rounded-lg p-4 cursor-pointer transition-colors ${
                    formData.theme === theme.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, theme: theme.id }))}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Palette className={`h-5 w-5 ${
                        formData.theme === theme.id ? 'text-orange-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="ml-3">
                      <h4 className={`text-sm font-medium ${
                        formData.theme === theme.id ? 'text-orange-900' : 'text-gray-900'
                      }`}>
                        {theme.name}
                      </h4>
                      <p className={`text-xs ${
                        formData.theme === theme.id ? 'text-orange-700' : 'text-gray-500'
                      }`}>
                        {theme.description}
                      </p>
                    </div>
                  </div>
                  {formData.theme === theme.id && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="h-5 w-5 text-orange-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* QR Code Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">QR Code</h3>
            <p className="text-sm text-gray-500 mb-6">
              This QR code will be used by customers to access your cart's menu
            </p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="qrCode" className="block text-sm font-medium text-gray-700">
                  QR Code *
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <QrCode className="h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="qrCode"
                    id="qrCode"
                    value={formData.qrCode}
                    onChange={handleInputChange}
                    className={`flex-1 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${
                      errors.qrCode ? 'border-red-300' : ''
                    }`}
                    placeholder="QR Code will be generated automatically"
                  />
                  <button
                    type="button"
                    onClick={generateQRCode}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Generate
                  </button>
                </div>
                {errors.qrCode && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.qrCode}
                  </p>
                )}
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <QrCode className="h-16 w-16 text-gray-400" />
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">
                  QR Code preview will appear here
                </p>
              </div>
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm text-red-800">{errors.submit}</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {isEdit ? 'Update Cart' : 'Create Cart'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CartForm;

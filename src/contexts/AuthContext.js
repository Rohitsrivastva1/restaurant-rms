import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, apiUtils } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  // Only true during first localStorage hydrate — never during login/signup
  // (toggling it unmounts <Router> and cancels post-auth redirects).
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check for existing token on app load
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      setError('');
      
      const response = await authAPI.login(credentials);
      const { success, token: newToken, user: userData } = response.data;
      
      if (success) {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(newToken);
        setUser(userData);
        return { success: true, user: userData };
      }
      return { success: false, error: 'Login failed' };
    } catch (error) {
      const errorMessage = apiUtils.handleError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      setError('');
      
      const response = await authAPI.register(userData);
      const { token: newToken, user: newUser } = response.data;
      
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      setToken(newToken);
      setUser(newUser);
      
      return { success: true, user: newUser };
    } catch (error) {
      const errorMessage = apiUtils.handleError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const registerSuperAdmin = async (userData) => {
    try {
      setError('');
      
      const response = await authAPI.registerSuperAdmin(userData);
      const { success, token: newToken, user: newUser } = response.data;
      
      if (success) {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
        return { success: true, user: newUser };
      }
      return { success: false, error: 'Registration failed' };
    } catch (error) {
      const errorMessage = apiUtils.handleError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const registerCartOwner = async (userData) => {
    try {
      setError('');
      
      const response = await authAPI.registerCartOwner(userData);
      const { success, token: newToken, user: newUser } = response.data;
      
      if (success) {
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
        return { success: true, user: newUser };
      }
      return { success: false, error: 'Registration failed' };
    } catch (error) {
      const errorMessage = apiUtils.handleError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const registerRestaurant = async (restaurantData) => {
    try {
      setError('');
      
      const response = await authAPI.registerRestaurant(restaurantData);
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = apiUtils.handleError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      // Call logout API if token exists
      if (token) {
        await authAPI.logout();
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear local storage and state regardless of API call result
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      setError('');
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const clearError = () => {
    setError('');
  };

  const isAuthenticated = () => {
    const authenticated = !!token && !!user;
    console.log('isAuthenticated check:', { token: !!token, user: !!user, authenticated }); // Debug log
    return authenticated;
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    registerSuperAdmin,
    registerCartOwner,
    registerRestaurant,
    logout,
    updateUser,
    clearError,
    isAuthenticated,
    hasRole,
    hasAnyRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 
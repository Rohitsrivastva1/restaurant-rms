import axios from 'axios';
import { API_BASE } from './apiBase';

/**
 * Auth + cart helpers used by Servya live paths.
 * Legacy Admin/Chef/SuperAdmin modules still import menu/orders stubs below —
 * those routes are not on the RMS API; prefer CartOwner/CartWorker + apiUrl().
 */
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  registerSuperAdmin: (userData) => api.post('/auth/register-superadmin', userData),
  registerCartOwner: (userData) => api.post('/auth/register-cart-owner', userData),
  registerRestaurant: (restaurantData) => api.post('/auth/register-restaurant', restaurantData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
};

// User API calls
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  changePassword: (data) => api.put('/users/change-password', data),
  getAllUsers: () => api.get('/users'),
  createUser: (data) => api.post('/users', data),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

// Restaurant API calls
export const restaurantAPI = {
  getAll: () => api.get('/restaurants'),
  getById: (id) => api.get(`/restaurants/${id}`),
  create: (data) => api.post('/restaurants', data),
  update: (id, data) => api.put(`/restaurants/${id}`, data),
  delete: (id) => api.delete(`/restaurants/${id}`),
  getStats: () => api.get('/restaurants/stats'),
  updateStatus: (id, status) => api.patch(`/restaurants/${id}/status`, { status }),
};

// Menu API calls
export const menuAPI = {
  getAll: (restaurantId) => api.get(`/menu?restaurantId=${restaurantId}`),
  getById: (id) => api.get(`/menu/${id}`),
  create: (data) => api.post('/menu', data),
  update: (id, data) => api.put(`/menu/${id}`, data),
  delete: (id) => api.delete(`/menu/${id}`),
  updateAvailability: (id, available) => api.patch(`/menu/${id}/availability`, { available }),
  getCategories: () => api.get('/menu/categories'),
};

// Order API calls
export const orderAPI = {
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  update: (id, data) => api.put(`/orders/${id}`, data),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  delete: (id) => api.delete(`/orders/${id}`),
  getStats: () => api.get('/orders/stats'),
  getByTable: (tableNumber) => api.get(`/orders/table/${tableNumber}`),
  assignChef: (orderId, chefId) => api.patch(`/orders/${orderId}/assign-chef`, { chefId }),
};

// Table API calls
export const tableAPI = {
  getAll: (restaurantId) => api.get(`/tables?restaurantId=${restaurantId}`),
  getById: (id) => api.get(`/tables/${id}`),
  create: (data) => api.post('/tables', data),
  update: (id, data) => api.put(`/tables/${id}`, data),
  delete: (id) => api.delete(`/tables/${id}`),
  updateStatus: (id, status) => api.patch(`/tables/${id}/status`, { status }),
  generateQR: (id) => api.get(`/tables/${id}/qr-code`),
  getQRCode: (tableNumber) => api.get(`/tables/qr/${tableNumber}`),
};

// Payment API calls
export const paymentAPI = {
  getAll: (params) => api.get('/payments', { params }),
  getById: (id) => api.get(`/payments/${id}`),
  create: (data) => api.post('/payments', data),
  update: (id, data) => api.put(`/payments/${id}`, data),
  delete: (id) => api.delete(`/payments/${id}`),
  getStats: () => api.get('/payments/stats'),
  processPayment: (orderId, paymentData) => api.post(`/payments/process/${orderId}`, paymentData),
};

// Feedback API calls
export const feedbackAPI = {
  getAll: (params) => api.get('/feedback', { params }),
  getById: (id) => api.get(`/feedback/${id}`),
  create: (data) => api.post('/feedback', data),
  update: (id, data) => api.put(`/feedback/${id}`, data),
  delete: (id) => api.delete(`/feedback/${id}`),
  updateStatus: (id, status) => api.patch(`/feedback/${id}/status`, { status }),
  getStats: () => api.get('/feedback/stats'),
};

// Notification API calls
export const notificationAPI = {
  getAll: (params) => api.get('/notifications', { params }),
  getById: (id) => api.get(`/notifications/${id}`),
  create: (data) => api.post('/notifications', data),
  update: (id, data) => api.put(`/notifications/${id}`, data),
  delete: (id) => api.delete(`/notifications/${id}`),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch('/notifications/mark-all-read'),
  getUnreadCount: () => api.get('/notifications/unread-count'),
};

// SuperAdmin API calls
export const superAdminAPI = {
  getDashboard: () => api.get('/superadmin/dashboard'),
  getPlatformStats: () => api.get('/superadmin/platform-stats'),
  getUsers: (params) => api.get('/superadmin/users', { params }),
  createUser: (userData) => api.post('/superadmin/users', userData),
  updateUser: (id, userData) => api.put(`/superadmin/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/superadmin/users/${id}`),
  getAvailableRestaurants: () => api.get('/superadmin/restaurants/available'),
  getRestaurants: (params) => api.get('/superadmin/restaurants', { params }),
  createRestaurant: (restaurantData) => api.post('/superadmin/restaurants', restaurantData),
  approveRestaurant: (id) => api.put(`/superadmin/restaurants/${id}/approve`),
  suspendRestaurant: (id) => api.put(`/superadmin/restaurants/${id}/suspend`),
  getRevenueReport: (params) => api.get('/superadmin/reports/revenue', { params }),
  getRestaurantReport: (params) => api.get('/superadmin/reports/restaurants', { params }),
  getSettings: () => api.get('/superadmin/settings'),
  updateSettings: (settings) => api.put('/superadmin/settings', settings),
  // Cart Management
  getCarts: (params) => api.get('/cart/admin/carts', { params }),
  getCartById: (id) => api.get(`/cart/admin/carts/${id}`),
  createCart: (cartData) => api.post('/cart/admin/carts', cartData),
  updateCart: (id, cartData) => api.put(`/cart/admin/carts/${id}`, cartData),
  approveCart: (id) => api.put(`/cart/admin/carts/${id}/approve`),
  suspendCart: (id) => api.put(`/cart/admin/carts/${id}/suspend`),
};

// Restaurant Users API calls (for restaurant owners/managers)
export const restaurantUsersAPI = {
  getStaff: (params) => api.get('/restaurant-users/staff', { params }),
  createStaff: (staffData) => api.post('/restaurant-users/staff', staffData),
  updateStaff: (id, staffData) => api.put(`/restaurant-users/staff/${id}`, staffData),
  deleteStaff: (id) => api.delete(`/restaurant-users/staff/${id}`),
};

// Staff Management API calls
export const staffAPI = {
  getAll: (params) => api.get('/staff', { params }),
  getById: (id) => api.get(`/staff/${id}`),
  create: (data) => api.post('/staff', data),
  update: (id, data) => api.put(`/staff/${id}`, data),
  delete: (id) => api.delete(`/staff/${id}`),
  getByRestaurant: (restaurantId) => api.get(`/staff/restaurant/${restaurantId}`),
  getStats: (params) => api.get('/staff/stats', { params }),
  getRoleOptions: () => api.get('/staff/roles/options'),
};

// Cart Management API calls
export const cartAPI = {
  // Public APIs (no authentication required)
  getCartByQR: (qrCode) => api.get(`/cart/public/qr/${qrCode}`),
  createOrder: (orderData) => api.post('/cart/public/orders', orderData),
  getOrderStatus: (orderNumber) => api.get(`/cart/public/orders/${orderNumber}/status`),
  
  // Cart Owner APIs
  getOwnerCarts: (params) => api.get('/cart/owner/carts', { params }),
  getOwnerCartById: (id) => api.get(`/cart/owner/carts/${id}`),
  createOwnerCart: (cartData) => api.post('/cart/owner/carts', cartData),
  updateOwnerCart: (id, cartData) => api.put(`/cart/owner/carts/${id}`, cartData),
  createMenuCategory: (cartId, categoryData) => api.post(`/cart/owner/carts/${cartId}/categories`, categoryData),
  createMenuItem: (cartId, itemData) => api.post(`/cart/owner/carts/${cartId}/menu-items`, itemData),
  addWorker: (cartId, workerData) => api.post(`/cart/owner/carts/${cartId}/workers`, workerData),
  removeWorker: (cartId, userId) => api.delete(`/cart/owner/carts/${cartId}/workers/${userId}`),
  getCartAnalytics: (cartId, params) => api.get(`/cart/owner/carts/${cartId}/analytics`, { params }),
  
  // Cart Worker APIs
  getWorkerCarts: (params) => api.get('/cart/worker/carts', { params }),
  getCartOrders: (cartId) => api.get(`/cart/worker/carts/${cartId}/orders`),
  updateOrderStatus: (orderId, statusData) => api.put(`/cart/worker/orders/${orderId}/status`, statusData),
};

// Utility functions
export const apiUtils = {
  handleError: (error) => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.message) {
      return error.message;
    }
    return 'An unexpected error occurred';
  },
  
  formatResponse: (response) => {
    return response.data;
  },
};

export default api; 
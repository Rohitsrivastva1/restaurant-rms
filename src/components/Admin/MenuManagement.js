import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter
} from 'lucide-react';
import { menuAPI, apiUtils } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import ImageWithFallback from './ImageWithFallback';

const MenuManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    veg: false,
    available: true,
    spicyLevel: 1
  });

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        setError('');

        const [menuResponse, categoriesResponse] = await Promise.all([
          menuAPI.getAll(user?.restaurantId),
          menuAPI.getCategories()
        ]);

        console.log('Menu response:', menuResponse.data);
        console.log('Categories response:', categoriesResponse.data);
        setMenuItems(menuResponse.data?.items || []);
        const categoryOptions = categoriesResponse.data?.categories || [];
        // Store both value and label for categories
        setCategories(['All', ...categoryOptions.map(cat => ({ value: cat.value, label: cat.label }))]);
      } catch (error) {
        setError(apiUtils.handleError(error));
      } finally {
        setLoading(false);
      }
    };

    if (user?.restaurantId) {
      fetchMenuData();
    }
  }, [user]);

  const handleAddItem = async (itemData) => {
    try {
      setLoading(true);
      const response = await menuAPI.create({
        ...itemData,
        restaurantId: user.restaurantId
      });
      
      setMenuItems(prev => [...prev, response.data]);
      setShowAddModal(false);
    } catch (error) {
      setError(apiUtils.handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async (id, itemData) => {
    try {
      setLoading(true);
      const response = await menuAPI.update(id, itemData);
      
      setMenuItems(prev => prev.map(item => 
        item.id === id ? response.data : item
      ));
      setEditingItem(null);
    } catch (error) {
      setError(apiUtils.handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      setLoading(true);
      await menuAPI.delete(id);
      
      setMenuItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      setError(apiUtils.handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async (id, available) => {
    try {
      setLoading(true);
      await menuAPI.updateAvailability(id, available);
      
      setMenuItems(prev => prev.map(item => 
        item.id === id ? { ...item, available } : item
      ));
    } catch (error) {
      setError(apiUtils.handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const itemData = {
        ...formData,
        price: parseFloat(formData.price),
        spicyLevel: parseInt(formData.spicyLevel),
        restaurantId: user.restaurantId
      };

      console.log('Submitting menu item data:', itemData);

      if (editingItem) {
        await handleUpdateItem(editingItem.id, itemData);
      } else {
        await handleAddItem(itemData);
      }

      // Reset form
      setFormData({
        name: '',
        category: '',
        price: '',
        description: '',
        veg: false,
        available: true,
        spicyLevel: 1
      });
      setShowAddModal(false);
      setEditingItem(null);
    } catch (error) {
      setError(apiUtils.handleError(error));
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      description: '',
      veg: false,
      available: true,
      spicyLevel: 1
    });
    setEditingItem(null);
    setShowAddModal(true);
  };

  const openEditModal = (item) => {
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      description: item.description,
      veg: item.veg,
      available: item.available,
      spicyLevel: item.spicyLevel
    });
    setEditingItem(item);
    setShowAddModal(true);
  };

  const getSpicyLevel = (level) => {
    return '🌶️'.repeat(level);
  };

  const getVegBadge = (veg) => {
    return veg ? 
      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Veg</span> :
      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Non-Veg</span>;
  };

  const filteredItems = Array.isArray(menuItems) ? menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }) : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600">Manage your restaurant menu items</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Menu Item</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative">
                             <ImageWithFallback 
                 src={item.image} 
                 alt={item.name}
                 className="w-full h-48 object-cover"
               />
              <div className="absolute top-2 right-2 flex space-x-1">
                {getVegBadge(item.veg)}
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                  {getSpicyLevel(item.spicyLevel)}
                </span>
              </div>
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <span className="text-lg font-bold text-blue-600">₹{item.price}</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {item.category}
                </span>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => openEditModal(item)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
            </h3>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter item name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.slice(1).map(category => (
                    <option key={category.value} value={category.value}>{category.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Enter description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Spicy Level
                </label>
                <select
                  name="spicyLevel"
                  value={formData.spicyLevel}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>No Spice</option>
                  <option value={1}>Mild</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Hot</option>
                  <option value={4}>Very Hot</option>
                  <option value={5}>Extreme</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="veg"
                    checked={formData.veg}
                    onChange={handleInputChange}
                    className="mr-2" 
                  />
                  <span className="text-sm text-gray-700">Vegetarian</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                    className="mr-2" 
                  />
                  <span className="text-sm text-gray-700">Available</span>
                </label>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingItem(null);
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : (editingItem ? 'Update' : 'Add') + ' Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement; 
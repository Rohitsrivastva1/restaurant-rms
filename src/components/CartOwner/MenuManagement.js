import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Upload, 
  Download,
  Search,
  Filter,
  ChefHat,
  Tag,
  DollarSign,
  Clock,
  Star,
  Image as ImageIcon,
  Save,
  X
} from 'lucide-react';

const MenuManagement = () => {
  const { cartId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('items'); // 'items' or 'categories'
  
  // Category Management States
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    sortOrder: 0,
    isActive: true
  });

  // Menu Item Management States
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemForm, setItemForm] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    imageUrl: '',
    isAvailable: true,
    isVegetarian: false,
    isSpicy: false,
    preparationTime: '',
    sortOrder: 0
  });

  useEffect(() => {
    if (cartId) {
      fetchCategories();
      fetchMenuItems();
    }
  }, [cartId]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/cart/owner/carts/${cartId}/categories`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      } else {
        setError('Failed to fetch categories');
      }
    } catch (error) {
      setError('Error fetching categories');
      console.error('Error:', error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/cart/owner/carts/${cartId}/menu-items`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setMenuItems(data.menuItems || []);
      } else {
        setError('Failed to fetch menu items');
      }
    } catch (error) {
      setError('Error fetching menu items');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingCategory 
        ? `http://localhost:3000/cart/owner/carts/${cartId}/categories/${editingCategory.id}`
        : `http://localhost:3000/cart/owner/carts/${cartId}/categories`;
      
      const method = editingCategory ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryForm)
      });

      if (response.ok) {
        const newCategory = await response.json();
        if (editingCategory) {
          setCategories(prev => prev.map(cat => 
            cat.id === editingCategory.id ? newCategory : cat
          ));
        } else {
          setCategories(prev => [newCategory, ...prev]);
        }
        setShowCategoryModal(false);
        setEditingCategory(null);
        setCategoryForm({ name: '', description: '', sortOrder: 0, isActive: true });
      } else {
        setError('Failed to save category');
      }
    } catch (error) {
      setError('Error saving category');
      console.error('Error:', error);
    }
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingItem 
        ? `http://localhost:3000/cart/owner/carts/${cartId}/menu-items/${editingItem.id}`
        : `http://localhost:3000/cart/owner/carts/${cartId}/menu-items`;
      
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...itemForm,
          price: parseFloat(itemForm.price),
          preparationTime: parseInt(itemForm.preparationTime) || 0,
          sortOrder: parseInt(itemForm.sortOrder) || 0
        })
      });

      if (response.ok) {
        const newItem = await response.json();
        if (editingItem) {
          setMenuItems(prev => prev.map(item => 
            item.id === editingItem.id ? newItem : item
          ));
        } else {
          setMenuItems(prev => [newItem, ...prev]);
        }
        setShowItemModal(false);
        setEditingItem(null);
        setItemForm({
          name: '', description: '', price: '', categoryId: '',
          imageUrl: '', isAvailable: true, isVegetarian: false,
          isSpicy: false, preparationTime: '', sortOrder: 0
        });
      } else {
        setError('Failed to save menu item');
      }
    } catch (error) {
      setError('Error saving menu item');
      console.error('Error:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/cart/owner/carts/${cartId}/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setCategories(prev => prev.filter(cat => cat.id !== categoryId));
      } else {
        setError('Failed to delete category');
      }
    } catch (error) {
      setError('Error deleting category');
      console.error('Error:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/cart/owner/carts/${cartId}/menu-items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setMenuItems(prev => prev.filter(item => item.id !== itemId));
      } else {
        setError('Failed to delete menu item');
      }
    } catch (error) {
      setError('Error deleting menu item');
      console.error('Error:', error);
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.categoryId === parseInt(filterCategory);
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900">Menu Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {/* TODO: Export menu */}}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button
                onClick={() => navigate(`/cart-owner/excel-upload/${cartId}`)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <Upload className="h-4 w-4" />
                <span>Import Excel</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('items')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'items'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Menu Items ({menuItems.length})
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'categories'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Categories ({categories.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                if (activeTab === 'items') {
                  setShowItemModal(true);
                } else {
                  setShowCategoryModal(true);
                }
              }}
              className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add {activeTab === 'items' ? 'Item' : 'Category'}</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Content */}
        {activeTab === 'items' ? (
          <MenuItemsList 
            items={filteredItems}
            categories={categories}
            onEdit={(item) => {
              setEditingItem(item);
              setItemForm({
                name: item.name,
                description: item.description,
                price: item.price.toString(),
                categoryId: item.categoryId?.toString() || '',
                imageUrl: item.imageUrl || '',
                isAvailable: item.isAvailable,
                isVegetarian: item.isVegetarian,
                isSpicy: item.isSpicy,
                preparationTime: item.preparationTime?.toString() || '',
                sortOrder: item.sortOrder?.toString() || '0'
              });
              setShowItemModal(true);
            }}
            onDelete={handleDeleteItem}
          />
        ) : (
          <CategoriesList 
            categories={categories}
            onEdit={(category) => {
              setEditingCategory(category);
              setCategoryForm({
                name: category.name,
                description: category.description || '',
                sortOrder: category.sortOrder || 0,
                isActive: category.isActive
              });
              setShowCategoryModal(true);
            }}
            onDelete={handleDeleteCategory}
          />
        )}

        {/* Category Modal */}
        {showCategoryModal && (
          <CategoryModal
            category={editingCategory}
            form={categoryForm}
            setForm={setCategoryForm}
            onSubmit={handleCategorySubmit}
            onClose={() => {
              setShowCategoryModal(false);
              setEditingCategory(null);
              setCategoryForm({ name: '', description: '', sortOrder: 0, isActive: true });
            }}
          />
        )}

        {/* Item Modal */}
        {showItemModal && (
          <ItemModal
            item={editingItem}
            form={itemForm}
            setForm={setItemForm}
            categories={categories}
            onSubmit={handleItemSubmit}
            onClose={() => {
              setShowItemModal(false);
              setEditingItem(null);
              setItemForm({
                name: '', description: '', price: '', categoryId: '',
                imageUrl: '', isAvailable: true, isVegetarian: false,
                isSpicy: false, preparationTime: '', sortOrder: 0
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

// Menu Items List Component
const MenuItemsList = ({ items, categories, onEdit, onDelete }) => {
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-12 text-center">
          <ChefHat className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No menu items found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding your first menu item.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Menu Items</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <div key={item.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {getCategoryName(item.categoryId)}
                  </span>
                  {!item.isAvailable && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Unavailable
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    ${item.price}
                  </span>
                  {item.preparationTime && (
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {item.preparationTime} min
                    </span>
                  )}
                  {item.isVegetarian && (
                    <span className="flex items-center text-green-600">
                      <Tag className="h-4 w-4 mr-1" />
                      Vegetarian
                    </span>
                  )}
                  {item.isSpicy && (
                    <span className="flex items-center text-red-600">
                      🌶️ Spicy
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                  title="Edit Item"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600"
                  title="Delete Item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Categories List Component
const CategoriesList = ({ categories, onEdit, onDelete }) => {
  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-12 text-center">
          <Tag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No categories found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding your first category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {categories.map((category) => (
          <div key={category.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                {category.description && (
                  <p className="mt-1 text-sm text-gray-500">{category.description}</p>
                )}
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <span>Sort Order: {category.sortOrder}</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {category.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEdit(category)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                  title="Edit Category"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(category.id)}
                  className="p-2 text-gray-400 hover:text-red-600"
                  title="Delete Category"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Category Modal Component
const CategoryModal = ({ category, form, setForm, onSubmit, onClose }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {category ? 'Edit Category' : 'Create Category'}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Category Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter category name"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter category description"
              />
            </div>
            
            <div>
              <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700">
                Sort Order
              </label>
              <input
                type="number"
                id="sortOrder"
                name="sortOrder"
                value={form.sortOrder}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="0"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={form.isActive}
                onChange={handleInputChange}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Active
              </label>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700"
              >
                {category ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Item Modal Component
const ItemModal = ({ item, form, setForm, categories, onSubmit, onClose }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {item ? 'Edit Menu Item' : 'Create Menu Item'}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Item Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter item name"
                />
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={form.price}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter item description"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="preparationTime" className="block text-sm font-medium text-gray-700">
                  Preparation Time (minutes)
                </label>
                <input
                  type="number"
                  id="preparationTime"
                  name="preparationTime"
                  value={form.preparationTime}
                  onChange={handleInputChange}
                  min="0"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="0"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAvailable"
                  name="isAvailable"
                  checked={form.isAvailable}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-900">
                  Available
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isVegetarian"
                  name="isVegetarian"
                  checked={form.isVegetarian}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="isVegetarian" className="ml-2 block text-sm text-gray-900">
                  Vegetarian
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isSpicy"
                  name="isSpicy"
                  checked={form.isSpicy}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="isSpicy" className="ml-2 block text-sm text-gray-900">
                  Spicy
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700"
              >
                {item ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MenuManagement;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import OwnerChrome from './OwnerChrome';
import VenueNav from './VenueNav';
import { apiUrl } from '../../services/apiBase';

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
      const response = await fetch(apiUrl(`/cart/owner/carts/${cartId}/categories`), {
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
      const response = await fetch(apiUrl(`/cart/owner/carts/${cartId}/menu-items`), {
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
        ? apiUrl(`/cart/owner/carts/${cartId}/categories/${editingCategory.id}`)
        : apiUrl(`/cart/owner/carts/${cartId}/categories`);
      
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
        ? apiUrl(`/cart/owner/carts/${cartId}/menu-items/${editingItem.id}`)
        : apiUrl(`/cart/owner/carts/${cartId}/menu-items`);
      
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
      const response = await fetch(apiUrl(`/cart/owner/carts/${cartId}/categories/${categoryId}`), {
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
      const response = await fetch(apiUrl(`/cart/owner/carts/${cartId}/menu-items/${itemId}`), {
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
    const haystack = `${item.name || ''} ${item.description || ''}`.toLowerCase();
    const matchesSearch = haystack.includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.categoryId === parseInt(filterCategory, 10);
    return matchesSearch && matchesCategory;
  });

  const openCreate = () => {
    if (activeTab === 'items') setShowItemModal(true);
    else setShowCategoryModal(true);
  };

  if (loading) {
    return (
      <div className="ro">
        <div className="ro-loading">Loading the menu…</div>
      </div>
    );
  }

  return (
    <OwnerChrome
      kicker="Menu"
      title="Dishes and categories."
      lead="What guests see when they order from this venue."
      nav={(
        <button className="ro-ghost" type="button" onClick={() => navigate('/restra-owner')}>
          Venues
        </button>
      )}
      actions={(
        <div className="ro-actions-row">
          <button className="ro-ghost" type="button" onClick={() => navigate(`/restra-owner/excel-upload/${cartId}`)}>
            <Upload size={16} />
            Import
          </button>
          <button className="ro-gold" type="button" onClick={openCreate}>
            <Plus size={16} />
            Add {activeTab === 'items' ? 'dish' : 'category'}
          </button>
        </div>
      )}
    >
      <VenueNav cartId={cartId} />
      <div className="ro-tabs">
        <button type="button" className={activeTab === 'items' ? 'on' : ''} onClick={() => setActiveTab('items')}>
          Dishes ({menuItems.length})
        </button>
        <button type="button" className={activeTab === 'categories' ? 'on' : ''} onClick={() => setActiveTab('categories')}>
          Categories ({categories.length})
        </button>
      </div>

      <div className="ro-bar">
        <input
          type="search"
          placeholder={activeTab === 'items' ? 'Search dishes' : 'Search categories'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search the menu"
        />
        {activeTab === 'items' && (
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} aria-label="Filter by category">
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        )}
      </div>

      {error && <p className="ro-error">{error}</p>}

      {activeTab === 'items' ? (
        <MenuItemsList
          items={filteredItems}
          categories={categories}
          onEdit={(item) => {
            setEditingItem(item);
            setItemForm({
              name: item.name,
              description: item.description || '',
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
    </OwnerChrome>
  );
};

const MenuItemsList = ({ items, categories, onEdit, onDelete }) => {
  const categoryName = (categoryId) => categories.find((cat) => cat.id === categoryId)?.name || 'Uncategorised';

  if (items.length === 0) {
    return (
      <section className="ro-list">
        <h2>Dishes</h2>
        <div className="ro-empty">
          <h3>No dishes yet.</h3>
          <p>Add the first dish guests can order.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="ro-list">
      <h2>Dishes</h2>
      {items.map((item) => (
        <article className="ro-row" key={item.id}>
          <div>
            <div className="ro-title">
              <h3>{item.name}</h3>
              <span className="ro-pill">{categoryName(item.categoryId)}</span>
              {!item.isAvailable && <span className="ro-pill suspended">Unavailable</span>}
            </div>
            {item.description && <p>{item.description}</p>}
            <div className="ro-meta">
              <span className="ro-price">₹{Number(item.price).toLocaleString('en-IN')}</span>
              {item.preparationTime ? <span>{item.preparationTime} min</span> : null}
              {item.isVegetarian && <span>Vegetarian</span>}
              {item.isSpicy && <span>Spicy</span>}
            </div>
          </div>
          <div className="ro-actions-row">
            <button className="ro-icon" type="button" onClick={() => onEdit(item)} aria-label="Edit dish"><Edit size={16} /></button>
            <button className="ro-icon danger" type="button" onClick={() => onDelete(item.id)} aria-label="Delete dish"><Trash2 size={16} /></button>
          </div>
        </article>
      ))}
    </section>
  );
};

const CategoriesList = ({ categories, onEdit, onDelete }) => {
  if (categories.length === 0) {
    return (
      <section className="ro-list">
        <h2>Categories</h2>
        <div className="ro-empty">
          <h3>No categories yet.</h3>
          <p>Group dishes so the menu is easy to scan.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="ro-list">
      <h2>Categories</h2>
      {categories.map((category) => (
        <article className="ro-row" key={category.id}>
          <div>
            <div className="ro-title">
              <h3>{category.name}</h3>
              <span className={`ro-pill ${category.isActive ? 'active' : 'suspended'}`}>
                {category.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            {category.description && <p>{category.description}</p>}
          </div>
          <div className="ro-actions-row">
            <button className="ro-icon" type="button" onClick={() => onEdit(category)} aria-label="Edit category"><Edit size={16} /></button>
            <button className="ro-icon danger" type="button" onClick={() => onDelete(category.id)} aria-label="Delete category"><Trash2 size={16} /></button>
          </div>
        </article>
      ))}
    </section>
  );
};

const CategoryModal = ({ category, form, setForm, onSubmit, onClose }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <div className="ro-shade" onClick={onClose}>
      <div className="ro-modal" role="dialog" aria-labelledby="category-title" onClick={(e) => e.stopPropagation()}>
        <div className="ro-modal-head">
          <h3 id="category-title">{category ? 'Edit category' : 'Add a category'}</h3>
          <button className="ro-x" type="button" onClick={onClose} aria-label="Close">×</button>
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={handleInputChange} required placeholder="Starters, mains, drinks" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" rows={3} value={form.description} onChange={handleInputChange} placeholder="Optional" />
          </div>
          <div>
            <label htmlFor="sortOrder">Order on the menu</label>
            <input id="sortOrder" name="sortOrder" type="number" value={form.sortOrder} onChange={handleInputChange} />
          </div>
          <label className="ro-check" htmlFor="isActive">
            <input id="isActive" name="isActive" type="checkbox" checked={form.isActive} onChange={handleInputChange} />
            Active
          </label>
          <div className="ro-actions">
            <button className="ro-ghost" type="button" onClick={onClose}>Cancel</button>
            <button className="ro-gold" type="submit">{category ? 'Save' : 'Add category'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ItemModal = ({ item, form, setForm, categories, onSubmit, onClose }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <div className="ro-shade" onClick={onClose}>
      <div className="ro-modal" role="dialog" aria-labelledby="dish-title" onClick={(e) => e.stopPropagation()} style={{ width: 'min(640px, 100%)' }}>
        <div className="ro-modal-head">
          <h3 id="dish-title">{item ? 'Edit dish' : 'Add a dish'}</h3>
          <button className="ro-x" type="button" onClick={onClose} aria-label="Close">×</button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="ro-split two">
            <div>
              <label htmlFor="item-name">Name</label>
              <input id="item-name" name="name" value={form.name} onChange={handleInputChange} required placeholder="What guests order" />
            </div>
            <div>
              <label htmlFor="price">Price (₹)</label>
              <input id="price" name="price" type="number" value={form.price} onChange={handleInputChange} required step="1" min="0" placeholder="0" />
            </div>
          </div>
          <div>
            <label htmlFor="item-description">Description</label>
            <textarea id="item-description" name="description" rows={3} value={form.description} onChange={handleInputChange} placeholder="How it is served" />
          </div>
          <div className="ro-split two">
            <div>
              <label htmlFor="categoryId">Category</label>
              <select id="categoryId" name="categoryId" value={form.categoryId} onChange={handleInputChange}>
                <option value="">No category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="preparationTime">Minutes to prepare</label>
              <input id="preparationTime" name="preparationTime" type="number" min="0" value={form.preparationTime} onChange={handleInputChange} />
            </div>
          </div>
          <div>
            <label htmlFor="imageUrl">Image URL</label>
            <input id="imageUrl" name="imageUrl" type="url" value={form.imageUrl} onChange={handleInputChange} placeholder="https://" />
          </div>
          <div className="ro-split two">
            <label className="ro-check" htmlFor="isAvailable">
              <input id="isAvailable" name="isAvailable" type="checkbox" checked={form.isAvailable} onChange={handleInputChange} />
              Available
            </label>
            <label className="ro-check" htmlFor="isVegetarian">
              <input id="isVegetarian" name="isVegetarian" type="checkbox" checked={form.isVegetarian} onChange={handleInputChange} />
              Vegetarian
            </label>
            <label className="ro-check" htmlFor="isSpicy">
              <input id="isSpicy" name="isSpicy" type="checkbox" checked={form.isSpicy} onChange={handleInputChange} />
              Spicy
            </label>
          </div>
          <div className="ro-actions">
            <button className="ro-ghost" type="button" onClick={onClose}>Cancel</button>
            <button className="ro-gold" type="submit">{item ? 'Save' : 'Add dish'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuManagement;

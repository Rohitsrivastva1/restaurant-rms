import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './owner.css';
import { Plus, LogOut, ChefHat, ClipboardList, Users, QrCode } from 'lucide-react';
import { apiUrl } from '../../services/apiBase';

const CartOwnerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');
  const [createSuccess, setCreateSuccess] = useState('');
  const [createForm, setCreateForm] = useState({
    name: '',
    description: '',
    location: '',
    theme: 'modern'
  });
  const [service, setService] = useState({});

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(apiUrl('/cart/owner/carts'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCarts(data.carts || []);
        const summary = await fetch(apiUrl('/cart/owner/summary'), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (summary.ok) {
          const snapshot = await summary.json();
          const byVenue = {};
          (snapshot.venues || []).forEach((row) => {
            byVenue[row.cartId] = row;
          });
          setService(byVenue);
        }
      } else {
        setError('Could not load your venues.');
      }
    } catch (error) {
      setError('Could not load your venues.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleCreateCart = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    setCreateError('');
    setCreateSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(apiUrl('/cart/owner/carts'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createForm)
      });

      if (response.ok) {
        const newCart = await response.json();
        setCarts(prev => [newCart, ...prev]);
        setCreateSuccess('Venue added.');
        setCreateForm({ name: '', description: '', location: '', theme: 'modern' });
        setShowCreateModal(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => setCreateSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setCreateError(errorData.message || 'Failed to create cart');
      }
    } catch (error) {
      setCreateError('Error creating cart');
      console.error('Error:', error);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredCarts = carts.filter(cart => {
    const haystack = `${cart.name || ''} ${cart.location || ''}`.toLowerCase();
    const matchesSearch = haystack.includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || cart.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusClass = (status) => {
    if (status === 'active' || status === 'pending' || status === 'suspended') return status;
    return 'pending';
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'pending': return 'Pending Approval';
      case 'suspended': return 'Suspended';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="ro">
        <div className="ro-loading">Loading your venues…</div>
      </div>
    );
  }

  const activeCount = carts.filter((cart) => cart.status === 'active').length;
  const workerCount = carts.reduce((total, cart) => total + (cart.workers?.length || 0), 0);
  const openTickets = Object.values(service).reduce((total, row) => total + Number(row.openOrders || 0), 0);
  const todayRevenue = Object.values(service).reduce((total, row) => total + Number(row.todayRevenue || 0), 0);
  const rupee = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;

  const setVenueOpen = async (cart, open) => {
    const token = localStorage.getItem('token');
    const response = await fetch(apiUrl(`/cart/owner/carts/${cart.id}/service`), {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ open }),
    });
    if (response.ok) {
      const updated = await response.json();
      setCarts((prev) => prev.map((row) => (row.id === cart.id ? { ...row, status: updated.status } : row)));
    }
  };

  return (
    <div className="ro">
      <header className="ro-nav">
        <Link className="ro-logo" to="/">Servya <i>◆</i></Link>
        <div className="ro-user">
          <span><strong>{user?.name}</strong></span>
          <button className="ro-logout" type="button" onClick={handleLogout}>
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </header>

      <main className="ro-main">
        <div className="ro-head">
          <div>
            <p className="ro-kicker">Restaurant</p>
            <h1>Your venues.</h1>
            <p>Each dining room has its own menu, tables and kitchen board.</p>
          </div>
          <button className="ro-gold" type="button" onClick={() => setShowCreateModal(true)}>
            <Plus size={16} />
            Add a venue
          </button>
        </div>

        <section className="ro-stats" aria-label="Venue summary">
          <div className="ro-stat"><span>Venues</span><strong>{carts.length}</strong></div>
          <div className="ro-stat"><span>Serving</span><strong>{activeCount}</strong></div>
          <div className="ro-stat"><span>Open tickets</span><strong>{openTickets}</strong></div>
          <div className="ro-stat"><span>Today</span><strong>{rupee(todayRevenue)}</strong></div>
          <div className="ro-stat"><span>Staff</span><strong>{workerCount}</strong></div>
        </section>

        <div className="ro-bar">
          <input
            type="search"
            placeholder="Search by name or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search venues"
          />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} aria-label="Filter by status">
            <option value="all">All statuses</option>
            <option value="active">Open</option>
            <option value="pending">Waiting</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <section className="ro-list">
          <h2>Venues</h2>
          {error && <p className="ro-error">{error}</p>}
          {!error && filteredCarts.length === 0 && (
            <div className="ro-empty">
              <h3>No venues yet.</h3>
              <p>
                {searchTerm || filterStatus !== 'all'
                  ? 'Nothing matches that search.'
                  : 'Add the dining room guests will order from.'}
              </p>
              <button className="ro-gold" type="button" onClick={() => setShowCreateModal(true)} style={{ marginTop: 16 }}>
                <Plus size={16} />
                Add a venue
              </button>
            </div>
          )}
          {filteredCarts.map((cart) => (
            <article className="ro-row" key={cart.id}>
              <div>
                <div className="ro-title">
                  <h3>{cart.name}</h3>
                  <span className={`ro-pill ${getStatusClass(cart.status)}`}>{getStatusText(cart.status)}</span>
                </div>
                {cart.description && <p>{cart.description}</p>}
                {cart.location && <p>{cart.location}</p>}
                <div className="ro-meta">
                  <span>Open tickets {service[cart.id]?.openOrders || 0}</span>
                  <span>Today {rupee(service[cart.id]?.todayRevenue)}</span>
                  <span>Staff {cart.workers?.length || 0}</span>
                </div>
              </div>
              <div className="ro-actions-row">
                <button className="ro-ghost" type="button" onClick={() => navigate(`/restra-owner/menu/${cart.id}`)}>
                  <ChefHat size={16} />
                  Menu
                </button>
                <button className="ro-ghost" type="button" onClick={() => navigate(`/restra-owner/orders/${cart.id}`)}>
                  <ClipboardList size={16} />
                  Orders
                </button>
                <button className="ro-ghost" type="button" onClick={() => navigate(`/restra-owner/tables/${cart.id}`)}>
                  Tables
                </button>
                <button className="ro-ghost" type="button" onClick={() => setVenueOpen(cart, cart.status !== 'active')}>
                  {cart.status === 'active' ? 'Pause' : 'Open'}
                </button>
                <button className="ro-ghost" type="button" onClick={() => navigate(`/restra-owner/staff/${cart.id}`)}>
                  <Users size={16} />
                  Staff
                </button>
                <button className="ro-ghost" type="button" onClick={() => navigate(`/restra-owner/qr/${cart.id}`)}>
                  <QrCode size={16} />
                  QR
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>

      {createSuccess && <div className="ro-toast">{createSuccess}</div>}

      {showCreateModal && (
        <div className="ro-shade" onClick={() => setShowCreateModal(false)}>
          <div className="ro-modal" role="dialog" aria-labelledby="add-venue-title" onClick={(e) => e.stopPropagation()}>
            <div className="ro-modal-head">
              <h3 id="add-venue-title">Add a venue</h3>
              <button className="ro-x" type="button" onClick={() => setShowCreateModal(false)} aria-label="Close">×</button>
            </div>
            <form onSubmit={handleCreateCart}>
              <div>
                <label htmlFor="name">Venue name</label>
                <input id="name" name="name" value={createForm.name} onChange={handleInputChange} required placeholder="The name guests know" />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" rows={3} value={createForm.description} onChange={handleInputChange} placeholder="What this dining room is" />
              </div>
              <div>
                <label htmlFor="location">Location</label>
                <input id="location" name="location" value={createForm.location} onChange={handleInputChange} required placeholder="Where guests find it" />
              </div>
              <div>
                <label htmlFor="theme">Menu theme</label>
                <select id="theme" name="theme" value={createForm.theme} onChange={handleInputChange}>
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>
              {createError && <p className="ro-form-error">{createError}</p>}
              <div className="ro-actions">
                <button className="ro-ghost" type="button" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button className="ro-gold" type="submit" disabled={createLoading}>
                  {createLoading ? 'Adding…' : 'Add venue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartOwnerDashboard;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import OwnerChrome from './OwnerChrome';
import VenueNav from './VenueNav';
import { apiUrl } from '../../services/apiBase';
import {
  COLUMNS,
  NEXT,
  STATUS_COPY,
  countActiveTickets,
  countOpenOrders,
  printKot,
  rupee,
  ticketAge,
  ticketAgeClass,
} from '../../utils/orderBoard';

const Orders = () => {
  const { cartId } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [showTake, setShowTake] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [ticket, setTicket] = useState({ customerName: '', tableNumber: '', lines: {} });

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  });

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 3000);
  };

  const loadOrders = async () => {
    const response = await fetch(apiUrl(`/cart/owner/carts/${cartId}/orders`), {
      headers: authHeaders(),
    });
    if (!response.ok) throw new Error('orders');
    const data = await response.json();
    setOrders(data.orders || []);
  };

  useEffect(() => {
    document.title = 'Orders · Servya';
    let alive = true;
    const load = async () => {
      try {
        const [orderRes, menuRes] = await Promise.all([
          fetch(apiUrl(`/cart/owner/carts/${cartId}/orders`), { headers: authHeaders() }),
          fetch(apiUrl(`/cart/owner/carts/${cartId}/menu-items`), { headers: authHeaders() }),
        ]);
        if (!orderRes.ok || !menuRes.ok) throw new Error('load');
        const orderData = await orderRes.json();
        const menuData = await menuRes.json();
        if (!alive) return;
        setOrders(orderData.orders || []);
        setMenuItems(menuData.menuItems || []);
        setError('');
      } catch (err) {
        if (alive) setError('Could not load orders.');
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    const timer = setInterval(() => {
      loadOrders().catch(() => {});
    }, 8000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, [cartId]);

  const advance = async (order, status) => {
    if (status === 'cancelled' && !window.confirm(`Cancel order ${order.orderNumber}?`)) return;
    const response = await fetch(apiUrl(`/cart/owner/orders/${order.id}/status`), {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({ status }),
    });
    if (response.ok) {
      const updated = await response.json();
      setOrders((prev) => prev.map((row) => (row.id === order.id ? { ...row, ...updated, items: row.items } : row)));
      showToast(status === 'cancelled' ? 'Order cancelled' : `${STATUS_COPY[status] || status}`);
    }
  };

  const openTake = () => {
    setFormError('');
    setTicket({ customerName: '', tableNumber: '', lines: {} });
    setShowTake(true);
  };

  const setQty = (itemId, quantity) => {
    setTicket((prev) => ({
      ...prev,
      lines: { ...prev.lines, [itemId]: quantity },
    }));
  };

  const submitTicket = async (event) => {
    event.preventDefault();
    const items = Object.entries(ticket.lines)
      .filter(([, quantity]) => Number(quantity) > 0)
      .map(([menuItemId, quantity]) => ({ menuItemId: Number(menuItemId), quantity: Number(quantity) }));
    if (!items.length) {
      setFormError('Add at least one dish.');
      return;
    }
    setSaving(true);
    setFormError('');
    try {
      const response = await fetch(apiUrl(`/cart/owner/carts/${cartId}/orders`), {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          customerName: ticket.customerName,
          tableNumber: ticket.tableNumber,
          items,
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setFormError(body.message || body.detail || 'Could not save the order.');
        return;
      }
      const created = await response.json();
      setOrders((prev) => [created, ...prev]);
      setShowTake(false);
      showToast('Order sent to kitchen');
    } catch (err) {
      setFormError('Could not save the order.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="ro">
        <div className="ro-loading">
          <div className="ro-skeleton-stack" aria-busy="true">
            <div className="ro-skeleton h-24" />
            <div className="ro-skeleton h-24" />
          </div>
          <p>Loading orders…</p>
        </div>
      </div>
    );
  }

  const openCount = countOpenOrders(orders);
  const todayCount = countActiveTickets(orders);

  return (
    <OwnerChrome
      kicker="Orders"
      title="Kitchen board."
      lead="Tickets land here as soon as a guest, or you, sends an order."
      pageTitle="Orders · Servya"
      nav={(
        <button className="ro-ghost" type="button" onClick={() => navigate('/restra-owner')}>
          Venues
        </button>
      )}
      actions={(
        <button className="ro-gold" type="button" onClick={openTake}>
          <Plus size={16} />
          Take an order
        </button>
      )}
    >
      <VenueNav cartId={cartId} />
      {toast && <div className="ro-toast" role="status">{toast}</div>}
      {error && <p className="ro-error">{error}</p>}
      <section className="ro-stats" aria-label="Order summary">
        <div className="ro-stat"><span>Open</span><strong>{openCount}</strong></div>
        <div className="ro-stat"><span>Today</span><strong>{todayCount}</strong></div>
      </section>
      {!error && orders.length === 0 && (
        <div className="ro-empty">
          <h3>No tickets yet.</h3>
          <p>Take an order at the counter, or share the QR so guests can send one.</p>
        </div>
      )}
      {orders.length > 0 && (
        <div className="ro-board">
          {COLUMNS.map((column) => (
            <section key={column.key} className="ro-column">
              <h2>{column.title}</h2>
              {orders.filter((order) => column.statuses.includes(order.status)).map((order) => {
                const next = NEXT[order.status];
                const age = ticketAge(order.createdAt);
                return (
                  <article className="ro-ticket" key={order.id}>
                    <header>
                      <strong>{order.orderNumber}</strong>
                      <span>{rupee(order.finalAmount)}</span>
                    </header>
                    <div className="ro-ticket-meta">
                      <span className="ro-pill active">{STATUS_COPY[order.status] || order.status}</span>
                      {age && <span className={`ro-age ${ticketAgeClass(order.createdAt)}`}>{age}</span>}
                    </div>
                    <p>{order.customerName || 'Guest'}{order.tableNumber ? ` · Table ${order.tableNumber}` : ''}</p>
                    {order.specialInstructions && <p>{order.specialInstructions}</p>}
                    <ul>
                      {(order.items || []).map((item) => (
                        <li key={item.id}>{item.quantity} × {item.itemName}</li>
                      ))}
                    </ul>
                    <div className="ro-ticket-actions">
                      {column.key !== 'done' && next && (
                        <button className="ro-gold" type="button" onClick={() => advance(order, next.status)}>
                          {next.label}
                        </button>
                      )}
                      <button className="ro-ghost" type="button" onClick={() => printKot(order)}>KOT</button>
                      {column.key !== 'done' && order.status !== 'cancelled' && (
                        <button className="ro-ghost" type="button" onClick={() => advance(order, 'cancelled')}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </section>
          ))}
        </div>
      )}

      {showTake && (
        <div className="ro-shade" onClick={() => setShowTake(false)}>
          <div className="ro-modal ro-modal-wide" role="dialog" aria-labelledby="take-order-title" onClick={(event) => event.stopPropagation()}>
            <div className="ro-modal-head">
              <h3 id="take-order-title">Take an order</h3>
              <button className="ro-x" type="button" onClick={() => setShowTake(false)} aria-label="Close">×</button>
            </div>
            <form onSubmit={submitTicket}>
              <div className="ro-split two">
                <div>
                  <label htmlFor="guest-name">Guest name</label>
                  <input id="guest-name" value={ticket.customerName} onChange={(event) => setTicket((prev) => ({ ...prev, customerName: event.target.value }))} placeholder="Who the ticket is for" />
                </div>
                <div>
                  <label htmlFor="table-number">Table</label>
                  <input id="table-number" value={ticket.tableNumber} onChange={(event) => setTicket((prev) => ({ ...prev, tableNumber: event.target.value }))} placeholder="12" />
                </div>
              </div>
              <div className="ro-dish-pick">
                {menuItems.map((item) => (
                  <label key={item.id}>
                    <span>{item.name} <em>{rupee(item.price)}</em></span>
                    <input
                      type="number"
                      min="0"
                      value={ticket.lines[item.id] || ''}
                      onChange={(event) => setQty(item.id, event.target.value)}
                      aria-label={`Quantity for ${item.name}`}
                    />
                  </label>
                ))}
              </div>
              {formError && <p className="ro-form-error">{formError}</p>}
              <div className="ro-actions">
                <button className="ro-ghost" type="button" onClick={() => setShowTake(false)}>Cancel</button>
                <button className="ro-gold" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Send to kitchen'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </OwnerChrome>
  );
};

export default Orders;

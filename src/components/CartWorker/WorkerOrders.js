import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OwnerChrome from '../CartOwner/OwnerChrome';

const COLUMNS = [
  { key: 'new', title: 'New', statuses: ['pending'] },
  { key: 'kitchen', title: 'Kitchen', statuses: ['accepted', 'cooking', 'cooking_done'] },
  { key: 'ready', title: 'Ready', statuses: ['ready_for_pickup'] },
  { key: 'done', title: 'Done', statuses: ['delivered', 'completed'] },
];

const NEXT = {
  pending: { status: 'accepted', label: 'Accept' },
  accepted: { status: 'cooking', label: 'Start cooking' },
  cooking: { status: 'ready_for_pickup', label: 'Ready' },
  cooking_done: { status: 'ready_for_pickup', label: 'Ready' },
  ready_for_pickup: { status: 'delivered', label: 'Served' },
  delivered: { status: 'completed', label: 'Complete' },
};

const rupee = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;

const WorkerOrders = () => {
  const { cartId } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const headers = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  });

  const loadOrders = async () => {
    const response = await fetch(`http://localhost:3000/cart/worker/carts/${cartId}/orders`, {
      headers: headers(),
    });
    if (!response.ok) throw new Error('orders');
    const data = await response.json();
    setOrders(data.orders || []);
    setError('');
  };

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        await loadOrders();
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
    const response = await fetch(`http://localhost:3000/cart/worker/orders/${order.id}/status`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({ status }),
    });
    if (response.ok) {
      const updated = await response.json();
      setOrders((prev) => prev.map((row) => (row.id === order.id ? { ...row, ...updated, items: row.items } : row)));
    }
  };

  if (loading) {
    return (
      <div className="ro">
        <div className="ro-loading">Loading orders…</div>
      </div>
    );
  }

  const openCount = orders.filter((order) => !['completed', 'cancelled', 'delivered'].includes(order.status)).length;

  return (
    <OwnerChrome
      home="/restra-worker"
      kicker="Orders"
      title="Kitchen board."
      lead="Move each ticket as the table is served."
      nav={(
        <button className="ro-ghost" type="button" onClick={() => navigate('/restra-worker')}>
          Venues
        </button>
      )}
    >
      {error && <p className="ro-error">{error}</p>}
      <section className="ro-stats" aria-label="Order summary">
        <div className="ro-stat"><span>Open</span><strong>{openCount}</strong></div>
        <div className="ro-stat"><span>Tickets</span><strong>{orders.length}</strong></div>
      </section>
      {!error && orders.length === 0 && (
        <div className="ro-empty">
          <h3>No tickets yet.</h3>
          <p>New orders from the guest menu show up here.</p>
        </div>
      )}
      {orders.length > 0 && (
        <div className="ro-board">
          {COLUMNS.map((column) => (
            <section key={column.key} className="ro-column">
              <h2>{column.title}</h2>
              {orders.filter((order) => column.statuses.includes(order.status)).map((order) => {
                const next = NEXT[order.status];
                return (
                  <article className="ro-ticket" key={order.id}>
                    <header>
                      <strong>{order.orderNumber}</strong>
                      <span>{rupee(order.finalAmount)}</span>
                    </header>
                    <p>{order.customerName || 'Guest'}{order.tableNumber ? ` · Table ${order.tableNumber}` : ''}</p>
                    <ul>
                      {(order.items || []).map((item) => (
                        <li key={item.id}>{item.quantity} × {item.itemName}</li>
                      ))}
                    </ul>
                    <div className="ro-ticket-actions">
                      {next && (
                        <button className="ro-gold" type="button" onClick={() => advance(order, next.status)}>
                          {next.label}
                        </button>
                      )}
                      {order.status !== 'cancelled' && order.status !== 'completed' && (
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
    </OwnerChrome>
  );
};

export default WorkerOrders;

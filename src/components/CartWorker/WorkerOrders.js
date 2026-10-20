import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import OwnerChrome from '../CartOwner/OwnerChrome';
import { apiUrl } from '../../services/apiBase';
import {
  COLUMNS,
  NEXT,
  STATUS_COPY,
  countActiveTickets,
  countOpenOrders,
  printBill,
  printKot,
  rupee,
  ticketAge,
  ticketAgeClass,
} from '../../utils/orderBoard';

const WorkerOrders = () => {
  const { cartId } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [showTake, setShowTake] = useState(false);
  const [showTableSheet, setShowTableSheet] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [ticket, setTicket] = useState({ customerName: '', tableNumber: '', lines: {} });
  const [selectedTable, setSelectedTable] = useState('');

  const headers = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  });

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 3000);
  };

  const loadOrders = async () => {
    const response = await fetch(apiUrl(`/cart/worker/carts/${cartId}/orders`), {
      headers: headers(),
    });
    if (!response.ok) throw new Error('orders');
    const data = await response.json();
    setOrders(data.orders || []);
    setError('');
  };

  useEffect(() => {
    document.title = 'Orders · Servya';
    let alive = true;
    const load = async () => {
      try {
        const [orderRes, menuRes, tableRes] = await Promise.all([
          fetch(apiUrl(`/cart/worker/carts/${cartId}/orders`), { headers: headers() }),
          fetch(apiUrl(`/cart/worker/carts/${cartId}/menu-items`), { headers: headers() }),
          fetch(apiUrl(`/cart/worker/carts/${cartId}/tables`), { headers: headers() }),
        ]);
        if (!orderRes.ok) throw new Error('orders');
        const orderData = await orderRes.json();
        if (!alive) return;
        setOrders(orderData.orders || []);
        if (menuRes.ok) {
          const menuData = await menuRes.json();
          setMenuItems(menuData.menuItems || []);
        }
        if (tableRes.ok) {
          const tableData = await tableRes.json();
          setTables(tableData.tables || []);
        }
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
    const response = await fetch(apiUrl(`/cart/worker/orders/${order.id}/status`), {
      method: 'PUT',
      headers: headers(),
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
      const response = await fetch(apiUrl(`/cart/worker/carts/${cartId}/orders`), {
        method: 'POST',
        headers: headers(),
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

  const openTableActions = () => {
    setSelectedTable(tables[0]?.label || '');
    setShowTableSheet(true);
  };

  const tableRow = tables.find((table) => table.label === selectedTable);

  const handlePrintBill = async () => {
    if (!selectedTable) return;
    const response = await fetch(
      apiUrl(`/cart/worker/carts/${cartId}/bill?table=${encodeURIComponent(selectedTable)}`),
      { headers: headers() }
    );
    if (!response.ok) {
      showToast('Could not load bill');
      return;
    }
    const bill = await response.json();
    printBill(bill, selectedTable);
  };

  const handleCloseTable = async () => {
    if (!tableRow) {
      showToast('Pick a table first');
      return;
    }
    if (!window.confirm(`Close table ${tableRow.label}? Open orders will be marked completed.`)) return;
    const response = await fetch(
      apiUrl(`/cart/worker/carts/${cartId}/tables/${tableRow.id}/release`),
      { method: 'POST', headers: headers() }
    );
    if (!response.ok) {
      showToast('Could not close table');
      return;
    }
    setShowTableSheet(false);
    showToast(`Table ${tableRow.label} closed`);
    loadOrders().catch(() => {});
  };

  if (loading) {
    return (
      <div className="ro">
        <div className="ro-loading">
          <div className="ro-skeleton-stack" aria-busy="true">
            <div className="ro-skeleton h-24" />
            <div className="ro-skeleton h-24" />
            <div className="ro-skeleton h-24" />
          </div>
          <p>Loading orders…</p>
        </div>
      </div>
    );
  }

  const openCount = countOpenOrders(orders);
  const ticketCount = countActiveTickets(orders);

  return (
    <OwnerChrome
      home="/restra-worker"
      kicker="Orders"
      title="Kitchen board."
      lead="Move each ticket as the table is served."
      pageTitle="Orders · Servya"
      nav={(
        <button className="ro-ghost" type="button" onClick={() => navigate('/restra-worker')}>
          Venues
        </button>
      )}
      actions={(
        <div className="ro-head-actions">
          <button className="ro-ghost" type="button" onClick={openTableActions}>Table</button>
          <button className="ro-gold" type="button" onClick={openTake}>
            <Plus size={16} />
            New order
          </button>
        </div>
      )}
    >
      {toast && <div className="ro-toast" role="status">{toast}</div>}
      {error && <p className="ro-error">{error}</p>}
      <section className="ro-stats" aria-label="Order summary">
        <div className="ro-stat"><span>Open</span><strong>{openCount}</strong></div>
        <div className="ro-stat"><span>Tickets</span><strong>{ticketCount}</strong></div>
      </section>
      {!error && orders.length === 0 && (
        <div className="ro-empty">
          <h3>No tickets yet.</h3>
          <p>New orders from the guest menu, or New order, show up here.</p>
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

      <button className="ro-fab" type="button" onClick={openTake} aria-label="New order">
        <Plus size={22} />
      </button>

      {showTake && (
        <div className="ro-shade" onClick={() => setShowTake(false)}>
          <div className="ro-modal ro-modal-wide" role="dialog" aria-labelledby="take-order-title" onClick={(event) => event.stopPropagation()}>
            <div className="ro-modal-head">
              <h3 id="take-order-title">New order</h3>
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
                  {(tables || []).length > 0 ? (
                    <select id="table-number" value={ticket.tableNumber} onChange={(event) => setTicket((prev) => ({ ...prev, tableNumber: event.target.value }))}>
                      <option value="">Choose a table</option>
                      {tables.map((table) => (
                        <option key={table.id} value={table.label}>{table.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input id="table-number" value={ticket.tableNumber} onChange={(event) => setTicket((prev) => ({ ...prev, tableNumber: event.target.value }))} placeholder="12" />
                  )}
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

      {showTableSheet && (
        <div className="ro-shade" onClick={() => setShowTableSheet(false)}>
          <div className="ro-modal" role="dialog" aria-labelledby="table-sheet-title" onClick={(event) => event.stopPropagation()}>
            <div className="ro-modal-head">
              <h3 id="table-sheet-title">Table actions</h3>
              <button className="ro-x" type="button" onClick={() => setShowTableSheet(false)} aria-label="Close">×</button>
            </div>
            <div className="ro-field">
              <label htmlFor="sheet-table">Table</label>
              <select id="sheet-table" value={selectedTable} onChange={(event) => setSelectedTable(event.target.value)}>
                <option value="">Choose a table</option>
                {tables.map((table) => (
                  <option key={table.id} value={table.label}>{table.label}{table.occupied ? ' · busy' : ''}</option>
                ))}
              </select>
            </div>
            <div className="ro-actions">
              <button className="ro-ghost" type="button" onClick={handlePrintBill}>Bill</button>
              <button className="ro-gold" type="button" onClick={handleCloseTable}>Close table</button>
            </div>
          </div>
        </div>
      )}
    </OwnerChrome>
  );
};

export default WorkerOrders;

import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import './owner.css';
import { apiUrl } from '../../services/apiBase';

const rupee = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;

const STATUS_COPY = {
  pending: 'With the kitchen',
  accepted: 'Accepted',
  cooking: 'Cooking',
  cooking_done: 'Cooked',
  ready_for_pickup: 'Ready',
  delivered: 'Served',
  completed: 'Served',
  cancelled: 'Cancelled',
};

const GuestOrder = () => {
  const { cartId } = useParams();
  const [searchParams] = useSearchParams();
  const tableFromLink = searchParams.get('table') || '';
  const [venue, setVenue] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [lines, setLines] = useState({});
  const [categoryId, setCategoryId] = useState('all');
  const [name, setName] = useState('');
  const [tableNumber, setTableNumber] = useState(tableFromLink);
  const [note, setNote] = useState('');
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');
  const [placed, setPlaced] = useState(null);
  const [view, setView] = useState('menu');
  const [bill, setBill] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(apiUrl(`/cart/public/venues/${cartId}`));
        if (!response.ok) throw new Error('venue');
        const data = await response.json();
        setVenue(data);
        if (!tableFromLink && data.tables?.length === 1) {
          setTableNumber(data.tables[0].label);
        }
      } catch (err) {
        setError('This menu is not available.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [cartId, tableFromLink]);

  const activeTable = tableFromLink || tableNumber;

  const loadBill = async () => {
    if (!activeTable) {
      setBill(null);
      return;
    }
    const response = await fetch(apiUrl(`/cart/public/venues/${cartId}/bill?table=${encodeURIComponent(activeTable)}`));
    if (!response.ok) return;
    setBill(await response.json());
  };

  useEffect(() => {
    loadBill().catch(() => {});
    if (!activeTable) return undefined;
    const timer = setInterval(() => {
      loadBill().catch(() => {});
    }, 8000);
    return () => clearInterval(timer);
  }, [cartId, activeTable]);

  useEffect(() => {
    if (!placed?.orderNumber || ['delivered', 'completed', 'cancelled'].includes(placed.status)) return undefined;
    const timer = setInterval(async () => {
      const response = await fetch(apiUrl(`/cart/public/orders/${placed.orderNumber}/status`));
      if (!response.ok) return;
      const data = await response.json();
      setPlaced((current) => (current ? { ...current, status: data.status } : current));
    }, 5000);
    return () => clearInterval(timer);
  }, [placed?.orderNumber, placed?.status]);

  const dishes = useMemo(() => {
    const items = venue?.menuItems || [];
    if (categoryId === 'all') return items;
    return items.filter((item) => String(item.categoryId) === String(categoryId));
  }, [venue, categoryId]);

  const basket = useMemo(() => {
    return (venue?.menuItems || [])
      .map((item) => ({ ...item, quantity: Number(lines[item.id] || 0) }))
      .filter((item) => item.quantity > 0);
  }, [venue, lines]);

  const total = basket.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const setQty = (itemId, quantity) => {
    setLines((prev) => ({ ...prev, [itemId]: Math.max(0, quantity) }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    if (!basket.length) {
      setFormError('Add a dish first.');
      return;
    }
    setSending(true);
    setFormError('');
    try {
      const response = await fetch(apiUrl('/cart/public/orders'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId: Number(cartId),
          customerName: name,
          tableNumber,
          specialInstructions: note,
          items: basket.map((item) => ({ menuItemId: item.id, quantity: item.quantity })),
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        setFormError(body.message || body.detail || 'The kitchen did not receive that.');
        return;
      }
      setPlaced(body);
      setLines({});
      setNote('');
      setView('bill');
      loadBill().catch(() => {});
    } catch (err) {
      setFormError('The kitchen did not receive that.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <div className="ro"><div className="ro-loading">Loading the menu…</div></div>;
  }

  return (
    <div className="ro">
      <header className="ro-nav">
        <Link className="ro-logo" to="/">Servya <i>◆</i></Link>
        <button className="ro-ghost" type="button" onClick={() => setView(view === 'bill' ? 'menu' : 'bill')}>
          {view === 'bill' ? 'Menu' : `Your bill${bill ? ` ${rupee(bill.bill)}` : ''}`}
        </button>
      </header>
      <main className="ro-main">
        {error && <p className="ro-error">{error}</p>}
        {venue && (
          <>
            <div className="ro-head">
              <div>
                <p className="ro-kicker">{view === 'bill' ? 'Bill' : 'Menu'}</p>
                <h1>{view === 'bill' ? 'Your orders.' : venue.name}</h1>
                <p>{view === 'bill' ? 'Everything sent from this table today, and what it comes to.' : (venue.location || venue.description || 'Order from your table. The kitchen sees it right away.')}</p>
              </div>
            </div>
            {view === 'bill' ? (
              <section className="ro-list">
                <h2>Table {activeTable || '—'} · {rupee(bill?.bill || 0)}</h2>
                {!activeTable && (
                  <div className="ro-empty">
                    <h3>Choose your table.</h3>
                    <p>The bill is the orders sent from that table today.</p>
                  </div>
                )}
                {activeTable && (bill?.orders || []).length === 0 && (
                  <div className="ro-empty">
                    <h3>Nothing on this table yet.</h3>
                    <p>Dishes you send show up here with the running total.</p>
                  </div>
                )}
                {(bill?.orders || []).map((order) => (
                  <article className="ro-row" key={order.id}>
                    <div>
                      <div className="ro-title">
                        <h3>{order.orderNumber}</h3>
                        <span className={`ro-pill ${order.status === 'cancelled' ? 'suspended' : order.status === 'pending' ? 'pending' : 'active'}`}>
                          {STATUS_COPY[order.status] || order.status}
                        </span>
                      </div>
                      <p>{(order.items || []).map((item) => `${item.quantity} × ${item.name}`).join(', ')}</p>
                      {order.specialInstructions && <p>{order.specialInstructions}</p>}
                    </div>
                    <strong className="ro-price">{rupee(order.finalAmount)}</strong>
                  </article>
                ))}
              </section>
            ) : (
            <>
            <div className="ro-tabs">
              <button type="button" className={categoryId === 'all' ? 'on' : ''} onClick={() => setCategoryId('all')}>All</button>
              {(venue.categories || []).map((category) => (
                <button
                  type="button"
                  key={category.id}
                  className={String(categoryId) === String(category.id) ? 'on' : ''}
                  onClick={() => setCategoryId(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <section className="ro-list">
              <h2>Dishes</h2>
              {dishes.length === 0 && <div className="ro-empty"><h3>Nothing in this category.</h3></div>}
              {dishes.map((item) => (
                <article className="ro-row" key={item.id}>
                  <div>
                    <h3>{item.name}</h3>
                    {item.description && <p>{item.description}</p>}
                    <p className="ro-price">{rupee(item.price)}</p>
                  </div>
                  <div className="ro-qty">
                    <button type="button" onClick={() => setQty(item.id, Number(lines[item.id] || 0) - 1)} aria-label={`Remove one ${item.name}`}>−</button>
                    <span>{lines[item.id] || 0}</span>
                    <button type="button" onClick={() => setQty(item.id, Number(lines[item.id] || 0) + 1)} aria-label={`Add one ${item.name}`}>+</button>
                  </div>
                </article>
              ))}
            </section>

            <form className="ro-guest-order" onSubmit={placeOrder}>
              {placed ? (
                <div>
                  <h2>Order sent.</h2>
                  <p>Ticket {placed.orderNumber}. {STATUS_COPY[placed.status] || 'With the kitchen'}.</p>
                  <button className="ro-ghost" type="button" onClick={() => setPlaced(null)}>Order something else</button>
                </div>
              ) : (
                <>
                  <h2>Your table <span>{basket.length ? rupee(total) : ''}</span></h2>
                  <div className="ro-split two">
                    <input aria-label="Your name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
                    {tableFromLink ? (
                      <input aria-label="Table number" value={tableFromLink} readOnly />
                    ) : (venue.tables || []).length > 0 ? (
                      <select aria-label="Table number" value={tableNumber} onChange={(event) => setTableNumber(event.target.value)}>
                        <option value="">Choose a table</option>
                        {venue.tables.map((table) => (
                          <option key={table.id} value={table.label}>Table {table.label}</option>
                        ))}
                      </select>
                    ) : (
                      <input aria-label="Table number" value={tableNumber} onChange={(event) => setTableNumber(event.target.value)} placeholder="Table number" />
                    )}
                  </div>
                  <textarea aria-label="Note for the kitchen" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Note for the kitchen" />
                  {basket.length > 0 && (
                    <ul>
                      {basket.map((item) => (
                        <li key={item.id}>{item.quantity} × {item.name}</li>
                      ))}
                    </ul>
                  )}
                  {formError && <p className="ro-form-error">{formError}</p>}
                  <button className="ro-gold" type="submit" disabled={sending || basket.length === 0}>
                    {sending ? 'Sending…' : 'Send order'}
                  </button>
                </>
              )}
            </form>
            </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default GuestOrder;

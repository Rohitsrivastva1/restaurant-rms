import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import './owner.css';
import { RoPageSkeleton, RoRefreshBar, RoSendSpinner } from './RoSkeleton';
import { apiUrl } from '../../services/apiBase';
import { cacheGet, cacheSet } from '../../utils/fastCache';
import {
  GUEST_STATUS_COPY,
  loadGuestOrderNumbers,
  rememberGuestOrderNumber,
  rupee,
} from '../../utils/orderBoard';

const GuestOrder = () => {
  const { cartId: cartIdParam, seatKey } = useParams();
  const [searchParams] = useSearchParams();
  const tableFromLink = searchParams.get('table') || '';
  const cacheKey = seatKey ? `guest-seat:${seatKey}` : `guest-venue:${cartIdParam}`;
  const cachedVenue = cacheGet(cacheKey, 300_000);
  const [cartId, setCartId] = useState(cartIdParam || (cachedVenue?.id ? String(cachedVenue.id) : ''));
  const [venue, setVenue] = useState(cachedVenue || null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(!cachedVenue);
  const [refreshing, setRefreshing] = useState(false);
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
  const [myOrders, setMyOrders] = useState([]);
  const myOrdersKey = myOrders.join('|');

  useEffect(() => {
    document.title = venue?.name ? `${venue.name} · Servya` : 'Menu · Servya';
  }, [venue?.name]);

  useEffect(() => {
    const load = async () => {
      if (cachedVenue) setRefreshing(true);
      try {
        if (seatKey) {
          const seatRes = await fetch(apiUrl(`/cart/public/seats/${seatKey}/enter`), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
          });
          if (!seatRes.ok) throw new Error('seat');
          const seatData = await seatRes.json();
          setVenue(seatData.venue);
          setCartId(String(seatData.venue?.id || ''));
          if (seatData.table?.label) setTableNumber(seatData.table.label);
          cacheSet(cacheKey, seatData.venue);
          return;
        }
        const response = await fetch(apiUrl(`/cart/public/venues/${cartIdParam}`));
        if (!response.ok) throw new Error('venue');
        const data = await response.json();
        setVenue(data);
        setCartId(String(cartIdParam));
        cacheSet(cacheKey, data);
        if (!tableFromLink && data.tables?.length === 1) {
          setTableNumber(data.tables[0].label);
        }
      } catch (err) {
        if (!cachedVenue) setError('This menu is not available.');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
    load();
  }, [cartIdParam, seatKey, tableFromLink, cacheKey]);

  useEffect(() => {
    if (!cartId) return;
    setMyOrders(loadGuestOrderNumbers(cartId));
  }, [cartId]);

  const activeTable = tableFromLink || tableNumber;

  const loadBill = useCallback(async () => {
    if (!activeTable || !cartId) {
      setBill(null);
      return;
    }
    const claimed = loadGuestOrderNumbers(cartId);
    const qs = new URLSearchParams({ table: activeTable });
    if (claimed.length) qs.set('orders', claimed.join(','));
    const response = await fetch(apiUrl(`/cart/public/venues/${cartId}/bill?${qs.toString()}`));
    if (!response.ok) return;
    setBill(await response.json());
  }, [activeTable, cartId]);

  useEffect(() => {
    loadBill().catch(() => {});
    if (!activeTable || !cartId) return undefined;
    const timer = setInterval(() => {
      loadBill().catch(() => {});
    }, 5000);
    return () => clearInterval(timer);
  }, [cartId, activeTable, myOrdersKey, loadBill]);

  useEffect(() => {
    const orderNumber = placed?.orderNumber;
    if (!orderNumber || orderNumber === '…' || ['delivered', 'completed', 'cancelled'].includes(placed.status)) {
      return undefined;
    }
    const timer = setInterval(async () => {
      const response = await fetch(apiUrl(`/cart/public/orders/${orderNumber}/status`));
      if (!response.ok) return;
      const data = await response.json();
      setPlaced((current) => (current ? { ...current, status: data.status } : current));
    }, 4000);
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
      setFormError('Add a dish to send your order.');
      return;
    }
    if (!tableNumber && !tableFromLink) {
      setFormError('Choose a table first.');
      return;
    }
    setSending(true);
    setFormError('');
    const optimistic = {
      orderNumber: '…',
      status: 'pending',
      finalAmount: total,
      items: basket.map((item) => ({ name: item.name, quantity: item.quantity })),
    };
    setPlaced(optimistic);
    try {
      const response = await fetch(apiUrl('/cart/public/orders'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId: Number(cartId),
          customerName: name,
          tableNumber: tableFromLink || tableNumber,
          specialInstructions: note,
          items: basket.map((item) => ({ menuItemId: item.id, quantity: item.quantity })),
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        setPlaced(null);
        setFormError(body.message || body.detail || 'The kitchen did not receive that.');
        return;
      }
      rememberGuestOrderNumber(cartId, body.orderNumber);
      setMyOrders(loadGuestOrderNumbers(cartId));
      setPlaced(body);
      setLines({});
      setNote('');
      setView('bill');
      loadBill().catch(() => {});
    } catch (err) {
      setPlaced(null);
      setFormError('The kitchen did not receive that.');
    } finally {
      setSending(false);
    }
  };

  if (loading && !venue) {
    return <RoPageSkeleton title="Menu." lead="Loading dishes for your table…" variant="menu" />;
  }

  return (
    <div className="ro">
      <header className="ro-nav">
        <Link className="ro-logo" to="/">Servya <i>◆</i></Link>
        <button className="ro-ghost" type="button" onClick={() => setView(view === 'bill' ? 'menu' : 'bill')}>
          {view === 'bill' ? 'Menu' : `Your orders${bill ? ` ${rupee(bill.bill)}` : ''}`}
        </button>
      </header>
      <main className="ro-main">
        <RoRefreshBar show={refreshing} label="Updating menu…" />
        {error && <p className="ro-error">{error}</p>}
        {venue && (
          <>
            <div className="ro-head">
              <div>
                <p className="ro-kicker">{view === 'bill' ? 'Your orders' : 'Menu'}</p>
                <h1>{view === 'bill' ? 'Your orders.' : venue.name}</h1>
                <p>
                  {view === 'bill'
                    ? 'Only orders from this phone. Staff can see the full table bill.'
                    : (venue.location || venue.description || 'Order from your table. The kitchen sees it right away.')}
                </p>
              </div>
            </div>
            {view === 'bill' ? (
              <section className="ro-list">
                <h2>Table {activeTable || '—'} · {rupee(bill?.bill || 0)}</h2>
                {!activeTable && (
                  <div className="ro-empty">
                    <h3>Choose your table.</h3>
                    <p>Your orders for that table show up here.</p>
                  </div>
                )}
                {activeTable && (bill?.orders || []).length === 0 && (
                  <div className="ro-empty">
                    <h3>Nothing from this phone yet.</h3>
                    <p>Dishes you send show up here with live status after reload.</p>
                  </div>
                )}
                {(bill?.orders || []).map((order) => (
                  <article className="ro-row" key={order.id}>
                    <div>
                      <div className="ro-title">
                        <h3>{order.orderNumber}</h3>
                        <span className={`ro-pill ${order.status === 'cancelled' ? 'suspended' : order.status === 'pending' ? 'pending' : 'active'}`}>
                          {GUEST_STATUS_COPY[order.status] || order.status}
                        </span>
                      </div>
                      <p>{(order.items || []).map((item) => `${item.quantity} × ${item.name}`).join(', ')}</p>
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
                  <div className="ro-dish-media">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="" className="ro-dish-photo" />
                    ) : (
                      <div className="ro-dish-photo placeholder" aria-hidden="true" />
                    )}
                    <div>
                      <h3>{item.name}</h3>
                      {item.description && <p className="ro-muted">{item.description}</p>}
                      <p className="ro-price">{rupee(item.price)}</p>
                    </div>
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
              {placed && !sending ? (
                <div>
                  <h2>Order sent.</h2>
                  <p>Ticket {placed.orderNumber}. {GUEST_STATUS_COPY[placed.status] || 'With the kitchen'}.</p>
                  <button className="ro-ghost" type="button" onClick={() => setPlaced(null)}>Order something else</button>
                </div>
              ) : (
                <>
                  <h2>Your table <span>{basket.length ? rupee(total) : ''}</span></h2>
                  <div className="ro-split two">
                    <div className="ro-field">
                      <label htmlFor="guest-name">Your name</label>
                      <input id="guest-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
                    </div>
                    <div className="ro-field">
                      <label htmlFor="guest-table">Table</label>
                      {tableFromLink ? (
                        <input id="guest-table" value={tableFromLink} readOnly />
                      ) : (venue.tables || []).length > 0 ? (
                        <select id="guest-table" value={tableNumber} onChange={(event) => setTableNumber(event.target.value)}>
                          <option value="">Choose a table</option>
                          {venue.tables.map((table) => (
                            <option key={table.id} value={table.label}>Table {table.label}</option>
                          ))}
                        </select>
                      ) : (
                        <input id="guest-table" value={tableNumber} onChange={(event) => setTableNumber(event.target.value)} placeholder="Table number" />
                      )}
                    </div>
                  </div>
                  <div className="ro-field">
                    <label htmlFor="guest-note">Note for the kitchen</label>
                    <textarea id="guest-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Optional" />
                  </div>
                  {basket.length > 0 && (
                    <ul>
                      {basket.map((item) => (
                        <li key={item.id}>{item.quantity} × {item.name}</li>
                      ))}
                    </ul>
                  )}
                  {basket.length === 0 && (
                    <p className="ro-helper">Add a dish to send your order.</p>
                  )}
                  {formError && <p className="ro-form-error">{formError}</p>}
                  <button
                    className="ro-gold is-busy"
                    type="submit"
                    disabled={sending || basket.length === 0}
                    aria-busy={sending}
                  >
                    {sending ? <><RoSendSpinner />Sending to kitchen…</> : 'Send order'}
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

import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './owner.css';

const rupee = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;

const GuestOrder = () => {
  const { cartId } = useParams();
  const [venue, setVenue] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [lines, setLines] = useState({});
  const [categoryId, setCategoryId] = useState('all');
  const [name, setName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');
  const [placed, setPlaced] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cart/public/venues/${cartId}`);
        if (!response.ok) throw new Error('venue');
        setVenue(await response.json());
      } catch (err) {
        setError('This menu is not available.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [cartId]);

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
      const response = await fetch('http://localhost:3000/cart/public/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId: Number(cartId),
          customerName: name,
          tableNumber,
          items: basket.map((item) => ({ menuItemId: item.id, quantity: item.quantity })),
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        setFormError(body.message || 'The kitchen did not receive that.');
        return;
      }
      setPlaced(body);
      setLines({});
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
      </header>
      <main className="ro-main">
        {error && <p className="ro-error">{error}</p>}
        {venue && (
          <>
            <div className="ro-head">
              <div>
                <p className="ro-kicker">Menu</p>
                <h1>{venue.name}</h1>
                <p>{venue.location || venue.description || 'Order from your table. The kitchen sees it right away.'}</p>
              </div>
            </div>
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
                  <p>Ticket {placed.orderNumber} is with the kitchen.</p>
                  <button className="ro-ghost" type="button" onClick={() => setPlaced(null)}>Order something else</button>
                </div>
              ) : (
                <>
                  <h2>Your table <span>{basket.length ? rupee(total) : ''}</span></h2>
                  <div className="ro-split two">
                    <input aria-label="Your name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
                    <input aria-label="Table number" value={tableNumber} onChange={(event) => setTableNumber(event.target.value)} placeholder="Table number" />
                  </div>
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
      </main>
    </div>
  );
};

export default GuestOrder;

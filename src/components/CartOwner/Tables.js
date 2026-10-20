import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { Trash2 } from 'lucide-react';
import OwnerChrome from './OwnerChrome';
import VenueNav from './VenueNav';
import { RoPageSkeleton } from './RoSkeleton';
import { apiUrl } from '../../services/apiBase';

const Tables = () => {
  const { cartId } = useParams();
  const navigate = useNavigate();
  const [tables, setTables] = useState([]);
  const [codes, setCodes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [label, setLabel] = useState('');
  const [seats, setSeats] = useState('4');
  const [count, setCount] = useState('8');

  const headers = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  });

  const load = async () => {
    const response = await fetch(apiUrl(`/cart/owner/carts/${cartId}/tables`), { headers: headers() });
    if (!response.ok) throw new Error('tables');
    const data = await response.json();
    const rows = data.tables || [];
    setTables(rows);
    const next = {};
    await Promise.all(rows.map(async (table) => {
      const url = `${window.location.origin}/guest/seat/${table.seatKey}`;
      next[table.id] = await QRCode.toDataURL(url, { margin: 1, width: 280, color: { dark: '#1a120c', light: '#f5ecdd' } });
    }));
    setCodes(next);
  };

  useEffect(() => {
    let alive = true;
    load()
      .catch(() => { if (alive) setError('Could not load tables.'); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [cartId]);

  const addOne = async (event) => {
    event.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      const response = await fetch(apiUrl(`/cart/owner/carts/${cartId}/tables`), {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ label, seats: Number(seats) || 4 }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        setFormError(body.message || 'Could not add that table.');
        return;
      }
      setLabel('');
      await load();
    } catch (err) {
      setFormError('Could not add that table.');
    } finally {
      setSaving(false);
    }
  };

  const addRange = async () => {
    setSaving(true);
    setFormError('');
    try {
      const response = await fetch(apiUrl(`/cart/owner/carts/${cartId}/tables`), {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ from: 1, count: Number(count) || 1, seats: Number(seats) || 4 }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setFormError(body.message || 'Could not add those tables.');
        return;
      }
      await load();
    } catch (err) {
      setFormError('Could not add those tables.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (table) => {
    if (!window.confirm(`Remove table ${table.label}?`)) return;
    const response = await fetch(apiUrl(`/cart/owner/carts/${cartId}/tables/${table.id}`), {
      method: 'DELETE',
      headers: headers(),
    });
    if (response.ok) {
      setTables((prev) => prev.filter((row) => row.id !== table.id));
    }
  };

  const release = async (table) => {
    const response = await fetch(
      apiUrl(`/cart/owner/carts/${cartId}/tables/${table.id}/release`),
      { method: 'POST', headers: headers() },
    );
    if (response.ok) {
      await load();
    }
  };

  if (loading) {
    return <RoPageSkeleton title="Tables." lead="Loading floor plan…" variant="list" />;
  }

  return (
    <OwnerChrome
      kicker="Tables"
      title="A code for every table."
      lead="Guests scan the card on their table. The ticket arrives with that table number."
      nav={(
        <button className="ro-ghost" type="button" onClick={() => navigate('/restra-owner')}>
          Venues
        </button>
      )}
    >
      <VenueNav cartId={cartId} />
      {error && <p className="ro-error">{error}</p>}
      <form className="ro-bar" onSubmit={addOne}>
        <input aria-label="Table number" value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Table number, like 12 or Terrace" />
        <input aria-label="Seats" type="number" min="1" value={seats} onChange={(event) => setSeats(event.target.value)} style={{ maxWidth: 100 }} />
        <button className="ro-gold" type="submit" disabled={saving}>Add table</button>
        <input aria-label="How many numbered tables" type="number" min="1" max="40" value={count} onChange={(event) => setCount(event.target.value)} style={{ maxWidth: 90 }} />
        <button className="ro-ghost" type="button" onClick={addRange} disabled={saving}>Add 1 to {count || '…'}</button>
      </form>
      {formError && <p className="ro-form-error">{formError}</p>}
      <section className="ro-list">
        <h2>Tables</h2>
        {tables.length === 0 && (
          <div className="ro-empty">
            <h3>No tables yet.</h3>
            <p>Add the numbers guests sit at, then print each code.</p>
          </div>
        )}
        <div className="ro-table-grid">
          {tables.map((table) => (
            <article className="ro-table-card" key={table.id}>
              {codes[table.id] && <img src={codes[table.id]} alt={`QR for table ${table.label}`} />}
              <div>
                <div className="ro-title">
                  <h3>Table {table.label}</h3>
                  {table.occupied && <span className="ro-pill pending">In use</span>}
                </div>
                <p>{table.seats} seats</p>
                <div className="ro-actions-row">
                  {table.occupied && (
                    <button className="ro-ghost" type="button" onClick={() => release(table)}>Free seat</button>
                  )}
                  <button className="ro-icon danger" type="button" onClick={() => remove(table)} aria-label={`Remove table ${table.label}`}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </OwnerChrome>
  );
};

export default Tables;

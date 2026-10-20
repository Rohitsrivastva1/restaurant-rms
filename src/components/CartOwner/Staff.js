import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import OwnerChrome from './OwnerChrome';
import VenueNav from './VenueNav';
import { apiUrl } from '../../services/apiBase';

const Staff = () => {
  const { cartId } = useParams();
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', role: 'waiter' });

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  });

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(apiUrl(`/cart/owner/carts/${cartId}/workers`), {
          headers: authHeaders(),
        });
        if (!response.ok) throw new Error('staff');
        const data = await response.json();
        setWorkers(data.workers || []);
      } catch (err) {
        setError('Could not load staff.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [cartId]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addStaff = async (event) => {
    event.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      const response = await fetch(apiUrl(`/cart/owner/carts/${cartId}/workers`), {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(form),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        setFormError(body.message || 'Could not add this person.');
        return;
      }
      setWorkers((prev) => [body, ...prev]);
      setShowForm(false);
      setForm({ name: '', email: '', phone: '', password: '', role: 'waiter' });
    } catch (err) {
      setFormError('Could not add this person.');
    } finally {
      setSaving(false);
    }
  };

  const removeStaff = async (worker) => {
    if (!window.confirm(`Remove ${worker.name || 'this person'} from the venue?`)) return;
    const response = await fetch(apiUrl(`/cart/owner/carts/${cartId}/workers/${worker.userId}`), {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (response.ok) {
      setWorkers((prev) => prev.filter((row) => row.userId !== worker.userId));
    }
  };

  if (loading) {
    return (
      <div className="ro">
        <div className="ro-loading">Loading staff…</div>
      </div>
    );
  }

  return (
    <OwnerChrome
      kicker="Staff"
      title="People on the floor."
      lead="Waiters sign in with the email and password you set here."
      nav={(
        <button className="ro-ghost" type="button" onClick={() => navigate('/restra-owner')}>
          Venues
        </button>
      )}
      actions={(
        <button className="ro-gold" type="button" onClick={() => { setFormError(''); setShowForm(true); }}>
          <Plus size={16} />
          Add staff
        </button>
      )}
    >
      <VenueNav cartId={cartId} />
      {error && <p className="ro-error">{error}</p>}
      <section className="ro-list">
        <h2>Staff</h2>
        {!error && workers.length === 0 && (
          <div className="ro-empty">
            <h3>No staff yet.</h3>
            <p>Add the people who take orders and run the kitchen board.</p>
          </div>
        )}
        {workers.map((worker) => (
          <article className="ro-row" key={worker.id}>
            <div>
              <div className="ro-title">
                <h3>{worker.name}</h3>
                <span className="ro-pill active">{worker.role}</span>
              </div>
              <p>{worker.email}{worker.phone ? ` · ${worker.phone}` : ''}</p>
            </div>
            <button className="ro-icon danger" type="button" onClick={() => removeStaff(worker)} aria-label={`Remove ${worker.name}`}>
              <Trash2 size={16} />
            </button>
          </article>
        ))}
      </section>

      {showForm && (
        <div className="ro-shade" onClick={() => setShowForm(false)}>
          <div className="ro-modal" role="dialog" aria-labelledby="add-staff-title" onClick={(event) => event.stopPropagation()}>
            <div className="ro-modal-head">
              <h3 id="add-staff-title">Add staff</h3>
              <button className="ro-x" type="button" onClick={() => setShowForm(false)} aria-label="Close">×</button>
            </div>
            <form onSubmit={addStaff}>
              <div>
                <label htmlFor="staff-name">Name</label>
                <input id="staff-name" name="name" value={form.name} onChange={onChange} required placeholder="Name they answer to" />
              </div>
              <div>
                <label htmlFor="staff-email">Email</label>
                <input id="staff-email" name="email" type="email" value={form.email} onChange={onChange} required placeholder="They use this to sign in" />
              </div>
              <div className="ro-split two">
                <div>
                  <label htmlFor="staff-phone">Phone</label>
                  <input id="staff-phone" name="phone" value={form.phone} onChange={onChange} placeholder="Optional" />
                </div>
                <div>
                  <label htmlFor="staff-role">Role</label>
                  <select id="staff-role" name="role" value={form.role} onChange={onChange}>
                    <option value="waiter">Waiter</option>
                    <option value="cashier">Cashier</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="staff-password">Password</label>
                <input id="staff-password" name="password" type="text" value={form.password} onChange={onChange} required minLength={6} placeholder="At least 6 characters" />
              </div>
              {formError && <p className="ro-form-error">{formError}</p>}
              <div className="ro-actions">
                <button className="ro-ghost" type="button" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="ro-gold" type="submit" disabled={saving}>{saving ? 'Adding…' : 'Add staff'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </OwnerChrome>
  );
};

export default Staff;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import OwnerChrome from '../CartOwner/OwnerChrome';

const CartWorkerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('http://localhost:3000/cart/worker/carts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) throw new Error('venues');
        const data = await response.json();
        setCarts(data.carts || []);
      } catch (err) {
        setError('Could not load your venues.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="ro">
        <div className="ro-loading">Loading your shift…</div>
      </div>
    );
  }

  return (
    <OwnerChrome
      home="/restra-worker"
      kicker="Floor"
      title="Your venues."
      lead="Open a venue to take tickets through the kitchen."
      nav={(
        <div className="ro-user">
          <span><strong>{user?.name}</strong></span>
          <button className="ro-logout" type="button" onClick={logout}>
            <LogOut size={16} />
            Log out
          </button>
        </div>
      )}
    >
      {error && <p className="ro-error">{error}</p>}
      <section className="ro-list">
        <h2>Assigned venues</h2>
        {!error && carts.length === 0 && (
          <div className="ro-empty">
            <h3>No venue yet.</h3>
            <p>Ask the owner to add you to a venue.</p>
          </div>
        )}
        {carts.map((cart) => {
          const mine = (cart.workers || []).find((worker) => worker.userId === user?.id);
          return (
            <article className="ro-row" key={cart.id}>
              <div>
                <div className="ro-title">
                  <h3>{cart.name}</h3>
                  {mine?.role && <span className="ro-pill active">{mine.role}</span>}
                </div>
                {cart.location && <p>{cart.location}</p>}
              </div>
              <button className="ro-gold" type="button" onClick={() => navigate(`/restra-worker/orders/${cart.id}`)}>
                <ClipboardList size={16} />
                View orders
              </button>
            </article>
          );
        })}
      </section>
    </OwnerChrome>
  );
};

export default CartWorkerDashboard;

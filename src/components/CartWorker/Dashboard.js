import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import OwnerChrome from '../CartOwner/OwnerChrome';
import { RoPageSkeleton, RoRefreshBar } from '../CartOwner/RoSkeleton';
import { apiUrl } from '../../services/apiBase';
import { cacheGet, cacheSet } from '../../utils/fastCache';

const prefetchOrders = (cartId) => {
  const token = localStorage.getItem('token');
  if (!token || !cartId) return;
  fetch(apiUrl(`/cart/worker/carts/${cartId}/orders`), {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (!data) return;
      const prev = cacheGet(`worker-orders:${cartId}`, 120_000) || {};
      cacheSet(`worker-orders:${cartId}`, {
        ...prev,
        orders: data.orders || [],
      });
    })
    .catch(() => {});
};

const CartWorkerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cached = cacheGet('worker-dashboard', 120_000);
  const [carts, setCarts] = useState(cached?.carts || []);
  const [loading, setLoading] = useState(!cached);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      if (cached) setRefreshing(true);
      try {
        const response = await fetch(apiUrl('/cart/worker/carts'), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) throw new Error('venues');
        const data = await response.json();
        const list = data.carts || [];
        setCarts(list);
        cacheSet('worker-dashboard', { carts: list });
        // Warm first venue board in background
        if (list[0]?.id) prefetchOrders(list[0].id);
      } catch (err) {
        if (!cached) setError('Could not load your venues.');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
    load();
  }, []);

  if (loading && !carts.length) {
    return <RoPageSkeleton title="Your venues." lead="Loading your shift…" variant="list" />;
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
      <RoRefreshBar show={refreshing} label="Updating venues…" />
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
              <button
                className="ro-gold"
                type="button"
                onMouseEnter={() => prefetchOrders(cart.id)}
                onFocus={() => prefetchOrders(cart.id)}
                onTouchStart={() => prefetchOrders(cart.id)}
                onClick={() => navigate(`/restra-worker/orders/${cart.id}`)}
              >
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

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import OwnerChrome from './OwnerChrome';
import VenueNav from './VenueNav';
import { apiUrl } from '../../services/apiBase';

const VenueQr = () => {
  const { cartId } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [image, setImage] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const guestUrl = `${window.location.origin}/guest/${cartId}`;

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const [venueRes, qr] = await Promise.all([
          fetch(apiUrl(`/cart/owner/carts/${cartId}`), {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
          QRCode.toDataURL(guestUrl, { margin: 1, width: 480, color: { dark: '#1a120c', light: '#f5ecdd' } }),
        ]);
        if (!venueRes.ok) throw new Error('venue');
        const data = await venueRes.json();
        if (!alive) return;
        setVenue(data);
        setImage(qr);
      } catch (err) {
        if (alive) setError('Could not load this venue.');
      }
    };
    load();
    return () => {
      alive = false;
    };
  }, [cartId, guestUrl]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(guestUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setCopied(false);
    }
  };

  return (
    <OwnerChrome
      kicker="QR"
      title={venue?.name || 'Guest QR.'}
      lead="Print this or leave it on the table. Guests scan it and order from the menu."
      nav={(
        <button className="ro-ghost" type="button" onClick={() => navigate('/restra-owner')}>
          Venues
        </button>
      )}
    >
      <VenueNav cartId={cartId} />
      {error && <p className="ro-error">{error}</p>}
      {!error && (
        <section className="ro-qr-card">
          {image && <img src={image} alt={`QR code for ${venue?.name || 'this venue'}`} />}
          <div>
            <p className="ro-kicker">Guest link</p>
            <p className="ro-qr-url">{guestUrl}</p>
            {venue?.location && <p>{venue.location}</p>}
            <div className="ro-actions-row">
              <button className="ro-gold" type="button" onClick={copyLink}>{copied ? 'Copied' : 'Copy link'}</button>
              <a className="ro-ghost" href={guestUrl} target="_blank" rel="noreferrer">Open guest menu</a>
            </div>
          </div>
        </section>
      )}
    </OwnerChrome>
  );
};

export default VenueQr;

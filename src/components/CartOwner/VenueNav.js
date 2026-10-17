import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const LINKS = [
  ['menu', 'Menu'],
  ['orders', 'Orders'],
  ['staff', 'Staff'],
  ['qr', 'QR'],
];

const VenueNav = ({ cartId }) => {
  const { pathname } = useLocation();

  return (
    <nav className="ro-subnav" aria-label="Venue">
      {LINKS.map(([key, label]) => (
        <Link
          key={key}
          to={`/restra-owner/${key}/${cartId}`}
          className={pathname.includes(`/${key}/`) ? 'on' : ''}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default VenueNav;

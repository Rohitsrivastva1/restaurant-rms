import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './public.css';

const LINKS = [
  { to: '/', id: 'home', label: 'Home' },
  { to: '/about', id: 'about', label: 'About' },
  { to: '/pricing', id: 'pricing', label: 'Pricing' },
  { to: '/contact', id: 'contact', label: 'Contact' },
];

export default function PublicShell({ active, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sv">
      <header className={`sv-nav${open ? ' open' : ''}`}>
        <Link className="sv-logo" to="/">Servya <span>◆</span></Link>
        <button type="button" className="sv-menu-btn" onClick={() => setOpen((value) => !value)}>
          Menu
        </button>
        <nav className="sv-links">
          {LINKS.map((link) => (
            <Link key={link.id} to={link.to} className={active === link.id ? 'active' : ''}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="sv-actions">
          <Link className="sv-login" to="/login">Login</Link>
          <Link className="sv-trial" to="/cart-owner-signup">Start free trial</Link>
        </div>
      </header>
      {children}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
];

const TRIAL = '/cart-owner-signup';

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  const current = (to) => (pathname === to || (to === '/' && pathname === '/home') ? 'page' : undefined);

  return (
    <>
      <a className="hm-skip" href="#main">Skip to content</a>
      <header className="hm-nav">
        <div className="hm-wrap hm-nav-row">
          <Link className="hm-logo" to="/">Servya <i>◆</i></Link>
          <nav className="hm-links" aria-label="Primary">
            {LINKS.map((link) => (
              <Link key={link.to} to={link.to} aria-current={current(link.to)}>{link.label}</Link>
            ))}
            <Link className="hm-login" to="/login">Login</Link>
            <Link className="hm-btn primary hm-trial" to={TRIAL}>Start free trial</Link>
          </nav>
          <button
            className="hm-menu"
            type="button"
            aria-expanded={open}
            aria-controls="home-menu"
            aria-label="Open menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? '×' : '☰'}
          </button>
        </div>
      </header>
      <nav id="home-menu" className={`hm-drawer${open ? ' open' : ''}`} aria-label="Mobile" hidden={!open}>
        {LINKS.map((link) => (
          <Link key={link.to} to={link.to}>{link.label}</Link>
        ))}
        <Link to="/login">Login</Link>
        <Link to={TRIAL}>Start free trial</Link>
      </nav>
    </>
  );
}

export { TRIAL };

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './home.css';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  const current = (to) => {
    if (to === '/') return pathname === '/' || pathname === '/home' ? 'page' : undefined;
    if (pathname === to || pathname.startsWith(`${to}/`)) return 'page';
    return undefined;
  };

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
            <Link className="hm-login" to="/login">Log in</Link>
            <Link className="hm-btn primary hm-trial" to="/contact">Book a demo</Link>
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
        <Link to="/login">Log in</Link>
        <Link to="/contact">Book a demo</Link>
      </nav>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PLANS, TRIAL } from './content';
import './marketing.css';

const LINKS = [
  { to: '/', label: 'Home', id: 'home' },
  { to: '/about', label: 'About', id: 'about' },
  { to: '/pricing', label: 'Pricing', id: 'pricing' },
  { to: '/contact', label: 'Contact', id: 'contact' },
];

export function Photo({ src, alt, className = '' }) {
  return (
    <div className={`mk-photo ${className}`}>
      <img src={src} alt={`AI-generated sample image of ${alt}`} />
      <span className="mk-ai">AI-generated sample images</span>
    </div>
  );
}

export function Placeholder({ tag = 'Sample', children }) {
  return (
    <div className="mk-placeholder">
      {/* TODO(verify): replace this block before launch */}
      <div className="mk-tag">{tag}</div>
      {children}
    </div>
  );
}

export function FAQ({ items }) {
  return (
    <div className="mk-faq">
      {items.map((item, index) => (
        <details key={item.q} open={index === 0}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function PricingCards({ compact = false }) {
  return (
    <div className="mk-plans">
      {PLANS.map((plan) => (
        <article key={plan.name} className={`mk-plan${plan.hot ? ' hot' : ''}`}>
          {plan.hot && <div className="mk-badge">Most Popular</div>}
          <h3>{plan.name}</h3>
          <p>{plan.description}{(plan.name !== 'Free Trial') && <span className="mk-confirm">Confirm</span>}</p>
          <div className="mk-price">{plan.price}<small>{plan.period}</small></div>
          <ul>
            {(compact ? plan.features.slice(0, 4) : plan.features).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
            {!compact && plan.limitations.map((feature) => (
              <li key={feature} className="limit">{feature}</li>
            ))}
          </ul>
          <Link className={plan.hot ? 'mk-gold' : 'mk-ghost'} to={TRIAL}>{plan.cta}</Link>
        </article>
      ))}
    </div>
  );
}

export default function Shell({ active, title, children }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.title = title ? `${title} · Servya` : 'Servya';
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [title]);

  return (
    <div className="mk">
      <a className="mk-skip" href="#main">Skip to content</a>
      <div className="mk-strip">Sample content — AI-generated images and unverified details are marked</div>
      <header className={`mk-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="mk-wrap mk-nav-row">
          <Link className="mk-logo" to="/">Servya <span>◆</span></Link>
          <nav className="mk-links" aria-label="Primary">
            {LINKS.map((link) => (
              <Link key={link.id} to={link.to} aria-current={active === link.id ? 'page' : undefined}>{link.label}</Link>
            ))}
            <Link to="/login">Login</Link>
          </nav>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Link className="mk-gold mk-trial" to={TRIAL}>Start free trial</Link>
            <button className="mk-menu-btn" type="button" aria-expanded={open} aria-label="Open menu" onClick={() => setOpen((value) => !value)}>
              {open ? '×' : '☰'}
            </button>
          </div>
        </div>
      </header>
      <nav className={`mk-drawer${open ? ' open' : ''}`} aria-label="Mobile">
        {LINKS.map((link) => (
          <Link key={link.id} to={link.to} onClick={() => setOpen(false)}>{link.label}</Link>
        ))}
        <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
        <Link to={TRIAL} onClick={() => setOpen(false)}>Start free trial</Link>
      </nav>
      <main id="main">{children}</main>
      <footer className="mk-foot">
        <div className="mk-wrap mk-foot-grid">
          <div>
            <Link className="mk-logo" to="/">Servya <span>◆</span></Link>
            <p className="mk-lead" style={{ fontSize: 15 }}>QR menus, live orders and insights for restaurants, bars and hotels.</p>
            <p className="mk-note">Images on these pages are AI-generated samples, not a real venue.</p>
          </div>
          <div>
            <h3>Product</h3>
            {/* TODO(verify): no Features page exists; this points at the tools section. */}
            <Link to="/#tools">Features</Link>
            <Link to="/pricing">Pricing</Link>
            {/* TODO(verify): no demo page; Book a demo opens contact. */}
            <Link to="/contact">Demo</Link>
          </div>
          <div>
            <h3>Company</h3>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/samples">Cafe samples</Link>
            {/* TODO(verify): no careers page. */}
            <Link to="/contact">Careers</Link>
          </div>
          <div>
            <h3>Legal</h3>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cookies">Cookie</Link>
          </div>
        </div>
        <div className="mk-wrap mk-legal">© {new Date().getFullYear()} Servya. Sample marketing pages.</div>
      </footer>
      <div className="mk-bar">
        <Link className="mk-gold" to={TRIAL}>Start free trial</Link>
        <Link className="mk-ghost" to="/contact">Book a demo</Link>
      </div>
      <div className="mk-pad" />
    </div>
  );
}

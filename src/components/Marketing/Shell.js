import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PLANS } from './content';
import Nav from '../Home/Nav';
import '../Home/home.css';
import './marketing.css';

export function Photo({ src, alt, className = '' }) {
  return (
    <div className={`mk-photo ${className}`}>
      <img src={src} alt={alt} />
    </div>
  );
}

export function Placeholder({ tag, children }) {
  return (
    <div className="mk-placeholder">
      {tag ? <div className="mk-tag">{tag}</div> : null}
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
          <p>{plan.description}</p>
          <div className="mk-price">{plan.price}<small>{plan.period}</small></div>
          <ul>
            {(compact ? plan.features.slice(0, 4) : plan.features).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
            {!compact && plan.limitations.map((feature) => (
              <li key={feature} className="limit">{feature}</li>
            ))}
          </ul>
          <Link className={plan.hot ? 'mk-gold' : 'mk-ghost'} to="/contact">{plan.cta}</Link>
        </article>
      ))}
    </div>
  );
}

export default function Shell({ title, children }) {
  useEffect(() => {
    document.title = title || 'Servya';
  }, [title]);

  return (
    <div className="mk">
      <Nav />
      <main id="main">{children}</main>
      <footer className="mk-foot">
        <div className="mk-wrap mk-foot-grid">
          <div>
            <Link className="mk-logo" to="/">Servya <span>◆</span></Link>
            <p className="mk-lead" style={{ fontSize: 15 }}>Restaurant management for venues that care about every detail.</p>
            <p className="mk-note">QR table ordering, a kitchen board and clear reports for restaurants, cafes, bars and hotel dining rooms.</p>
            <p className="mk-note">hello@buildnaya.com · support@buildnaya.com</p>
            <p className="mk-note">BuildNaya, Sector 62, Noida 201308, India</p>
          </div>
          <div>
            <h3>Product</h3>
            <Link to="/#tools">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/contact">Book a demo</Link>
          </div>
          <div>
            <h3>Company</h3>
            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/samples">Menu themes</Link>
          </div>
          <div>
            <h3>Legal</h3>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
        <div className="mk-wrap mk-legal">© 2026 Servya, a BuildNaya product. All rights reserved.</div>
      </footer>
      <div className="mk-bar">
        <Link className="mk-gold" to="/contact">Book a demo</Link>
        <Link className="mk-ghost" to="/pricing">See plans</Link>
      </div>
      <div className="mk-pad" />
    </div>
  );
}

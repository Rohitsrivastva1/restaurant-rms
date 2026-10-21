import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="hm-foot">
      <div className="hm-wrap hm-foot-grid">
        <div className="hm-foot-brand">
          <Link className="hm-logo" to="/">Servya</Link>
          <p className="hm-lead" style={{ fontSize: 16, marginTop: 10 }}>Restaurant management for venues that care about every detail.</p>
          <p className="hm-note">QR table ordering, a kitchen board and clear reports for restaurants, cafes, bars and hotel dining rooms.</p>
          <p className="hm-note">hello@buildnaya.com · support@buildnaya.com</p>
          <p className="hm-note">BuildNaya, Sector 62, Noida 201308, India</p>
        </div>
        <div>
          <h2>Product</h2>
          <Link to="/#tools">Features</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/contact">Book a demo</Link>
        </div>
        <div>
          <h2>Company</h2>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/samples">Menu themes</Link>
        </div>
        <div>
          <h2>Legal</h2>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/cookies">Cookie Policy</Link>
        </div>
      </div>
      <div className="hm-wrap hm-note" style={{ marginTop: 28 }}>
        © 2026 Servya, a BuildNaya product. All rights reserved.
      </div>
    </footer>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="hm-foot">
      <div className="hm-wrap hm-foot-grid">
        <div className="hm-foot-brand">
          <Link className="hm-logo" to="/">Servya <i>◆</i></Link>
          <p className="hm-note">AI-generated sample images. Not a photograph of a real venue.</p>
        </div>
        <div>
          <h2>Product</h2>
          {/* TODO(verify): no Features page; links to the tools section */}
          <Link to="/#tools">Features</Link>
          <Link to="/pricing">Pricing</Link>
          {/* TODO(verify): no demo page */}
          <Link to="/contact">Demo</Link>
        </div>
        <div>
          <h2>Company</h2>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/samples">Cafe samples</Link>
          {/* TODO(verify): no careers page */}
          <Link to="/contact">Careers</Link>
        </div>
        <div>
          <h2>Legal</h2>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/cookies">Cookie</Link>
        </div>
      </div>
    </footer>
  );
}

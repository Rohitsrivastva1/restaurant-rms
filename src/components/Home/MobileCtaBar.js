import React from 'react';
import { Link } from 'react-router-dom';
import { TRIAL } from './Nav';

export default function MobileCtaBar() {
  return (
    <div className="hm-bar">
      <Link className="hm-btn primary" to={TRIAL}>Start free trial</Link>
      <Link className="hm-btn ghost" to="/contact">Book a demo</Link>
    </div>
  );
}

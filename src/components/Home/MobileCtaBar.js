import React from 'react';
import { Link } from 'react-router-dom';

export default function MobileCtaBar() {
  return (
    <div className="hm-bar">
      <Link className="hm-btn primary" to="/contact">Book a demo</Link>
      <Link className="hm-btn ghost" to="/pricing">See plans</Link>
    </div>
  );
}

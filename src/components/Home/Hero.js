import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hm-hero">
      <div className="hm-hero-media">
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img
          src="/images/hospitality/hero-steak-alt.png?v=2"
          alt="A seared steak plated on a candlelit restaurant table at night"
          width="640"
          height="620"
        />
      </div>
      <div className="hm-wrap hm-hero-copy">
        <div className="hm-eye">QR ordering · Kitchen board · Reports</div>
        <h1>The calm behind every <em>beautiful service.</em></h1>
        <p className="hm-lead">
          Servya puts your menu on every table as a QR code and sends each order straight to the kitchen screen. Your team spends less time relaying orders and more time with your guests.
        </p>
        <div className="hm-actions">
          <Link className="hm-btn primary" to="/contact">Book a demo</Link>
          <Link className="hm-btn ghost" to="/pricing">See plans</Link>
        </div>
        <p className="hm-micro">Scanned. Fired. Served.</p>
      </div>
      <div className="hm-wrap hm-designed">
        <b>DESIGNED FOR</b>
        <span>Restaurants</span>
        <span>Cafes</span>
        <span>Bars & lounges</span>
        <span>Hotel dining</span>
      </div>
    </section>
  );
}

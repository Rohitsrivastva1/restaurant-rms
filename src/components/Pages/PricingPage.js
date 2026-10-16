import React from 'react';
import { Link } from 'react-router-dom';
import Shell, { FAQ, PricingCards } from '../Marketing/Shell';
import { INCLUDED, PRICING_FAQ, TRIAL } from '../Marketing/content';

export default function PricingPage() {
  return (
    <Shell active="pricing" title="Pricing">
      <header className="mk-pagehead">
        <img src="/images/hospitality/dessert-gold.png" alt="AI-generated sample image of a chocolate dessert" />
        <div className="mk-scrim">
          <div className="mk-wrap">
            <div className="mk-kicker">Pricing</div>
            <h1>Simple, transparent <em>pricing.</em></h1>
            <p className="mk-lead">Choose the plan that fits. Free Trial, Starter and Pro use the prices and limits already on this site.</p>
          </div>
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap">
          <PricingCards />
          <p className="mk-note" style={{ marginTop: 28 }}>
            {/* TODO(verify): 14-day trial, no setup fees, 20% annual, payment methods */}
            Items still to confirm: a 14-day free trial, no setup fees, 20% off annual payment, and payment methods (cards, UPI, net banking, wallets).
            <span className="mk-confirm">Confirm</span>
          </p>
        </div>
      </section>

      <section className="mk-section" style={{ background: '#120D0A' }}>
        <div className="mk-wrap">
          <div className="mk-head"><h2>All plans include</h2></div>
          <div className="mk-included">
            {INCLUDED.map((item) => (
              <article key={item.title}><h3>{item.title}</h3><p className="mk-lead" style={{ fontSize: 15 }}>{item.body}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap mk-split">
          <div className="mk-photo">
            <img src="/images/hospitality/hotel-breakfast.png" alt="AI-generated sample image of a hotel breakfast tray" />
          </div>
          <div>
            <h2>Hotels & groups</h2>
            <p className="mk-lead">Multiple venues? Talk to us. <span className="mk-confirm">Confirm</span></p>
            {/* TODO(verify): multi-venue and hotel group support */}
            <ul className="mk-lead" style={{ paddingLeft: 18, marginTop: 16 }}>
              <li>More than one outlet on the same account</li>
              <li>Menus for the restaurant and the guest room</li>
              <li>A conversation before you pick a plan</li>
            </ul>
            <div className="mk-row"><Link className="mk-gold" to="/contact">Contact sales</Link></div>
          </div>
        </div>
      </section>

      <section className="mk-section" style={{ background: '#120D0A' }}>
        <div className="mk-wrap">
          <div className="mk-head"><h2>Pricing FAQ</h2></div>
          <FAQ items={PRICING_FAQ} />
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap" style={{ textAlign: 'left' }}>
          <h2>Ready when you are.</h2>
          <div className="mk-row">
            <Link className="mk-gold" to={TRIAL}>Start free trial</Link>
            <Link className="mk-ghost" to="/contact">Talk to us</Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}

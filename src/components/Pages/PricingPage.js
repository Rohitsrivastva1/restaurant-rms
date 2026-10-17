import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Shell, { FAQ } from '../Marketing/Shell';
import { formatPlanPrice, isIndia, planPriceNote } from '../../utils/planPrice';

const PLANS = [
  {
    name: 'Trial',
    tagline: 'For trying Servya at your venue.',
    inr: 0,
    includes: ['QR table ordering', 'Kitchen order board', 'Menu management with Excel import'],
    cta: 'Get started',
    hot: false,
  },
  {
    name: 'Starter',
    tagline: 'For a single restaurant, cafe, bar or lounge.',
    inr: 999,
    includes: ['Everything in Trial', 'Table management with QR codes', 'Staff accounts and roles', 'Reports dashboard', 'Guest feedback'],
    cta: 'Choose Starter',
    hot: true,
  },
  {
    name: 'Pro',
    tagline: 'For busier venues with larger teams.',
    inr: 1999,
    includes: ['Everything in Starter', 'Unlimited tables', 'Priority support'],
    cta: 'Choose Pro',
    hot: false,
  },
];

const FAQ_ITEMS = [
  {
    q: 'How do I pay?',
    a: 'Write to hello@buildnaya.com and we’ll set up billing with you. Online payment inside Servya is not available yet.',
  },
  {
    q: 'Can I start on Trial and move up later?',
    a: 'Yes. Trial is for trying Servya at your venue. When you are ready for staff roles, reports or a busier service, talk to us and we’ll move you to Starter or Pro.',
  },
  {
    q: 'What if I run more than one venue?',
    a: 'Tell us how many dining rooms you run. We’ll say honestly what Servya covers today and what still needs a conversation.',
  },
];

export default function PricingPage() {
  const india = isIndia();
  useEffect(() => {
    const tag = document.querySelector('meta[name="description"]');
    if (tag) {
      tag.setAttribute('content', 'Compare Servya plans for restaurants, cafes, bars and hotel dining: QR table ordering, kitchen board, menu, staff and reports. Talk to us.');
    }
  }, []);

  return (
    <Shell active="pricing" title="Servya Pricing: Plans for Restaurants & Bars">
      <header className="mk-pagehead">
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img src="/images/hospitality/hero-steak-alt.png" alt="A seared steak plated on a candlelit restaurant table" />
        <div className="mk-scrim">
          <div className="mk-wrap">
            <div className="mk-kicker">Pricing</div>
            <h1>Simple, transparent <em>pricing.</em></h1>
            <p className="mk-lead">Choose the plan that fits your venue today and change it as you grow. Not sure which one fits? Talk to us and we’ll give you a straight answer.</p>
          </div>
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap">
          <div className="mk-plans">
            {PLANS.map((plan) => (
              <article key={plan.name} className={`mk-plan${plan.hot ? ' hot' : ''}`}>
                {plan.hot && <div className="mk-badge">Recommended</div>}
                <h3>{plan.name}</h3>
                <p>{plan.tagline}</p>
                <div className="mk-price">{formatPlanPrice(plan.inr, india)}<small>/month</small></div>
                <ul>
                  {plan.includes.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <Link className={plan.hot ? 'mk-gold' : 'mk-ghost'} to="/contact">{plan.cta}</Link>
              </article>
            ))}
          </div>
          <p className="mk-note" style={{ marginTop: 28 }}>
            {planPriceNote(india)} Need something different? Talk to us.
          </p>
        </div>
      </section>

      <section className="mk-section" style={{ background: '#120D0A' }}>
        <div className="mk-wrap">
          <div className="mk-kicker">All plans include</div>
          <h2>Essentials, on every plan.</h2>
          <div className="mk-included">
            {[
              ['QR table ordering', 'Guests order from their own phone, with no app to install.'],
              ['Kitchen board', 'Every order on one screen, with table and items.'],
              ['Menu & tables', 'Excel import, easy edits and a QR code for every table.'],
              ['Team access', 'Separate roles for owners, managers and chefs.'],
            ].map(([title, body]) => (
              <article key={title}><h3>{title}</h3><p className="mk-lead" style={{ fontSize: 15 }}>{body}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap mk-split">
          <div className="mk-photo">
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img src="/images/hospitality/bar-pour.png?v=3" alt="An amber cocktail being poured at a back bar" />
          </div>
          <div>
            <div className="mk-kicker">Hotels, groups & larger venues</div>
            <h2>Something bigger? <em>Talk to us.</em></h2>
            <p className="mk-lead">If you run a hotel, several outlets or a venue with specific needs, tell us how your service works. We’ll tell you honestly what Servya can do today and what we’re building.</p>
            <ul className="mk-lead" style={{ paddingLeft: 18 }}>
              <li>Help planning your menu, tables and staff roles</li>
              <li>A walkthrough with your own menu</li>
              <li>Straight answers on what’s live and what’s on the roadmap</li>
            </ul>
            <div className="mk-row"><Link className="mk-gold" to="/contact">Contact us</Link></div>
          </div>
        </div>
      </section>

      <section className="mk-section" style={{ background: '#120D0A' }}>
        <div className="mk-wrap">
          <div className="mk-kicker">Pricing FAQ</div>
          <h2>Common questions about our pricing.</h2>
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap">
          <div className="mk-kicker">Ready when you are</div>
          <h2>Your kitchen. Your guests. <em>Your growth.</em></h2>
          <p className="mk-lead">Not sure which plan fits? Tell us about your venue and we’ll recommend one.</p>
          <div className="mk-row">
            <Link className="mk-gold" to="/contact">Book a demo</Link>
            <Link className="mk-ghost" to="/contact">Contact us</Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}

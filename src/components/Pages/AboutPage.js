import React from 'react';
import { Link } from 'react-router-dom';
import Shell, { Photo, Placeholder } from '../Marketing/Shell';
import { TRIAL, VALUES } from '../Marketing/content';

const WHY = [
  ['i', 'Made in India', 'Built for food businesses and the way they actually serve. ', true],
  ['ii', 'Easy to use', 'No technical expertise required. Get started in minutes, not hours.', false],
  ['iii', 'Affordable', 'Pricing that works for small businesses, not only large groups.', false],
  ['iv', 'Support', 'Real people who understand service and are here to help.', false],
  ['v', 'Reliable', 'Secure, cloud-based infrastructure. No uptime percentage is claimed here.', false],
  ['vi', 'Passionate', 'We care about the service your guests remember.', false],
];

export default function AboutPage() {
  return (
    <Shell active="about" title="About">
      <header className="mk-pagehead">
        <img src="/images/hospitality/kitchen-pass.png" alt="AI-generated sample image of a chef plating" />
        <div className="mk-scrim">
          <div className="mk-wrap">
            <div className="mk-kicker">About</div>
            <h1>Technology that serves <em>the service.</em></h1>
            <p className="mk-lead">Tools for the menu, the queue and the numbers — so the room can stay focused on the guest.</p>
          </div>
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap mk-split">
          <div>
            <h2>Our story</h2>
            <p className="mk-lead">Servya started from a simple observation: people running food businesses were stuck with systems that did not match the way they serve. They needed something they could set up quickly, not a toolkit built only for a large chain.</p>
            <p className="mk-lead">The product is QR menus, order notifications and insights. We do not publish venue counts, order totals or sales lifts until those numbers are verified.</p>
          </div>
          <Placeholder tag="Our impact · to verify">
            {/* TODO(verify): venues, orders, sales change, satisfaction */}
            {['Venues', 'Orders', 'Sales change', 'Satisfaction'].map((label) => (
              <p key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #8C7A62', padding: '12px 0', fontSize: 18 }}>
                <span>{label}</span><strong>—</strong>
              </p>
            ))}
          </Placeholder>
        </div>
      </section>

      <section className="mk-section" style={{ paddingTop: 0 }}>
        <div className="mk-wrap mk-story-photo">
          <Photo src="/images/hospitality/hero-steak.png" alt="a dining room" />
          <Photo src="/images/hospitality/bar-cocktail.png" alt="a cocktail pour" />
          <Photo src="/images/hospitality/hotel-breakfast.png" alt="a breakfast tray" />
        </div>
      </section>

      <section className="mk-section" style={{ background: '#120D0A' }}>
        <div className="mk-wrap" style={{ display: 'grid', gap: 18 }}>
          <div className="mk-split">
            <article className="mk-info"><h2>Mission</h2><p className="mk-lead">To simplify restaurant management through smart, affordable and user-friendly tools, so people can stay with the food and the guest.</p></article>
            <article className="mk-info"><h2>Vision</h2><p className="mk-lead">A world where food businesses of every size can use technology that fits the way they serve.</p></article>
          </div>
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap">
          <div className="mk-head"><h2>Core values</h2><p className="mk-lead">The principles already published on this site, with two titles still to confirm.</p></div>
          <div className="mk-values">
            {VALUES.map((value) => (
              <article key={value.title}><h3>{value.title}</h3><p>{value.body}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section" style={{ background: '#120D0A' }}>
        <div className="mk-wrap">
          <div className="mk-head"><h2>Meet our team</h2></div>
          <div className="mk-team">
            {[1, 2, 3].map((n) => (
              <Placeholder key={n} tag="Sample team card">
                {/* TODO(verify): no real names or bios until confirmed */}
                <h3 style={{ marginTop: 12 }}>Name Surname</h3>
                <p>Role to be confirmed. No biography is shown.</p>
              </Placeholder>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap">
          <div className="mk-head"><h2>Why choose Servya</h2></div>
          <div className="mk-why">
            {WHY.map(([num, title, body, confirm]) => (
              <article key={num}>
                <div className="mk-roman">{num}</div>
                <h3>{title}{confirm && <span className="mk-confirm">Confirm</span>}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section" style={{ paddingTop: 0 }}>
        <div className="mk-wrap">
          <div className="mk-band">
            <img src="/images/hospitality/hero-steak-alt.png" alt="AI-generated sample image of a plated steak" />
            <div className="mk-scrim">
              <h2>Come see the menu <em>your guests will.</em></h2>
              <div className="mk-row">
                <Link className="mk-gold" to={TRIAL}>Start free trial</Link>
                <Link className="mk-ghost" to="/contact">Book a demo</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}

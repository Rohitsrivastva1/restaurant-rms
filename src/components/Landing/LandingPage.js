import React from 'react';
import { Link } from 'react-router-dom';
import Shell, { Photo, Placeholder, PricingCards } from '../Marketing/Shell';
import { INCLUDED, TRIAL, VALUES } from '../Marketing/content';

const features = [
  {
    n: '01',
    title: 'Create and share QR menus in minutes',
    body: 'Build a menu guests can open from the table. Share the QR and update dishes without reprinting.',
    image: '/images/hospitality/rooftop.png',
    alt: 'string lights over an outdoor dining terrace',
  },
  {
    n: '02',
    title: 'Manage orders with notifications',
    body: 'New orders show up in a live queue so the pass can see what is new, cooking, or ready.',
    image: '/images/hospitality/kitchen-pass.png',
    alt: 'a chef finishing a plate at the pass',
  },
  {
    n: '04',
    title: 'Customize menu themes to fit your brand',
    body: 'Choose a theme so the guest menu feels like the room, not a generic template.',
    image: '/images/hospitality/dessert-gold.png',
    alt: 'a chocolate dessert with gold leaf',
  },
];

export default function LandingPage() {
  return (
    <Shell active="home" title="Home">
      <section className="mk-hero">
        <div className="mk-hero-photo">
          <img src="/images/hospitality/hero-steak-alt.png" alt="AI-generated sample image of a plated steak in a dining room" />
          <span className="mk-ai">AI-generated sample images</span>
        </div>
        <div className="mk-wrap mk-hero-copy">
          <div className="mk-kicker">QR menus · Live orders · Insights</div>
          <h1>The calm behind every <em>beautiful service.</em></h1>
          <p className="mk-lead">Servya brings QR menus, live order management and sales insights to restaurants, bars and hotels — so your guest sees an elegant menu and your team sees a clear queue.</p>
          <div className="mk-row">
            <Link className="mk-gold" to={TRIAL}>Start free trial</Link>
            <Link className="mk-ghost" to="/pricing">See plans</Link>
          </div>
          <p className="mk-micro">Seared. Smoked. Served on time.</p>
          <p className="mk-designed">
            Designed for fine dining · bars and lounges · hotels and room service
            {/* TODO(verify): in-room dining, bar QR and hotel positioning */}
            <span className="mk-confirm">Confirm</span>
          </p>
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap">
          <div className="mk-head">
            <h2>From tableside to <em>room service.</em></h2>
            <p className="mk-lead">One system for the dining room, the bar and the guest room — the same QR menu, the same live queue.</p>
          </div>
          <div className="mk-venues">
            <article className="mk-venue">
              <div className="mk-venue-photo"><img src="/images/hospitality/hero-steak.png" alt="AI-generated sample image of a candlelit dining room" /></div>
              <div className="mk-venue-copy">
                <p>Dry-aged. Candlelit. Perfectly timed.</p>
                <h3>Fine dining</h3>
                <p className="mk-body">Tasting and à la carte menus, with orders reaching the pass when they are placed.</p>
                <span className="mk-confirm">Confirm</span>
              </div>
            </article>
            <article className="mk-venue">
              <div className="mk-venue-photo"><img src="/images/hospitality/bar-cocktail.png" alt="AI-generated sample image of a cocktail being poured" /></div>
              <div className="mk-venue-copy">
                <p>Smoke, citrus, one perfect pour.</p>
                <h3>Bars & lounges</h3>
                <p className="mk-body">A bar menu guests can browse from the sofa, with drinks routed to the bar.</p>
                <span className="mk-confirm">Confirm</span>
              </div>
            </article>
            <article className="mk-venue">
              <div className="mk-venue-photo"><img src="/images/hospitality/hotel-breakfast.png" alt="AI-generated sample image of a breakfast tray by a window" /></div>
              <div className="mk-venue-copy">
                <p>Breakfast in bed, before the second alarm.</p>
                <h3>Hotels & room service</h3>
                <p className="mk-body">In-room dining and restaurant menus from one place, with orders tagged by room.</p>
                <span className="mk-confirm">Confirm</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="mk-section" id="tools" style={{ background: '#120D0A' }}>
        <div className="mk-wrap">
          <div className="mk-head">
            <h2>Four tools. <em>One quiet system.</em></h2>
            <p className="mk-lead">Everything you need to run the menu and the queue — without adding noise to the floor.</p>
          </div>
          <div style={{ display: 'grid', gap: 72 }}>
            <div className="mk-split">
              <Photo src={features[0].image} alt={features[0].alt} />
              <div className="mk-copy">
                <div className="mk-num">{features[0].n}</div>
                <h3>{features[0].title}</h3>
                <p>{features[0].body}</p>
              </div>
            </div>
            <div className="mk-split flip">
              <Photo src={features[1].image} alt={features[1].alt} />
              <div className="mk-copy">
                <div className="mk-num">{features[1].n}</div>
                <h3>{features[1].title}</h3>
                <p>{features[1].body}</p>
              </div>
            </div>
            <div className="mk-split">
              <div className="mk-media mk-chart" role="img" aria-label="Sample chart of weekly orders. Illustrative data only.">
                <div className="mk-tag">Sample data</div>
                <div className="mk-bars" aria-hidden="true">
                  <span style={{ height: '42%' }} /><span style={{ height: '68%' }} /><span style={{ height: '54%' }} /><span style={{ height: '86%' }} /><span style={{ height: '73%' }} /><span style={{ height: '90%' }} />
                </div>
                <p className="mk-note">Illustrative chart, sample data.</p>
              </div>
              <div className="mk-copy">
                <div className="mk-num">03</div>
                <h3>Track sales and insights</h3>
                <p>See which dishes move and how the week is going, from the same place you watch the queue.</p>
              </div>
            </div>
            <div className="mk-split flip">
              <Photo src={features[2].image} alt={features[2].alt} />
              <div className="mk-copy">
                <div className="mk-num">{features[2].n}</div>
                <h3>{features[2].title}</h3>
                <p>{features[2].body}</p>
                <div className="mk-swatches" aria-hidden="true">
                  <i style={{ background: '#1A120C' }} /><i style={{ background: '#C9A45C' }} /><i style={{ background: '#7A5A1E' }} /><i style={{ background: '#F5ECDD' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap mk-split">
          <div>
            <h2>Three simple steps <em>to service.</em></h2>
            <div className="mk-steps" style={{ marginTop: 28 }}>
              <div className="mk-step"><b>1</b><div><h3>Build your menu</h3><p className="mk-lead" style={{ marginTop: 6 }}>Add dishes, prices and a theme.</p></div></div>
              <div className="mk-step"><b>2</b><div><h3>Share your QR</h3><p className="mk-lead" style={{ marginTop: 6 }}>Put it on the table, the bar or the room folder.</p></div></div>
              <div className="mk-step"><b>3</b><div><h3>Serve with clarity</h3><p className="mk-lead" style={{ marginTop: 6 }}>Watch new, cooking and ready in one queue.</p></div></div>
            </div>
          </div>
          <div>
            <div className="mk-mocks">
              <div className="mk-phone" role="img" aria-label="Illustrative phone menu with four sample dishes">
                <header><span>Menu</span><span>Table 12</span></header>
                {['Steak frites', 'Citrus highball', 'Garden salad', 'Gold leaf tart'].map((item) => (
                  <div className="mk-item" key={item}><span>{item}</span><span>···</span></div>
                ))}
                <div className="mk-cart">View order</div>
              </div>
              <div className="mk-dash" role="img" aria-label="Illustrative live dashboard. Order 1234 New, 1235 Cooking, 1236 Ready.">
                <header><span>Live dashboard</span><span>Sample</span></header>
                <div className="mk-order"><span>Order #1234</span><span className="mk-pill new">New</span></div>
                <div className="mk-order"><span>Order #1235</span><span className="mk-pill cooking">Cooking</span></div>
                <div className="mk-order"><span>Order #1236</span><span className="mk-pill ready">Ready</span></div>
                <div className="mk-toast">New order · Table 12 — kitchen notified</div>
              </div>
            </div>
            <p className="mk-note">Illustrative UI mock-ups, sample data.</p>
          </div>
        </div>
      </section>

      <section className="mk-section" style={{ paddingTop: 0 }}>
        <div className="mk-wrap">
          <div className="mk-band">
            <img src="/images/hospitality/kitchen-pass.png" alt="AI-generated sample image of plating in a kitchen" />
            <div className="mk-scrim">
              <h2>Great hospitality deserves <em>great technology.</em></h2>
              <div className="mk-row">
                <Link className="mk-gold" to={TRIAL}>Join the movement</Link>
                <Link className="mk-ghost" to="/about">Learn more</Link>
              </div>
              <div className="mk-values">
                {VALUES.map((value) => (
                  <article key={value.title}>
                    <h3>{value.title}</h3>
                    <p>{value.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap">
          <div className="mk-head"><h2>Voices from the floor.</h2></div>
          <div className="mk-quotes">
            {[1, 2, 3].map((n) => (
              <Placeholder key={n} tag="Sample testimonial">
                <p className="mk-lead" style={{ fontFamily: '"Bodoni Moda", Georgia, serif', fontStyle: 'italic', fontSize: 22, color: '#C9BBA3' }}>
                  Sample testimonial — replace with a real customer quote.
                </p>
              </Placeholder>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section" style={{ background: '#120D0A' }}>
        <div className="mk-wrap">
          <div className="mk-head">
            <h2>Simple pricing.</h2>
            <p className="mk-lead">Free Trial, Starter and Pro. Compare the full list on the pricing page.</p>
          </div>
          <PricingCards compact />
          <div className="mk-row"><Link className="mk-ghost" to="/pricing">Compare all plans</Link></div>
          <div className="mk-included" style={{ marginTop: 48 }}>
            {INCLUDED.map((item) => (
              <article key={item.title}><h3>{item.title}</h3><p className="mk-lead" style={{ fontSize: 15 }}>{item.body}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section" style={{ paddingTop: 0 }}>
        <div className="mk-wrap">
          <div className="mk-band">
            <img src="/images/hospitality/rooftop.png" alt="AI-generated sample image of a rooftop at dusk" />
            <div className="mk-scrim">
              <div className="mk-kicker">Powered by Servya</div>
              <h2>Your kitchen. Your guests. <em>Your growth.</em></h2>
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

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Shell from '../Marketing/Shell';

const TODAY = [
  'QR table ordering',
  'Kitchen order board',
  'Menu management with Excel import',
  'Tables and QR codes',
  'Staff and roles',
  'Reports dashboard',
  'Guest feedback',
];

const VALUES = [
  ['Empowerment', 'We build tools that put owners and their teams in control, not software they have to work around.'],
  ['Simplicity', 'If a feature needs a manual, we haven’t finished it. Servya should make sense on the first night.'],
  ['Trust', 'We tell you what Servya does today and what it doesn’t yet do. No inflated numbers, no surprises.'],
  ['Purposeful innovation', 'We add features that solve real problems on the floor or in the kitchen, not features for a brochure.'],
  ['Community growth', 'We do well only when the venues we work with do well.'],
];

const WHY = [
  ['i', 'Built for service', 'Designed around how a dining room actually runs, from the table and the pass to the end of the night.'],
  ['ii', 'Easy to start', 'Import your menu from Excel, add your tables, print your QR codes. You don’t need technical skills.'],
  ['iii', 'Fair pricing', 'Plans for a single venue and room to grow beyond it.'],
  ['iv', 'Real people', 'You talk to the team that builds Servya, not a ticket queue.'],
  ['v', 'Honest about the roadmap', 'We say clearly what is live and what is coming, and we never sell a feature before it exists.'],
  ['vi', 'Made with care', 'We obsess over the small details that make service calm.'],
];

export default function AboutPage() {
  useEffect(() => {
    const tag = document.querySelector('meta[name="description"]');
    if (tag) {
      tag.setAttribute('content', 'Servya is restaurant and cafe management software from BuildNaya in Noida, built to help hospitality teams take orders and run service with less effort.');
    }
  }, []);

  return (
    <Shell active="about" title="About Servya: Restaurant Software Built by BuildNaya">
      <header className="mk-pagehead">
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img src="/images/hospitality/hero-steak-alt.png" alt="A seared steak plated in a candlelit dining room" />
        <div className="mk-scrim">
          <div className="mk-wrap">
            <div className="mk-kicker">About Servya</div>
            <h1>Technology that serves <em>the service.</em></h1>
            <p className="mk-lead">We build software that takes the busywork out of hospitality, so your team’s attention goes to the guest instead of the paperwork.</p>
          </div>
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap mk-split mk-story">
          <div>
            <div className="mk-kicker">Our story</div>
            <h2>Born from a simple observation.</h2>
            <p className="mk-lead">On a busy night, a lot of a restaurant’s effort goes into carrying information. Orders get written on a pad, walked to the kitchen and read back. Menus get reprinted every time a price changes. Sales get added up after closing.</p>
            <p className="mk-lead">We built Servya to move that information on its own. The guest orders from the table, the kitchen reads one screen, and the owner sees the numbers without a spreadsheet. The same team can run a smoother service, and nobody has to rush.</p>
            <p className="mk-lead">Servya is built by BuildNaya in Noida, India.</p>
          </div>
          <article className="mk-info mk-today">
            <h3>What Servya does today</h3>
            <ul>
              {TODAY.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </div>
      </section>

      <section className="mk-section" style={{ paddingTop: 0 }}>
        <div className="mk-wrap mk-story-photo">
          <figure className="mk-photo">
            <img src="/images/hospitality/hero-steak.png" alt="A seared steak on a dark plate in a dimly lit dining room" />
            <figcaption>The dining room</figcaption>
          </figure>
          <figure className="mk-photo">
            <img src="/images/hospitality/bar-cocktail.png" alt="A bartender pouring an amber cocktail in front of a lit back bar" />
            <figcaption>The bar</figcaption>
          </figure>
          <figure className="mk-photo">
            <img src="/images/hospitality/bar-pour.png?v=3" alt="An amber cocktail being poured at a back bar" />
            <figcaption>The pour</figcaption>
          </figure>
        </div>
      </section>

      <section className="mk-section" style={{ background: '#120D0A' }}>
        <div className="mk-wrap mk-split">
          <article className="mk-info">
            <h2>Simple, affordable, elegant.</h2>
            <p className="mk-lead">To give every restaurant, cafe and bar simple, affordable tools for orders, kitchen and menus, so teams spend their time on guests and not on paperwork.</p>
          </article>
          <article className="mk-info">
            <h2>A world of great rooms.</h2>
            <p className="mk-lead">A world where every venue, from a neighbourhood cafe to a hotel dining room, runs on technology that is as considered as its service.</p>
          </article>
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap">
          <div className="mk-kicker">Our core values</div>
          <h2>The principles that guide everything we do.</h2>
          <div className="mk-values">
            {VALUES.map(([title, body], index) => (
              <article key={title}><h3>{index + 1}. {title}</h3><p>{body}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section" style={{ background: '#120D0A' }}>
        <div className="mk-wrap">
          <div className="mk-kicker">Who we are</div>
          <h2>The people behind Servya.</h2>
          <p className="mk-lead">Servya is designed, built and supported by BuildNaya in Noida. We’re a small team, so when you write to us, the people who build the product read your message.</p>
          <div className="mk-row"><Link className="mk-gold" to="/contact">Write to us →</Link></div>
        </div>
      </section>

      <section className="mk-section">
        <div className="mk-wrap">
          <div className="mk-kicker">Why Servya</div>
          <h2>Different, because we understand your business.</h2>
          <div className="mk-why">
            {WHY.map(([num, title, body]) => (
              <article key={num}>
                <div className="mk-roman">{num}</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-section" style={{ paddingTop: 0 }}>
        <div className="mk-wrap">
          <div className="mk-band mk-close">
            <img src="/images/hospitality/hero-steak-alt.png" alt="A seared steak plated on a candlelit restaurant table" />
            <div className="mk-scrim">
              <div className="mk-kicker">Ready to talk?</div>
              <h2>See it with <em>your own menu.</em></h2>
              <div className="mk-row">
                <Link className="mk-gold" to="/contact">Book a demo</Link>
                <Link className="mk-ghost" to="/contact">Contact us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Nav from './Nav';
import Hero from './Hero';
import VenueCard from './VenueCard';
import FeatureSplit from './FeatureSplit';
import PhoneMock from './PhoneMock';
import DashboardMock from './DashboardMock';
import CtaBand from './CtaBand';
import Footer from './Footer';
import MobileCtaBar from './MobileCtaBar';
import { formatPlanPrice, isIndia, planPriceNote } from '../../utils/planPrice';

const FAQ = [
  ['Do guests need to download an app?', 'No. Guests scan the QR code on their table with their phone camera, and your menu opens in the browser.'],
  ['How do orders reach the kitchen?', 'Every order goes onto the kitchen board, a screen your chefs keep open on a tablet, laptop or monitor. It shows each order with its table number and items.'],
  ['Can I import my existing menu?', 'Yes. Upload your menu as an Excel sheet, or add items one at a time. You can edit dishes, prices and categories at any time.'],
  ['What equipment do I need?', 'A screen for the kitchen (any tablet, laptop or monitor with a modern web browser) and printed QR codes for your tables. Servya doesn’t need special hardware.'],
  ['Can I control what each staff member can see and do?', 'Yes. Servya has separate roles for owners, admins, managers and chefs. A chef sees the kitchen board, and owners and managers see menus, tables, staff and reports.'],
  ['Can guests pay through Servya?', 'Not yet. Online payment is in development. For now, guests settle the bill the way they do today: at the table, at the counter or at checkout.'],
  ['Does Servya work for bars and hotels?', 'Servya works wherever guests order from a table or seat with a QR code, including bars, lounges and hotel restaurants. Room service isn’t something we offer yet. If you need it, talk to us.'],
  ['How do I get started?', 'Book a demo or write to hello@buildnaya.com. We’ll show you Servya with your own menu and talk you through setting up your tables and team.'],
];

const PLANS = [
  {
    name: 'Trial',
    inr: 0,
    tagline: 'For trying Servya at your venue.',
    points: ['QR table ordering', 'Kitchen board', 'Excel menu import'],
    cta: 'Get started',
  },
  {
    name: 'Starter',
    inr: 999,
    tagline: 'For a single restaurant, cafe, bar or lounge.',
    points: ['Everything in Trial', 'Staff roles', 'Reports and guest feedback'],
    cta: 'Choose Starter',
  },
  {
    name: 'Pro',
    inr: 1999,
    tagline: 'For busier venues with larger teams.',
    points: ['Everything in Starter', 'Unlimited tables', 'Priority support'],
    cta: 'Choose Pro',
  },
];

function useHomeMeta() {
  useEffect(() => {
    document.title = 'Servya: QR Ordering & Kitchen Board for Restaurants';
    const tag = document.querySelector('meta[name="description"]');
    if (tag) {
      tag.setAttribute('content', 'Servya gives restaurants, cafes, bars and hotel dining rooms QR table ordering, a kitchen order board, menu and staff management, and clear reports.');
    }
  }, []);
}

export default function Home() {
  useHomeMeta();
  const india = isIndia();
  useEffect(() => {
    const nodes = document.querySelectorAll('.hm [data-reveal]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  return (
    <div className="hm">
      <Nav />
      <main id="main">
        <Hero />

        <section className="hm-section">
          <div className="hm-wrap">
            <div className="hm-eye">Built for hospitality</div>
            <h2>From the first table to <em>the last pour.</em></h2>
            <p className="hm-lead">One system for the dining room, the bar and the lounge. Guests order from a QR code at their seat. The kitchen sees every order on one board.</p>
            <div className="hm-venues">
              <VenueCard image="/images/hospitality/hero-steak.png" alt="a seared steak on a dark plate in a dimly lit dining room" line="Seated. Scanned. Sorted." title="Restaurants & cafes" body="Guests browse your full menu and order from the table. The order reaches the kitchen with its table number on it." />
              <VenueCard image="/images/hospitality/bar-cocktail.png" alt="a bartender pouring an amber cocktail with a flamed orange peel in front of a lit back bar" line="Smoke, citrus, one perfect pour." title="Bars & lounges" body="A drinks menu guests can open from the sofa or the bar counter, without waiting to catch someone’s eye." />
              <VenueCard image="/images/hospitality/hotel-breakfast.png" alt="a breakfast tray with a croissant, fruit and orange juice beside a bright window" line="Breakfast, unhurried." title="Hotel restaurants & lounges" body="Give each restaurant table and lounge seat its own QR code, and run your menu, staff and reports from one place." />
            </div>
          </div>
        </section>

        <section className="hm-section" id="tools" style={{ background: '#120D0A' }}>
          <div className="hm-wrap">
            <div className="hm-eye">One simple system</div>
            <h2>Four tools. <em>One quiet system.</em></h2>
            <p className="hm-lead">Everything you need to take orders, run the kitchen and understand your business, without adding noise to the floor.</p>
            <FeatureSplit numeral="01" title="QR table ordering" body="Every table gets its own QR code. Guests scan it, browse the menu and place their order from their own phone, with no app to download." aside="Scan. Browse. Order.">
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img src="/images/hospitality/rooftop.png?v=3" alt="Rooftop lounge table at dusk with a cocktail and small plates" />
            </FeatureSplit>
            <FeatureSplit flip numeral="02" title="A kitchen board that keeps the pass clear" body="New orders go straight to the kitchen screen with the table and every item listed, so no one has to carry a docket or shout it across the floor." aside="Fired. Plated. Out.">
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img src="/images/hospitality/hero-steak-alt.png" alt="A seared steak plated in a candlelit dining room" />
            </FeatureSplit>
            <FeatureSplit numeral="03" title="Reports that show what’s working" body="See your orders and sales on one dashboard: what sells, at which tables, and on which days." aside="Know your best night.">
              <div className="hm-chart" role="img" aria-label="Weekly sales chart from Monday to Sunday, with Saturday as the busiest day.">
                <div className="hm-chart-top"><span>Reports</span><span>This week</span></div>
                <div className="hm-bars" aria-hidden="true">
                  {[['Mon', 42], ['Tue', 55], ['Wed', 48], ['Thu', 74], ['Fri', 63], ['Sat', 90], ['Sun', 70]].map(([day, height]) => (
                    <span key={day}><i style={{ height: `${height}%` }} />{day}</span>
                  ))}
                </div>
              </div>
            </FeatureSplit>
            <FeatureSplit flip numeral="04" title="Your menu and tables, organised" body="Add dishes one by one or import your whole menu from an Excel sheet. Edit prices, categories and items whenever you like, and manage your tables and their QR codes in the same place." aside="Your menu, in one sheet.">
              <div className="hm-chart" role="img" aria-label="Menu categories: starters, mains, drinks, and tables with QR codes.">
                <div className="hm-chart-top"><span>Menu</span><span>Excel import</span></div>
                {[
                  ['Burrata, chilli oil', '₹420'],
                  ['Seared ribeye', '₹1,950'],
                  ['Smoked old fashioned', '₹850'],
                  ['24 tables with QR codes', ''],
                ].map(([name, price]) => (
                  <p key={name} className="hm-note" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, borderTop: '1px solid #3B2E22', paddingTop: 10 }}>
                    <span>{name}</span><span>{price}</span>
                  </p>
                ))}
              </div>
            </FeatureSplit>
            <div className="hm-values" style={{ marginTop: 48 }}>
              <article><h3>Staff & roles</h3><p>Give owners, managers and chefs their own access, so each person sees what they need.</p></article>
              <article><h3>Guest feedback</h3><p>Collect feedback from guests and read it alongside your orders.</p></article>
            </div>
          </div>
        </section>

        <section className="hm-section">
          <div className="hm-wrap hm-action">
            <div>
              <div className="hm-eye">See Servya in action</div>
              <h2>Three simple steps to <em>service.</em></h2>
              <p className="hm-lead">The guest scans. The kitchen sees it. You see the night.</p>
              <div className="hm-step" data-reveal style={{ '--d': '0ms' }}><b>1</b><div><h3>Set up your menu</h3><p>Import your menu from Excel or add it item by item, then add your tables.</p></div></div>
              <div className="hm-step" data-reveal style={{ '--d': '120ms' }}><b>2</b><div><h3>Place your QR codes</h3><p>Print each table’s QR code and put it on the table, the bar or the lounge.</p></div></div>
              <div className="hm-step" data-reveal style={{ '--d': '240ms' }}><b>3</b><div><h3>Serve with clarity</h3><p>Orders appear on the kitchen board with their table number. Your reports fill in as you go.</p></div></div>
            </div>
            <div className="hm-stage" data-reveal style={{ '--d': '160ms' }}>
              <PhoneMock />
              <DashboardMock />
            </div>
          </div>
        </section>

        <section className="hm-section" style={{ paddingTop: 0 }}>
          <div className="hm-wrap">
            <CtaBand
              image="/images/hospitality/bar-pour.png?v=3"
              alt="a bartender pouring an amber cocktail in front of a lit back bar"
              eyebrow="Our mission"
              title={<>Great hospitality deserves <em>great technology.</em></>}
              text="Servya gives hospitality teams simple, affordable tools, so a smaller team can run a smooth service and give guests their full attention."
              primary={{ to: '/contact', label: 'Book a demo' }}
              secondary={{ to: '/about', label: 'About Servya' }}
            >
              <div className="hm-values">
                {[
                  ['Empowerment', 'Tools that put your team in control.'],
                  ['Simplicity', 'Complex service, made simple.'],
                  ['Trust', 'Honest software and honest answers.'],
                  ['Purposeful innovation', 'Features that solve real service problems.'],
                  ['Community growth', 'We grow when our venues grow.'],
                ].map(([title, body]) => (
                  <article key={title}><h3>{title}</h3><p>{body}</p></article>
                ))}
              </div>
            </CtaBand>
          </div>
        </section>

        <section className="hm-section">
          <div className="hm-wrap">
            <div className="hm-eye">On a busy night</div>
            <h2>Fewer trips. <em>Clearer orders.</em></h2>
            <div className="hm-quotes" style={{ marginTop: 28 }}>
              {[
                ['Guests order when they’re ready', 'They don’t have to wait to catch someone’s eye. The menu is on the table, and the order is placed from their phone.'],
                ['The kitchen reads one screen', 'Every order arrives on the board with its table number. No handwriting to decode, no docket to chase.'],
                ['You see the shape of service', 'Your reports show what sold and when, so tomorrow’s prep and staffing start from facts.'],
              ].map(([title, body]) => (
                <article className="hm-plan" key={title}><h3>{title}</h3><p className="hm-lead" style={{ fontSize: 16 }}>{body}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="hm-section" style={{ background: '#120D0A' }}>
          <div className="hm-wrap">
            <div className="hm-eye">Pricing</div>
            <h2>Simple plans. <em>No surprises.</em></h2>
            <p className="hm-lead">Start small and move up as your venue gets busier. Running something larger? Talk to us.</p>
            <div className="hm-plans" style={{ marginTop: 36 }}>
              {PLANS.map((plan, index) => (
                <article className={`hm-plan${index === 1 ? ' hot' : ''}`} key={plan.name} data-reveal style={{ '--d': `${index * 140}ms` }}>
                  {index === 1 && <div className="hm-badge">Recommended</div>}
                  <h3>{plan.name}</h3>
                  <p className="hm-lead" style={{ fontSize: 15 }}>{plan.tagline}</p>
                  <div className="hm-price">{formatPlanPrice(plan.inr, india)}<small>/month</small></div>
                  <ul>
                    {plan.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                  <Link className={`hm-btn ${index === 1 ? 'primary' : 'ghost'}`} to="/contact">{plan.cta}</Link>
                </article>
              ))}
            </div>
            <p className="hm-note">{planPriceNote(india)}</p>
            <div className="hm-actions"><Link className="hm-btn ghost" to="/pricing">Compare all plans →</Link></div>
          </div>
        </section>

        <section className="hm-section">
          <div className="hm-wrap">
            <div className="hm-eye">Questions</div>
            <h2>Good questions, <em>straight answers.</em></h2>
            <div className="hm-faq">
              {FAQ.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="hm-section" style={{ paddingTop: 0 }}>
          <div className="hm-wrap">
            <CtaBand
              image="/images/hospitality/rooftop.png?v=3"
              alt="a rooftop lounge table at dusk with a cocktail and small plates"
              eyebrow="Ready when you are"
              title={<>Your kitchen. Your guests. <em>Your growth.</em></>}
              text="See Servya with your own menu. Book a demo, or write to us about your venue."
              primary={{ to: '/contact', label: 'Book a demo' }}
              secondary={{ to: '/contact', label: 'Contact us' }}
            />
          </div>
        </section>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}

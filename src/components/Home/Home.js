import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import SampleStrip from './SampleStrip';
import Nav, { TRIAL } from './Nav';
import Hero from './Hero';
import VenueCard from './VenueCard';
import FeatureSplit from './FeatureSplit';
import PhoneMock from './PhoneMock';
import DashboardMock from './DashboardMock';
import TestimonialPlaceholder from './TestimonialPlaceholder';
import PlanCard from './PlanCard';
import CtaBand from './CtaBand';
import Footer from './Footer';
import MobileCtaBar from './MobileCtaBar';
import { PLANS } from '../Marketing/content';

const TEASER = {
  'Free Trial': ['Up to 50 orders/month', 'Basic QR menu', 'Email support'],
  Starter: ['Up to 500 orders/month', 'Advanced QR menu with themes', 'Detailed analytics dashboard', 'Priority email support'],
  Pro: ['Unlimited orders', 'Premium QR menu themes', 'Advanced analytics & insights', '24/7 phone & email support'],
};

const VALUES = [
  ['Empowerment', 'Giving you the tools to succeed'],
  ['Simplicity', 'Making complex things simple'],
  ['Trust', 'Reliable and secure platform'],
  ['Purposeful Innovation', 'Technology with a purpose'],
  ['Community Growth', 'Growing together'],
];

export default function Home() {
  useEffect(() => { document.title = 'Home · Servya'; }, []);

  return (
    <div className="hm">
      <SampleStrip />
      <Nav />
      <main id="main">
        <Hero />

        <section className="hm-section">
          <div className="hm-wrap">
            <div className="hm-eye">Built for hospitality</div>
            <h2>From tableside to <em>room service.</em></h2>
            <p className="hm-lead">One system for the dining room, the bar and the guest room — the same QR menu, the same live queue.</p>
            <div className="hm-venues">
              <VenueCard image="/images/hospitality/hero-steak.png" alt="a candlelit dining room" line="Dry-aged. Candlelit. Perfectly timed." title="Fine dining" body="Tasting and à la carte menus, with orders reaching the pass when they are placed." />
              <VenueCard image="/images/hospitality/bar-cocktail.png" alt="a cocktail being poured" line="Smoke, citrus, one perfect pour." title="Bars & lounges" body="A bar menu guests can browse from the sofa, with drinks routed to the bar." />
              <VenueCard image="/images/hospitality/hotel-breakfast.png" alt="a breakfast tray by a window" line="Breakfast in bed, before the second alarm." title="Hotels & room service" body="In-room dining and restaurant menus from one place, with orders tagged by room." />
            </div>
          </div>
        </section>

        <section className="hm-section" id="tools" style={{ background: '#120D0A' }}>
          <div className="hm-wrap">
            <h2>Four tools. <em>One quiet system.</em></h2>
            <p className="hm-lead">Everything you need to manage and grow your venue — without adding noise to the floor.</p>
            {/* TODO(verify): bar and room QR placement */}
            <FeatureSplit
              numeral="01"
              title="Create & share QR menus in minutes"
              body="Set up your digital menu and generate QR codes instantly — for the table, the bar or the room."
              aside="Scan. Browse. Order."
              mark="Confirm"
            >
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img src="/images/hospitality/rooftop.png" alt="AI-generated sample image of a rooftop at dusk" />
              <span className="hm-ai">AI-generated sample images</span>
            </FeatureSplit>
            <FeatureSplit
              flip
              numeral="02"
              title="Manage orders seamlessly with notifications"
              body="Real-time order updates and smart notifications for your team, from first order to the final plate."
              aside="Fired. Plated. Out."
            >
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img src="/images/hospitality/kitchen-pass.png" alt="AI-generated sample image of a chef plating a dish" />
            </FeatureSplit>
            <FeatureSplit
              numeral="03"
              title="Track sales & insights with smart reports"
              body="See the shape of a week from the same place you watch the queue. This chart is sample data, not a sales figure."
            >
              <div className="hm-chart" role="img" aria-label="Sample bar chart of a week. No real sales figures.">
                <div className="hm-chart-top"><span>Sales & insights</span><span className="hm-confirm">Sample data</span></div>
                <div className="hm-bars" aria-hidden="true">
                  {[['Mon', 42], ['Tue', 55], ['Wed', 48], ['Thu', 74], ['Fri', 63], ['Sat', 90], ['Sun', 70]].map(([day, height]) => (
                    <span key={day}><i style={{ height: `${height}%` }} />{day}</span>
                  ))}
                </div>
                <p className="hm-note">Illustrative chart — no real figures.</p>
              </div>
            </FeatureSplit>
            <FeatureSplit
              flip
              numeral="04"
              title="Customize menu themes to fit your brand"
              body="Make your digital menu match your venue — type, colour and imagery."
            >
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img src="/images/hospitality/dessert-gold.png" alt="AI-generated sample image of a chocolate dessert with gold leaf" />
              <div className="hm-swatches" aria-hidden="true" style={{ position: 'absolute', left: 16, bottom: 16 }}>
                <i style={{ background: '#1A120C' }} /><i style={{ background: '#C9A45C' }} /><i style={{ background: '#7A5A1E' }} /><i style={{ background: '#F5ECDD' }} />
              </div>
            </FeatureSplit>
          </div>
        </section>

        <section className="hm-section">
          <div className="hm-wrap hm-action">
            <div>
              <div className="hm-eye">See Servya in action</div>
              <h2>Three simple steps to <em>service.</em></h2>
              <p className="hm-lead">The guest scans. The kitchen sees it. You see the night.</p>
              <div className="hm-step"><b>1</b><div><h3>Build your menu</h3><p>Add dishes, drinks and photography.</p></div></div>
              <div className="hm-step"><b>2</b><div><h3>Share your QR</h3><p>Place it on tables, at the bar, or in the room.</p></div></div>
              <div className="hm-step"><b>3</b><div><h3>Serve with clarity</h3><p>Orders arrive live, with a notification for your team.</p></div></div>
              {/* TODO(verify): step wording and table / bar / room placement */}
              <p style={{ marginTop: 12 }}><span className="hm-confirm">Steps copy: confirm with product</span></p>
            </div>
            <div className="hm-stage">
              <PhoneMock />
              <DashboardMock />
              <p className="hm-note">Illustrative UI mock-ups, sample data. Table / room / bar labels are proposed positioning.</p>
            </div>
          </div>
        </section>

        <section className="hm-section" style={{ paddingTop: 0 }}>
          <div className="hm-wrap">
            <CtaBand
              image="/images/hospitality/kitchen-pass.png"
              alt="plating in a kitchen"
              eyebrow="Our mission"
              title={<><span>Great hospitality deserves </span><em>great technology.</em></>}
              primary={{ to: TRIAL, label: 'Join the movement' }}
              secondary={{ to: '/about', label: 'Learn more' }}
            >
              <div className="hm-values">
                {VALUES.map(([title, body]) => (
                  <article key={title}><h3>{title}</h3><p>{body}</p></article>
                ))}
              </div>
            </CtaBand>
          </div>
        </section>

        <section className="hm-section">
          <div className="hm-wrap">
            <div className="hm-eye">Voices</div>
            <h2>Trusted by teams who <em>run great rooms.</em></h2>
            <div className="hm-quotes" style={{ marginTop: 28 }}>
              <TestimonialPlaceholder />
              <TestimonialPlaceholder />
              <TestimonialPlaceholder />
            </div>
            <p className="hm-note">Named testimonials are not shown until a real, consented quote exists.</p>
          </div>
        </section>

        <section className="hm-section" style={{ background: '#120D0A' }}>
          <div className="hm-wrap">
            <div className="hm-eye">Pricing</div>
            <h2>Simple plans. <em>No hidden fees.</em></h2>
            <p className="hm-lead">Start free, upgrade when the floor gets busy. Cancel anytime.</p>
            {/* TODO(verify): “no hidden fees” and “cancel anytime” are still stated on the current pricing page */}
            <p style={{ marginTop: 12 }}><span className="hm-confirm">Current site: confirm</span></p>
            <div className="hm-plans" style={{ marginTop: 36 }}>
              {PLANS.map((plan) => (
                <PlanCard
                  key={plan.name}
                  name={plan.name}
                  price={plan.price}
                  detail={plan.name === 'Free Trial' ? plan.description : plan.description}
                  features={TEASER[plan.name]}
                  cta={plan.cta}
                  hot={plan.hot}
                />
              ))}
            </div>
            <div className="hm-actions"><Link className="hm-btn ghost" to="/pricing">Compare all plans →</Link></div>
          </div>
        </section>

        <section className="hm-section">
          <div className="hm-wrap">
            <CtaBand
              image="/images/hospitality/rooftop.png"
              alt="a rooftop table at dusk"
              title={<><span>Your kitchen. Your guests. </span><em>Your growth.</em></>}
              text="Powered by Servya. Start with the free trial, or talk to us about your venue."
              primary={{ to: TRIAL, label: 'Start free trial →' }}
              secondary={{ to: '/contact', label: 'Book a demo' }}
            />
          </div>
        </section>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}

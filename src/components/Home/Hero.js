import React from 'react';
import { Link } from 'react-router-dom';
import { TRIAL } from './Nav';

export default function Hero() {
  return (
    <section className="hm-hero">
      <div className="hm-hero-media">
        {/* next/image is unavailable in this Create React App. */}
        {/* Required label includes the word "image"; the a11y rule treats that as redundant. */}
        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
        <img
          src="/images/hospitality/hero-steak-alt.png?v=2"
          alt="AI-generated sample image of a plated steak in a dining room"
          width="820"
          height="760"
        />
      </div>
      <span className="hm-ai">AI-generated sample images</span>
      <div className="hm-wrap hm-hero-copy">
        <div className="hm-eye">QR menus · Live orders · Insights</div>
        <h1>The calm behind every <em>beautiful service.</em></h1>
        <p className="hm-lead">
          Servya brings QR menus, live order management and sales insights to restaurants, bars and hotels — so your guest sees an elegant menu and your team sees a clear queue.
        </p>
        <div className="hm-actions">
          <Link className="hm-btn primary" to={TRIAL}>Start free trial →</Link>
          <Link className="hm-btn ghost" to="/pricing">See plans</Link>
        </div>
        <p className="hm-micro">Seared. Smoked. Served on time.</p>
      </div>
      <div className="hm-wrap hm-designed">
        <b>DESIGNED FOR</b>
        <span>Fine dining</span>
        <span>Bars & lounges</span>
        <span>Hotels & room service</span>
        {/* TODO(verify): in-room dining, bar menus and hotel positioning */}
        <span className="hm-confirm">Positioning: confirm with product</span>
      </div>
    </section>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { TRIAL } from './Nav';

export default function PlanCard({ name, price, detail, features, cta, hot = false }) {
  return (
    <article className={`hm-plan${hot ? ' hot' : ''}`}>
      {hot && <div className="hm-badge">Most Popular</div>}
      <h3>{name}</h3>
      <p className="hm-lead" style={{ fontSize: 15 }}>{detail}</p>
      <div className="hm-price">{price}<small>/month</small></div>
      <ul>
        {features.map((feature) => <li key={feature}>{feature}</li>)}
      </ul>
      <Link className={`hm-btn ${hot ? 'primary' : 'ghost'}`} to={TRIAL}>{cta}</Link>
    </article>
  );
}

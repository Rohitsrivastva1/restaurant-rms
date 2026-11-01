import React from 'react';
import { Link } from 'react-router-dom';
import HospImg from './HospImg';

export default function CtaBand({ image, alt, eyebrow, title, text, primary, secondary, children }) {
  const name = String(image || '')
    .replace(/^.*\//, '')
    .replace(/\.(png|webp|jpe?g).*$/i, '');

  return (
    <div className="hm-band">
      <HospImg name={name} alt={alt} width={640} height={310} />
      <div className="hm-scrim">
        {eyebrow && <div className="hm-eye">{eyebrow}</div>}
        <h2>{title}</h2>
        {text && <p className="hm-lead">{text}</p>}
        <div className="hm-actions">
          <Link className="hm-btn primary" to={primary.to}>{primary.label}</Link>
          <Link className="hm-btn ghost" to={secondary.to}>{secondary.label}</Link>
        </div>
        {children}
      </div>
    </div>
  );
}

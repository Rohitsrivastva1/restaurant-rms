import React from 'react';
import { Link } from 'react-router-dom';
export default function CtaBand({ image, alt, eyebrow, title, text, primary, secondary, children }) {
  return (
    <div className="hm-band">
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <img src={image} alt={`AI-generated sample image of ${alt}`} />
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

import React from 'react';
import HospImg from './HospImg';

export default function VenueCard({ image, alt, line, title, body }) {
  const name = String(image || '')
    .replace(/^.*\//, '')
    .replace(/\.(png|webp|jpe?g).*$/i, '');

  return (
    <article className="hm-venue">
      <HospImg name={name} alt={alt} width={420} height={300} />
      <div className="hm-venue-copy">
        <p className="line">{line}</p>
        <h3>{title}</h3>
        <p className="body">{body}</p>
      </div>
    </article>
  );
}

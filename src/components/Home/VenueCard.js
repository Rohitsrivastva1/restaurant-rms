import React from 'react';

export default function VenueCard({ image, alt, line, title, body }) {
  return (
    <article className="hm-venue">
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <img src={image} alt={`AI-generated sample image of ${alt}`} />
      <div className="hm-venue-copy">
        <p className="line">{line}</p>
        <h3>{title}</h3>
        <p className="body">{body}</p>
        {/* TODO(verify): venue-specific ordering is proposed positioning */}
        <span className="hm-confirm">Confirm</span>
      </div>
    </article>
  );
}

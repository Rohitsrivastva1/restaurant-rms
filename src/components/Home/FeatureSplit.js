import React from 'react';

export default function FeatureSplit({ flip = false, numeral, title, body, aside, mark, children }) {
  return (
    <div className={`hm-feat${flip ? ' flip' : ''}`}>
      <div className="hm-media">{children}</div>
      <div className="hm-copy">
        <div className="hm-num">{numeral}</div>
        <h3>{title}</h3>
        <p className="hm-lead">{body}</p>
        {aside && <p className="hm-aside">{aside}</p>}
        {mark && <p style={{ marginTop: 12 }}><span className="hm-confirm">{mark}</span></p>}
      </div>
    </div>
  );
}

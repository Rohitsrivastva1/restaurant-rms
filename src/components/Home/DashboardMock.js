import React from 'react';

const ROWS = [
  ['Order #1234', 'Table 12', 'New', 'new'],
  ['Order #1235', 'Room 304', 'Cooking', 'cooking'],
  ['Order #1236', 'Bar 3', 'Ready', 'ready'],
];

export default function DashboardMock() {
  return (
    <div className="hm-dash" role="img" aria-label="Illustrative live dashboard. Order 1234 New at Table 12, order 1235 Cooking, order 1236 Ready. Room and bar labels are proposed.">
      <header><span>Live dashboard</span><span>Sample</span></header>
      {ROWS.map(([id, place, label, tone]) => (
        <div className="hm-order" key={id}>
          <div><strong>{id}</strong><small>{place}</small></div>
          <span className={`hm-pill ${tone}`}>{label}</span>
        </div>
      ))}
      <div className="hm-toast">New order · Table 12 — kitchen notified</div>
      <div className="hm-bars" aria-hidden="true" style={{ height: 64, marginTop: 14 }}>
        {[40, 55, 48, 70, 62, 78, 66].map((height) => (
          <span key={height}><i style={{ height: `${height}%` }} /></span>
        ))}
      </div>
      <p className="hm-note">Today · sample data</p>
    </div>
  );
}

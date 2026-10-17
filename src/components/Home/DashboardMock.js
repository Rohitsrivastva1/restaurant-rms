import React from 'react';

const ROWS = [
  ['Order #1234', 'Table 12', 'New', 'new'],
  ['Order #1235', 'Table 7', 'Cooking', 'cooking'],
  ['Order #1236', 'Table 4', 'Ready', 'ready'],
];

export default function DashboardMock() {
  return (
    <div className="hm-dash" role="img" aria-label="Kitchen order board showing three open orders and their table numbers.">
      <header><span>Kitchen board</span><span className="hm-live">Open</span></header>
      {ROWS.map(([id, place, status, tone]) => (
        <div className="hm-order" key={id}>
          <div><strong>{id}</strong><small>{place}</small></div>
          <span className={`hm-pill ${tone}`}>{status}</span>
        </div>
      ))}
      <p className="hm-toast">Table 12 · ribeye fired</p>
    </div>
  );
}

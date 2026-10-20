import React from 'react';

export function RoPageSkeleton({
  title = 'Loading…',
  lead = 'Just a moment — pulling the latest from the kitchen.',
  variant = 'list',
}) {
  return (
    <div className="ro" aria-busy="true" aria-live="polite">
      <header className="ro-nav">
        <span className="ro-logo">Servya <i>◆</i></span>
        <div className="ro-skeleton ro-skel-chip" />
      </header>
      <main className="ro-main">
        <div className="ro-head">
          <div>
            <p className="ro-kicker">Servya</p>
            <h1>{title}</h1>
            <p className="ro-muted">{lead}</p>
          </div>
        </div>
        {variant === 'board' ? <RoBoardSkeleton /> : <RoListSkeleton count={variant === 'menu' ? 6 : 4} />}
      </main>
    </div>
  );
}

export function RoListSkeleton({ count = 4 }) {
  return (
    <div className="ro-skeleton-stack full" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div className="ro-skeleton ro-skel-row" key={i} />
      ))}
    </div>
  );
}

export function RoBoardSkeleton() {
  return (
    <div className="ro-board ro-board-skel" aria-hidden="true">
      {['New', 'Kitchen', 'Ready', 'Done'].map((label) => (
        <section className="ro-column" key={label}>
          <h2>{label}</h2>
          <div className="ro-skeleton h-24" />
          <div className="ro-skeleton h-24" />
          <div className="ro-skeleton short" />
        </section>
      ))}
    </div>
  );
}

export function RoRefreshBar({ show, label = 'Updating…' }) {
  if (!show) return null;
  return (
    <div className="ro-refresh-bar" role="status">
      <span className="ro-spinner" aria-hidden="true" />
      {label}
    </div>
  );
}

export function RoSendSpinner() {
  return <span className="ro-spinner ro-spinner-inline" aria-hidden="true" />;
}

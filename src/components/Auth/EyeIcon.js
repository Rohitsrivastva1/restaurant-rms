import React from 'react';

const EyeIcon = ({ off = false }) => (
  off ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6a2 2 0 002.8 2.8" />
      <path d="M9.9 5.2A10.4 10.4 0 0112 5c5 0 9.3 3.1 11 7a11.7 11.7 0 01-4.2 5.1" />
      <path d="M6.1 6.1C4.1 7.4 2.6 9.2 1 12c1.7 3.9 6 7 11 7 1.3 0 2.6-.2 3.7-.7" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
);

export default EyeIcon;

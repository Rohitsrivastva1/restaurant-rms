import React from 'react';

export default function Placeholder({ tag, children }) {
  return (
    <div className="hm-placeholder">
      {/* TODO(verify): replace this block before launch */}
      <div className="hm-tag">{tag}</div>
      {children}
    </div>
  );
}

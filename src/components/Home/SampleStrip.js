import React from 'react';

export default function SampleStrip() {
  // CRA has no NEXT_PUBLIC_* env. Hide with REACT_APP_SHOW_SAMPLE_STRIP=false.
  if (process.env.REACT_APP_SHOW_SAMPLE_STRIP === 'false') return null;
  return (
    <div className="hm-strip">
      Sample content — design preview · AI-generated sample images · claims and numbers are placeholders
    </div>
  );
}

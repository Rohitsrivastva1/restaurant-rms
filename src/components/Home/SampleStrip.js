import React from 'react';

export default function SampleStrip() {
  if (process.env.REACT_APP_SHOW_SAMPLE_STRIP === 'false') return null;
  return (
    <div className="hm-strip">Sample content · AI-generated sample images · Remove before launch</div>
  );
}

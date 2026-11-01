import React from 'react';
import { hosp, hospPng } from '../../utils/hospMedia';

/** Prefer WebP; keep PNG for browsers that need it. */
export default function HospImg({
  name,
  alt = '',
  width,
  height,
  eager = false,
  className,
  version = 4,
}) {
  return (
    <picture className={className}>
      <source srcSet={hosp(name, version)} type="image/webp" />
      <img
        src={hospPng(name, version)}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding={eager ? 'sync' : 'async'}
        fetchPriority={eager ? 'high' : undefined}
      />
    </picture>
  );
}

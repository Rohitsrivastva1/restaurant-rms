/** Hospitality marketing images as WebP (PNG kept as fallback for older clients). */
export const hosp = (name, version = 4) => `/images/hospitality/${name}.webp?v=${version}`;

export const hospPng = (name, version = 4) => `/images/hospitality/${name}.png?v=${version}`;

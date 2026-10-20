/**
 * Schoolabe hosts Servya under /api/v1/rms.
 * Production (Render): REACT_APP_API_URL=https://api.schoolabe.com/api/v1/rms
 * Local: http://localhost:8000/api/v1/rms
 */
const DEFAULT_API =
  process.env.NODE_ENV === 'production'
    ? 'https://api.schoolabe.com/api/v1/rms'
    : 'http://localhost:8000/api/v1/rms';

export const API_BASE = (process.env.REACT_APP_API_URL || DEFAULT_API).replace(/\/$/, '');

export function apiUrl(path) {
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${suffix}`;
}

export function authHeaders(extra = {}) {
  const token = localStorage.getItem('token');
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

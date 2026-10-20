/** Tiny session cache so repeat visits paint instantly while network refreshes. */

const mem = new Map();

export function cacheGet(key, maxAgeMs = 60_000) {
  try {
    const raw = sessionStorage.getItem(`servya-cache:${key}`);
    if (!raw) return mem.get(key)?.data ?? null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (Date.now() - (parsed.ts || 0) > maxAgeMs) {
      return parsed.data ?? null; // stale OK for instant paint
    }
    return parsed.data ?? null;
  } catch {
    return mem.get(key)?.data ?? null;
  }
}

export function cacheSet(key, data) {
  const entry = { ts: Date.now(), data };
  mem.set(key, entry);
  try {
    sessionStorage.setItem(`servya-cache:${key}`, JSON.stringify(entry));
  } catch {
    /* quota / private mode */
  }
}

export async function fetchJson(url, options = {}, { timeoutMs = 12000 } = {}) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    const body = await response.json().catch(() => ({}));
    return { ok: response.ok, status: response.status, body };
  } finally {
    window.clearTimeout(timer);
  }
}
